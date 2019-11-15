const app = require("../app");
const testConfig = require("../configs/testConfig")
const userGroup = require("./mockDB/userGroup");
const user = require("./mockDB/user");
const page = require("./mockDB/page");
const statusHandler = require("../handlers/statusHandler");
const PORT_TO_TEST = 4002;
const apiController = new(require("./apiController"))(PORT_TO_TEST);

beforeAll(async () => {

    // START THE TEST SERVER
    testConfig.WEBSERVER_PORT = PORT_TO_TEST;
    await app.start(testConfig)
});

describe('Create Page', () => {
    beforeEach(async () => {
        // remove all usergroups from db
        await userGroup.removeAll();
        await user.removeAll();
        await page.removeAll();
    });

    // TODO
    test('creating valid PageName ', async () => {
        await page.add("PAGE_1");

        // make api call with UserGroupName called USER_GROUP_2 to db
        let res = await apiController.postToServer("page/create", {
            PageName: "PAGE_2"
        });

        // expect res to be success
        expect(res.statusCode).toEqual(statusHandler.SUCCESS.statusCode);

        // PAGE 1 must be inside db
        expect(await page.isExists("PAGE_1")).toEqual(true);

        // PAGE 2 must be inside db
        expect(await page.isExists("PAGE_2")).toEqual(true);
    });

    // TODO
    test('PageName  is mandatory', async () => {

    });

    // TODO
    test('duplicate PageName not allowed ', async () => {

    });



});


describe('Fetch Pages', () => {
    beforeEach(async () => {
        await userGroup.removeAll();
        await user.removeAll();
        await page.removeAll();
    });

    test('when 1 page exists in DB', async () => {

        let p = await page.add("PAGE_1");
        // make api call
        let res = await apiController.getFromServer("page/fetch", {});
        // result to be success 
        expect(res.statusCode).toEqual(statusHandler.SUCCESS.statusCode);
        expect(res.msg.Pages.length).toEqual(1);
        expect(res.msg.Pages[0]._id.toString()).toEqual(p._id.toString())
        expect(res.msg.Pages[0].AssignedUserGroups).toEqual([])
        expect(res.msg.Pages[0].PageName).toEqual("PAGE_1")
    });

    // TODO
    test('when no page exists in DB', async () => {


    });



    // TODO
    test('when 1 page exists in DB and has userGroups inside it', async () => {

    });
});

describe('Read Page', () => {
    beforeEach(async () => {
        await userGroup.removeAll();
        await user.removeAll();
        await page.removeAll();
    });

    test('when 1 page exists in DB', async () => {

        let p = await page.add("PAGE_1");
        // make api call
        let res = await apiController.getFromServer("page/read", {
            PageId: p._id
        });

        // TODO
        // result to be success 
        // expect(res.statusCode).toEqual(statusHandler.SUCCESS.statusCode);
        // expect(res.msg.Page._id.toString()).toEqual(p._id.toString());
        // expect(res.msg.Page.AssignedUserGroups).toEqual([])
        // expect(res.msg.Page.PageName).toEqual("PAGE_1")
    });

    // TODO
    test('when no page exists in DB', async () => {


    });



    // TODO
    test('when 1 page exists in DB and has userGroups inside it', async () => {

    });
});


describe('Update Page', () => {
    beforeEach(async () => {
        await userGroup.removeAll();
        await user.removeAll();
        await page.removeAll();
    });


    test('Updating Valid Page', async () => {
        let p = await page.add("PAGE_1");
        // make api call
        let res = await apiController.postToServer("page/update", {
            PageId: p._id,
            NewPageName: "PAGE_2"
        });
        // result to be success 
        expect(res.statusCode).toEqual(statusHandler.SUCCESS.statusCode);

        expect(await page.isExists("PAGE_1")).toEqual(false);
        expect(await page.isExists("PAGE_2")).toEqual(true);

    });

    // TODO
    test('Deleting the page which has 1 userGroup must not be allowed and must retuen INVALID status', async () => {


    });

    // TODO
    test('Deleting the page which doesnot exist in DB', async () => {


    });


});



describe('Set UserGroups', () => {
    beforeEach(async () => {
        await userGroup.removeAll();
        await user.removeAll();
        await page.removeAll();
    });


    test('Setting Valid UserGroups', async () => {
        let ug1 = await userGroup.add("UG_1");
        let ug2 = await userGroup.add("UG_2");
        let p = await page.add("PAGE_1");
        // make api call
        let res = await apiController.postToServer("page/setUserGroups", {
            PageId: p._id,
            UserGroupIds: ug1._id.toString() + "," + ug2._id.toString()
        });
        // result to be success 
        expect(res.statusCode).toEqual(statusHandler.SUCCESS.statusCode);

        let ug1Actual = await userGroup.read(ug1._id)
        let ug2Actual = await userGroup.read(ug2._id)

        expect(ug1Actual.Pages.length).toEqual(1);
        expect(ug1Actual.Pages[0].PageName).toEqual(1);
        expect(ug2Actual.Pages.length).toEqual(1);
        expect(ug2Actual.Pages[0].PageName).toEqual(1);

        expect(ug2Actual.Pages.length).toEqual(1);
        expect(ug2Actual.Pages[0].PageName).toEqual(1);

    });

    // TODO
    test('Deleting the page which has 1 userGroup must not be allowed and must retuen INVALID status', async () => {


    });

    // TODO
    test('Deleting the page which doesnot exist in DB', async () => {


    });


});

describe('Delete Page', () => {
    beforeEach(async () => {
        await userGroup.removeAll();
        await user.removeAll();
        await page.removeAll();
    });

    test('Deleting Valid Page', async () => {
        let p = await page.add("PAGE_1");
        // make api call
        let res = await apiController.postToServer("page/delete", {
            PageId: p._id
        });
        // result to be success 
        expect(res.statusCode).toEqual(statusHandler.SUCCESS.statusCode);

        expect(await page.isExists("PAGE_1")).toEqual(false);

    });


    // TODO
    test('Deleting the page which has 1 userGroup must not be allowed and must retuen INVALID status', async () => {


    });

    // TODO
    test('Deleting the page which doesnot exist in DB', async () => {


    });


});


afterAll(async () => {

    // STOP THE TEST SERVER
    await app.stop();
});