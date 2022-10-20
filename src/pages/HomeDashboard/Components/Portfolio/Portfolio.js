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
                <Image width="150" className={cx('profile-image')} src={images.vth} alt="logo" />
                <h5>Vo Trung Hieu</h5>
                <Link to="#"><h6>Edit Profile</h6></Link>
            </div>
            <ul className={cx('account')}>
                <li>Upgrade Premium</li>
                <li>Your portfolio</li>
                <li>Sign out</li>
            </ul>
        </section>
    )
}

export default Portfolio;