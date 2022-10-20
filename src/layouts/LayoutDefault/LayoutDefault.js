import classNames from 'classnames/bind';
import styles from './LayoutDefault.module.scss';
import SideBar from './components/SideBar';
import { SidebarSelector } from '~/modules/HomeDashboard/selector';
import { useSelector } from 'react-redux';
import { MenuIcon } from '~/components/Icons';
import { useDispatch } from 'react-redux';
import HomeDashboardSlice from '~/modules/HomeDashboard/homeDashboardSlice';
import Tippy from '@tippyjs/react';
import  images  from '~/assets/images';
import Portfolio from '~/pages/HomeDashboard/components/Portfolio/Portfolio';

const cx = classNames.bind(styles);

function LayoutDefault({ children }) {
    const statusSidebarSelector = useSelector(SidebarSelector);

    const sidebarClassName = cx({
        'sidebar-wrapper': true,
        'hide-sidebar': !statusSidebarSelector,
    });
    const dispatch = useDispatch();

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
                    {localStorage.getItem('isLoggedIn') && (
                        <Tippy content={<Portfolio />} {...defaultPropsTippy}>
                            <div className={cx('user-profile')}>
                                <img src={images.userAvatar} alt="avatar" />
                                <div>
                                    <span>Andrew</span>
                                    <p>Investor</p>
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
