import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { smartContractInfoSelector } from '~/modules/user/auth/selectors';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './ConnectButton.module.scss';

const cx = classNames.bind(styles);

function ConnectButton(props) {
    const smartContractInfo = useSelector(smartContractInfoSelector)
    const { isConnected, signerAddress, getSigner, provider } = props

    const handleConnect = () => {
        getSigner(provider)
        console.log('ok')
    }

    return (
        <>
            {smartContractInfo.walletAddress || isConnected ? (
                <div className={cx('btn-connect__success')}>
                    <Button linearGradientPrimary>{smartContractInfo.walletAddress ? smartContractInfo.walletAddress.slice(0, 10) + '...' : signerAddress.slice(0, 10) + '...'}</Button>
                </div>
            ) : (
                <div className={cx('btn-connect')} onClick={handleConnect}>
                    <Button linearGradientPrimary>Connect Wallet</Button>
                </div>
            )}

        </>

    );
}

export default memo(ConnectButton);
