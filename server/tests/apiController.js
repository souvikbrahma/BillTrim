const axios = require("axios");


class ApiController {
    constructor(WEBSERVER_PORT) {
        this.url = "http://localhost:" + WEBSERVER_PORT + "/api/";
    }

    postToServer(api, data) {
        return new Promise(async (resolve, reject) => {
            try {
                var res = await axios.post(this.url + api, data);
                return resolve(res.data);
            } catch (cause) {
                reject(cause);
            }

        });

    }

    getFromServer(api, data) {
        return new Promise(async (resolve, reject) => {
            try {
                var res = await axios.get(this.url + api, {
                    params: data
                });
                return resolve(res.data);

            } catch (cause) {
                reject(cause);
            }

        });

    }

}



module.exports = ApiController;