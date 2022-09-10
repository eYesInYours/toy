const express = require('express')
const app = express()

app.get('/',(request,response) => {
    response.setHeader('Access-Control-Allow-Origin','*');
    response.send('hello lyric')
})

app.listen(5500,() => {
    console.log('服务已经启动，5500端口监听中')
})