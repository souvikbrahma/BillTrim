const userGroupController = new(require("../../controllers/userGroupController"))();
const _ = require("lodash");

function removeAll() {
  return new Promise(async (resolve, reject) => {
    try {
      await userGroupController.Model.deleteMany({}).exec();
      return resolve("all userGroups deleted");
    } catch (cause) {
      reject(cause);
    }
  });
}

function remove(userGroupId) {
  return new Promise(async (resolve, reject) => {
    try {
      await userGroupController.removeById(userGroupId);
      return resolve("userGroup Deleted");
    } catch (cause) {
      reject(cause);
    }
  });
}

function add(UserGroupName) {
  return new Promise(async (resolve, reject) => {
    try {
      let UserGroup = await userGroupController.create({
        UserGroupName
      });
      return resolve(UserGroup);
    } catch (cause) {
      reject(cause);
    }
  });
}

function read(userGroupId) {
  return new Promise(async (resolve, reject) => {
    try {
      let UserGroup = await userGroupController.readById(userGroupId);
      return resolve(UserGroup);
    } catch (cause) {
      reject(cause);
    }
  });
}

function isExists(UserGroupName) {
  return new Promise(async (resolve, reject) => {
    try {
      let userGroups = await userGroupController.fetch({});

      let res = _.find(userGroups, userGroup => {
        return userGroup.UserGroupName == UserGroupName;
      });
      return resolve(typeof res !== "undefined");
    } catch (cause) {
      reject(cause);
    }
  });
}

module.exports = {
  remove,
  read,
  removeAll,
  add,
  isExists
};