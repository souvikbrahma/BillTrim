const pageController = new(require("../../controllers/pageController"))();
const _ = require("lodash");

function removeAll() {
    return new Promise(async (resolve, reject) => {
        try {
            await pageController.Model.deleteMany({}).exec();
            return resolve("all pages deleted");
        } catch (cause) {
            reject(cause);
        }
    });
}

function remove(pageId) {
    return new Promise(async (resolve, reject) => {
        try {
            await pageController.removeById(pageId);
            return resolve("page Deleted");
        } catch (cause) {
            reject(cause);
        }
    });
}

function add(PageName) {
    return new Promise(async (resolve, reject) => {
        try {
            let Page = await pageController.create({
                PageName
            });
            return resolve(Page);
        } catch (cause) {
            reject(cause);
        }
    });
}

function isExists(PageName) {
    return new Promise(async (resolve, reject) => {
        try {
            let pages = await pageController.fetch({});

            let res = _.find(pages, page => {
                return page.PageName == PageName;
            });
            return resolve(typeof res !== "undefined");
        } catch (cause) {
            reject(cause);
        }
    });
}

module.exports = {
    remove,
    removeAll,
    add,
    isExists
};