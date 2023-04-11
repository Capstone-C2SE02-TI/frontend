import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs, fetchBlogsByType } from '~/modules/Blog/blogSlice';
import { allBlogsSelector, blogsByTypeSelector } from '~/modules/Blog/selector';
import useQuery from '~/hooks/useQuery';
import Profile from './components/Profile';
import NavHeader from './components/NavHeader';
import SearchBar from './components/SearchBar';
import BlogItem from './components/BlogItem';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';

const cx = classNames.bind(styles);

function Blog() {
  const query = useQuery();
  const type = query.get('type');
  const [tab, setTab] = useState(type || 'research');
  const dispatch = useDispatch();
  const allBlogs = useSelector(allBlogsSelector);
  const blogsByType = useSelector(blogsByTypeSelector);

  useEffect(() => {
    if (type) {
      setTab(type);
      dispatch(fetchBlogsByType(type));
    } else {
      dispatch(fetchAllBlogs());
    }
  }, [type]);

  const renderListBlogs = (blogs) => {
    return blogs.map((blog, index) => <BlogItem blog={blog} key={index} />);
  };

  return (
    <div className={cx('wrapper')}>
      <header className={cx('header')}>
        <section className={cx('header-section')}>
          <div className={cx('header-box')}>
            <Link to={'/'}>
              <Image width="70" className={cx('header-image')} src={images.logo} alt="logo" />
            </Link>
            <SearchBar />
            <Profile />
          </div>
          <div className={cx('navbar-box')}>
            <NavHeader activeTab={tab} />
          </div>
        </section>
      </header>
      <div className={cx('content-box')}>
        {type ? blogsByType && renderListBlogs(blogsByType) : allBlogs && renderListBlogs(allBlogs)}
      </div>
    </div>
  );
}

export default Blog;
