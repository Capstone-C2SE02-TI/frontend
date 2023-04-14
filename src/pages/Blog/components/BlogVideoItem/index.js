import classNames from 'classnames/bind';
import styles from '../../Blog.module.scss';

const cx = classNames.bind(styles);

function BlogVideoItem({ blog }) {
  const { title, thumbnail, publishDate, content } = blog;
  return (
    <div className={cx('BlogItem')}>
      <a href={content}>
        <div className={cx('BlogItem-image')}>
          <img src={thumbnail} alt={title} />
        </div>
        <h4 className={cx('BlogItem-title')}>{title}</h4>
        <h5 className={cx('BlogItem-publishDate')}>{publishDate}</h5>
      </a>
    </div>
  );
}

export default BlogVideoItem;
