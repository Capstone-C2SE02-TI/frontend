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
import Modal from '~/components/Modal';

const cx = classNames.bind(styles);

function MenuProfile({ children, items = [], onChange, hideOnClick = false, userInfo }) {
    const [history, setHistory] = useState([{ data: items }]);

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
                navigate('/sign-in ');
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
                                src={userInfo.avatar ||
                                    'data:image/jpeg;base64,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'
                                }
                                alt=""
                                className={cx('user-avatar')}
                            />
                            <div>
                                <p className={cx('user-name')}> {userInfo.username} </p>
                                <p className={cx('user-role')}> User </p>
                                <p className={cx('user-email')}> {userInfo.email} </p>
                            </div>
                        </div>
                    </div>
                    {history.length > 1 && <Header title={current.title} onBack={handleBackMenu}></Header>}
                    <div className={cx('menu-body')}> {renderItems()}</div>
                    <Button style={{ width: '100%', marginTop: '20px' }} primary onClick={openModal}>
                        Sign Out
                    </Button>
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
        // visible
        >
            {children}
        </Tippy>
    );
}

export default MenuProfile;
