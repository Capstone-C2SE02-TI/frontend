import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { ethers } from 'ethers';
import styles from './SwapToken.module.scss';
import { GearFill } from 'react-bootstrap-icons';
import ConnectButton from './ConnectButton';

const cx = classNames.bind(styles);

function SwapToken() {
    const [provider, setProvider] = useState(undefined)
    const [signer, setSigner] = useState(undefined)
    const [signerAddress, setSignerAddress] = useState(undefined)
    const [slippageAmount, setSlippageAmount] = useState(undefined)
    const [deadlineMinutes, setDeadlineMinutes] = useState(undefined)
    const [showModal, setShowModal] = useState(undefined)
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
            <ConnectButton
                provider={provider}
                isConnected={isConnected}
                signerAddress={signerAddress}
                getSigner={getSigner}
            />
            <div className={cx('app-body')}>
                <div className={cx('swap-container')}>
                    <div className={cx('swap-header')}>
                        <span className={cx('swap-text__header')}>Swap</span>
                        <span className={cx('gearContainer')} onClick={() => setShowModal(true)}>
                            <GearFill />
                        </span>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default SwapToken;
