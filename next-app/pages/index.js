import css from "../public/styles.scss"
import {data, CommentBox, CommentForm} from "../components/App.js"

const Index = () => (
  <div className={css.center}>
    <div className={css.back}>
      <h1>掲示板</h1>
      <div className={css.bbs}>
        <div id='content'><CommentBox data={data} /></div>
        <CommentForm /> 
      </div>
    </div>
  </div>
)

export default Index