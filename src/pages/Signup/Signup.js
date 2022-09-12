/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { faEnvelope, faLock, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '~/components/Image/Image';
import styles from './Signup.module.scss';
import validate from '~/helpers/validation';
import images from '~/assets/images';
import { authService } from '~/services';


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

    const inputRef = useRef(null);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const fetchApi = async () => {
                const result = await authService.signUp(formValues);
                console.log({ result });
            };
            fetchApi();
        }
    }, [formErrors, isSubmit]);

    const handleSubmit = () => {
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image width="310" alt="logo" src={images.logo} />
            </div>
            <div className={cx('body')}>
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
                            value={formValues.username}
                            onChange={handleChange}
                        />
                    </div>
                    <p className={cx('error')}>{formErrors.username}</p>
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('label')}>Email:</label>
                    <div className={cx('input-group')}>
                        <div className={cx('input-group__addon')}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter your email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                    </div>
                    <p className={cx('error')}>{formErrors.email}</p>
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('label')}>Mobile phone:</label>
                    <div className={cx('input-group')}>
                        <div className={cx('input-group__addon')}>
                            <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <input
                            type="number"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            value={formValues.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <p className={cx('error')}>{formErrors.phoneNumber}</p>
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('label')}>Password:</label>
                    <div className={cx('input-group')}>
                        <div className={cx('input-group__addon')}>
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                    </div>
                    <p className={cx('error')}>{formErrors.password}</p>
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('label')}>Confirm Password:</label>
                    <div className={cx('input-group')}>
                        <div className={cx('input-group__addon')}>
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <input
                            ref={inputRef}
                            type="password"
                            name="confirmPassword"
                            placeholder="Enter your password"
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <p className={cx('error')}>{formErrors.confirmPassword}</p>
                </div>

                <div className={cx('form-group')}>
                    <button className={cx('btn-submit')} onClick={handleSubmit}>
                        Sign up
                    </button>
                </div>
                <div className={cx('navigate')}>
                    <span>Do you already have an account? </span>
                    <Link to="/sign-in">Sign In</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
