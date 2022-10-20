import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate, Link } from 'react-router-dom';
import images from '~/assets/images';
import { HomeIcon, DiscoverIcon, AnalyzeIcon, SupportIcon, ReportIcon, SettingIcon } from '~/components/Icons';
import MenuItem from './Menu/MenuItem';
import Menu from './Menu';
import styles from './SideBar.module.scss';
import Modal from '~/components/Modal';
import { authService } from '~/services';

const cx = classNames.bind(styles);

function SideBar() {
    const [modalIsOpen, setIsOpen] = useState(false);
     const navigate = useNavigate();

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleLogOut = () => {
         const fetchApi = async () => {        
             const response = await authService.signOut();
             if (response.message === 'successfully') {
                 localStorage.removeItem('isLoggedIn');
                     navigate('/sign-in ');                
             }
         };
         fetchApi();
    }
    return (
        <React.Fragment>
            <div className={cx('sidebar-logo')}>
                <Link to={'/home-dashboard'}>
                    {' '}
                    <img src={images.logo} alt={'logo'} />
                </Link>
            </div>
            <Menu>
                <MenuItem icon={<HomeIcon />} title="Home" to="/home-dashboard" />
                <MenuItem icon={<DiscoverIcon />} title="Discover" to="/discover" />
                <MenuItem icon={<AnalyzeIcon />} title="Analyze" to="/analyze" />
                <MenuItem icon={<SupportIcon />} title="Support" to="/support" />
                <MenuItem icon={<ReportIcon />} title="Reports" to="/report" />
                <MenuItem icon={<SettingIcon />} title="Setting" to="/setting" />
                {/*  */}
            </Menu>

            <div className={cx('sidebar-guide')}>
                <button className={cx('sidebar-guide__btn')} onClick={openModal}>
                    Sign Out
                </button>
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <div className={cx('logout-modal')}>
                    <span className={cx('logout-modal__title')}>Sign out from Status?</span>
                    <div className={cx('logout-modal__options')}>
                        <button className={cx('logout-modal__options__degree')} onClick={handleLogOut}>
                            Yes, sign out
                        </button>
                        <button className={cx('logout-modal__options__cancel')} onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>

            <div className={cx('sidebar-copy-right')}>
                <span>@Copyright by TI team</span>
            </div>
        </React.Fragment>
    );
}

export default SideBar;
