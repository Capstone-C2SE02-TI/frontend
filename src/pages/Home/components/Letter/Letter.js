import classNames from 'classnames/bind';
import styles from '../../Home.module.scss';
import { Parallax } from 'react-parallax';
import images from '~/assets/images';

const cx = classNames.bind(styles);


function Letter() {
    return (
        <section className={cx('container-fluid')}>
            <h1>Send your mail and get more infomation</h1>
            <Parallax className={cx('banner-parallax')} bgImage={images.introduction3} bgImageAlt="the cat" strength={800}>

                <div className={cx('letter')}>
                    <h1>Sign up for our Newsletter</h1>
                    <p>
                        Subscribe to SharkScan Newsletters — the best way to stay informed about how sucessful crypto
                        investor investing and transforming the global financial system.
                    </p>
                    <input type="email" placeholder="Enter your email" className={cx('field-email')} />
                </div>
            </Parallax>
        </section>
    );
}

export default Letter