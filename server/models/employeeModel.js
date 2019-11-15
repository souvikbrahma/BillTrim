var mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  JobRole: {
    type: String,
    required: true,
    enum: ["Project Manager", "Developer"]
  },
  Birthday: {
    type: Date,
    required: true
  },
  JoiningDate: {
    type: Date
  },
  Email: {
    type: String
  },
  Address: {
    type: String
  },
  PhoneNumber: {
    type: Number,
    required: true
  },
  LinkedInUrl: {
    type: String
  },
  FbUrl: {
    type: String
  },
  Wife: {
    type: String
  },
  Kids: {
    type: String
  },
  Vacations: [
    {
      FromDate: {
        type: Date,
        required: true
      },
      ToDate: {
        type: Date,
        required: true
      }
    }
  ],
  WorkFromHomes: [
    {
      Date: {
        type: Date,
        required: true
      },
      Reason: {
        type: String,
        required: true
      }
    }
  ],
  ResumeFile: [
    {
      type: String
    }
  ],
  XCompanyPaySlip: [
    {
      type: String
    }
  ],
  SignedOfferLeter: [
    {
      type: String
    }
  ],
  CreatedOn: {
    type: Date,
    default: new Date()
  },
  LastUpdatedOn: {
    type: Date,
    default: new Date()
  },
  IsDeleted: {
    type: Boolean,
    default: false
  }
});

var Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
