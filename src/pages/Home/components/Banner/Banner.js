import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import images from '~/assets/images';
import styles from '../../Home.module.scss';

const cx = classNames.bind(styles);

function Banner() {
    const navigate = useNavigate();

    return (
        <section className={cx('banner')}>
            <Parallax className={cx('banner-parallax')} bgImage={images.banner} bgImageAlt="the cat" strength={800}>
                <div className={cx('banner-content')}>
                    <h2>Easy Invest To Everyone</h2>
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
            </Parallax>

        </section>
    );
}

export default Banner;
