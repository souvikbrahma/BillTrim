var AdmZip = require('adm-zip');
var path = require("path")

var TEMP_DIR = path.join(__dirname, "..", "tempFiles")
var UPLOAD_DIR = path.join(__dirname, "..", "public", "uploadedFiles");
var fs = require("fs-extra")

function run(zipFileName, rolls) {
    return new Promise(async (resolve, reject) => {
        try {
            var mediaDir = path.join(TEMP_DIR, zipFileName);
            for (var rollIndex = 0; rollIndex < rolls.length; rollIndex++) {
                var roll = rolls[rollIndex];
                var rollDir = path.join(mediaDir, roll.RollNumber.toString());
                await fs.ensureDir(rollDir);
                if (typeof roll.LeftPhoto !== "undefined")
                    await fs.copy(path.join(UPLOAD_DIR, roll._id.toString(), "LeftPhoto"), path.join(rollDir, "LeftPhoto.jpg"))

                if (typeof roll.FrontPhoto !== "undefined")
                    await fs.copy(path.join(UPLOAD_DIR, roll._id.toString(), "FrontPhoto"), path.join(rollDir, "FrontPhoto.jpg"))

                if (typeof roll.RightPhoto !== "undefined")
                    await fs.copy(path.join(UPLOAD_DIR, roll._id.toString(), "RightPhoto"), path.join(rollDir, "RightPhoto.jpg"))
            }
            var zip = new AdmZip();
            await zip.addLocalFolder(mediaDir, zipFileName);
            await zip.writeZip(path.join(TEMP_DIR, zipFileName + ".zip"))
            await fs.remove(path.join(TEMP_DIR, zipFileName));
            resolve(path.join(TEMP_DIR, zipFileName + ".zip"));
        } catch (cause) {
            reject(cause);
        }

    });
}


module.exports = {
    run
}