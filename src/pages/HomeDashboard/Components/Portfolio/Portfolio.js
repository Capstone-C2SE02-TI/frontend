import classNames from 'classnames/bind';
import styles from './Portfolio.module.scss';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Portfolio() {
    return (
        <section className={cx('portfolio-container')}>
            <div className={cx('profile')}>
                <h4>My portfolio</h4>
                <Image width="150" className={cx('profile-image')} src={images.vth} alt="logo" />
                <h5>Vo Trung Hieu</h5>
                <Link to="#"><h6>Edit Profile</h6></Link>
            </div>
            <div className={cx('profile-account')}>
                <h4>Account</h4>
                <div className={cx('profile-account--text')}>
                    <h5>Joined</h5>
                    <h6>Sep 22, 2022</h6>
                </div>
                <div className={cx('profile-account--text')}>
                    <h5>Total follow</h5>
                    <h6>10</h6>
                </div>
            </div>
            <div className={cx('profile-assets')}>
                <h4>Assets</h4>
                <div className={cx('profile-assets--text')}>
                    <h5>No.1</h5>
                    <h6>Bitcoin<span> BTC</span></h6>
                </div>
                <div className={cx('profile-assets--text')}>
                    <h5>No.2</h5>
                    <h6>Ethereum<span> ETH</span></h6>
                </div>
                <div className={cx('profile-assets--text')}>
                    <h5>No.3</h5>
                    <h6>Doge Coin<span> DOGE</span></h6>
                </div>
                <div className={cx('profile-assets--text')}>
                    <h5>No.4</h5>
                    <h6>Ripple<span> XRP</span></h6>
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