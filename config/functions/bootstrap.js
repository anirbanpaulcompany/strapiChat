module.exports = () => {

    
    const io = require("socket.io")(strapi.server, {
        cors: {
            origin:'http://127.0.0.1:42769',
            methods: ["GET", "POST"],
            allowedHeaders: ["Authorization", "Content-Type", "token"],
            credentials: true,
            enabled: true,
          },
        });
  
    strapi.io = io;
  
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);
    
        socket.on('chat', (data) => {
          console.log(`Received message from user ${socket.id}: ${data.message}`);
    
          io.to(socket.id).emit('chat', { sender: 'Server', message: data.message });
        });
    
        socket.on('disconnect', () => {
          console.log(`User disconnected: ${socket.id}`);
        });
      });
    };
  