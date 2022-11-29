import React from 'react';
import classNames from 'classnames/bind';
import styles from './BuyToken.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { smartContractInfoSelector } from '~/modules/user/auth/selectors';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import Button from '~/components/Button';
import axios from 'axios';
import { FUND_SUBSCRIPTION_ADDRESS, TI_SMART_CONTRACT_ADDRESS, FUND_SUBSCRIPTION_ABI, TI_ABI } from '~/abi';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import ModalNotify from '~/components/ModalNotify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { saveSmartContractInfo } from '~/modules/user/auth/authSlice';
import { Col, Row } from 'antd';

const cx = classNames.bind(styles);

function BuyToken() {
    const smartContractInfo = useSelector(smartContractInfoSelector);
    const navigate = useNavigate();
    const [provider, setProvider] = useState(undefined);
    const [approve, setApprove] = useState(true);
    const [openModalSucceed, setOpenModalSucceed] = useState(false);


    const dispatch = useDispatch();
  
    useEffect(() => {
        const onLoad = async () => {
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            await setProvider(provider);
        };
        onLoad();
    }, []);
    const upgradePremium = async (price) => {
        // const contractPremium = await new ethers.Contract(FUND_SUBSCRIPTION_ADDRESS, FUND_SUBSCRIPTION_ABI, provider);
        // // dispatch(saveContractPremium(contractPremium));
        let ABI = ['function upgradePremium(uint8 _level)'];
        // let iface = new ethers.utils.Interface(ABI);
        let params = [
            {
                from: smartContractInfo.walletAddress,
                to: FUND_SUBSCRIPTION_ADDRESS,
                gas: '0x3F7A0',
                gasPrice: '0x104C533C00', // 10000000000000
                data: '0x0ea063a00000000000000000000000000000000000000000000000000000000000000001',
            },
        ];

        await window.ethereum.request({ method: 'eth_sendTransaction', params }).then((txhash) => {
            toast.loading('Processing Upgrade Premium...');

            checkTransactionConfirm(txhash).then((result) => {
             
                if (result) {
                    // dispatch(saveUserPremium(!!result));
                    const handleRequestStatus = async () => {
                        const approveTokenStatus = await axios.get(
                            `https://api-goerli.etherscan.io/api?module=transaction&action=getstatus&txhash=${txhash}&apikey=P4UEFZVG1N5ZYMPDKVQI7FFU7AZN742U3E`,
                        );

                        if (approveTokenStatus.data.result.isError === '0') {
                            toast.dismiss();
                            toast.success('Upgrade Premium successfully');
                            //    dispatch(
                            //        saveSmartContractInfo({
                            //            ...smartContractInfo,
                            //            balance: smartContractInfo.balance - smartContractInfo.premiumPrices,
                            //        }),
                            //    );
                        } else {
                            toast.dismiss();
                            toast.error('Upgrade Premium failed');
                        }
                    };
                    setTimeout(handleRequestStatus, 15000);
                }
            });
        });
    };

    const approveToken = async (price) => {
        let ABI = ['function approve(address _spender, uint _value)'];
        let iface = new ethers.utils.Interface(ABI);
        let params = [
            {
                from: smartContractInfo.walletAddress,
                to: TI_SMART_CONTRACT_ADDRESS,
                gas: '0x1FBD0',
                gasPrice: '0x1BF08EB000',
                data: iface.encodeFunctionData('approve', [FUND_SUBSCRIPTION_ADDRESS, price]),
            },
        ];

        await window.ethereum.request({ method: 'eth_sendTransaction', params }).then((txhash) => {
            toast.loading('Approve Token ...');

            checkTransactionConfirm(txhash).then((result) => {
                if (result) {
                    // dispatch(saveUserPremium(!!result));
                    const handleRequestStatus = async () => {
                        const approveTokenStatus = await axios.get(
                            `https://api-goerli.etherscan.io/api?module=transaction&action=getstatus&txhash=${txhash}&apikey=P4UEFZVG1N5ZYMPDKVQI7FFU7AZN742U3E`,
                        );
                      
                        if (approveTokenStatus.data.result.isError === '0') {
                            toast.dismiss();
                            toast.success('Approve Token successfully');
                            setApprove(false);
                        } else {
                            toast.dismiss();
                            toast.error('Approve Token failed');
                        }
                    };
                    setTimeout(handleRequestStatus, 15000);
                }
            });
        });
    };

    const handleBuyNow = async (price) => {
        if (smartContractInfo.walletAddress) {
            if (smartContractInfo.balance > price) {
                approveToken(price);
            } else navigate('/swap-token');
        } else {
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

    return (
        <section className={cx('container-banner')}>
            {openModalSucceed && (
                <ModalNotify
                    icon={<FontAwesomeIcon icon={faBell} />}
                    isOpen={openModalSucceed}
                    title={'Notify'}
                    description={'Connect meta mask please!'}
                    onRequestClose={() => {
                        setOpenModalSucceed(false);
                    }}
                />
            )}
            <h1 className={cx('heading')}>Update premium plan for more features.</h1>
            <Row style={{ height: '100%' }}>
                <Col xl={8} lg={12} md={24}>
                    <div className={cx('popup-buy')}>
                        <h1>Balance: {smartContractInfo.balance} TI</h1>
                        {/* <h2>Yearly: {smartContractInfo.ratio}</h2> */}
                        <div className={cx('popup-buy__content')}>
                            <div className={cx('box-content')}>
                                {/* <h4>
                                    Professional <span>(Save 85%)</span>
                                </h4> */}
                                <p>Provide rich data about Crypto Market. It's suitable for professional investors.</p>
                            </div>
                            <ul className={cx('nav-benefit')}>
                                <li>"Shark wallet" Crypto holder</li>
                                <li>"Shark wallet" Transaction history</li>
                                <li>"Shark wallet" Detail information</li>
                                <li>"Support (1-1)</li>
                            </ul>
                            <h5>
                                {smartContractInfo.premiumPrices[0]} TI<p>/month</p>
                            </h5>
                            <div className={cx('btn-swap')}>
                                {approve ? (
                                    <Button
                                        linearGradientPrimary
                                        onClick={() => handleBuyNow(smartContractInfo.premiumPrices[0])}
                                    >
                                        Approve
                                    </Button>
                                ) : (
                                    <Button linearGradientPrimary onClick={upgradePremium}>
                                        Upgrade Premium
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={8} lg={12} md={24}>
                    <div className={cx('popup-buy')}>
                        <h1>Balance: {smartContractInfo.balance} TI</h1>
                        {/* <h2>Yearly: {smartContractInfo.ratio}</h2> */}
                        <div className={cx('popup-buy__content')}>
                            <div className={cx('box-content')}>
                                {/* <h4>
                                    Professional <span>(Save 85%)</span>
                                </h4> */}
                                <p>Provide rich data about Crypto Market. It's suitable for professional investors.</p>
                            </div>
                            <ul className={cx('nav-benefit')}>
                                <li>"Shark wallet" Crypto holder</li>
                                <li>"Shark wallet" Transaction history</li>
                                <li>"Shark wallet" Detail information</li>
                                <li>"Support (1-1)</li>
                            </ul>
                            <h5>
                                {smartContractInfo.premiumPrices[1]} TI<p>/6 month</p>
                            </h5>
                            <div className={cx('btn-swap')}>
                                {approve ? (
                                    <Button
                                        linearGradientPrimary
                                        onClick={() => handleBuyNow(smartContractInfo.premiumPrices[1])}
                                    >
                                        Approve
                                    </Button>
                                ) : (
                                    <Button linearGradientPrimary onClick={upgradePremium}>
                                        Upgrade Premium
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={8} lg={12} md={24}>
                    <div className={cx('popup-buy')}>
                        <h1>Balance: {smartContractInfo.balance} TI</h1>
                        {/* <h2>Yearly: {smartContractInfo.ratio}</h2> */}
                        <div className={cx('popup-buy__content')}>
                            <div className={cx('box-content')}>
                                {/* <h4>
                                    Professional <span>(Save 85%)</span>
                                </h4> */}
                                <p>Provide rich data about Crypto Market. It's suitable for professional investors.</p>
                            </div>
                            <ul className={cx('nav-benefit')}>
                                <li>"Shark wallet" Crypto holder</li>
                                <li>"Shark wallet" Transaction history</li>
                                <li>"Shark wallet" Detail information</li>
                                <li>"Support (1-1)</li>
                            </ul>
                            <h5>
                                {smartContractInfo.premiumPrices[2]} TI<p>/year</p>
                            </h5>
                            <div className={cx('btn-swap')}>
                                {approve ? (
                                    <Button
                                        linearGradientPrimary
                                        onClick={() => handleBuyNow(smartContractInfo.premiumPrices[2])}
                                    >
                                        Approve
                                    </Button>
                                ) : (
                                    <Button linearGradientPrimary onClick={upgradePremium}>
                                        Upgrade Premium
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </section>
    );
}

export default BuyToken;
