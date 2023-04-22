import { useRef } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchReplyBlogComment } from '~/modules/BlogDetail/blogDetailSlice';
import classNames from 'classnames/bind';
import styles from '../BlogDetail.module.scss';

const cx = classNames.bind(styles);

const CommentReplyItem = ({ parentCommentId, userInfo, setReRender }) => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const commentReplyInputRef = useRef();
  const userWalletAddress = localStorage.getItem('eth_address');

  const handleReplyComment = (e) => {
    e.preventDefault();

    const commentValue = commentReplyInputRef.current.value;
    if (commentValue === '') {
      toast.info('Please enter comment !!');
    } else {
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
          parentCommentId: parentCommentId,
        };
        dispatch(fetchReplyBlogComment(newComment));
        setReRender((reRender) => !reRender);
        commentReplyInputRef.current.value = '';
      }
    }
  };

  return (
    <Form reply className={cx('comment-reply')}>
      <input className={cx('comment-input')} ref={commentReplyInputRef} required={true}></input>
      <Button content="Reply" labelPosition="left" icon="edit" primary onClick={(e) => handleReplyComment(e)} />
    </Form>
  );
};

export default CommentReplyItem;
