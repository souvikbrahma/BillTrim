var fs = require("fs-extra");
var Promise = require("bluebird");


var statusHandler = require("../handlers/statusHandler");

function readJsonContents(filePath) {
  return new Promise(async (resolve, reject) => {
    try {
      if ((await fs.pathExists(filePath)) == false)
        return reject(
          statusHandler.invalidParameteresMsg(
            "no such file named " + filePath + " exists"
          )
        );
      var fileContents = await fs.readJson(filePath);
      return resolve(fileContents);
    } catch (cause) {
      reject(cause);
    }
  });
}

function moveFileTo(file, dstPath) {
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof file === "undefined")
        return reject("file required")

      if (typeof file.mv === "undefined")
        return reject("file is not correct ")

      await file.mv(dstPath);

      return resolve(true)

    } catch (cause) {
      reject(cause)
    }

  });
}

module.exports = {
  readJsonContents,
  moveFileTo

};