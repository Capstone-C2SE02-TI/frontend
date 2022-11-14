import React from 'react';
import classNames from 'classnames/bind';
import styles from './BuyToken.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { ethers } from 'ethers';
import Button from '~/components/Button';
// import { logWithIn } from '@syncfusion/ej2-react-charts';
import ConnectButton from '../SwapToken/ConnectButton';
import {
    DEX_ABI,
    FUND_SUBSCRIPTION_ABI,
    FUND_SUBSCRIPTION_ADDRESS,
    TI_ABI,
    TI_SMART_CONTRACT_ADDRESS,
    DEX_SMART_CONTRACT_ADDRESS,
} from '~/abi';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function BuyToken() {
    const [provider, setProvider] = useState(undefined);
    const [balance, setBalance] = useState('');
    const [ratio, setRatio] = useState('');
    const [signer, setSigner] = useState('');
    const [signerAddress, setSignerAddress] = useState('');
    const [ethValues, setEthValues] = useState(0);
    const [ethChange, setEthChange] = useState(0);
    const [statusSwapToken, setStatusSwapToken] = useState('');
    const [premiumPrice, setPremiumPrice] = useState('');

    useEffect(() => {
        const onLoad = async () => {
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            await setProvider(provider);
        };
        onLoad();
    }, []);

    useEffect(() => {
        const onLoad = async () => {
            const contractPremium = await new ethers.Contract(
                FUND_SUBSCRIPTION_ADDRESS,
                FUND_SUBSCRIPTION_ABI,
                provider,
            );

            const isPremiumUser = await contractPremium.isPremiumUser(signerAddress);
            console.log({ isPremiumUser });


            if (isPremiumUser) {
                toast.success('User is premium va k can mua')
            }
            else {
                toast.success('User is not premium  va mua dum t cai');

            }
        };
        onLoad();
    }, [signerAddress]);
    const loadBalance = async () => {
        const contractTi = await new ethers.Contract(TI_SMART_CONTRACT_ADDRESS, TI_ABI, provider);
        const balance = await contractTi.balanceOf(signerAddress);
        let convertBalance = await balance.toHexString(16);
        setBalance(parseInt(convertBalance, 16));
    };

    const loadRatio = async () => {
        const contractSwap = await new ethers.Contract(DEX_SMART_CONTRACT_ADDRESS, DEX_ABI, provider);
        const balance = await contractSwap.price();
        let convertBalance = balance.toHexString(16);
        setRatio(parseInt(convertBalance, 16) / 10 ** 18);
    };

    const loadPremiumPrice = async () => {
        const contractPremium = await new ethers.Contract(FUND_SUBSCRIPTION_ADDRESS, FUND_SUBSCRIPTION_ABI, provider);
        const premiumPrice = await contractPremium.premiumPrice();
        let convertBalance = premiumPrice.toHexString(16);
        setPremiumPrice(parseInt(convertBalance, 16));
    };

    const getSigner = async (provider) => {
        provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        setSigner(signer);
    };

    const getWalletAddress = () => {
        signer.getAddress().then((address) => {
            setSignerAddress(address);
        });
    };

    //side Effect handle get address
    useEffect(() => {
        if (signer) getWalletAddress();
    }, [signer]);

    //side Effect handle loadBalance and loadRatio when have signer address
    useEffect(() => {
        if (signerAddress) {
            //show balance in wallet
            loadBalance();

            loadPremiumPrice();
            //have ratio to convert eth to TI
            loadRatio();
        }
    }, [signerAddress]);

    const handleBuyNow = async () => {
        let ABI = ['function buy()'];
        let iface = new ethers.utils.Interface(ABI);
        let params = [
            {
                from: signerAddress,
                to: FUND_SUBSCRIPTION_ADDRESS,
                gas: '0x1FBD0', // 30400
                gasPrice: '0x1BF08EB000', // 10000000000000
                data: iface.encodeFunctionData('buy', []),
            },
        ];

        const result = await window.ethereum.request({ method: 'eth_sendTransaction', params }).then((res) => {
            console.log({ res });
            //     checkTransactionConfirm(txhash).then((result) => {
            //        console.log({resultTransaction: result});
            //    })
        });
    };

    const handleChange = (e) => {
        setEthValues(e.target.value);
        setEthChange(e.target.value / ratio);
    };
    return (
        <section className={cx('container-banner')}>
            <div className={cx('popup-buy')}>
                <h1>Start your plan following sharks: balance {balance}</h1>
                <h2>Yearly</h2>
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
                        {premiumPrice} TI<p>/month</p>
                    </h5>
                    <div className={cx('btn-swap')}>
                        <button onClick={handleBuyNow}>Buy now</button>
                        <ConnectButton
                            provider={provider}
                            isConnected={!!signer}
                            signerAddress={signerAddress}
                            getSigner={getSigner}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BuyToken;
