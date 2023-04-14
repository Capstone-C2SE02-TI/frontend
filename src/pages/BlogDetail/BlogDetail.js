import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogDetail, fetchBlogCommentList } from '~/modules/BlogDetail/blogDetailSlice';
import { blogDetailSelector, blogCommentListSelector } from '~/modules/BlogDetail/selector';
import { convertHTMLToJSX, formatPublishDateTime } from '~/helpers';
import Profile from '~/pages/Blog/components/Profile';
import NavHeader from '~/pages/Blog/components/NavHeader';
import CommentPart from './components/CommentPart';
import BlogFooter from '../Blog/components/BlogFooter';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './BlogDetail.module.scss';

const cx = classNames.bind(styles);

function BlogDetail() {
  const [reRender, setReRender] = useState(false);
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const blogDetail = useSelector(blogDetailSelector);
  const blogCommentList = useSelector(blogCommentListSelector);

  const renderDetailBlog = (blog) => {
    const { title, publishDate, thumbnail, description, content } = blog;
    return (
      <div className={cx('BlogItem')}>
        <div className={cx('BlogItem-title')}>
          <h2>{title}</h2>
        </div>
        <div className={cx('BlogItem-publishDate')}>
          <h5>{publishDate && formatPublishDateTime(publishDate)}</h5>
        </div>
        <div className={cx('BlogItem-image')}>
          <img src={thumbnail} alt={title} />
        </div>
        <div className={cx('BlogItem-description')}>
          <h5>"{description}"</h5>
        </div>
        <div className={cx('BlogItem-content')}>{convertHTMLToJSX(content)}</div>
      </div>
    );
  };

  useEffect(() => {
    setReRender(true);
    dispatch(fetchBlogDetail(blogId));
    dispatch(fetchBlogCommentList(blogId));
  }, [reRender]);

  return (
    <div className={cx('wrapper')}>
      <header className={cx('header')}>
        <section className={cx('header-section')}>
          <div className={cx('header-box')}>
            <Link to={'/'}>
              <Image width="70" className={cx('header-image')} src={images.logo} alt="logo" />
            </Link>
            <div className={cx('navbar-box')}>
              <NavHeader activeTab={'research'} />
            </div>
            <Profile />
          </div>
        </section>
      </header>
      <div className={cx('content-box')}>{blogDetail && renderDetailBlog(blogDetail)}</div>
      {blogCommentList && (
        <div className={cx('comment-box')}>
          <CommentPart commentList={blogCommentList} reRender={reRender} setReRender={setReRender} />
        </div>
      )}
      <BlogFooter />
    </div>
  );
}

export default BlogDetail;
