import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { TI_ABI, TI_SMART_CONTRACT_ADDRESS, DEX_ABI, DEX_SMART_CONTRACT_ADDRESS } from '../../abi';
import { useSelector, useDispatch } from 'react-redux';
import { smartContractInfoSelector } from '~/modules/user/auth/selectors';
import { ethers } from 'ethers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import styles from './SwapToken.module.scss';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import Button from '~/components/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import authSlice from '~/modules/user/auth/authSlice';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';
import { TransactionResponse } from '~/configs/api';

const cx = classNames.bind(styles);

function SwapToken() {
    const dispatch = useDispatch();
    const walletAddress = useSelector(getAddressMetaMask);

    const smartContractInfo = useSelector(smartContractInfoSelector);
    const [provider, setProvider] = useState(undefined);
    const [ethValues, setEthValues] = useState(0);
    const [ethChange, setEthChange] = useState(0);

    useEffect(() => {
        const onLoad = async () => {
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            await setProvider(provider);
        };
        onLoad();
    }, []);

    const handleChange = (e) => {
        setEthValues(e.target.value);
        console.log(smartContractInfo.ratio);
        setEthChange(+e.target.value / +smartContractInfo.ratio);
    };
    const handleSwap = async () => {
        let ABI = ['function buy(uint amount)'];
        // let ABITEST = ['function updatePrice(uint _newPrice)'];

        let iface = new ethers.utils.Interface(ABI);
        // let ifacetest = new ethers.utils.Interface(ABITEST);
        const contract = await new ethers.Contract(DEX_SMART_CONTRACT_ADDRESS, DEX_ABI, provider);

        console.log(ethChange);
        const estimateGas = await contract
            .estimateGas.buy(ethChange, {
                value: ethers.utils.parseEther(ethValues)
            });
        console.log(estimateGas);

        let params = [
            {
                from: smartContractInfo.walletAddress,
                to: DEX_SMART_CONTRACT_ADDRESS,
                gas: estimateGas.toHexString(16), // 30400
                gasPrice: '0x1BF08EB000', // 10000000000000
                value: Number(ethValues * 10 ** 18).toString(16), // 2441406250
                data: iface.encodeFunctionData('buy', [ethChange]),
                // data: ifacetest.encodeFunctionData('updatePrice', [1]),
            },
        ];

        await window.ethereum.request({ method: 'eth_sendTransaction', params }).then((txhash) => {
            toast.loading('Processing Swap...');

            checkTransactionConfirm(txhash).then((result) => {
                if (result) {
                    dispatch(
                        authSlice.actions.saveSmartContractInfo({
                            ...smartContractInfo,
                            balance: ethChange + smartContractInfo.balance,
                        }),
                    );
                    // setBalance((pre) => pre + ethChange);
                    toast.dismiss();
                    toast.success('Swap successfully', { icon: '👻' });
                }
                const handleRequestStatus = async () => {
                    const statusSwapToken = await axios.get(
                        TransactionResponse(txhash)
                    );
                    console.log({ statusSwapToken });
                };
                setTimeout(handleRequestStatus, 10000);
            });
        });
    };

    //!!check transaction when swapToken
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
        <section className={cx('container-swap')}>
            <div className={cx('swap-text')}>
                <h1>SWAP TOKEN</h1>
            </div>
            <div className={cx('app-body')}>
                <div className={cx('swap-container')}>
                    <div className={cx('swap-header')}>
                        <span className={cx('swap-text__header')}>Swap</span>
                        <span className={cx('gear-container')}>
                            <Button linearGradientPrimary>
                                {walletAddress ? walletAddress.slice(0, 10) + '...' : '...'}
                            </Button>
                        </span>
                    </div>
                    <div className={cx('swap-body')}>
                        <div className={cx('swap-body__text')}>
                            <p>You send</p>
                            <p>Balance: {smartContractInfo.balance}</p>
                        </div>
                        <div className={cx('swap-body__input')}>
                            <div>
                                <div className={cx('swap-body__logo')}>
                                    <Image width="30" height="30" src={images.etherium} alt="logo" />
                                    <p>ETH</p>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </div>
                                <input
                                    placeholder="0.0"
                                    type="number"
                                    name="eth-change"
                                    value={ethValues}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={cx('icon-arrow-down')}>
                                <FontAwesomeIcon icon={faArrowDown} />
                            </div>
                            <div>
                                <div className={cx('swap-body__logo')}>
                                    <Image width="30" height="30" src={images.logo} alt="logo" />
                                    <p>TI</p>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </div>
                                <input
                                    placeholder="0.0"
                                    type="number"
                                    name="ti-change"
                                    value={ethValues / smartContractInfo.ratio || 0}
                                    onChange={() => { }}
                                />
                            </div>
                        </div>
                        <div className={cx('swap-footer')} onClick={handleSwap}>
                            <Button linearGradientPrimary>Swap now</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SwapToken;
