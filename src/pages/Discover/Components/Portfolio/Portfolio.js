import classNames from 'classnames/bind';
import styles from './Portfolio.module.scss';
import Image from '~/components/Image/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Portfolio() {
    return (
        <section className={cx('portfolio-container')}>
            <div className={cx('profile')}>
                <h4>My portfolio</h4>
                <Image width="150" className={cx('profile-image')} src={images.vth} alt="logo" />
                <h5>Vo Trung Hieu</h5>
                <h6>Edit Profile</h6>
            </div>
            <div className={cx('profile-account')}>
                <h4>Account</h4>
                <div className={cx('profile-account--text')}>
                    <h5>Joined</h5>
                    <h6>Sep 22, 2022</h6>
                </div>
                <div className={cx('profile-account--text')}>
                    <h5>Assets Total</h5>
                    <h6>$1,312,900</h6>
                </div>
            </div>
            <div className={cx('profile-assets')}>
                <h4>Assets</h4>
                <div className={cx('profile-assets--text')}>
                    <h5>Bitcoin</h5>
                    <h6>23.5 <span>BTC</span></h6>
                </div>
                <div className={cx('profile-assets--text')}>
                    <h5>Ethereum</h5>
                    <h6>190.45 <span>ETH</span></h6>
                </div>
                <div className={cx('profile-assets--text')}>
                    <h5>Doge</h5>
                    <h6>200.5 <span>DOGE</span></h6>
                </div>
                <div className={cx('profile-assets--text')}>
                    <h5>Ripple</h5>
                    <h6>65,000 <span>XRP</span></h6>
                </div>
                <h5 className={cx('more-assets')}>More assets...</h5>
            </div>
            <button className={cx('btn-portfolio')}>
                <p>See detail</p>
            </button>
        </section>
    )
}

export default Portfolio;