function sendToClient(socketId, topic, data) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(socketId);
      const { io } = require("../app");
      io.sockets.to(socketId).emit(topic, data);
      return resolve(true);
    } catch (cause) {
      reject(cause);
    }
  });
}

module.exports = {
  sendToClient
};
