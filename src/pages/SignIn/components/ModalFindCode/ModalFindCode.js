import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '~/components/Modal';
import classNames from 'classnames/bind';
import styles from './ModalFindCode.module.scss';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  { fetchFindCodeOTP } from '~/modules/user/auth/authSlice';
import { statusFindCodeOTPSelector, statusLoadingSelector } from '~/modules/user/auth/selectors';
import { useNavigate } from 'react-router-dom';
import { SignIn } from '~/pages';

const cx = classNames.bind(styles);

function ModalFindCode() {
    const [textEmailFindCode, setTextEmailFindCode] = useState('');
    const [isShowForgotPassword, setIsShowForgotPassword] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const codeOTPStatus = useSelector(statusFindCodeOTPSelector);
    const statusFindCode = useSelector(statusLoadingSelector);

    useEffect(() => {
        if (codeOTPStatus.successfully === 'successfully') {
            navigate('/resend-code');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codeOTPStatus.successfully]);

    const buttonLoadingFindCodeClassNames = cx('modal-submit-btn', {
        'loading-find-code': statusFindCode === 'loading',
    });

    const handleChange = (e) => {
        setTextEmailFindCode(e.target.value);
    };

    const handleFindCode = (e) => {
        e.preventDefault();
        dispatch(fetchFindCodeOTP(textEmailFindCode));
        localStorage.setItem('emailForgot', JSON.stringify(textEmailFindCode));
    };


    // const openModalFindCode = () => {
    //     setIsShowForgotPassword(true);
    // };
    const closeModalFindCode = () => {
        setIsShowForgotPassword(false);
    };

    const renderFindCode = () => {
        return (
            <Modal isOpen={isShowForgotPassword} onRequestClose={closeModalFindCode}>
                <div className={cx('modal-forgot-password')}>
                    <h3 className={cx('modal-heading')}>Forgot password</h3>
                    <span className={cx('modal-title')}>Please enter your email to find your account</span>
                    <form onSubmit={handleFindCode}>
                        <div className={cx('modal-body')}>
                            <label>Email</label>
                            <input
                                required
                                placeholder="Enter your email address"
                                name="email"
                                type="email"
                                onChange={handleChange}
                            />
                            <p className={cx('error-message')}>{codeOTPStatus?.failed || ''}</p>
                        </div>

                        <div className={cx('modal-submit')}>
                            {statusFindCode === 'loading' ? (
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
                    {/* <div className="mt-16">
                        <Button  outline>Next</Button>
                    </div> */}
                </div>
            </Modal>
        );
    };
    return (
        <Fragment>
            <SignIn />
            {renderFindCode()}
        </Fragment>
    );
}

export default ModalFindCode;
