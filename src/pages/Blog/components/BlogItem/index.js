import { Link } from 'react-router-dom';
import { formatPublishDateTime } from '~/helpers';
import classNames from 'classnames/bind';
import styles from '../../Blog.module.scss';

const cx = classNames.bind(styles);

function BlogItem({ blog }) {
  const { _id, title, thumbnail, publishDate } = blog;
  return (
    <div className={cx('BlogItem')}>
      <Link to={`/blog/detail/${_id}`}>
        <div className={cx('BlogItem-image')}>
          <img src={thumbnail} alt={title} />
        </div>
        <h4 className={cx('BlogItem-title')}>{title}</h4>
        <h5 className={cx('BlogItem-publishDate')}>{formatPublishDateTime(publishDate)}</h5>
      </Link>
    </div>
  );
}

export default BlogItem;
