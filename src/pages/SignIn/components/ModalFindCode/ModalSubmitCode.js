import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '~/components/Modal';
import classNames from 'classnames/bind';
import styles from './ModalFindCode.module.scss';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmitCodeOTP } from '~/modules/user/auth/authSlice';
import { emailForgotPasswordSelector, statusLoadingSelector, statusSubmitCodeOTPSelector } from '~/modules/user/auth/selectors';
import { SignIn } from '~/pages';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ModalSubmitCode() {
    const [codeOTP, setCodeOTP] = useState('');
    const [isShowModalSubmitCode, setIsShowModalSubmitCode] = useState(true);

    const statusSubmitCodeOTP = useSelector(statusSubmitCodeOTPSelector);
    const statusLoading = useSelector(statusLoadingSelector);

    const emailForgot = JSON.parse(localStorage.getItem('emailForgot'));

    const navigate = useNavigate();

    console.log({ statusSubmitCodeOTP });

    // useEffect(() => {
    //     if (statusSubmitCodeOTP.successfully) {
    //         navigate('/reset-password');
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [statusSubmitCodeOTP.successfully]);

    const dispatch = useDispatch();

    const buttonLoadingFindCodeClassNames = cx('modal-submit-btn', {
        'loading-find-code': statusLoading === 'loading',
    });

    const handleChange = (e) => {
        setCodeOTP(e.target.value);
    };

    const handleSubmitCodeOTP = (e) => {
        e.preventDefault()
        dispatch(fetchSubmitCodeOTP({ email: emailForgot, code: codeOTP }));

    };

    const closeModalSubmitCode = () => {
        setIsShowModalSubmitCode(false);
    };

    return (
        <Fragment>
            <SignIn />
            <Modal isOpen={isShowModalSubmitCode} onRequestClose={closeModalSubmitCode}>
                <div className={cx('modal-forgot-password')}>
                    <h3 className={cx('modal-heading')}>Check email</h3>
                    <span className={cx('modal-title')}>
                        We have emailed levanthuan@gmail.com a piece of code. Please check and enter that code here
                    </span>
                    <form onSubmit={handleSubmitCodeOTP}>
                        <div className={cx('modal-body')}>
                            <label>CodeOtp</label>
                            <input
                                required
                                placeholder="Enter your code here"
                                name="codeOTP"
                                type="number"
                                onChange={handleChange}
                                value={codeOTP}
                            />
                            <p className={cx('error-message')}>{statusSubmitCodeOTP?.failed || ''}</p>
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
                                <button className={cx('modal-submit-btn')}>Find</button>
                            )}
                        </div>
                    </form>
                </div>
            </Modal>
        </Fragment>
    );
}

export default ModalSubmitCode;
