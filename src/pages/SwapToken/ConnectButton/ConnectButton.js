import React, { memo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ConnectButton.module.scss';
import Modal from '~/components/Modal';
import Button from '~/components/Button';
import { CaretDownIcon } from '~/components/Icons';
import qrMetamask from '~/assets/images/qr-metamask.png'

const cx = classNames.bind(styles);

function ConnectButton(props) {
    const { isConnected, getSigner, provider, setIsNotExistMeta, isNotExistMeta } = props;
    const [isOpenModalMetamask, setIsOpenModalMetamask] = useState(false);

    const openModal = () => {
        setIsOpenModalMetamask(true);
    };

    const handleConnect = () => {
        if (typeof window.ethereum !== 'undefined') {
            getSigner(provider);
            setIsNotExistMeta(false);
            console.log('MetaMask is installed!');
        } else {
            console.log('MetaMask is not installed.');
            setIsNotExistMeta(true);
        }
    };

    const renderConnecting = () => {
        return isConnected ? (
            <div className={cx('loader')}>
                <div className={cx('scanner')}>
                    <span>Connecting...</span>
                </div>
            </div>
        ) : (
            <div className={cx('btn-connect')} onClick={openModal}>
                <button className={cx('btn-connection')}>Connect Wallet</button>
            </div>
        );
    };

    return (
        <>
            {renderConnecting()}

            {
                <Modal
                    className={cx('modal-request')}
                    isOpen={isOpenModalMetamask}
                    onRequestClose={() => setIsOpenModalMetamask(false)}
                >
                    <div className={cx('modal-metamask')}>
                        <div className={cx('modal-metamask-options')}>
                            <div>
                                <h3>Connect Wallet</h3>
                            </div>
                            <div>
                                <p>
                                    Start by connecting with one of the wallets below. Be sure to store your private
                                    keys or seed phrase securely. Never share them with anyone.
                                </p>
                            </div>
                            <div onClick={handleConnect}>
                                <img src="https://pancakeswap.finance/images/wallets/metamask.png" alt="Metamask" />
                            </div>
                        </div>
                        <div className={cx('modal-metamask-guide')}>
                            {isNotExistMeta ? (
                                <div>
                                    <h3>Metamask is not installed</h3>
                                    
                                    <div>
                                        <div className={cx('qr-code')}>
                                            <img src={qrMetamask}/>
                                        </div>
                                       <div>
                                       <Button
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            primary
                                            href="https://metamask.io/download/"
                                        >
                                            Install
                                        </Button>
                                       </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p>Haven’t got a wallet yet?</p>
                                    <div>
                                        <img
                                            src="	https://cdn.pancakeswap.com/wallets/wallet_intro.png"
                                            alt="Metamask"
                                        />
                                        <div>
                                            <Button
                                                rel="noopener noreferrer"
                                                target="_blank"
                                                primary
                                                href="https://docs.pancakeswap.finance/get-started/wallet-guide"
                                                rightIcon={<CaretDownIcon className={cx('detail-tippy-caret-down')} />}
                                            >
                                                Learn how to connect
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Modal>
            }
        </>
    );
}

export default memo(ConnectButton);
