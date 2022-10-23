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
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import  images  from '~/assets/images';

const cx = classNames.bind(styles);

function LayoutDefault({ children }) {
    const statusSidebarSelector = useSelector(SidebarSelector);
    const dispatch = useDispatch();
 
    const { userId } = JSON.parse(localStorage.getItem('userInfo')) || 5;
    const userInfo = useSelector(userInfoSelector);
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
                    {userInfo.username && (
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
                                    <span>Hi, {userInfo.username || 'Investor'}</span>
                                    <p>{userInfo.email || 'Investor'}</p>
                                </div>
                            </div>
                        </Tippy>
                    )}
                </div>
                {children}
            </div>
        </div>
    );
}

export default LayoutDefault;
