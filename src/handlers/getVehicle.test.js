const getVehicleHandler = require("./getVehicle");

const expectedDbResponse = {
    make: "testMake",
    model: "testModel",
    reg: "AA11BBB",
    registrationDate: "1/1/1990"
}
describe("getVehicleHandlerTest", () => {
    test('Returns Response from Database', async () => {
        const response = await getVehicleHandler();

        const dbResponse = JSON.parse(response.body).data;

        expect(response.statusCode).toBe(200);
        expect(dbResponse).toEqual(expectedDbResponse)
    })
})