// ライブラリ読み込み
const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')
const cors       = require('cors')
const mysql      = require('mysql')
const dbCon      = require('./DB/dbConnection.js')

// データベースに接続
const connection = mysql.createConnection(dbCon.dbConnection)

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))

// port番号を指定
const port = process.env.PORT || 5000

// 投稿を取得しjsonで返す
app.get('/', function(req, res){
  const sql = "SELECT id, user, comment, DATE_FORMAT(post_date, '%Y/%m/%d %H:%i:%S') AS post_date FROM posts WHERE delete_flg = '0'"
  connection.query(sql, function (error, posts, fields) {
    if (error) throw error
      res.json({
        posts
      })
  })
})

// 新規投稿を登録する
app.post('/post', function(req, res){
  const user    = req.body.user
  const comment = req.body.comment
  const sql     = "INSERT INTO posts VALUES(0, ?, ?, DEFAULT, 0)"
  connection.query(sql, [user, comment], function (error, posts, fields) {
    if (error) throw error
  })
})

// 削除ボタンを押した投稿の削除フラグを立てる
app.post('/delete', function(req, res){
  const id = req.body.id
  const sql     = "UPDATE posts SET delete_flg = '1' WHERE id = ?"
  connection.query(sql, [id], function (error, posts, fields) {
    if (error) throw error
  })
})

//サーバ起動
app.listen(port)
console.log('listen on port ' + port)