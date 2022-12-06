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
                                    userInfo.avatar ||
                                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAO/SURBVHgBzVhddtJQEJ65oW+eGndAVyA+9w92UN+txRUUVkBZQWEFgvX42nYFRDh9FldgdmCs+mLJHWeSUEObn3tp6ul3TkohQ+7HnTsz3wzCmnjzbNZERQ2FuA9ADQB0+WM3uR3w5ctFpL9qrbyPv3Y9WANoY9x2J67WtWNE6KTImC7lA4GH6qY/Clq+8bdMjIQYaacHiB2oAoQjU6KlBN9uzmTHTsB6x0qX9rXW/bOfe6NCq6KbR5vT08p2LQ+Eg/H1TjfvdibByKVUO+d/m/B/4CEuXrPLg7s3VJa1HTkK+Aj0+WqNf+yiXIjqFRGNwRzNZM17uLeDdm4lHzFs5R129kSdyJnwMnUwQYa7VwgeutO2InwPhmC3bJVFYkyy9gUMg0wTdc+u9wbL9yr9IEWqB6bgVGGSJsSGk/UQDMGJvycxcPv+dj29weSoDobgPGa+qFIemMONuSTryJ/EDd8sHgISDDb2R89nZGPPx+eFRHW0g2nGTwVcv6NAjV2M9vmu7c6a5raTBliCU9WxvCpRJTZnbwkuU01TW/bQMdjDlU3g82u+UBryC+XsltlFNkhtWAOhjuScegnrgcvhxqSIZBx8GxNYExyFTeTokiRqfUZWwDnxJsThp9/bc3krx0Yp2F9PN65Q9IXgd6hcSlWGKM08VXICV8ETRw3iBqeCXSSfz0yi58g1VjDFCGqi55KOzIaMfGeORJegHA/gj58lNtvuVQN02KSo84MDsEcUJOfmX2b9RzAEFY6yCBUhVijOARH0THeXRe8lHm5OO5wMT0tMWTUr7sJ2BlAB2u60Q1S2phDUfeUonEMpOVHN1ZATjIK9gbQFEJ//XIhMU6Mg6vhzDVFDl91Z8iPsMQq258VClnzhFsutIkMnvIBHAuuAfK9QLHJVmWGonTY8EniMcpR3TyYP8hoRlIgkic4MxD3C1cNqdQZEIyYTi/tI9Tu3lUSphRhnnUVWLXpSJUkhxy2GqJyM/MupLNm9FYKyi4jUz3lmRFJSEjwQMuvJJxcF5cpQCTMewCkA8hWwxWQqjaQxk567mWfD6w45clc2IbMz4+oygfLRxwUr3nHNCb28qiLVY7GoNRxHqkfp8zzuFFt3P6xqeCR5kgeU+I8oytTVWAjnDo8Ke9tSd1eALLemUagHP1zvdjhw3sVSqmpICcVuETlBqWDlujmSWmw5TiuE7Bo/c8ukvtsO0etaOye8wL69II12jIvBYmAj1awIpiFNtTTvSdtaj5v/pfAVQQtLUfuZy9E8ESXW+AvH8r7pUvamxQAAAABJRU5ErkJggg=='
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
