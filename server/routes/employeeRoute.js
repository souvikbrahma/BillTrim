var express = require("express");
var path = require("path");
var employeeController = new (require("../controllers/employeeController"))();
var parameterHandler = require("../handlers/parameterHandler");
var fileHandler = require("../handlers/fileHandler");
var pathHandler = require("../handlers/pathHandler");
var statusHandler = require("../handlers/statusHandler");

var router = express();

router.post("/createEmployee", async (req, res, next) => {
  try {
    await parameterHandler.checkParametersValid(req.body, [
      "Name",
      "Birthday",
      "PhoneNumber",
      "JobRole",
      "Email"
    ]);
    let { Name, Birthday, PhoneNumber, JobRole, Email } = req.body;
    await employeeController.checkNotExists({ Name, PhoneNumber });
    let createdEmployee = await employeeController.create({
      Name,
      Birthday,
      PhoneNumber,
      JobRole,
      Email
    });
    return res.json(statusHandler.successMsg({ createdEmployee }));
  } catch (cause) {
    // console.log(cause);
    next(cause);
  }
});

router.get("/fetchEmployee", async (req, res, next) => {
  try {
    let employees = await employeeController.fetch({});

    return res.json(statusHandler.successMsg({ employees }));
  } catch (cause) {
    console.log(cause);
    next(cause);
  }
});

router.get("/readEmployee", async (req, res, next) => {
  try {
    await parameterHandler.checkParametersValid(req.query, ["EmployeeId"]);
    let { EmployeeId } = req.query;
    let employee = await employeeController.readById(EmployeeId);

    return res.json(statusHandler.successMsg({ employee }));
  } catch (cause) {
    console.log(cause);
    next(cause);
  }
});

router.post("/uploadEmployeeFiles", async (req, res, next) => {
  try {
    await parameterHandler.checkParametersValid(req.body, [
      "KeyName",
      "EmployeeId"
    ]);
    await parameterHandler.checkFileUploaded(req, ["Files"]);
    let { KeyName, EmployeeId } = req.body;

    let { Files } = req.files;

    await fileHandler.moveFileTo(
      Files,
      path.join(await pathHandler.getImportedDocumentsDirPath(), req.id)
    );
    let toUpdateData = {};
    toUpdateData[KeyName] = path.join(req.id + path.basename(Files.name));
    await employeeController.pushChildToArray(EmployeeId, toUpdateData);

    return res.json(statusHandler.successMsg("FIle Inserted Successfully"));
  } catch (cause) {
    // console.log(cause);
    next(cause);
  }
});

router.post("/updateEmployeeData", async (req, res, next) => {
  try {
    await parameterHandler.checkParametersValid(req.body, [
      "EmployeeId",
      "Value"
    ]);
    let { EmployeeId, Value } = req.body;

    await employeeController.updateById(EmployeeId, Value);

    return res.json(statusHandler.successMsg("Employee updated Successfully"));
  } catch (cause) {
    // console.log(cause);
    next(cause);
  }
});

module.exports = router;
