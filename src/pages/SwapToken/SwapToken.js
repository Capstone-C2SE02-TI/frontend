import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SwapToken.module.scss';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

const cx = classNames.bind(styles);

function SwapToken() {
    const [provider, setProvider] = useState(undefined)
    const [signer, setSigner] = useState(undefined)
    const [signerAddress, setSignerAddress] = useState(undefined)

    useEffect(() => {
        const onLoad = async () => {
            const provider = await new ethers.providers.Web3Provider(window.ethereum)
            setProvider(provider)
        }
        onLoad()
    }, []);

    const getSigner = async provider => {
        provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        setSigner(signer)
    }

    const isConnected = () => signer !== undefined
    const getWalletAddress = () => {
        signer.getAddress()
            .then(address => {
                setSignerAddress(address)

                //Connect weth and uni contract
            })
    }

    if (signer !== undefined) {
        getWalletAddress()
    }

    return (
        <section className={cx('container-swap')}>
            <div className={cx('swap-text')}>
                <h1>SWAP</h1>
            </div>
        </section>
    );
}

export default SwapToken;
