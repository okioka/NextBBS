import Comment from './Comment.js'

// コメントリスト
export default class CommentList extends React.Component {
  render() {
    const commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment user={comment.user} id={comment.id} post_date={comment.post_date} key={comment.id}>
          {comment.comment}
        </Comment>
      )
    })
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    )
  }
}