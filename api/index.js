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
var port = process.env.PORT || 3000; 

// SELECTした結果をjsonで返す
app.get('/', function(req, res){
    connection.query('select * from posts', function (error, posts, fields) {
        if (error) throw error;
        res.json({
            post: posts
        });
    });
});

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);