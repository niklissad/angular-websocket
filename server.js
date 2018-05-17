const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

let id = 0;

const generatePhone = () => {
    return `+380${Math.floor(Math.random() * 100000000)}`;
};

const generateRate = () => {
    return Math.floor(Math.random() * 5 + 1);
};

const generateNewOrder = () => {

    const order = {
        order_id: ++id,
        driver_phone: generatePhone(),
        pass_phone: generatePhone(),
        rating: generateRate()
    };
    return order;
};

const connectionsPool = [];

setInterval(() => {

    if (connectionsPool.length > 0) {
        io.emit('new-order', generateNewOrder());
    }

}, 10000);

io.on('connection', (socket) => {

    console.log('[INFO] Client connected');

    connectionsPool.push(true);

    socket.on('disconnect', () => {
        console.log('[INFO] Client disconnected');
        connectionsPool.shift();
    });
});

http.listen(port, function(){
    console.log(`ws listening on *:${port}`);
});

app.use('/static', express.static(__dirname + '/client/dist/orders'));

app.get('*', function(req, res){
    res.sendFile(__dirname + '/client/dist/orders/index.html');
});