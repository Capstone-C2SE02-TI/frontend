import { Button, Comment, Form, Header } from 'semantic-ui-react';
import CommentItem from './CommentItem';

const CommentExampleComment = ({ commentList }) => {
  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      {commentList && commentList.map((comment) => <CommentItem comment={comment} />)}
      <Form reply>
        <Form.TextArea />
        <Button content="Add Comment" labelPosition="left" icon="edit" primary />
      </Form>
    </Comment.Group>
  );
};

export default CommentExampleComment;
