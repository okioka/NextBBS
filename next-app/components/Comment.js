import css from "../public/styles.scss"
import axios from 'axios'

// コメント
export default class Comment extends React.Component {
  // 投稿削除処理
  delete() {
    const url  = "http://localhost:5000/delete"
    const id   = this.props.id
    const data = {id: id}
    const ret  = confirm("投稿を削除しますか？")
    // 確認ダイアログでいいえを選択した場合は処理を終了する
    if(ret === false) {
      return false;
    }
    // 投稿削除
    axios.post(url, data).then(res => {
    })
    .catch(error => {
      arelt("投稿の削除に失敗しました")
      console.log("投稿削除NG")
      console.log(error)
    });
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
          <button className={css.btn_small} onClick={this.delete.bind(this)}>削除</button>
        </h3>
        {newLineTexts()}
      </div>
    );
  }
}