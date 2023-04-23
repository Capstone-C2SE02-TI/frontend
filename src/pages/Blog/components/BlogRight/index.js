import classNames from 'classnames/bind';
import styles from '../../Blog.module.scss';
import { formatPublishDateTime } from '~/helpers';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function BlogRight({ blog }) {
    const { _id, title, publishDate, description } = blog;
    return (
        <div className={cx('BlogReportItem-right')}>
            <Link to={`/blog/detail/${_id}`}>
                <div className={cx('container-box')}>
                    <div className={cx('reportItem-box')}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <span>{formatPublishDateTime(publishDate)}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default BlogRight;
