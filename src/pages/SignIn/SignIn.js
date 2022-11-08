import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Cookies from 'js-cookie';
import { Spin } from 'antd';
import { LogoIcon } from '~/components/Icons/Icons';
import { authService } from '~/services';
import styles from './SignIn.module.scss';
import validate from '~/helpers/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCircleXmark, faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function SignIn() {
    const navigate = useNavigate();

    const initialValue = {
        username: '',
        password: '',
    };

    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(true);

    const inputUserRef = useRef();

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const deleteKeyObject = (formErrors) => {
        delete formErrors.phoneNumber;
        delete formErrors.confirmPassword;
        delete formErrors.email;
    };
    const handleExceptions = (message, user) => {
        switch (message) {
            case 'username-invalid':
                setFormErrors({ username: 'Username could not be found' });
                break;
            case 'username-notfound':
                setFormErrors({ username: 'Username could not be found' });
                break;

            case 'incorrect-password':
                setFormErrors({ password: 'Incorrect password. try again' });
                break;

            case 'successfully':
                localStorage.setItem('userInfo', JSON.stringify(user));
                navigate('/home-dashboard');
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        deleteKeyObject(formErrors);

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const fetchApi = async () => {
                setLoading(true);
                const response = await authService.signIn(formValues, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: Cookies.get('TI_AUTH_COOKIE') || '',
                    },
                });

                handleExceptions(response.message, response.user);
                setLoading(false);
            };
            fetchApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmit, formErrors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleClear = () => {
        setFormValues({
            ...formValues,
            username: '',
        });
        inputUserRef.current.focus();
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
            <form className={cx('login-right')} onSubmit={handleSubmit}>
                <div className={cx('login-right__language')}>
                    <FontAwesomeIcon icon={faCaretDown} />
                    <span>Language</span>
                </div>
                <div className={cx('login-right__header')}>
                    <h3>TI Access</h3>
                    <span>Please fill your detail to access your account.</span>
                </div>
                <div className={cx('login-right__form-login')}>
                    {loading && <Spin></Spin>}
                    <div className={cx('login-right__form-login__form-control')}>
                        <label className={cx('test')}>Username</label>
                        <input
                            ref={inputUserRef}
                            type="text"
                            name="username"
                            onChange={handleChange}
                            value={formValues.username}
                            placeholder="Eg. Abagnale"
                        />
                        <FontAwesomeIcon icon={faCircleXmark} onClick={handleClear} className={cx('active-value')} />
                        <p className={cx('error-message')}>{formErrors.username}</p>
                    </div>
                    <div className={cx('login-right__form-login__form-control')}>
                        <label>Password</label>
                        <input
                            type={isShowPassword ? 'password' : 'text'}
                            value={formValues.password}
                            placeholder="Enter the password"
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
                    <span
                        className={cx('login-right__form-login__forgot-password')}
                        onClick={() => navigate('/forgot-password')}
                    >
                        Forgot your password?
                    </span>

                    <div className={cx('login-right__form-login__submit')}>
                        <button onClick={handleSubmit}>Sign In</button>
                    </div>
                    <span className={cx('login-right__form-login__already-account')}>
                        Don't have an account? <Link to="/sign-up">Sign up</Link>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
