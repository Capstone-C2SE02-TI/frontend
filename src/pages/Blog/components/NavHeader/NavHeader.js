import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../../Blog.module.scss';

const cx = classNames.bind(styles);

function NavHeader() {
  return (
    <nav className={cx('NavHeader')}>
      <ul className={cx('NavHeader-list')}>
        <li>
          <Link to={''}>Report</Link>
        </li>
        <li>
          <Link to={''}>Analyze</Link>
        </li>
        <li>
          <Link to={''}>Investment Funds</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavHeader;
