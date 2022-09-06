import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import styles from './Home.module.scss';
import NavHeader from './NavHeader';
import Banner from './Banner';
import Ads from './Ads';
import Letter from './Letter';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div>
            <header className={cx('header')}>
                <section className={cx('header-section')}>
                    <div className={cx('header-box')}>
                        <Image width="150" src={images.logo} alt="logo" />
                        <NavHeader />
                        <div className={cx('header-group')}>
                            <button className={cx('btn')}>Sign in</button>
                            <button className={cx('btn')}>Sign up</button>
                        </div>
                    </div>
                </section>
            </header>
            <Banner />
            <Ads />
            <Letter />
            <footer className={cx('footer')}>
                <section className={cx('col3')}>

                </section>
                <section className={cx('col3')}>

                </section>
                <section className={cx('col3')}>

                </section>
            </footer>
        </div>
    )
}

export default Home