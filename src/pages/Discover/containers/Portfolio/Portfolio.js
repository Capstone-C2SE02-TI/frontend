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

        </section>
    )
}

export default Portfolio;