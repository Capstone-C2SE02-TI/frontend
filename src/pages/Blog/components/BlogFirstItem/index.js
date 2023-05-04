import { Link } from 'react-router-dom';
import { formatPublishDateTime } from '~/helpers';
import classNames from 'classnames/bind';
import styles from '../../Blog.module.scss';

const cx = classNames.bind(styles);

function BlogFirstItem({ blog }) {
    const { _id, title, thumbnail, publishDate } = blog;
    return (
        <div className={cx('BlogReportFirstItem')}>
            <Link to={`/blog/detail/${_id}`}>
                <div className={cx('BlogReportFirstItem-image')}>
                    <img src={thumbnail} alt={title} />
                </div>
                <h4 className={cx('BlogReportFirstItem-title')}>{title}</h4>
                <h5 className={cx('BlogReportFirstItem-publishDate')}>{publishDate}</h5>
            </Link>
        </div>
    );
}

export default BlogFirstItem;
