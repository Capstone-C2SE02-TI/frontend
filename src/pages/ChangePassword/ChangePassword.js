import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';
import RecommendAccountFollow from '../EditProfile/containers/RecommendAccountFollow';
import { useState } from 'react';
import Button from '~/components/Button';
import { ArrowRightIcon, TimesIcon } from '~/components/Icons';
import { useNavigate } from 'react-router-dom';
import Modal from '~/components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { authService } from '~/services';
import LoadingCustomize from '~/components/LoadingCustomize';
import { Spin } from 'antd';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

function ChangePassword() {
    const initialValue = {
        oldPassword: '',
        newPassword: '',
        newConfirmPassword: '',
    };
    const [formValues, setFormValues] = useState(initialValue);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [isShowNewPassword, setIsShowNewPassword] = useState(true);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState();

    const { email } = JSON.parse(localStorage.getItem('userInfo'));

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFocus = () => {
        setDisabledBtn(false);
    };
    const navigate = useNavigate();

    const onBackProfile = () => {
        if (disabledBtn) {
            navigate('/profile');
        } else {
            openModal();
        }
    };
    const closeModal = () => {
        setIsOpenModal(false);
    };

    const openModal = () => {
        setIsOpenModal(true);
    };

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };
    const toggleShowNewPassword = () => {
        setIsShowNewPassword(!isShowNewPassword);
    };
    const toggleShowConfirmPassword = () => {
        setIsShowConfirmPassword(!isShowConfirmPassword);
    };

    const onSubmitChangePassword = (event) => {
        event.preventDefault();

        const fetchApi = async () => {
            setLoading(true);
            const data = await authService.changePassword({ ...formValues, email: email });
            setLoading(false);
            if (data.error) {
              
                const errors = {};
               
                switch (data.error.toLowerCase()) {
                    case 'incorrect-oldpassword':
                        errors.oldPassword = data.error;
                        break;
                    case 'oldpassword-must-8-16-characters':
                        errors.oldPassword = data.error;
                        break;
                    case 'oldpassword-required':
                        errors.oldPassword = data.error;
                        break;
                    case 'newpassword-must-8-16-characters':
                        errors.newPassword = data.error;
                        break;
                    case 'newpassword-required':
                        errors.newPassword = data.error;
                        break;
                    case 'newconfirmpassword-required':
                        errors.newConfirmPassword = data.error;
                        break;
                    case 'newconfirmpassword-must-8-16-characters':
                        errors.newConfirmPassword = data.error;
                        break;
                    case 'new-passwords-not-match':
                        errors.newConfirmPassword = data.error;
                        break;
                    default:
                        break;
                }
                if (data.error.toLowerCase().startsWith('user')) {
                    errors.username = data.error;
                } else if (data.error.toLowerCase().startsWith('email')) {
                    errors.email = data.error;
                } else if (data.error.toLowerCase().startsWith('website')) {
                    errors.website = data.error;
                } else {
                    errors.phoneNumber = data.error;
                }

                setFormErrors(errors);
            } else {
                navigate('/profile');
                toast.success('Change password successfully', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    icon: '👻',
                });
            }
        };

        fetchApi();
    };

    const renderChangePassword = () => {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('change-password')}>
                    {loading && (
                        <LoadingCustomize>
                            <Spin></Spin>
                        </LoadingCustomize>
                    )}

                    <Modal isOpen={isOpenModal} onRequestClose={closeModal}>
                        <div style={{ padding: '26px' }}>
                            <div className="d-flex justify-content-between">
                                <span style={{ fontWeight: '700', fontSize: '24px' }}>Are you sure to leave?</span>
                                <span className={cx('times-icon')} onClick={closeModal}>
                                    <TimesIcon />
                                </span>
                            </div>
                            <div className="py-8" styles={{ color: '#58667e' }}>
                                Your content has not been saved yet! It will be lost if you leave this page.
                            </div>
                            <div className="d-flex flex-row-reverse mt-16">
                                <Button primary onClick={closeModal}>
                                    Stay
                                </Button>
                                <Button onClick={() => navigate('/profile')}>Leave</Button>
                            </div>
                        </div>
                    </Modal>
                    <div className="d-flex  align-items-center">
                        <span className={cx('back-profile')} onClick={onBackProfile}>
                            <ArrowRightIcon />
                        </span>
                        <p className={cx('edit-profile-title')}>Change Password</p>
                    </div>
                    <form onSubmit={onSubmitChangePassword}>
                        <div className={cx('change-password-control')}>
                            <label>Old password</label>
                            <input
                                type={isShowPassword ? 'password' : 'text'}
                                name="oldPassword"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                placeholder="Enter your old password"
                            />
                            {isShowPassword ? (
                                <FontAwesomeIcon
                                    icon={faEyeSlash}
                                    onClick={() => toggleShowPassword()}
                                    className={cx('active-value')}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faEye}
                                    onClick={() => toggleShowPassword()}
                                    className={cx('active-value')}
                                />
                            )}
                            <p className={cx('error-message')}>{formErrors?.oldPassword}</p>
                        </div>
                        <div className={cx('change-password-control')}>
                            <label>New password</label>
                            <input
                                type={isShowNewPassword ? 'password' : 'text'}
                                name="newPassword"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                placeholder="Enter your new password"
                            />
                            {isShowNewPassword ? (
                                <FontAwesomeIcon
                                    className={cx('active-value')}
                                    icon={faEyeSlash}
                                    onClick={() => toggleShowNewPassword()}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    className={cx('active-value')}
                                    icon={faEye}
                                    onClick={() => toggleShowNewPassword()}
                                />
                            )}
                            <p className={cx('error-message')}>{formErrors?.newPassword}</p>
                        </div>
                        <div className={cx('change-password-control')}>
                            <label>Confirm password</label>
                            <input
                                type={isShowConfirmPassword ? 'password' : 'text'}
                                name="newConfirmPassword"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                placeholder="Enter your confirm new password"
                            />
                            {isShowConfirmPassword ? (
                                <FontAwesomeIcon
                                    className={cx('active-value')}
                                    icon={faEyeSlash}
                                    onClick={() => toggleShowConfirmPassword()}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    className={cx('active-value')}
                                    icon={faEye}
                                    onClick={() => toggleShowConfirmPassword()}
                                />
                            )}
                            <p className={cx('error-message')}>{formErrors?.newConfirmPassword}</p>
                        </div>
                       
                       
                            <Button primary disabled={disabledBtn}>
                                Save
                            </Button>
                     
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="d-flex justify-content-between">
            {renderChangePassword()}
            <RecommendAccountFollow />
        </div>
    );
}

export default ChangePassword;
