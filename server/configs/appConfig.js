module.exports = {
  NAME: "REMOTE_AR",
  MODELS: [require("../models/employeeModel")],
  ROUTES: [
    {
      NAME: "employee",
      ROUTE: require("../routes/employeeRoute")
    }
  ]
};
