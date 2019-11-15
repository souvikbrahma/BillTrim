var Promise = require("bluebird");


function isSessionValid(req) {
    return new Promise(async (resolve, reject) => {
        try {

            if (typeof req.session === "undefined")
                return resolve(false);

            var userId = req.session.userid;
            if (typeof userId === "undefined")
                return resolve(false);


            var user = req.session.user;
            if (typeof user === "undefined")
                return resolve(false);

            return resolve(true);

        } catch (cause) {
            return reject(cause);
        }


    });
}

function logout(req) {
    return new Promise(async (resolve, reject) => {
        try {
            if (typeof req.session === "undefined")
                resolve(true)



            req.session.destroy(err => {
                if (err)
                    return reject(err);

                return resolve(true)

            });


        } catch (cause) {
            reject(cause)
        }
    });
}






module.exports = {
    isSessionValid,
    logout

}