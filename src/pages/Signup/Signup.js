import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Spin } from 'antd';

import { LogoIcon } from '~/components/Icons/Icons';
import { authService } from '~/services';
import styles from './Signup.module.scss';
import validate from '~/helpers/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCircleXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
const cx = classNames.bind(styles);

function Signup() {
    const initialValue = {
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    };
    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);
    // const [successfully, setIsShowConfirmPassword] = useState(true);

    const navigate = useNavigate();
    const inputUserRef = useRef();
    const inputEmailRef = useRef();
    const inputPhoneNumberRef = useRef();

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleExceptions = (message) => {
        switch (message) {
            case 'username-existed':
                setFormErrors({ username: 'Username already exists' });
                break;
            case 'email-existed':
                setFormErrors({ email: 'Email already exists' });
                break;
            case 'email-name-must-6-30-characters':
                setFormErrors({ successfully: 'Successfully' });
                navigate('/sign-in');
                break;

            case 'successfully':
                setFormErrors({ successfully: 'Successfully' });
                navigate('/sign-in');
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const fetchApi = async () => {
                setLoading(true);
                const requestOptions = {
                    headers: { 'Content-Type': 'application/json' },
                };

                const result = await authService.signUp(formValues, requestOptions);
                console.log({ result });
                handleExceptions(result.message);
                setLoading(false);
            };
            fetchApi();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formErrors, isSubmit]);

    const handleSubmit = () => {
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };
    const toggleShowConfirmPassword = () => {
        setIsShowConfirmPassword(!isShowConfirmPassword);
    };

    const handleClear = (keyName, inputRef) => {
        setFormValues({
            ...formValues,
            [keyName]: '',
        });
        inputRef.current.focus();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('login-left')}>
                <LogoIcon />

                <h3 className={cx('login-left__heading')}>
                    <span>Enjoy the world's largest cryptocurrency exchange at your fingertips.</span>
                </h3>
                <img src={images.logoRobot} alt="logo" />
            </div>
            <div className={cx('login-right')}>
                <div className={cx('login-right__language')}>
                    <FontAwesomeIcon icon={faCaretDown} />
                    <span>Language</span>
                </div>
                <div className={cx('login-right__header')}>
                    <h3>Create Account</h3>
                    <span>Please fill in your details to create your account.</span>
                </div>
                <div className={cx('login-right__form-login')}>
                    {loading && <Spin></Spin>}
                    <div className={cx('login-right__form-login__form-control')}>
                        <label>Username</label>
                        <input
                            ref={inputUserRef}
                            type="text"
                            name="username"
                            onChange={handleChange}
                            value={formValues.username}
                            placeholder="Eg. Abagnale"
                        />
                        <FontAwesomeIcon
                            className={cx('active-value')}
                            icon={faCircleXmark}
                            onClick={() => handleClear('username', inputUserRef)}
                        />
                        <p className={cx('error-message')}>{formErrors.username}</p>
                    </div>
                    <div className={cx('login-right__form-login__form-control')}>
                        <label>Email</label>
                        <input
                            ref={inputEmailRef}
                            type="text"
                            name="email"
                            onChange={handleChange}
                            value={formValues.email}
                            placeholder="Eg. Abagnale@example.com"
                        />
                        <FontAwesomeIcon
                            className={cx('active-value')}
                            icon={faCircleXmark}
                            onClick={() => handleClear('email', inputEmailRef)}
                        />
                        <p className={cx('error-message')}>{formErrors.email}</p>
                    </div>
                    <div className={cx('login-right__form-login__form-control')}>
                        <label>Phone number</label>
                        <input
                            ref={inputPhoneNumberRef}
                            type="number"
                            name="phoneNumber"
                            placeholder="+84*************"
                            onChange={handleChange}
                            value={formValues.phoneNumber}
                        />
                        <FontAwesomeIcon
                            className={cx('active-value')}
                            icon={faCircleXmark}
                            onClick={() => handleClear('phoneNumber', inputPhoneNumberRef)}
                        />
                        <p className={cx('error-message')}>{formErrors.phoneNumber}</p>
                    </div>
                    <div className={cx('login-right__form-login__form-control')}>
                        <label>Password</label>
                        <input
                            type={isShowPassword ? 'password' : 'text'}
                            value={formValues.password}
                            placeholder="Enter your password"
                            onChange={handleChange}
                            name="password"
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
                        <p className={cx('error-message')}>{formErrors.password}</p>
                    </div>
                    <div className={cx('login-right__form-login__form-control')}>
                        <label>Confirm password</label>
                        <input
                            type={isShowConfirmPassword ? 'password' : 'text'}
                            name="confirmPassword"
                            placeholder="Enter your password"
                            value={formValues.confirmPassword}
                            onChange={handleChange}
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
                        <p className={cx('error-message')}>{formErrors.confirmPassword}</p>
                    </div>
                    <div className={cx('login-right__form-login__submit')}>
                        <button onClick={handleSubmit}>Sign In</button>
                    </div>
                    <span className={cx('login-right__form-login__already-account')}>
                        Already have an account? <Link to="/sign-in">Sign in</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Signup;
