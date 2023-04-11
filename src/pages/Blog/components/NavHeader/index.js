import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../../Blog.module.scss';

const cx = classNames.bind(styles);

function NavHeader({ activeTab }) {
  return (
    <nav className={cx('NavHeader')}>
      <ul className={cx('NavHeader-list')}>
        <li>
          <Link to={'/blog'} className={activeTab === 'research' ? cx('NavHeader-item-active') : ''}>
            Research
          </Link>
        </li>
        <li>
          <Link to={'/blog?type=report'} className={activeTab === 'report' ? cx('NavHeader-item-active') : ''}>
            Report
          </Link>
        </li>
        <li>
          <Link to={'/blog?type=analyze'} className={activeTab === 'analyze' ? cx('NavHeader-item-active') : ''}>
            Analyze
          </Link>
        </li>
        <li>
          <Link
            to={'/blog?type=investment-funds'}
            className={activeTab === 'investment-funds' ? cx('NavHeader-item-active') : ''}
          >
            Investment Funds
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavHeader;
