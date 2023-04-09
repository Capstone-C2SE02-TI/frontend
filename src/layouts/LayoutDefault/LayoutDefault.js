import classNames from 'classnames/bind';
import styles from './LayoutDefault.module.scss';
import SideBar from './components/SideBar';
import { SidebarSelector } from '~/modules/HomeDashboard/selector';
import { useSelector, useDispatch } from 'react-redux';
import { AvatarIcon, DolarIcon, MenuIcon, DiscoverIcon } from '~/components/Icons';

import HomeDashboardSlice from '~/modules/HomeDashboard/homeDashboardSlice';
import Tippy from '@tippyjs/react';
import { fetchGetAllUser, saveSmartContractInfo } from '~/modules/user/auth/authSlice';
import { userInfoSelector } from '~/modules/user/auth/selectors';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import MenuProfile from './components/MenuProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { setInformationMetaMask } from '~/modules/MetaMask/metaMaskSlice';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';
import ConnectWallet from './components/ConnectWallet/ConnectWallet';
import { useCallback } from 'react';
const cx = classNames.bind(styles);
const userMenu = [
    {
        icon: <AvatarIcon />,
        title: 'Your Profile',
    },
    {
        icon: <DiscoverIcon />,
        title: 'Swap Token',
    },
    {
        icon: <DolarIcon />,
        title: 'Upgrade Premium',
    },
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Portfolio',
    },
];

function LayoutDefault({ children }) {
    const [resize, setResize] = useState(false);
    const [expiredTime, setExpiredTime] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const statusSidebarSelector = useSelector(SidebarSelector);
    const userInfo = useSelector(userInfoSelector);
    const walletAddress = useSelector(getAddressMetaMask);

    const sidebarClassName = cx({
        'sidebar-wrapper': true,
        'hide-sidebar': resize || !statusSidebarSelector,
    });

    const containerClassName = cx('container', {
        mr: resize || !statusSidebarSelector,
    });
    const toggleMenu = () => {
        dispatch(HomeDashboardSlice.actions.actionSidebar());
    };

    useEffect(() => {
        dispatch(fetchGetAllUser())
    }, [dispatch])

    const [withCurrent, setWidthCurrent] = useState(window.innerWidth);
    useEffect(() => {
        if (withCurrent < 1200) {
            setWidthCurrent(withCurrent);
            setResize(true);
        }

        const handleResize = (e) => {
            if (window.innerWidth < 1200) {
                setResize(true);
            } else setResize(false);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [withCurrent]);

    const defaultPropsTippy = {
        animateFill: false,
        animation: 'scale',
        interactive: true,
        interactiveBorder: 10,
        theme: 'light',
        placement: 'bottom',
        delay: [1, 200],
    };

    const handleOnChange = (menuItem) => {
        switch (menuItem.title) {
            case 'Your Profile':
                navigate('/profile');
                break;
            case 'Upgrade Premium':
                navigate('/upgrade');
                break;
            case 'Swap Token':
                navigate('/swap-token');
                break;
            case 'Portfolio':
                navigate('/portfolio-shark-follow');
                break;
            default:
                break;
        }
    };

    const handleDisconnect = () => {
        setIsConnecting(false);
        dispatch(saveSmartContractInfo({}));
        dispatch(setInformationMetaMask(''));
    };

    const handleSetIsConnecting = useCallback((status) => {
        setIsConnecting(status);
    }, []);

    const handleSetExpiredTime = useCallback((expiredTime) => {
        setExpiredTime(expiredTime);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={sidebarClassName}>
                <SideBar />
            </div>
            <div className={containerClassName}>
                <div className={cx('header-menu')}>
                    <div className={cx('header-menu-tippy')}>
                        <Tippy content="Menu" {...defaultPropsTippy}>
                            <button onClick={toggleMenu} className={cx('icon-menu')}>
                                <MenuIcon />
                            </button>
                        </Tippy>
                    </div>

                    {
                        <div className={cx('user-profile__right')}>
                            <ConnectWallet
                                handleSetExpiredTime={handleSetExpiredTime}
                                handleSetIsConnecting={handleSetIsConnecting}
                                isConnecting={isConnecting}
                            />
                            {
                                <MenuProfile
                                    items={userMenu}
                                    onChange={handleOnChange}
                                    userInfo={userInfo}
                                    limmitedAccountTime={expiredTime}
                                    handleDisconnect={handleDisconnect}
                                >
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
                                        <div className={cx('user-profile__text')}>
                                            <p>{walletAddress ? walletAddress.slice(0, 10) + '...' : '...'}</p>
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 24 24"
                                                className="text-gray-400 text-14"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </MenuProfile>
                            }
                        </div>
                    }
                </div>
                {children}
            </div>
        </div>
    );
}

export default LayoutDefault;
