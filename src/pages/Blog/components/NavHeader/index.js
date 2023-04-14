import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../../Blog.module.scss';

const cx = classNames.bind(styles);

function NavHeader({ activeTab = 'report', setTab }) {
  const handleClickTab = (tab) => {
    setTab(tab);
  };

  const getTabClassName = (currentTab) => {
    return currentTab === activeTab ? cx('NavHeader-item-active') : '';
  };

  return (
    <nav className={cx('NavHeader')}>
      <ul className={cx('NavHeader-list')}>
        <li>
          <Link to={'/blog?type=report'} className={getTabClassName('report')} onClick={() => handleClickTab('report')}>
            Report
          </Link>
        </li>
        <li>
          <Link
            to={'/blog?type=analyze'}
            className={getTabClassName('analyze')}
            onClick={() => handleClickTab('analyze')}
          >
            Analyze
          </Link>
        </li>
        <li>
          <Link
            to={'/blog?type=investment-funds'}
            className={getTabClassName('investment-funds')}
            onClick={() => handleClickTab('investment-funds')}
          >
            Investment Funds
          </Link>
        </li>
        <li>
          <Link to={'/blog?type=video'} className={getTabClassName('video')} onClick={() => handleClickTab('video')}>
            Video
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavHeader;
