import React, { memo, useState } from 'react';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './ConnectButton.module.scss';

const cx = classNames.bind(styles);

function ConnectButton(props) {
    const { isConnected, signerAddress, getSigner, provider } = props
    const displayAddress = signerAddress?.slice(0, 10) + '...'

    return (
        <>
            {isConnected ? (
                <div className={cx('btn-connect__success')}>
                    <Button linearGradientPrimary>{displayAddress}</Button>
                </div>
            ) : (
                <div
                    className={cx('btn-connect')}
                    onClick={() => getSigner(provider)}
                >
                    <Button linearGradientPrimary>Connect Wallet</Button>
                </div>
            )}

        </>

    );
}

export default memo(ConnectButton);
