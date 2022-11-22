import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { walletAddressSelector } from '~/modules/user/auth/selectors';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './ConnectButton.module.scss';

const cx = classNames.bind(styles);

function ConnectButton(props) {
    const walletAddress = useSelector(walletAddressSelector)


    const { isConnected, signerAddress, getSigner, provider } = props
    const displayAddress = signerAddress.slice(0, 10) + '...'

    const handleConnect = () => {
        getSigner(provider)
    }

    return (
        <>
            {walletAddress || isConnected ? (
                <div className={cx('btn-connect__success')}>
                    <Button linearGradientPrimary>{walletAddress ? walletAddress.slice(0, 10) + '...' : displayAddress}</Button>
                </div>
            ) : (
                <div
                    className={cx('btn-connect')}
                    onClick={handleConnect}
                >
                    <Button linearGradientPrimary>Connect Wallet</Button>
                </div>
            )}

        </>

    );
}

export default memo(ConnectButton);
