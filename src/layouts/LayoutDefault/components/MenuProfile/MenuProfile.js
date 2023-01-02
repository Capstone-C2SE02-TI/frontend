import classNames from 'classnames/bind';
import styles from './MenuProfile.module.scss';
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import Image from '~/components/Image/Image';
import Button from '~/components/Button';
import { authService } from '~/services';
import { useNavigate } from 'react-router-dom';
import ModalConfirm from '../ModalConfirm';
import ModalNotify from '~/components/ModalNotify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { expiredTimeSelector } from '~/modules/user/auth/selectors';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function MenuProfile({ children, limmitedAccountTime, items = [], onChange, hideOnClick = false, userInfo }) {
    const [history, setHistory] = useState([{ data: items }]);
    const [openModalSucceed, setOpenModalSucceed] = useState(false);
    const expiredTime = useSelector(expiredTimeSelector);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const hasParent = !!item.children;

            return (
                <MenuItem
                    data={item}
                    key={index}
                    onClick={() => {
                        if (hasParent) {
                            setHistory((pre) => [...pre, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBackMenu = () => {
        setHistory((pre) => pre.slice(0, history.length - 1));
    };

    const navigate = useNavigate();

    const [modalIsOpen, setIsOpen] = useState(false);

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
                localStorage.removeItem('userInfo');
                localStorage.removeItem('metamaskConnect');
                setOpenModalSucceed(true);


            }
        };
        fetchApi();
    };

    const renderResult = (attrs) => {
        return (
            <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                <PopperWrapper className={cx('menu-popper')}>
                    <div className={cx('menu-profile-detail')}>
                        <div className="d-flex justify-content-center">
                            <p className={cx('user-heading')}>User Profile</p>
                        </div>
                        <div className="d-flex justify-content-between" style={{ marginTop: '30px' }}>
                            <Image
                                src={
                                    userInfo.avatar || images.userAvatar
                                }
                                alt=""
                                className={cx('user-avatar')}
                            />
                            <div>
                                <p className={cx('user-name')}> {userInfo.username} </p>
                                <p className={cx('user-role')}> Expried Time Premium</p>
                                <p className={cx('user-email')}> {expiredTime} </p>
                            </div>
                        </div>
                    </div>
                    {history.length > 1 && <Header title={current.title} onBack={handleBackMenu}></Header>}
                    <div className={cx('menu-body')}> {renderItems()}</div>
                    <Button style={{ width: '100%', marginTop: '20px' }} primary onClick={openModal}>
                        Sign Out
                    </Button>
                    <ModalConfirm
                        title="Logout"
                        description="Are you sure you want to log out?"
                        modalIsOpen={modalIsOpen}
                        closeModal={closeModal}
                        onHandleAction={handleLogOut}
                    />
                    {openModalSucceed && (
                        <ModalNotify
                            typeSuccess={true}
                            icon={<FontAwesomeIcon icon={faCheck} />}
                            isOpen={openModalSucceed}
                            title={'Success'}
                            description={'Sign out successfully'}
                            onRequestClose={() => {
                                setOpenModalSucceed(false);
                                navigate('/sign-in');
                            }}
                        />
                    )}
                </PopperWrapper>
            </div>
        );
    };

    const handleResetToFirstPage = () => setHistory((pre) => pre.slice(0, 1));

    return (
        <Tippy
            delay={[0, 500]}
            offset={[13, 12]}
            interactive
            placement="bottom-end"
            hideOnClick={hideOnClick}
            render={renderResult}
            onHide={handleResetToFirstPage}
            arrow={true}
        // visible
        >
            {children}
        </Tippy>
    );
}

export default MenuProfile;
