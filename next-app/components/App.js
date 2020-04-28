import React from 'react'
import axios from 'axios'
import CommentList from './CommentList.js'
import CommentForm from './CommentForm.js'

// コメントボックス
export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 投稿
      posts: [],
    };
    this.viewCom()
  }
  // 投稿を取得しstateにsetする
  viewCom() {
    const url = "http://localhost:5000/"
    axios.get(url).then(res => {
      const posts = res.data["posts"]
      this.setState({posts: posts})
    }).catch(error => {
      alert("投稿の表示ができません")
      console.log("投稿表示NG")
      console.log(error)
    })
  }
  render() {
    // コメントリストにデータを渡して表示
    return (
      <div className="CommentBox">
        <CommentList data={this.state.posts} />
        <CommentForm data={this.state.posts} viewCom={this.viewCom()} />
      </div>
    )
  }
}