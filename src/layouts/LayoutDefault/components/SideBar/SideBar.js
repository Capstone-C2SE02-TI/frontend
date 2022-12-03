import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import { HomeIcon, DiscoverIcon, AnalyzeIcon, SupportIcon, ReportIcon, SettingIcon } from '~/components/Icons';
import MenuItem from './Menu/MenuItem';
import Menu from './Menu';
import styles from './SideBar.module.scss';

import configs from '~/configs';

const cx = classNames.bind(styles);


const MENU_SIDEBAR = [
    {
        title: 'Home',
        icon: <HomeIcon />,
        to: configs.routes.homeDashboard,
        isPremium: false,
    },
    {
        title: 'Discover',
        icon: <DiscoverIcon />,
        to: configs.routes.discover,
        isPremium: false,
    },
    {
        title: 'Analyze',
        icon: <AnalyzeIcon />,
        to: configs.routes.analyze,
        isPremium: true,
    },
    {
        title: 'Trading',
        icon: <SupportIcon />,
        to: configs.routes.transactionShark,
        isPremium: true,
    },
    {
        title: 'Gain & Loss',
        icon: <ReportIcon />,
        to: configs.routes.gainLoss,
        isPremium: true,
    },
];

function SideBar() {
    return (
        <React.Fragment>
            <div className={cx('sidebar-logo')}>
                <Link to={'/home-dashboard'}>
                    {' '}
                    <img src={images.logo} alt={'logo'} />
                </Link>
            </div>
            <Menu>
                {MENU_SIDEBAR.map((menu, index) => (
                    <MenuItem key={index} icon={menu.icon} title={menu.title} to={menu.to} isPremium={menu.isPremium} />
                ))}

                {/*  */}
            </Menu>

            <div className={cx('sidebar-guide')}>
                <button className={cx('sidebar-guide__btn')}>Guide</button>
            </div>

            <div className={cx('sidebar-copy-right')}>
                <span>@Copyright by TI team</span>
            </div>
        </React.Fragment>
    );
}

export default SideBar;
