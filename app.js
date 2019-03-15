var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var util = require('util');
var formidable = require('formidable');


var path = require('path')

//引用bodyParser 这个不要忘了写
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == 'OPTIONS') {
        //让options请求快速返回
        res.sendStatus(200);
    } else {
        next();
    }
});
var questions = [
    {
        data: 213,
        num: 444,
        age: 12
    },
    {
        data: 456,
        num: 678,
        age: 13
    }];
//写个接口123
app.get('/123', function (req, res) {
    res.status(200),
        res.json(questions)
});
app.post('/wdltest', function (req, res) {

    // fs.readFile('./img', function (err, res) {
    //     if (err) {
    //         // 错误处理
    //         console.log(err, 'err-----')
    //         return;
    //     }
    //     var base64str = new Buffer(res).toString('base64');  // 图片转换为字节

    //     fs.writeFileSync('copy.jpg', base64str);                // 字节流保存为图片

    //     console.log(data, 'data--------------------')
    // })

    // console.log(req.body, '------', req.file);
    // fs.writeFile('img', req.body, (err) => {
    //     // 如果文件写入失败，则报错 
    //     if (err) return console.log('写入文件失败！' + err.message)
    //     console.log('文件写入成功!')
    // })

    // 解析一个文件上传
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = './img';//手动设置默认上传tmp目录，可以通过fs.rename更改

    form.parse(req, function (err, fields, files) {
        //   res.write('received upload:\n\n');
        //   res.writeHead(200, {'content-type': 'text/plain,charset=utf-8;'});
          console.log(fields, '-----', files.file.name)
        //   res.end(util.inspect({fields: fields, files: files}));
        fs.renameSync(files.file.path, form.uploadDir+'/'+files.file.name);
        res.json({ "newPath": '----' })
    });
})
//配置服务端口
var server = app.listen(3000, function () {

    var host = server.address().address;

    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})


// http 创建服务

// var formidable = require('formidable');
// var http = require('http');
// var util = require('util');

// http.createServer(function (req, res) {
//     if (req.url == '/wdltest' && req.method.toLowerCase() == 'post') {
//         // 解析一个文件上传
//         var form = new formidable.IncomingForm();
//         //设置编辑
//         form.encoding = 'utf-8';
//         //设置文件存储路径
//         form.uploadDir = './img';//手动设置默认上传tmp目录，可以通过fs.rename更改
//         form.parse(req, function (err, fields, files) {
//             res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8;' });
//             res.write('received upload:\n\n');
//             console.log(req, '-----', fields, files.upload, '-----', files)
//             res.end(util.inspect({ fields: fields, files: files }));
//         });
//         return;
//     }

//     // show a file upload form
//     res.writeHead(200, { 'content-type': 'text/html' });
//     res.end(
//         '<form action="/upload" enctype="multipart/form-data" method="post">' +
//         '<input type="text" name="title"><br>' +
//         '<input type="file" name="upload" multiple="multiple"><br>' +
//         '<input type="submit" value="Upload">' +
//         '</form>'
//     );
// }).listen(3000);