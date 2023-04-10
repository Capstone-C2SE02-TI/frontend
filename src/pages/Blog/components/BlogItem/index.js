import classNames from 'classnames/bind';
import styles from '../../Blog.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function BlogItem({ blog }) {
  const { _id, title, thumbnail, description, content, publishDate } = blog;

  return (
    <div className={cx('BlogItem')}>
      <Link to={`/blog/detail/${_id}`}>
        <img src={thumbnail} alt={title} />
        <h5>{title}</h5>
        <h6>{description}</h6>
        <div>{publishDate}</div>
      </Link>
    </div>
  );
}

export default BlogItem;
