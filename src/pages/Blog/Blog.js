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
import Profile from './components/NavHeader/Profile';
import NavHeader from './components/NavHeader/NavHeader';
import SearchBar from './components/NavHeader/SearchBar';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';

const cx = classNames.bind(styles);

function Blog() {
  // const [blogs, setBlogs] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allBlogs = useSelector(allBlogsSelector);

  const getBlogs = async () => {};

  // useEffect(async () => {
  //   await getBlogs();
  // }, []);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch, null]);

  return (
    <div className={cx('wrapper')}>
      {console.log(allBlogs)}

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
    </div>
  );
}

export default Blog;
