module.exports = {
  cors: {
    enabled: true,
    origin:'http://127.0.0.1:42769',
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Content-Type", "token"],
    credentials: true,
  },
};




