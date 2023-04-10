import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllBlogs } from './blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  allBlogsSelector,
  baocaoBlogsSelector,
  phantichBlogsSelector,
  quydautuBlogsSelector,
  detailBlogSelector,
} from './selector';
import Profile from './components/Profile';
import NavHeader from './components/NavHeader';
import SearchBar from './components/SearchBar';
import BlogItem from './components/BlogItem';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
import httpRequest from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function Blog() {
  const [blogs, setBlogs] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const allBlogs = useSelector(allBlogsSelector);

  const getBlogs = async () => {
    const response = await httpRequest.get('/blog/all?type=bao-cao');
    setBlogs(response.data.data);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  // useEffect(async () => {
  //   dispatch(fetchAllBlogs());
  //   console.log(allBlogs);
  // }, [dispatch, null]);

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
      <div>{blogs && renderListBlogs(blogs)}</div>
    </div>
  );
}

export default Blog;
