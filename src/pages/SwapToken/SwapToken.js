import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { ethers } from 'ethers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import styles from './SwapToken.module.scss';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import ConnectButton from './ConnectButton';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function SwapToken() {
    const [provider, setProvider] = useState(undefined)
    const [signer, setSigner] = useState(undefined)
    const [signerAddress, setSignerAddress] = useState("")
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

            <div className={cx('app-body')}>
                <div className={cx('swap-container')}>
                    <div className={cx('swap-header')}>
                        <span className={cx('swap-text__header')}>Swap</span>
                        <span className={cx('gear-container')}>
                            <ConnectButton
                                provider={provider}
                                isConnected={isConnected}
                                signerAddress={signerAddress}
                                getSigner={getSigner}
                            />
                        </span>
                    </div>
                    <div className={cx('swap-body')}>
                        <div className={cx('swap-body__text')}>
                            <p>You send</p>
                            <p>Blance: 40.00 ETH</p>
                        </div>
                        <div className={cx('swap-body__input')}>
                            <div>
                                <div className={cx('swap-body__logo')}>
                                    <Image width="30" height="30" src={images.etherium} alt="logo" />
                                    <p>ETH</p>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </div>
                                <input placeholder='0.0' />
                            </div>
                            <div className={cx('icon-arrow-down')}>
                                <FontAwesomeIcon icon={faArrowDown} />
                            </div>
                            <div>
                                <div className={cx('swap-body__logo')}>
                                    <Image width="30" height="30" src={images.logo} alt="logo" />
                                    <p>ETH</p>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </div>
                                <input placeholder='0.0' />
                            </div>
                        </div>
                        <div className={cx('swap-footer')}>
                            <Button linearGradientPrimary>Swap now</Button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default SwapToken;
