import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs } from '~/modules/Blog/blogSlice';
import {
  allBlogsSelector,
  baocaoBlogsSelector,
  phantichBlogsSelector,
  quydautuBlogsSelector,
  detailBlogSelector,
} from '~/modules/Blog/selector';
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
  const dispatch = useDispatch();
  const allBlogs = useSelector(allBlogsSelector);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, []);

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
            <NavHeader />
          </div>
        </section>
      </header>
      <div>{allBlogs && renderListBlogs(allBlogs)}</div>
    </div>
  );
}

export default Blog;
