const _ = require("lodash");

function getParameters(obj) {
  var parameters = [];
  if (typeof obj !== "object") return parameters;

  for (paramter in obj) parameters.push(paramter);

  return parameters;
}

function convertStringToArray(str, token) {
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof token === "undefined") token = ",";
      var array = _.split(str, token);

      array = array.map(element => {
        element = element.trim();
        if (typeof element === "undefined" || element.length == 0) {
          return reject("In valid String found");
        }
        return element;
      });

      return resolve(array);
    } catch (cause) {
      reject(cause);
    }
  });
}

function convertStringToJson(parametersString, valuesString) {
  return new Promise(async (resolve, reject) => {
    try {
      let parameters = await convertStringToArray(parametersString);
      let values = await convertStringToArray(valuesString);
      let json = await createJson(parameters, values);
      return resolve(json);
    } catch (cause) {
      reject(cause);
    }
  });
}

function areAllowed(paramtersString, allowedParametersArray) {
  return new Promise(async (resolve, reject) => {
    try {
      let parameters = await convertStringToArray(paramtersString);
      return resolve(
        _.difference(parameters, allowedParametersArray).length === 0
      );
    } catch (cause) {
      reject(cause);
    }
  });
}

function createJson(paramters, values) {
  return new Promise(async (resolve, reject) => {
    try {
      if (paramters.length != values.length) return reject("length mismatch");
      var result = {};
      for (var i = 0; i < paramters.length; i++) {
        var parameter = paramters[i];
        var value = values[i];
        result[parameter] = value;
      }
      return resolve(result);
    } catch (cause) {
      return reject(cause);
    }
  });
}

module.exports = {
  getParameters,
  createJson,
  convertStringToArray,
  convertStringToJson,
  areAllowed
};
