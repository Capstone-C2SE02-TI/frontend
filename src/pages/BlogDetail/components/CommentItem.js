import { Comment } from 'semantic-ui-react';

const CommentItem = ({ comment }) => {
  const { avatar, name, createdAt, content } = comment;

  return (
    <Comment>
      <Comment.Avatar src={avatar} />
      <Comment.Content>
        <Comment.Author as="a">{name}</Comment.Author>
        <Comment.Metadata>
          <div>{createdAt}</div>
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
