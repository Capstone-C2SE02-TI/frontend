import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Image from '~/components/Image/Image';
import styles from './SignIn.module.scss';
import validate from '~/helpers/validation';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SignIn() {
    const initialValue = {
        username: '',
        password: '',
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image width="310" alt="logo" src={images.logo} />
            </div>
            <div className={cx('body')}>
                <div className={cx('form-group')}>
                    <label className={cx('label')}>Email Or UserName:</label>
                    <div className={cx('input-group')}>
                        <div className={cx('input-group__addon')}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <input type="text" name="username" placeholder="Enter user name" onChange={handleChange} />
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
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                        />
                    </div>
                    <p className={cx('error')}>{formErrors.password}</p>
                </div>
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
