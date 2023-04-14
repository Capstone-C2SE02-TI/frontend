import { Link } from 'react-router-dom';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from '../../Blog.module.scss';

const cx = classNames.bind(styles);

function BlogFooter() {
  return (
    <div className={cx('BlogFooter')}>
      <Link to={'/'}>
        <Image width="70" className={cx('header-image')} src={images.logo} alt="logo" />
      </Link>
      <span>© 2022 TI Guide. All Rights Reserved</span>
      <div>
        <img src={images.facebookIcon} alt="facebook icon" />
        <img src={images.telegramIcon} alt="telegram icon" />
        <img src={images.youtubeIcon} alt="youtube icon" />
      </div>
    </div>
  );
}

export default BlogFooter;
