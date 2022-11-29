import React, { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './ConnectButton.module.scss';

const cx = classNames.bind(styles);

function ConnectButton(props) {
    const { isConnected, getSigner, provider } = props;

    const handleConnect = () => {
        getSigner(provider);
    };

    const renderConnecting = () => {
        return isConnected ? (
            <div className={cx('loader')}>
                <div className={cx('scanner')}>
                    <span>Connecting...</span>
                </div>
            </div>
        ) : (
            <div className={cx('btn-connect')} onClick={handleConnect}>
                <button className={cx('btn-connection')}>Connect Wallet</button>
            </div>
        );
    };

    return <>{renderConnecting()}</>;
}

export default memo(ConnectButton);
