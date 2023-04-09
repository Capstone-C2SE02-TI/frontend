import { Link } from 'react-router-dom';
import Profile from './components/NavHeader/Profile';
import NavHeader from './components/NavHeader/NavHeader';
import SearchBar from './components/NavHeader/SearchBar';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';

const cx = classNames.bind(styles);

function Blog() {
  return (
    <div className={cx('wrapper')}>
      <header className={cx('header')}>
        <section className={cx('header-section')}>
          <div className={cx('header-box')}>
            <Link to={'/'}>
              <Image width="70" className={cx('header-image')} src={images.logo} alt="logo" />
            </Link>
            <SearchBar />
            <Profile />
          </div>
          <div className={cx('navbar-box')}>
            <NavHeader />
          </div>
        </section>
      </header>
      {/*<footer id={cx('footer')}>
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
            </footer> */}
    </div>
  );
}

export default Blog;
