import classNames from 'classnames/bind';
import styles from './LayoutDefault.module.scss';
import SideBar from './components/SideBar';
import { SidebarSelector } from '~/modules/HomeDashboard/selector';
import { useSelector } from 'react-redux';
import { MenuIcon } from '~/components/Icons';
import { useDispatch } from 'react-redux';
import HomeDashboardSlice from '~/modules/HomeDashboard/homeDashboardSlice';
import Tippy from '@tippyjs/react';
import Portfolio from '~/pages/HomeDashboard/components/Portfolio/Portfolio';
import { fetchGetUserInfo } from '~/modules/user/auth/authSlice';
import { userInfoSelector } from '~/modules/user/auth/selectors';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import images from '~/assets/images';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

const cx = classNames.bind(styles);

function LayoutDefault({ children }) {
    const statusSidebarSelector = useSelector(SidebarSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [walletAddress, setWalletAddress] = useState("");

    const { userId } = JSON.parse(localStorage.getItem('userInfo')) || '';
    const userInfo = useSelector(userInfoSelector);
    console.log('userId', userId);
    useEffect(() => {
        if (userId) {
            dispatch(fetchGetUserInfo(userId));
        }
    }, [dispatch, userId]);

    const sidebarClassName = cx({
        'sidebar-wrapper': true,
        'hide-sidebar': !statusSidebarSelector,
    });

    const toggleMenu = () => {
        dispatch(HomeDashboardSlice.actions.actionSidebar());
    };

    const defaultPropsTippy = {
        animateFill: false,
        animation: 'scale',
        interactive: true,
        interactiveBorder: 10,
        theme: 'light',
        placement: 'bottom',
        delay: [1, 200],
    };

    const connectWallet = () => {
        navigate('/buy-token')
    }

    //
    return (
        <div className={cx('wrapper')}>
            <div className={sidebarClassName}>
                <div className={cx('sidebar')}>
                    <SideBar />
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('header-menu')}>
                    <Tippy content="Menu" {...defaultPropsTippy}>
                        <button onClick={toggleMenu} className={cx('icon-menu')}>
                            <MenuIcon />
                        </button>
                    </Tippy>
                    <Button primary onClick={connectWallet}>Upgrade Premium</Button>
                    {userId ? (
                        <Tippy content={<Portfolio data={userInfo} />} {...defaultPropsTippy}>
                            <div className={cx('user-profile')}>
                                {userInfo ? (
                                    <img
                                        src={userInfo.avatar || images.userAvatar}
                                        alt="avatar"
                                        width={' 50px '}
                                        className={cx('user-profile-avatar')}
                                    />
                                ) : (
                                    <Skeleton circle width={50} height={50} />
                                )}
                                <div>
                                    <span>Hi, {userInfo.fullName || userInfo.username || 'Investor'}</span>
                                    <p>{userInfo.email || 'Investor'}</p>
                                    <p>{walletAddress || "Default"}</p>
                                </div>
                            </div>
                        </Tippy>
                    ) : (
                        <div>
                            <Button outline onClick={() => navigate('/sign-in')}>
                                Sign In
                            </Button>
                            <Button primary onClick={() => navigate('/sign-up')}>
                                Sign Up
                            </Button>
                        </div>
                    )}
                </div>
                {children}
            </div>
        </div>
    );
}

export default LayoutDefault;
