var connect = require('connect');
connect.createServer(
    connect.static('src')
).listen(8888);