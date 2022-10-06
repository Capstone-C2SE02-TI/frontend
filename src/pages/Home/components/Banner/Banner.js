import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import styles from '../../Home.module.scss';

const cx = classNames.bind(styles);

function Banner() {
    return (
        <section className={cx("banner")}>
            <Image className={cx("banner-image")} src={images.banner} alt="banner" />
            <div className={cx("banner-content")}>
                <h2>Easy Invest With Another People</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <button>Start with us</button>
            </div>
        </section>
    )
}

export default Banner