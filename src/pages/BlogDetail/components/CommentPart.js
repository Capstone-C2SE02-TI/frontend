import { useParams } from 'react-router-dom';
import { useRef, useEffect } from 'react';
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

const CommentPart = ({ commentList, setReRender }) => {
  const { blogId } = useParams();
  const commentInputRef = useRef();
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoSelector);
  const userWalletAddress = localStorage.getItem('eth_address');

  const handleComment = (e) => {
    e.preventDefault();

    const commentValue = commentInputRef.current.value;
    if (commentValue === '') {
      toast.info('Please enter comment !!');
    } else {
      // check userInfo is {}
      if (Object.keys(userInfo).length == 0) {
        toast.info('Please sign in to comment !!');
      } else {
        const newComment = {
          blogId: blogId,
          userId: userInfo._id,
          userWalletAddress: userWalletAddress,
          userAvatar: userInfo.avatar,
          userFullName: userInfo.fullName,
          content: commentValue,
        };
        dispatch(fetchCreateBlogComment(newComment));
        setReRender((reRender) => !reRender);
        commentInputRef.current.value = '';
      }
    }
  };

  useEffect(() => {
    dispatch(fetchGetUserInfo(userWalletAddress));
  }, []);

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      {commentList &&
        commentList.map((comment, index) => (
          <CommentItem comment={comment} userInfo={userInfo} setReRender={setReRender} key={index} />
        ))}
      <Form reply>
        <input className={cx('comment-input')} ref={commentInputRef} required={true}></input>
        <div className={cx('comment-button')}>
          <Button content="Comment" labelPosition="left" icon="edit" primary onClick={(e) => handleComment(e)} />
        </div>
      </Form>
    </Comment.Group>
  );
};

export default CommentPart;
