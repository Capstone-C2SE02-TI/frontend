import React from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import Image from '~/components/Image/Image';
import styles from './SignIn.module.scss';
import validate from '~/helpers/validation';
import images from '~/assets/images';
import { authService } from '~/services';
import Loading from '~/components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAuth } from '~/modules/user/auth/authSlice';
// import { authSelector } from '~/modules/user/auth/selectors';

const cx = classNames.bind(styles);

function SignIn() {

    const navigate =  useNavigate()
    // const dispatch = useDispatch()

    const initialValue = {
        username: '',
        password: '',
    };

    // const auth = useSelector(authSelector);
    // console.log({auth});

    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)
    const [loading, setLoading] = useState(false)
  const [isShowPassword, setIsShowPassword] = useState(true);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const deleteKeyObject = (formErrors) => {
        delete formErrors.phoneNumber;
        delete formErrors.confirmPassword;
        delete formErrors.email;
    };

    useEffect(() => {
        deleteKeyObject(formErrors)

         if (Object.keys(formErrors).length === 0 && isSubmit) {
             const fetchApi = async () => {
                 setLoading(true)
                 const response = await authService.signIn(formValues, {
                     headers: {
                         'Content-Type': 'application/json',
                         'Authorization': Cookies.get('TI_AUTH_COOKIE')
                     },
                 });
                 if (response.user) {
                      localStorage.setItem('token', JSON.stringify(response.user));
                      navigate('/');
                 }

                 setLoading(false);
                //  dispatch(fetchAuth((formValues)));
             }
             fetchApi();
         }
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [isSubmit,formErrors]);

    const handleSubmit = () => {
        setFormErrors(validate(formValues));
        setIsSubmit(true)
    };

  const toggleShowPassword = () => {
      setIsShowPassword(!isShowPassword);
  };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image width="250" alt="logo" src={images.logoSvg} />
            </div>
            <div className={cx('body')}>
                {loading ? (
                    <Loading cover="content" />
                ) : (
                    <React.Fragment>
                        <div className={cx('form-group')}>
                            <label className={cx('label')}>UserName:</label>
                            <div className={cx('input-group')}>
                                <div className={cx('input-group__addon')}>
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter user name"
                                    onChange={handleChange}
                                />
                                f
                            </div>
                            <p className={cx('error')}>{formErrors.username}</p>
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('label')}>Password:</label>
                            <div className={cx('input-group')}>
                                <div className={cx('input-group__addon')}>
                                    <FontAwesomeIcon icon={faLock} />
                                </div>
                                <input
                                    type={isShowPassword ? 'password' : 'text'}
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                />
                                {isShowPassword ? (
                                    <FontAwesomeIcon
                                        className={cx('input-group__eye-icon')}
                                        icon={faEyeSlash}
                                        onClick={() => toggleShowPassword()}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        className={cx('input-group__eye-icon')}
                                        icon={faEye}
                                        onClick={() => toggleShowPassword()}
                                    />
                                )}
                            </div>
                            <p className={cx('error')}>{formErrors.password}</p>
                        </div>
                    </React.Fragment>
                )}
                <Link to="#">
                    <span className={cx('forgot-password')}>Forgot password?</span>
                </Link>
                <div className={cx('form-group')}>
                    <button className={cx('btn-submit')} onClick={handleSubmit}>
                        Sign up
                    </button>
                </div>
                <div className={cx('navigate')}>
                    <span>Don't have an account? </span>
                    <Link to="/sign-up">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
