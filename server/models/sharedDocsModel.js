const mongoose = require("mongoose");
const mongoose_bcrypt = require("mongoose-bcrypt");
const _ = require("lodash");

var SharedDocsSchema = new mongoose.Schema({
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

var SharedDocs = mongoose.model("SharedDocs", SharedDocsSchema);
module.exports = SharedDocs;
