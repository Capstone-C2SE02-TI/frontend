import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogsByType } from '~/modules/Blog/blogSlice';
import { blogsByTypeSelector } from '~/modules/Blog/selector';
import { formatPublishDateTime } from '~/helpers';
import useQuery from '~/hooks/useQuery';
import Profile from './components/Profile';
import NavHeader from './components/NavHeader';
import BlogItem from './components/BlogItem';
import BlogReportItem from './components/BlogReportItem';
import BlogFirstItem from './components/BlogFirstItem';
import BlogVideoItem from './components/BlogVideoItem';
import BlogRight from './components/BlogRight';
import BlogFooter from './components/BlogFooter';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';

const cx = classNames.bind(styles);

// CSS for comment blog
const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = 'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);

function Blog() {
  const query = useQuery();
  const type = query.get('type');
  const [tab, setTab] = useState(type || 'report');
  const dispatch = useDispatch();
  const blogsByType = useSelector(blogsByTypeSelector);


  useEffect(() => {
    dispatch(fetchBlogsByType(type));
  }, [type]);

  const renderListBlogs = (blogs) => {
    return type === 'video'
      ? blogs.map((blog, index) => <BlogVideoItem blog={blog} key={index} />)
      : blogs.map((blog, index) => <BlogItem blog={blog} key={index} />);
  };

  const renderListReport = (blogs) => {
    return type === 'video'
      ? blogs.map((blog, index) => <BlogReportItem blog={blog} key={index} />)
      : blogs.map((blog, index) => <BlogReportItem blog={blog} key={index} />);
  };

  const renderListRight = (blogs) => {
    return type === 'video'
      ? blogs.map((blog, index) => <BlogRight blog={blog} key={index} />)
      : blogs.map((blog, index) => <BlogRight blog={blog} key={index} />);
  };

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
        <div className={cx('content-box--center')}>
          {/* {blogsByType && renderFirstReports(blogsByType)} */}
          <div className={cx('BlogReportFirstItem')}>
            <Link to={`/blog/detail/6432635be916d820284747d6`}>
              <div className={cx('BlogReportFirstItem-image')}>
                <img src='https://inventory.coin98.com/images/report h1_2022-pJbi3U7pMM3qNkdX.png' />
              </div>
              <h4 className={cx('BlogReportFirstItem-title')}>Báo cáo Thị trường gọi vốn Crypto nửa đầu năm 2022</h4>
              <h5 className={cx('BlogReportFirstItem-desc')}>Đây sẽ là một bài viết đặc biệt trong series Fundraising Spotlight</h5>
            </Link>
          </div>
          <div className={cx('content-box--item')}>
            {blogsByType && renderListReport(blogsByType)}

          </div>
        </div>
        <div className={cx('content-box--right')}>
          <h2>News</h2>
          <div className={cx('BlogReportFirstItemRight')}>
            <Link to={`/blog/detail/6432638ae916d820284747da`}>
              <div className={cx('BlogReportFirstItem-image')}>
                <img src='https://file.coin98.com/thumbnail/bao-cao-thi-truong-crypto-2021.png' />
              </div>
              <h4 className={cx('BlogReportFirstItem-title')}>Báo cáo Thị trường Crypto 2021 - Coin98 Insights</h4>
            </Link>
          </div>
          {blogsByType && renderListRight(blogsByType)}
        </div>
      </div>
      <div className={cx('container-fluid-footer')}>
        <BlogFooter />
      </div>
    </div>
  );
}

export default Blog;
