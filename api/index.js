// ライブラリ読み込み
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
const cors = require('cors')

// データベースに接続
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'BBS'
});

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public'));

// port番号を指定
var port = process.env.PORT || 5000; 

// SELECTした結果をjsonで返す
app.get('/', function(req, res){
  const sql = "SELECT id, user, comment, DATE_FORMAT(post_date, '%Y/%m/%d %H:%i:%S') AS post_date FROM posts WHERE delete_flg = '0'"
  connection.query(sql, function (error, posts, fields) {
    if (error) throw error;
      res.json({
        posts
      });
  });
});

// postを受け取りINSERTする
app.post('/post', function(req, res){
  const user    = req.body.user
  const comment = req.body.comment
  const sql     = "INSERT INTO posts VALUES(0, '" + user + "', '" + comment + "', DEFAULT, 0)"
  connection.query(sql, function (error, posts, fields) {
    if (error) throw error;
  });
});

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);