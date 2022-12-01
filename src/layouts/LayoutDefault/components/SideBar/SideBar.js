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
                <MenuItem icon={<HomeIcon />} title="Home" to={configs.routes.homeDashboard}  />
                <MenuItem icon={<DiscoverIcon />} title="Discover" to={configs.routes.discover} />
                <MenuItem icon={<AnalyzeIcon />} title="Analyze" to={configs.routes.analyze} />
                <MenuItem icon={<SupportIcon />} title="Trading" to={configs.routes.transactionShark} />
                <MenuItem icon={<ReportIcon />} title="Gain & Loss" to={configs.routes.gainLoss} />
                <MenuItem icon={<SettingIcon />} title="Setting" to="/setting" />
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
