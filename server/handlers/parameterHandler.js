var statusHandler = require("./statusHandler");
const jsonHandler = require("./jsonHandler");
const _ = require("lodash");
var Promise = require("bluebird");
var fs = require("fs-extra");

var path = require("path");
var { getParameters } = require("../handlers/jsonHandler");

function checkParametersValid(_obj, _parameters) {
  var parametersMissing = [];

  _parameters.forEach(_parameter => {
    if (!_obj[_parameter]) {
      console.log(_parameter);
      parametersMissing.push(_parameter);
    }
  });

  if (parametersMissing.length > 0) {
    return Promise.reject(
      statusHandler.insufficientParameterMsg(
        "Parameters missing -> " + parametersMissing
      )
    );
  } else {
    return Promise.resolve();
  }
}

function checkFileUploaded(req, fileParameterName) {
  return new Promise(async (resolve, reject) => {
    try {
      if (req.files == null)
        return reject(
          "no files uploaded with parameterName -> " + fileParameterName
        );

      if (typeof req.files[fileParameterName] === "undefined")
        return reject("no file uploaded as " + fileParameterName);

      return resolve(true);
    } catch (cause) {
      reject(cause);
    }
  });
}

function checkParametersAllowed(paramtersData, allowedParametersArray) {
  return new Promise(async (resolve, reject) => {
    try {
      let parameters = await jsonHandler.convertStringToArray(paramtersString);
      return resolve(
        _.difference(parameters, allowedParametersArray).length === 0
      );
    } catch (cause) {
      reject(cause);
    }
  });
}

function checkHeadersValid(_obj, _parameters) {
  var parametersMissing = [];

  _parameters.forEach(_parameter => {
    if (!_obj[_parameter]) {
      parametersMissing.push(_parameter);
    }
  });

  if (parametersMissing.length > 0) {
    return Promise.reject(
      statusHandler.insufficientParameterMsg(
        "Headers missing -> " + parametersMissing
      )
    );
  } else {
    return Promise.resolve();
  }
}

module.exports = {
  checkFileUploaded,
  checkParametersValid,
  checkParametersAllowed,
  checkHeadersValid
};
