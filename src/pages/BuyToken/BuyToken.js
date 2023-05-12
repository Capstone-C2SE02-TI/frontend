import React, { useMemo } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { smartContractInfoSelector } from '~/modules/user/auth/selectors';
import { BigNumber, ethers } from 'ethers';
import { FUND_SUBSCRIPTION_ADDRESS, TI_SMART_CONTRACT_ADDRESS, FUND_SUBSCRIPTION_ABI, TI_ABI } from '~/abi';
import { useState, useEffect } from 'react';
import styles from './BuyToken.module.scss';
import ModalNotify from '~/components/ModalNotify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { saveExpiredTime, saveSmartContractInfo, saveUserPremium } from '~/modules/user/auth/authSlice';
import { convertUnixTime } from '~/helpers';
import BuyLevel from './BuyLevel/BuyLevel';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';
import _ from 'lodash';
import { TransactionResponse } from '~/configs/api';

const cx = classNames.bind(styles);
const TIME_UPGRADE_PRICES = [
    {
        type: 'month',
        quantityTime: '1',
        price: 1,
    },
    {
        type: 'month',
        quantityTime: '6',
        price: 5,
    },
    {
        type: 'year',
        quantityTime: '1',
        price: 10,
    },
];
function BuyToken() {
    const smartContractInfo = useSelector(smartContractInfoSelector);
    const walletAddress = useSelector(getAddressMetaMask);

    const navigate = useNavigate();
    const [provider, setProvider] = useState(undefined);

    const PREMIUM_PRICES_DEFAULT = useMemo(() => {
        return smartContractInfo.premiumPrices.map((premiumPrices, index) => {
            return {
                price: premiumPrices.price,
                type: index + 1
            }
        })
    }, [smartContractInfo]);

    const [openModalSucceed, setOpenModalSucceed] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const onLoad = async () => {
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            await setProvider(provider);
        };
        onLoad();
    }, []);
    const onLoadExpriredTime = async () => {
        const contractPremium = await new ethers.Contract(FUND_SUBSCRIPTION_ADDRESS, FUND_SUBSCRIPTION_ABI, provider);
        const limmitedAccount = await contractPremium.getExpriedTime(smartContractInfo.walletAddress);
        const convertlimmitedAccount = await limmitedAccount.toHexString(16);
        const limmitedAccountTime = convertUnixTime(convertlimmitedAccount);
        dispatch(saveExpiredTime(limmitedAccountTime));
    };
    const upgradePremium = async (premiumPrice, handleToggleApprove) => {
        const contractPremium = await new ethers.Contract(FUND_SUBSCRIPTION_ADDRESS, FUND_SUBSCRIPTION_ABI, provider);
        const ide =
            PREMIUM_PRICES_DEFAULT[
                PREMIUM_PRICES_DEFAULT.findIndex((premiumData) => premiumData.price === premiumPrice)
            ].type;
        const estimationUpgrade = await contractPremium
            .connect(provider.getSigner())
            .estimateGas.upgradePremium(BigNumber.from(ide));

        let params = [
            {
                from: smartContractInfo.walletAddress,
                to: FUND_SUBSCRIPTION_ADDRESS,
                gas: estimationUpgrade.toHexString(16),
                gasPrice: '0x104C533C00',
                data: '0x0ea063a0000000000000000000000000000000000000000000000000000000000000000' + ide,
            },
        ];

       
        await window.ethereum.request({ method: 'eth_sendTransaction', params }).then((txhash) => {
            toast.loading('Processing Upgrade Premium...');

            checkTransactionConfirm(txhash).then((result) => {
                if (result) {
                    console.log({ result });
                    const handleRequestStatus = async () => {
                        const approveTokenStatus = await axios.get(TransactionResponse(txhash));
                        if (approveTokenStatus.data.result.isError === '0') {
                            await onLoadExpriredTime();
                            toast.dismiss();
                            toast.success('Upgrade Premium successfully');
                            dispatch(
                                saveSmartContractInfo({
                                    ...smartContractInfo,
                                    balance: smartContractInfo.balance - premiumPrice,
                                }),
                            );
                            dispatch(saveUserPremium(true));
                            handleToggleApprove(false)
                        } else {
                            toast.dismiss();
                            toast.error('Upgrade Premium failed');
                        }
                    };
                    setTimeout(handleRequestStatus, 1000)
                }
            });
        });
    };

    const approveToken = async (premiumPrice, handleToggleApprove) => {
        let ABI = ['function approve(address _spender, uint _value)'];
        let iface = new ethers.utils.Interface(ABI);
        const contractTi = await new ethers.Contract(TI_SMART_CONTRACT_ADDRESS, TI_ABI, provider);
        const estimationApprove = await contractTi.estimateGas.approve(FUND_SUBSCRIPTION_ADDRESS, premiumPrice);
        console.log(estimationApprove)
        console.log(estimationApprove.add(BigNumber.from(1000)))
        let params = [
            {
                from: smartContractInfo.walletAddress,
                to: TI_SMART_CONTRACT_ADDRESS,
                gas: BigNumber.from("50000").toHexString(16),
                gasPrice: '0x1BF08EB000',
                data: iface.encodeFunctionData('approve', [FUND_SUBSCRIPTION_ADDRESS, premiumPrice]),
            },
        ];

        await window.ethereum.request({ method: 'eth_sendTransaction', params }).then((txhash) => {
            toast.loading('Approve Token ...');

            checkTransactionConfirm(txhash).then((result) => {
                if (result) {
                    const handleRequestStatus = async () => {
                        const approveTokenStatus = await axios.get(TransactionResponse(txhash));

                        if (approveTokenStatus.data.result.isError === '0') {
                            toast.dismiss();
                            toast.success('Approve Token successfully', { icon: '👻' });
                            handleToggleApprove(true);
                        } else {
                            toast.dismiss();
                            toast.error('Approve Token failed');
                        }
                    };
                    handleRequestStatus();
                }
            });
        });
    };

    const handleApprove = async (premiumPrice, handleToggleApprove) => {
        if (walletAddress) {
            if (smartContractInfo.balance >= premiumPrice) {
                approveToken(premiumPrice, handleToggleApprove);
            } else {
                setNotifyContent({ title: 'You are not enough TI?', type: 'need-swap' });
                setOpenModalSucceed(true);
            }
        } else {
            setNotifyContent({ title: 'Please connect metamask first' });
            setOpenModalSucceed(true);
        }
    };

    const checkTransactionConfirm = (txhash) => {
        let checkTransactionLop = () => {
            return window.ethereum
                .request({
                    method: 'eth_getTransactionReceipt',
                    params: [txhash],
                })
                .then((r) => {
                    if (r !== null) return 'comfirmned';
                    else return checkTransactionLop();
                });
        };
        return checkTransactionLop();
    };
    const [notifyContent, setNotifyContent] = useState({});
    return (
        <div className={cx('container-banner')}>
            {openModalSucceed && (
                <ModalNotify
                    typeNotify={true}
                    type="notify"
                    icon={<FontAwesomeIcon icon={faBell} />}
                    isOpen={openModalSucceed}
                    title={'Notify'}
                    description={notifyContent.title}
                    onRequestClose={() => {
                        if (notifyContent.type === 'need-swap') {
                            navigate('/swap-token');
                        }
                        setOpenModalSucceed(false);
                    }}
                />
            )}
            <h1 className={cx('heading')}>Update premium plan for more features.</h1>
            <Row style={{ height: '100%' }} gutter={[48, 48]}>
                {smartContractInfo?.premiumPrices?.map((premiumPrice, index) => {
                    return (
                        <Col xl={8} lg={12} md={24} key={index}>
                            <BuyLevel
                                isApprove={false}
                                times={TIME_UPGRADE_PRICES[index]}
                                premiumPrice={premiumPrice}
                                handleApprove={handleApprove}
                                handleUpgradePremium={upgradePremium}
                            />
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}

export default BuyToken;
