const postVehicleHandler = require("./postVehicle");

const input = 'ewogICAgIm1ha2UiOiAidGVzdE1ha2UiLAogICAgIm1vZGVsIjogInRlc3RNb2RlbCIsCiAgICAicmVnIjogIkFBMTFCQkIiLAogICAgInJlZ2lzdHJhdGlvbkRhdGUiOiAiMS8xLzE5OTAiCn0='

const expectedDbResponse = {
    make: "testMake",
    model: "testModel",
    reg: "AA11BBB",
    registrationDate: "1/1/1990"
}

describe("postVehicleHandlerTest", () => {
    test('Creates the record in the DB and returns it in the response', async () => {
        const response = await postVehicleHandler({
            body: input
        });

        const dbResponse = JSON.parse(response.body).data;

        expect(response.statusCode).toBe(201);
        expect(dbResponse).toEqual(expectedDbResponse)
    })
})