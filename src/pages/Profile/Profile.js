import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import Share from './components/share';
import { fetchGetUserInfo } from '~/modules/user/auth/authSlice';

const cx = classNames.bind(styles);

function Profile() {
    const dispatch = useDispatch();
    const walletAddress = useSelector(getAddressMetaMask);
    const userWalletAddress = localStorage.getItem('eth_address');

    useEffect(() => {
        dispatch(fetchGetUserInfo(userWalletAddress));
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header_profile')}>
                <h1>Portfolio shark followed</h1>
                <Share />
            </div>
            <Image width="80" className={cx('header-image')} src={images.avatarPort} alt="avatar-default-port" />
            <div className={cx('profile-name')}>
                <h5>{walletAddress}</h5>
                <Image width="20" className={cx('copy-image')} src={images.copy} alt="copy"
                    onClick={() => {
                        navigator.clipboard.writeText(walletAddress);
                    }}
                />
            </div>
        </div>
    );


}

export default Profile;
