import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoSelector } from '~/modules/user/auth/selectors';
import { fetchGetUserInfo } from '~/modules/user/auth/authSlice';
import { fetchCreateBlogComment } from '~/modules/BlogDetail/blogDetailSlice';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import CommentItem from './CommentItem';
import classNames from 'classnames/bind';
import styles from '../BlogDetail.module.scss';

const cx = classNames.bind(styles);

const CommentPart = ({ commentList, reRender, setReRender }) => {
  const { blogId } = useParams();
  const commentInputRef = useRef();
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoSelector);
  const userWalletAddress = localStorage.getItem('eth_address');

  const handleClickAddComment = (e) => {
    e.preventDefault();

    const commentValue = commentInputRef.current.value;
    if (commentValue === '') {
      toast.info('Please enter comment !!');
    } else {
      // check if userInfo is an empty object {}
      if (Object.keys(userInfo).length == 0) {
        toast.info('Please sign in to comment !!');
      } else {
        const newComment = {
          blogId: blogId,
          userId: userInfo._id,
          userAvatar: userInfo.avatar,
          userFullName: userInfo.fullName,
          content: commentInputRef.current.value,
        };
        dispatch(fetchCreateBlogComment(newComment));
        setReRender((reRender) => !reRender);
        commentInputRef.current.value = '';
      }
    }
  };

  useEffect(() => {
    dispatch(fetchGetUserInfo(userWalletAddress));
  }, [reRender]);

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      {commentList && commentList.map((comment, index) => <CommentItem comment={comment} key={index} />)}
      <Form reply>
        <input className={cx('comment-input')} ref={commentInputRef} required={true}></input>
        <div className={cx('comment-button')}>
          <Button
            content="Add Comment"
            labelPosition="left"
            icon="edit"
            primary
            onClick={(e) => handleClickAddComment(e)}
          />
        </div>
      </Form>
    </Comment.Group>
  );
};

export default CommentPart;
