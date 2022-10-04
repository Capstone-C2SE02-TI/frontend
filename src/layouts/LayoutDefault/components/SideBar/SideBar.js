import  React  from 'react';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { HomeIcon, DiscoverIcon, AnalyzeIcon, SupportIcon, ReportIcon, SettingIcon } from '~/components/Icons';
import MenuItem from './Menu/MenuItem';
import Menu from './Menu';
import styles from './SideBar.module.scss';;

const cx = classNames.bind(styles);

function SideBar() {
    return (
        <React.Fragment>
            <div className={cx('sidebar-logo')}>
                <img src={images.logo} alt={'logo'} />
            </div>
            <Menu>
                <MenuItem icon={<HomeIcon />} title="Home" to="/home-dashboard" />
                <MenuItem icon={<DiscoverIcon />} title="Discover" to="/discover" />
                <MenuItem icon={<AnalyzeIcon />} title="Analyze" to="/analyze/tokens/:token" />
                <MenuItem icon={<SupportIcon />} title="Support" to="/support" />
                <MenuItem icon={<ReportIcon />} title="Reports" to="/report" />
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
