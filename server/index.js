const devConfig = require("./configs/devConfig");

const app = require("./app");

let arguments = process.argv;
if (arguments.length == 2) {
  console.log("running DEV Server!!! ");
  return app.start(devConfig);
}

switch (arguments[2].toUpperCase()) {
  case "DEV":
    console.log("running DEV Server!!! ");
    return app.start(devConfig);

  default:
    return app.start(devConfig);
}
