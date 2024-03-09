var http = require('http');
var spawn = require('child_process').spawn;

// 码云用
// token 保持和 码云 后台设置的一致
var createHandler = require('gitee-webhook-middleware');
var handler = createHandler({ path: '/webhook', token: 'webhook' });
// git用
// var handler = createHandler({ path: '/webhook', secret: 'webhook' });
// var createHandler = require('github-webhook-handler');

// 上面的 secret 保持和 GitHub 后台设置的一致
http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404;
        res.end('no such location');
    })
}).listen(6666);
handler.on('error', function (err) {
    console.error('Error:', err.message)
});
// 阅读上面代码,你会发现handler监听到push事件调用对应的函数,所以你要做的就是在函数中执行deploy.sh命令,你需要在index.js添加代码

// 修改push监听事件,用来启动脚本文件
// 码云是Push Hook， 而git是push
handler.on('Push Hook', function (event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref);

    runCommand('sh', ['./deploy.sh'], function( txt ){
        console.log(txt);
    });
});

// 启动脚本文件
function runCommand( cmd, args, callback ){
    var child = spawn( cmd, args );
    var resp = 'Deploy OK';
    child.stdout.on('data', function( buffer ){ resp += buffer.toString(); });
    child.stdout.on('end', function(){ callback( resp ) });
}
