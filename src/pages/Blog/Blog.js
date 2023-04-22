import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogsByType } from '~/modules/Blog/blogSlice';
import { blogsByTypeSelector } from '~/modules/Blog/selector';
import useQuery from '~/hooks/useQuery';
import Profile from './components/Profile';
import NavHeader from './components/NavHeader';
import BlogItem from './components/BlogItem';
import BlogVideoItem from './components/BlogVideoItem';
import BlogFooter from './components/BlogFooter';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';

const cx = classNames.bind(styles);

function Blog() {
  const query = useQuery();
  const type = query.get('type');
  const [tab, setTab] = useState(type || 'report');
  const dispatch = useDispatch();
  const blogsByType = useSelector(blogsByTypeSelector);

  const renderListBlogs = (blogs) => {
    return type === 'video'
      ? blogs.map((blog, index) => <BlogVideoItem blog={blog} key={index} />)
      : blogs.map((blog, index) => <BlogItem blog={blog} key={index} />);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchBlogsByType(type));
  }, [type]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container-fluid')}>
        <header className={cx('header')}>
          <section className={cx('header-section')}>
            <div className={cx('header-box')}>
              <Link to={'/'}>
                <Image width="70" className={cx('header-image')} src={images.logo} alt="logo" />
              </Link>
              <div className={cx('navbar-box')}>
                <NavHeader activeTab={tab} setTab={setTab} />
              </div>
              <Profile />
            </div>
          </section>
        </header>
      </div>

      <div className={cx('content-box')}>
        <div className={cx('content-box--left')}>
          {blogsByType && renderListBlogs(blogsByType)}
        </div>
        <div className={cx('content-box--left')}>
          <div className={cx('content-box--first')}>

          </div>
        </div>
        <div></div>
      </div>
      <div className={cx('container-fluid-footer')}>
        <BlogFooter />
      </div>
    </div>
  );
}

export default Blog;
