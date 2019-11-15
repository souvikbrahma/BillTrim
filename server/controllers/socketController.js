const { io } = require("../app");

io.on("connection", async function(socket) {
  try {
    socket.on("ConnectedUser", async function(data) {});
  } catch (cause) {
    console.log(cause);
  }
});
