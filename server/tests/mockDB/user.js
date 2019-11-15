const userController = new (require("../../controllers/userController"))();
const axios = require("axios");

const _ = require("lodash");

function removeAll() {
  return new Promise(async (resolve, reject) => {
    try {
      await userController.Model.deleteMany({}).exec();
      return resolve("all users deleted");
    } catch (cause) {
      reject(cause);
    }
  });
}

function add(UserGroup, Name, UserName, Password) {
  return new Promise(async (resolve, reject) => {
    try {
      let User = await userController.create({
        UserGroup,
        Name,
        UserName,
        Password
      });
      return resolve(User);
    } catch (cause) {
      reject(cause);
    }
  });
}

function read(UserId) {
  return new Promise(async (resolve, reject) => {
    try {
      let User = await userController.read({
        _id: UserId
      });
      return resolve(User);
    } catch (cause) {
      reject(cause);
    }
  });
}

function remove(UserId) {
  return new Promise(async (resolve, reject) => {
    try {
      await userController.removeById(UserId);
      return resolve(true);
    } catch (cause) {
      reject(cause);
    }
  });
}

function isExists(UserName) {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await userController.fetch({});
      let res = _.find(users, user => {
        return user.UserName == UserName;
      });

      return resolve(typeof res !== "undefined");
    } catch (cause) {
      reject(cause);
    }
  });
}

function login(UserName, Password, PORT) {
  return new Promise(async (resolve, reject) => {
    try {
      let url = "http://localhost:" + PORT + "/api/user/login";
      let res = await axios.post(url, {
        UserName,
        Password
      });
      if (res.data.statusCode != 0) return reject("LOGIN FAILED");

      return resolve("LOGIN SUCCESS");
    } catch (cause) {
      reject(cause);
    }
  });
}

function logout(PORT) {
  return new Promise(async (resolve, reject) => {
    try {
      let url = "http://localhost:" + PORT + "/api/user/logout";
      let res = await axios.post(url);
      if (res.data.statusCode != 0) return reject("LOGOUT FAILED");

      return resolve("LOGOUT SUCCESS");
    } catch (cause) {
      reject(cause);
    }
  });
}

module.exports = {
  removeAll,
  add,
  isExists,
  read,
  remove,
  login,
  logout
};
