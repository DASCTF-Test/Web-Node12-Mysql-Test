var express = require('express');
var router = express.Router();
const connection = require('../mysql');//导入mysq配置文件

// 创建一个connection连接
// https://www.jianshu.com/p/d7d1ea38b3a3
connection.connect(function(err) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('[connection connect]  succeed!'); // 如果连接成功 控制台输出 success 了
});

/* GET home page. */
router.get('/', function(req, res, next) {
    var id = req.query.id;
    var sql = "select * from users where id = " + id;
    connection.query(sql, function(err, rows, fields) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        console.log(rows);
        res.render('index', { 'title': 'Express', result: rows[0].id + "|" + rows[0].username});
    });
});

module.exports = router;
