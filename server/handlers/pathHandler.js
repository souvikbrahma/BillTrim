const path = require("path");
const fs = require("fs-extra");

function getImportedDocumentsDirPath() {
  return new Promise(async (resolve, reject) => {
    try {
      let resPath = path.join(__dirname, "..", "files", "imports", "documents");
      await fs.ensureDir(resPath);
      return resolve(resPath);
    } catch (cause) {
      reject(cause);
    }
  });
}

function getImportedMediaDirPath() {
  return new Promise(async (resolve, reject) => {
    try {
      let resPath = path.join(__dirname, "..", "files", "imports", "media");
      await fs.ensureDir(resPath);
      return resolve(resPath);
    } catch (cause) {
      reject(cause);
    }
  });
}

function getQrDirPath() {
  return new Promise(async (resolve, reject) => {
    try {
      let resPath = path.join(
        __dirname,
        "..",
        "files",
        "imports",
        "media",
        "userQrCode"
      );
      await fs.ensureDir(resPath);
      return resolve(resPath);
    } catch (cause) {
      reject(cause);
    }
  });
}

function getImportedMediaThumbnailDirPath() {
  return new Promise(async (resolve, reject) => {
    try {
      let resPath = path.join(
        __dirname,
        "..",
        "files",
        "imports",
        "mediaThumbnail"
      );
      await fs.ensureDir(resPath);
      return resolve(resPath);
    } catch (cause) {
      reject(cause);
    }
  });
}

function getExportedMediaDirPath() {
  return new Promise(async (resolve, reject) => {
    try {
      let resPath = path.join(__dirname, "..", "files", "exports", "media");
      await fs.ensureDir(resPath);
      return resolve(resPath);
    } catch (cause) {
      reject(cause);
    }
  });
}

function getExportedZipDirPath() {
  return new Promise(async (resolve, reject) => {
    try {
      let resPath = path.join(__dirname, "..", "files", "exports", "zips");
      await fs.ensureDir(resPath);
      return resolve(resPath);
    } catch (cause) {
      reject(cause);
    }
  });
}

function getExportedDocumentDirPath() {
  return new Promise(async (resolve, reject) => {
    try {
      let resPath = path.join(__dirname, "..", "files", "exports", "documents");
      await fs.ensureDir(resPath);
      return resolve(resPath);
    } catch (cause) {
      reject(cause);
    }
  });
}

function getAssetDirPath() {
  return new Promise(async (resolve, reject) => {
    try {
      let resPath = path.join(__dirname, "..", "files", "assets");
      await fs.ensureDir(resPath);
      return resolve(resPath);
    } catch (cause) {
      reject(cause);
    }
  });
}

function getChatAvatarDirPath() {
  return new Promise(async (resolve, reject) => {
    try {
      let resPath = path.join(
        __dirname,
        "..",
        "files",
        "imports",
        "media",
        "chatAvatar"
      );
      await fs.ensureDir(resPath);
      return resolve(resPath);
    } catch (cause) {
      reject(cause);
    }
  });
}

function getQrBgDirPath() {
  return new Promise(async (resolve, reject) => {
    try {
      let resPath = path.join(
        __dirname,
        "..",
        "files",
        "assets",
        "qrBackgrounds"
      );
      await fs.ensureDir(resPath);
      return resolve(resPath);
    } catch (cause) {
      reject(cause);
    }
  });
}

module.exports = {
  getImportedDocumentsDirPath,
  getImportedMediaDirPath,
  getExportedMediaDirPath,
  getQrBgDirPath,
  getExportedZipDirPath,
  getExportedDocumentDirPath,
  getImportedMediaThumbnailDirPath,
  getChatAvatarDirPath,
  getAssetDirPath,
  getQrDirPath
};
