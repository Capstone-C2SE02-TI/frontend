import { useState } from 'react';
import { Button, Comment, Form } from 'semantic-ui-react';
import { convertDateToCreatedDate } from '~/helpers';
import CommentReplyItem from './CommentReplyItem';
import classNames from 'classnames/bind';
import styles from '../BlogDetail.module.scss';

const cx = classNames.bind(styles);

const CommentItem = ({ comment, userInfo, reRender, setReRender }) => {
  const { _id, userAvatar, userWalletAddress, createdAt, content, children } = comment;
  const [isShowReply, setIsShowReply] = useState(false);

  const showReplyComment = (e) => {
    e.preventDefault();
    setIsShowReply(true);
  };

  const renderCommentReplyBlock = (children) => {
    return (
      <div className={cx('comment-reply-block')}>
        {children.map((comment) => {
          const { userAvatar, userWalletAddress, createdAt, content } = comment;
          return (
            <Comment>
              <Comment.Avatar src={userAvatar} />
              <Comment.Content>
                <Comment.Author as="a">{userWalletAddress.slice(0, 16) + '...'}</Comment.Author>
                <Comment.Metadata>
                  <div>{convertDateToCreatedDate(createdAt)}</div>
                </Comment.Metadata>
                <Comment.Text>{content}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action onClick={(e) => showReplyComment(e)}>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          );
        })}
      </div>
    );
  };

  return (
    <Comment>
      <Comment.Avatar src={userAvatar} />
      <Comment.Content>
        <Comment.Author as="a">{userWalletAddress.slice(0, 16) + '...'}</Comment.Author>
        <Comment.Metadata>
          <div>{convertDateToCreatedDate(createdAt)}</div>
        </Comment.Metadata>
        <Comment.Text>{content}</Comment.Text>
        <Comment.Actions>
          <Comment.Action onClick={(e) => showReplyComment(e)}>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
      {children && renderCommentReplyBlock(children)}
      {isShowReply && (
        <CommentReplyItem parentCommentId={_id} userInfo={userInfo} setReRender={setReRender} />
      )}
    </Comment>
  );
};

export default CommentItem;
