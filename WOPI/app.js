var path = require('path');
var express = require('express');
var app = express();
var fs = require('fs');
var crypto = require('crypto');
 
// checkfileinfo方法
app.get('/wopi/files/:filename',function(req,res){
	res.append('Content-Type', 'text/json');
  var filename = req.params.filename;// 获取文件名
  var filePath = path.resolve(__dirname, filename)
	var stats = fs.statSync(filePath);
	var fileSize = stats.size;// 文件大小，以字节为单位
	var birthtime = stats.birthtime;// 文件创建时间
	var sha256;// 经过加密的哈希值
	var filedata = fs.readFileSync(filePath);
	sha256 = crypto.createHash('sha256').update(filedata).digest('base64');
	var result = {
		'BaseFileName': filename,
		'OwnerId': 'digibird',
		'Size': fileSize,
		'SHA256': sha256,
		'Version': birthtime
	};
	res.send(result);
});
 
// getfile方法
app.get('/wopi/files/:filename/contents', function(req,res) {
	var filename = req.params.filename; // 获取文件名
  var filePath = path.resolve(__dirname, filename)
  res.sendFile(filePath)
});

// 设置端口号
app.listen(9123, e => {
  console.log(`服务启动成功, 监听端口: 9123`)
});
