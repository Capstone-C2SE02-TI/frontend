import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import Share from './components/share';
import { fetchGetUserInfo } from '~/modules/user/auth/authSlice';
import { profileSelector } from '~/modules/SharkFollowed/selector';
import { fetchProfile } from '~/modules/SharkFollowed/sharkFollowedSlice';
import ProfileItem from './components/profileItem';

const cx = classNames.bind(styles);

function Profile() {
    const dispatch = useDispatch();
    const walletAddress = useSelector(getAddressMetaMask);
    const userWalletAddress = localStorage.getItem('eth_address');
    const sharkFolloweds = useSelector(profileSelector);

    useEffect(() => {
        dispatch(fetchProfile(userWalletAddress));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, userWalletAddress]);

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
            <div className={cx('profile-area')}>
                <h4>Token holders chart</h4>
            </div>
            <table className={cx('portfolio-table')}>
                <thead>
                    <tr>
                        <th className={cx('portfolio-th')}>Shark</th>
                        <th className={cx('portfolio-th')}>Total assets</th>
                        <th className={cx('portfolio-th')}>Total transaction</th>
                        <th className={cx('portfolio-th')}>Address</th>
                        <th className={cx('portfolio-th')}>Actual growth</th>
                    </tr>
                </thead>
                <tbody>
                    {sharkFolloweds
                        .slice()
                        .sort((prev, next) => prev.sharkId - next.sharkId)
                        .map((sharkFollowed, index) => (
                            <ProfileItem
                                key={sharkFollowed.sharkId}
                                dataSharkFollowed={sharkFollowed}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    );


}

export default Profile;
