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
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <section className={cx('header-section')}>
                    <div className={cx('header-box')}>
                        <Image width="150" className={cx('header-image')} src={images.logoSvg} alt="logo" />
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
            <footer className={cx('container')}>
                <div className={cx('footer')}>
                    <section className={cx('col3')}>
                        <Image width="150" className={cx('header-image')} src={images.logoSvg} alt="logo" />
                    </section>
                    <section className={cx('col3')}>
                        <ul>
                            <li>Document</li>
                            <li>Getting Started</li>
                            <li>FAQ</li>
                            <li>Upgrade & payment</li>
                        </ul>
                    </section>
                    <section className={cx('col3')}>
                        <ul>
                            <li>Contact</li>
                            <li>Privacy Policy</li>
                            <li>FAQ</li>
                            <li>Terms Of Use</li>
                        </ul>
                    </section>
                </div>
                <p className={cx('footer-copyright')}>© 2022 • Trackscan.io</p>
            </footer>
        </div>
    )
}

export default Home