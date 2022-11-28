import React from 'react';
import classNames from 'classnames/bind';
import styles from './BuyToken.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { smartContractInfoSelector } from '~/modules/user/auth/selectors';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import ConnectButton from '../SwapToken/ConnectButton';
import Button from '~/components/Button';
import { FUND_SUBSCRIPTION_ABI, FUND_SUBSCRIPTION_ADDRESS } from '~/abi';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function BuyToken() {
    const smartContractInfo = useSelector(smartContractInfoSelector);
    const [provider, setProvider] = useState(undefined);
    const navigate = useNavigate();
    useEffect(() => {
        const onLoad = async () => {
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            await setProvider(provider);
        };
        onLoad();
    }, []);

    const handleBuyNow = async () => {
        if (smartContractInfo.walletAddress) {
            if (smartContractInfo.balance > smartContractInfo.premiumPrice) {
                let ABI = ['function buy()'];
                let iface = new ethers.utils.Interface(ABI);
                let params = [
                    {
                        from: smartContractInfo.walletAddress,
                        to: FUND_SUBSCRIPTION_ADDRESS,
                        gas: '0x1FBD0', // 30400
                        gasPrice: '0x1BF08EB000', // 10000000000000
                        data: iface.encodeFunctionData('buy', []),
                    },
                ];

                await window.ethereum.request({ method: 'eth_sendTransaction', params }).then((res) => {
                    console.log({ res });
                    //     checkTransactionConfirm(txhash).then((result) => {
                    //        console.log({resultTransaction: result});
                    //    })
                });
            } else navigate('/swap-token');
        } else {
            alert('Plz connect first');
        }
    };

    return (
        <section className={cx('container-banner')}>
            <div className={cx('popup-buy')}>
                <h1>Start your plan following sharks: Balance: {smartContractInfo.balance} TI</h1>
                <h2>Yearly: {smartContractInfo.ratio}</h2>
                <div className={cx('popup-buy__content')}>
                    <div className={cx('box-content')}>
                        <h4>
                            Professional <span>(Save 85%)</span>
                        </h4>
                        <p>Provide rich data about Crypto Market. It's suitable for professional investors.</p>
                    </div>
                    <ul className={cx('nav-benefit')}>
                        <li>"Shark wallet" Crypto holder</li>
                        <li>"Shark wallet" Transaction history</li>
                        <li>"Shark wallet" Detail information</li>
                        <li>"Support (1-1)</li>
                    </ul>
                    <h5>
                        {smartContractInfo.premiumPrice} TI<p>/month</p>
                    </h5>
                    <div className={cx('btn-swap')}>
                        <Button linearGradientPrimary onClick={handleBuyNow}>
                            Buy now
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BuyToken;
