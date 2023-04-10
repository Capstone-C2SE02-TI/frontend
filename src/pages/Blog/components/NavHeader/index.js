import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../../Blog.module.scss';

const cx = classNames.bind(styles);

function NavHeader() {
  return (
    <nav className={cx('NavHeader')}>
      <ul className={cx('NavHeader-list')}>
        <li>
          <Link to={'/blog'}>Research</Link>
        </li>
        <li>
          <Link to={'/blog?type=bao-cao'}>Report</Link>
        </li>
        <li>
          <Link to={'/blog?type=phan-tich'}>Analyze</Link>
        </li>
        <li>
          <Link to={'/blog?type=quy-dau-tu'}>Investment Funds</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavHeader;
