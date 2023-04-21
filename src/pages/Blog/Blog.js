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
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

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

      <div className={cx('content-box')}>{blogsByType && renderListBlogs(blogsByType)}</div>
      <PowerBIEmbed
        embedConfig={{
          type: "report", // Supported types: report, dashboard, tile, visual and qna
          id: "ab867951-2182-4d88-902e-ae047a3a5123",
          embedUrl: "https://app.powerbi.com/reportEmbed?reportId=ab867951-2182-4d88-902e-ae047a3a5123&groupId=7ae0bb22-58fa-474c-bd98-6c5a7901a8fb&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d",
          accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjJhMjk5ZmUtOGFkZS00MDY0LWIxYWYtZTk4N2Q2ZGNjZGIxLyIsImlhdCI6MTY4MTIxMzM3MCwibmJmIjoxNjgxMjEzMzcwLCJleHAiOjE2ODEyMTc4NzgsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUE1Q0ZWK1F6YTBDUGZVNTZLUU11enNySGhhdTV5OExrMStmdzUxeG9pZ3dLN1pvK2d6a2kvZmdFdEphYjR6VTZNYTNXbGFsSFRvSDNDcjd1Q3B0NC93S2RPZkNoT0pHRGxWeXAyMjFXTjN3WT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJIdXluaCIsImdpdmVuX25hbWUiOiJIaWV1IiwiaXBhZGRyIjoiMTAzLjE1Ni41OC4yMTIiLCJuYW1lIjoiSGlldSBIdXluaCIsIm9pZCI6ImVlODJmNmY4LTBjYjYtNDE4Yi1iNzU2LWE0NGY3ZmVhY2I5MCIsInB1aWQiOiIxMDAzMjAwMjkzM0ZFRUM0IiwicmgiOiIwLkFVb0FfcG1pWXQ2S1pFQ3hyLW1IMXR6TnNRa0FBQUFBQUFBQXdBQUFBQUFBQUFDSkFKSS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJETU5iRjlEWWdnMTY4aHFfalJsYXNxMlFtWVlBVW0teHA2cXdHNmUyTzdvIiwidGlkIjoiNjJhMjk5ZmUtOGFkZS00MDY0LWIxYWYtZTk4N2Q2ZGNjZGIxIiwidW5pcXVlX25hbWUiOiJIaWV1SHV5bmhAaGlldWh1eW5oODkwLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6IkhpZXVIdXluaEBoaWV1aHV5bmg4OTAub25taWNyb3NvZnQuY29tIiwidXRpIjoiMHFMSFM1NmdfRW1VZW93MGNTQXNBUSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.BXWPMjGxB9Quh3OOd0gSOIvET672TCRRxxnhVD29YXjjLVXJYXhQnW1LMnqSABu_aIRBQih9Qu3WBj7ixALBEs3v88IOx8KRL_xHHTKT0xPzq7SAyrA77E3fFCYFHHlIAs5_amh_5qcf0SY0-zzkyvTadUeDFu4kiqRmJCvEIou1SYjF4Qa7Dn4m95K9Ep84U71iBvkhHSsc4JJZfGJ9VeuhblOCoQOlILgN0S7jQWz9f4JmwpwDO5nDmEqct1gvMjjA51ezPSuxCD4Etg6NuT-CTx7RyaEqqgfamSj0xP6ErhEXwn2LyDX_2Ea8BL1sduNkIKHCKZd3tpvsf_nf3w",
          tokenType: models.TokenType.Aad,
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false,
              },
            },
            background: models.BackgroundType.Transparent,
          },
        }}
        eventHandlers={
          new Map([
            [
              "loaded",
              function () {
                console.log("Report loaded");
              },
            ],
            [
              "rendered",
              function () {
                console.log("Report rendered");
              },
            ],
            [
              "error",
              function (event) {
                console.log(event.detail);
              },
            ],
          ])
        }
        cssClassName={"report-style-class"}
        getEmbeddedComponent={(embeddedReport) => {
          window.report = embeddedReport;
        }}
      />
      <BlogFooter />
    </div>
  );
}

export default Blog;
