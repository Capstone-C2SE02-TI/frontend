import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import styles from '../../Home.module.scss';

const cx = classNames.bind(styles);

function Banner() {
    const navigate = useNavigate();

    return (
        <section className={cx('banner')}>
            <Image className={cx('banner-image')} src={images.banner} alt="banner" />
            <div className={cx('banner-content')}>
                <h2>Easy Invest With Another People</h2>
                <p>
                    First-ever Crypto analyzing platform where you can track and invest following thousands of successful investors
                </p>
                <button
                    onClick={() => {
                        navigate('/home-dashboard');
                    }}
                >
                    Start with us
                </button>
            </div>
        </section>
    );
}

export default Banner;
