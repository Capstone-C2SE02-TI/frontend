import { faEnvelope, faLock, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '~/components/Image/Image';
import styles from './Signup.module.scss';

const cx = classNames.bind(styles);

function Signup() {
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
                        <input />
                    </div>
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('label')}>Email:</label>
                    <div className={cx('input-group')}>
                        <div className={cx('input-group__addon')}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        <input />
                    </div>
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('label')}>Mobile phone:</label>
                    <div className={cx('input-group')}>
                        <div className={cx('input-group__addon')}>
                            <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <input type="number" />
                    </div>
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('label')}>Password:</label>
                    <div className={cx('input-group')}>
                        <div className={cx('input-group__addon')}>
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <input />
                    </div>
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('label')}>Confirm Password:</label>
                    <div className={cx('input-group')}>
                        <div className={cx('input-group__addon')}>
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <input />
                    </div>
                </div>

                <div className={cx('form-group')}>
                    <button className={cx('btn-submit')}>Sign up</button>
                </div>
                <div className={cx('navigate')}>
                    <span class="mr-2">Do you already have an account? </span>
                    <Link to="/sign-in">Sign In</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
