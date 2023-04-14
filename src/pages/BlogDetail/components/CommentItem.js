import { Comment } from 'semantic-ui-react';
import { convertDateToCreatedDate } from '~/helpers';

const CommentItem = ({ comment }) => {
  const { userAvatar, userWalletAddress, createdAt, content } = comment;

  return (
    <Comment>
      <Comment.Avatar src={userAvatar} />
      <Comment.Content>
        <Comment.Author as="a">{userWalletAddress.slice(0, 20) + '...'}</Comment.Author>
        <Comment.Metadata>
          <div>{convertDateToCreatedDate(createdAt)}</div>
        </Comment.Metadata>
        <Comment.Text>{content}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
};

export default CommentItem;
