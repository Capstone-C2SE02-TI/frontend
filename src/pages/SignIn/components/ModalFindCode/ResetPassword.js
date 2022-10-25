import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '~/components/Modal';
import classNames from 'classnames/bind';
import styles from './ModalFindCode.module.scss';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmitCodeOTP } from '~/modules/user/auth/authSlice';
import { statusLoadingSelector, statusSubmitCodeOTPSelector } from '~/modules/user/auth/selectors';
import { SignIn } from '~/pages';

const cx = classNames.bind(styles);

function ResetPassword() {
    const [isShowModalResetPassword, setIsShowModalResetPassword] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const statusLoading = useSelector(statusLoadingSelector);

    const emailForgot = JSON.parse(localStorage.getItem('emailForgot'));

    const dispatch = useDispatch();

    const buttonLoadingFindCodeClassNames = cx('modal-submit-btn', {
        'loading-find-code': statusLoading === 'loading',
    });

    const handleSubmitCodeOTP = (e) => {
        e.preventDefault();
    };

    const closeModalResetPassword = () => {
        setIsShowModalResetPassword(false);
    };

    return (
        <Fragment>
            <SignIn />
            <Modal isOpen={isShowModalResetPassword} onRequestClose={closeModalResetPassword}>
                <div className={cx('modal-forgot-password')}>
                    <h3 className={cx('modal-heading')}>Reset Password</h3>
                    <span className={cx('modal-title')}>Create a new password</span>
                    <form onSubmit={handleSubmitCodeOTP}>
                        <div className={cx('modal-body')}>
                            <label>New password</label>
                            <input
                                required
                                placeholder="Enter your new password"
                                name="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* <p className={cx('error-message')}>{statusSubmitCodeOTP?.failed || ''}</p> */}
                        </div>
                        <div className={cx('modal-body')}>
                            <label>Confirm password</label>
                            <input
                                required
                                placeholder="Enter your confirm password"
                                name="confirmPassword"
                                type="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {/* <p className={cx('error-message')}>{statusSubmitCodeOTP?.failed || ''}</p> */}
                        </div>
                        <div className={cx('modal-submit')}>
                            {statusLoading === 'loading' ? (
                                <Fragment>
                                    <button className={cx('loading')}>
                                        <FontAwesomeIcon icon={faSpinner} />
                                    </button>
                                    <button className={buttonLoadingFindCodeClassNames}>Sending</button>
                                </Fragment>
                            ) : (
                                <button className={cx('modal-submit-btn')}>Save</button>
                            )}
                        </div>
                    </form>
                </div>
            </Modal>
        </Fragment>
    );
}

export default ResetPassword;
