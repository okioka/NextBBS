import css  from "../public/styles.scss"
import App  from "../components/App.js"

const Index = () => (
  <div className={css.center}>
    <div className={css.back}>
      <h1>掲示板</h1>
      <div className={css.bbs}>
        <App />
      </div>
    </div>
  </div>
)

export default Index