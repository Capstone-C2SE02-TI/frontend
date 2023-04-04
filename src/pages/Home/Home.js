import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import styles from './Home.module.scss';
import NavHeader from './components/NavHeader/NavHeader';
import Banner from './components/Banner/Banner';
import Ads from './components/Ads/Ads';
import Letter from './components/Letter/Letter';
import { FacebookIcon, TelegramIcon, TwitterIcon } from '~/components/Icons';
// import {Animated} from "react-animated-css";

const cx = classNames.bind(styles);

function Home() {
        const currentUser = JSON.parse(localStorage.getItem('userInfo'));



    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <section className={cx('header-section')}>
                    <div className={cx('header-box')}>
                        <Link to={'/'}>
                            <Image width="70" className={cx('header-image')} src={images.logo} alt="logo" />
                        </Link>
                        <NavHeader />
                    </div>
                </section>
            </header>
            <Banner />
            <Ads />
            <Letter />
            <footer id={cx('footer')}>
                <div className={cx('footer-container')}>
                    <div className={cx('footer')}>
                        <section className={cx('col3')}>
                            <Image width="150" className={cx('footer-image')} src={images.logo} alt="logo" />
                            <div className={cx('footer-social')}>
                                <a href="https://t.me/+Wd1VrbUCQtU2NmFl" rel="noopener noreferrer" target="_blank">
                                    <TelegramIcon />
                                </a>
                                <a
                                    href="https://www.facebook.com/huynhducthanhtuan"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FacebookIcon />
                                </a>
                                <a href="https://twitter.com/Cristiano" rel="noopener noreferrer" target="_blank">
                                    <TwitterIcon />
                                </a>
                            </div>
                        </section>
                        <section className={cx('col3')}>
                            <ul>
                                <li>Document v.2</li>
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
                </div>

                <p className={cx('footer-copyright')}>© 2022 • Trackscan.io</p>
            </footer>
        </div>
    );
}

export default Home