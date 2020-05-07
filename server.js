const app = require("./app");
const Messages = require('./models/messages');

const server = app.listen(3001, () => {
  console.log('connected successfully to port 3001');
});

const io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log(socket.id)
  socket.on('SEND_MESSAGE', async function(data) {
    console.log(data);
      io.emit('MESSAGE', data);
      const msg = await new Messages(data).save();
      console.log(msg);
  });
});
