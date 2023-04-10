import classNames from 'classnames/bind';
import styles from '../../Blog.module.scss';

const cx = classNames.bind(styles);

function SearchBar() {
  return (
    <nav className={cx('SearchBar')}>
      <input placeholder="Searching" />
    </nav>
  );
}

export default SearchBar;
