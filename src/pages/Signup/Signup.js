import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { faEnvelope, faLock, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '~/components/Image/Image';
import styles from './Signup.module.scss';

const cx = classNames.bind(styles);

function Signup() {
    const initialValue = {
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    };
    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = () => {
        setFormErrors(validate(formValues));
    };

    const validate = (values) => {
        const errors = {};

        if (!values.username) {
            errors.username = 'Username is required';
        }

        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
            errors.email = 'This is not a valid email address';
        }

        if (!values.phone) {
            errors.phone = 'Phone is required';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 4) {
            errors.password = 'Password must be more than 4 characters';
        } else if (values.password.length > 10) {
            errors.password = 'Password cannot exceed more than 10 characters';
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required';
        }
        return errors;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image width="310" alt="logo" src="https://sharkscan.io/Content/assets-website/img/logos/logo.png" />
            </div>
            <div className={cx('body')}>
                <div className={cx('form-group')}>
                    <label className={cx('label')}>Email Or UserName:</label>
                    <div className={cx('input-group')}>
                        <div className={cx('input-group__addon')}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <input type="text" name="username" value={formValues.username} onChange={handleChange} />
                    </div>
                    <p className={cx('error')}>{formErrors.username}</p>
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('label')}>Email:</label>
                    <div className={cx('input-group')}>
                        <div className={cx('input-group__addon')}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        <input type="text" name="email" value={formValues.email} onChange={handleChange} />
                    </div>
                    <p className={cx('error')}>{formErrors.email}</p>
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('label')}>Mobile phone:</label>
                    <div className={cx('input-group')}>
                        <div className={cx('input-group__addon')}>
                            <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <input type="number" name="phone" value={formValues.phone} onChange={handleChange} />
                    </div>
                    <p className={cx('error')}>{formErrors.phone}</p>
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('label')}>Password:</label>
                    <div className={cx('input-group')}>
                        <div className={cx('input-group__addon')}>
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <input type="password" name="password" value={formValues.password} onChange={handleChange} />
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
                            type="password"
                            name="confirmPassword"
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
