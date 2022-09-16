import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import styles from './Home.module.scss';
import NavHeader from './components/NavHeader/NavHeader';
import Banner from './components/Banner/Banner';
import Ads from './components/Ads/Ads';
import Letter from './components/Letter/Letter';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <section className={cx('header-section')}>
                    <div className={cx('header-box')}>
                        <Link to={'/'}>
                            <Image width="150" className={cx('header-image')} src={images.logoSvg} alt="logo" />
                        </Link>
                        <NavHeader />
                        <div className={cx('header-group')}>
                            <Link to={''}>
                                <button className={cx('btn')}>Sign in</button>
                            </Link>
                            <Link to={''}>
                                <button className={cx('btn')}>Sign up</button>
                            </Link>
                        </div>
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
                            <Image width="150" className={cx('footer-image')} src={images.logoSvg} alt="logo" />
                            <div className={cx('footer-social')}>
                                <Link to={''}>
                                    <Image width='30px' src={images.facebook} />
                                </Link>
                                <Link to={''}>
                                    <Image width='30px' src={images.telegram} />
                                </Link>
                                <Link to={''}>
                                    <Image width='30px' src={images.twitter} />
                                </Link>
                            </div>
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
                </div>

                <p className={cx('footer-copyright')}>© 2022 • Trackscan.io</p>
            </footer>
        </div>
    )
}

export default Home