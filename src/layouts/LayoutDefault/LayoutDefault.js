import classNames from 'classnames/bind';
import styles from './LayoutDefault.module.scss';
import SideBar from './components/SideBar';
import { SidebarSelector } from '~/modules/HomeDashboard/selector';
import { useSelector } from 'react-redux';
import { AvatarIcon, DolarIcon, MenuIcon } from '~/components/Icons';
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
import MenuProfile from './components/MenuProfile';

const cx = classNames.bind(styles);

const userMenu = [
    {
        icon: <AvatarIcon />,
        title: 'Your Profile',
    },
    {
        icon: <DolarIcon />,
        title: 'Upgrade Premium',
    },
];


function LayoutDefault({ children }) {
    const statusSidebarSelector = useSelector(SidebarSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = JSON.parse(localStorage.getItem('userInfo')) || '';
    const userInfo = useSelector(userInfoSelector);

    const [resize, setResize] = useState(false)
    useEffect(() => {
        if (userId) {
            dispatch(fetchGetUserInfo(userId));
        }
    }, [dispatch, userId]);

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
        const handleResize = (e) => {
            if (window.innerWidth < 1200) {
               setResize(true)
            }
            else setResize(false)
        };

        window.addEventListener('resize', handleResize);

        return () => 
             window.removeEventListener('resize', handleResize);
        
    }, []);



    const defaultPropsTippy = {
        animateFill: false,
        animation: 'scale',
        interactive: true,
        interactiveBorder: 10,
        theme: 'light',
        placement: 'bottom',
        delay: [1, 200],
    };

    //

    const connectWallet = () => {
        navigate('/buy-token');
    };

  
    const handleOnChange = (menuItem) => {
        console.log('menuItem', menuItem);
        switch (menuItem.title) {
            case 'Your Profile':
                navigate('/profile');
                break;
            case 'Upgrade Premium':
                  navigate('/buy-token');
                break;
            default:
                break;
        }
      
    };
    return (
        <div className={cx('wrapper')}>
            <div className={sidebarClassName}>
                <SideBar />
            </div>
            <div className={containerClassName}>
                <div className={cx('header-menu')}>
                    <Tippy content="Menu" {...defaultPropsTippy}>
                        <button onClick={toggleMenu} className={cx('icon-menu')}>
                            <MenuIcon />
                        </button>
                    </Tippy>
                    <h3 onClick={connectWallet}>Upgrade Premium</h3>
                    {userId ? (
                        <div className={cx('user-profile__right')}>
                            <MenuProfile items={userMenu} onChange={handleOnChange}>
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
                                        <span>Hi, </span>
                                        <p>{userInfo.fullName || userInfo.username || 'Investor'}</p>
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            stroke-width="0"
                                            viewBox="0 0 24 24"
                                            class="text-gray-400 text-14"
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
                        </div>
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
