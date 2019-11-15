function checkIsValidJson(data) {
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof data === "undefined") return reject("data required");
      if (typeof data !== "object") return reject("data need to be object");
      return resolve(true);
    } catch (cause) {
      reject(cause);
    }
  });
}

function checkIsValidArray(data) {
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof data === "undefined") return reject("data required");
      if (data.constructor !== Array) return reject("data need to be array");
      return resolve(true);
    } catch (cause) {
      reject(cause);
    }
  });
}

function checkIsValidString(data) {
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof data === "undefined") return reject("data required");
      if (typeof data.length === "undefined")
        return reject("data needs to be string");
      return resolve(true);
    } catch (cause) {
      reject(cause);
    }
  });
}

function checkIsValidDate(data) {
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof data === "undefined") return reject("data required");
      if (data instanceof Date && !isNaN(data)) return reject("invalid date");
      return resolve(true);
    } catch (cause) {
      reject(cause);
    }
  });
}

module.exports = {
  checkIsValidJson,
  checkIsValidArray,
  checkIsValidString,
  checkIsValidDate
};
