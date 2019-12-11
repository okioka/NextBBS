import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

// コメントデータ
export let data = [
// テストデータ
// {id: 1, author: "ユーザー１", text: "初投稿" date: "2020/01/01"},
// {id: 2, author: "ユーザー２", text: "２つ目の投稿" date: "2020/01/01"}
];
      
// コメントボックス
export class CommentBox extends React.Component {
  render() {
    // コメントリストにデータを渡して表示
    return ( 
      <div className="CommentBox">
        <CommentList data={this.props.data} />
      </div>
    )
  }
}
      
// コメントリスト
class CommentList extends React.Component {
  render() {
    // 
    const commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} id={comment.id} date={comment.date} key={comment.id}>
          {comment.text}
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
export class CommentForm extends React.Component {
  // 投稿処理 
  post() {
    let now = new Date();
    let id = data.length + 1
    let name = document.getElementById("name").value
    let comment = document.getElementById("comment").value
    // 入力チェック
    if (name    === "" || name    === null ||
        comment === "" || comment === null) { 
      alert("未入力の項目があります")
      return false
    }
    // 投稿内容を登録
    data.push({id: id, author: name, text: comment, date : now.toLocaleString()})
    this.setState({data: data})
    // コメントを再レンダリング
    ReactDOM.render(
      <CommentBox data={data} />,
      document.getElementById('content')
    );  
    // 投稿が完了したら投稿フォームを初期化する 
    document.getElementById("name").value = ""
    document.getElementById("comment").value = ""
    return true       
  }
  render() {
    return (
      <div className="commentForm">
        <h2>投稿フォーム</h2>
        <p><input type="text" id="name" name="name" placeholder="名前" /></p>       
        <p><textarea id="comment" name="comment" cols="60" rows="15" maxLength="80" wrap="hard" placeholder="本文" /></p>
        <p><button className="btn" onClick={this.post.bind(this)}>投稿</button></p>
      </div>
    );
  }
}

// コメント
class Comment extends React.Component {
  // TODO:コメント削除はSQLじゃないとできないからあとで作成
  delete(id) {  
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
          {this.props.id} . {this.props.author} . {this.props.date}　
          <button>削除</button>
        </h3>
        {newLineTexts()}
      </div>
    );
  }
}
    

