import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);


function Letter() {
    return (
        <section className={cx('container')}>
            <div className={cx('letter')}>
                <h1>Sign up for our Newsletter</h1>
                <p>Subscribe to SharkScan Newsletters — the best way to stay informed about how sucessful
                    crypto investor investing and transforming the global financial system.</p>
                <input type='email' placeholder='Enter your email' className={cx('field-email')} />
            </div>
        </section>
    )
}

export default Letter