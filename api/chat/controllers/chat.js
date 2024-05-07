'use strict';


module.exports = {
  async sendMessage(ctx) {

    const { text, token } = ctx.request.body;
    
    console.log("messageee", ctx.request.body)
     
      try {
        const verifiedUser = await strapi.plugins['users-permissions'].services.jwt.verify(token);
      
        if (!verifiedUser) {
          return ctx.badRequest('Invalid or expired token');
        }

        const io = strapi.io;
        io.emit('chat',{ message: text });
  
        return ctx.send({ success: true });
      } catch (error) {
        console.error('Error sending message:', error);
        return ctx.badRequest('Failed to send message');
      }
    },

  async getChatData(ctx) {
    try {
      const io = strapi.io;
      io.on('chat', (data) => {
        console.log(`Received message from user ${data.sender}: ${data.message}`);
      });
      const chatData = { messages: [] };
      return ctx.send(chatData);
    } catch (error) {
      console.error('Error fetching chat data:', error);
      return ctx.badRequest('Failed to retrieve chat data');
    }
  }
};