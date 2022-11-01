import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './ConnectButton.module.scss';

const cx = classNames.bind(styles);

function ConnectButton(props) {
    const { isConnected, signerAddress, getSigner, provider } = props
    const displayAddress = `${signerAddress}`

    return (
        <>
            {isConnected() ? (
                <div className={cx('btn-connect__success')}>
                    <Button white>{displayAddress}</Button>
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

export default ConnectButton;
