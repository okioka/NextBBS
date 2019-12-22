import React from 'react';
import axios from 'axios';
import css from "../public/styles.scss"

// コメントボックス
export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 投稿
      posts: [
      ],
    };
    this.viewCom()
  } 
  // 投稿を取得しstateにsetする
  viewCom() {
    const url = "http://localhost:5000/";
    axios.get(url).then(res => {
      const posts = res.data["posts"]
      this.setState({posts: posts})
    }).catch(error => {
      console.log("表示異常")
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
      
// コメントリスト
class CommentList extends React.Component {
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

// 投稿フォーム
class CommentForm extends React.Component {
  // 投稿処理 
  post() {
    const url       = "http://localhost:5000/post";
    let name        = document.getElementById("name").value
    let comment     = document.getElementById("comment").value
    const data      = {user: name, comment: comment}
    // 入力チェック
    if (name    === "" || name    === null ||
        comment === "" || comment === null) { 
      alert("未入力の項目があります")
      return false
    }
    // 投稿が完了したら投稿フォームを初期化する 
    document.getElementById("name").value = ""
    document.getElementById("comment").value = ""
    // 投稿内容を登録
    axios.post(url, data).then(res => {
      console.log("投稿OK")
    })
    .catch(error => {
      console.log("投稿異常")
      console.log(error)
    });
  }
  render() {
    return (
      <div className="commentForm">
        <h2>投稿フォーム</h2>
        <p><input type="text" id="name" name="name" placeholder="名前" /></p>       
        <p><textarea id="comment" name="comment" cols="60" rows="15" maxLength="80" wrap="hard" placeholder="本文" /></p>
        <p><button className={css.btn} onClick={this.post.bind(this)}>投稿</button></p>
      </div>
    );
  }
}

// コメント
class Comment extends React.Component {
  // 削除処理
  delete() {

  }
  render() {
    // 投稿本文の改行コードを<br>タグに置き換える
    const newLineTexts = () => {
      if (typeof(this.props.children) === "string") {
        return this.props.children.split("\n").map((m,i) => <span key={i}>{m}<br/></span>)
      } else {
        return ""
      }
    }
    // ユーザー名とコメント表示
    return (
      <div className="comment">
        <h3 className="commentAuthor">
          {this.props.id} . {this.props.user} . {this.props.post_date}　
          <button>削除</button>
        </h3>
        {newLineTexts()}
      </div>
    );
  }
}

    

