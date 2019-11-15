const cors = require("cors");

module.exports = {
  MONGO_URL: "mongodb://localhost:27017/BILLTRIM_TEST",
  MIDDLE_WARES: [cors()],
  WEBSERVER_PORT: 8888,
  HANDLE_ERROR: console.error
};
