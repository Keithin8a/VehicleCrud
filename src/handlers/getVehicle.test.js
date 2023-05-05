const getVehicleHandler = require("./getVehicle");

jest.mock('aws-sdk/clients/dynamodb')

describe("getVehicleHandlerTest", () => {
    beforeEach(() => {
        //seed mocked DB with data
    });
      
    afterEach(() => {
        //cleanup mocked DB
    });

    test('Returns Response from Database', async () => {
        const input = 'ewogICAgICAgICAgICByZWc6ICJBQTExQkJCIiwKfSAgICAg'
        const expectedDbResponse = {
            make: "testMake",
            model: "testModel",
            reg: "AA11BBB",
            registrationDate: "1/1/1990"
        }     

        const response = await getVehicleHandler({
            body: input
        });

        const dbResponse = JSON.parse(response.body).data;

        expect(response.statusCode).toBe(200);
        expect(dbResponse).toEqual(expectedDbResponse)
    })

    test('Returns Response from Database', async () => {
        const input = 'ewogICAgICAgICAgICByZWc6ICJCQjExQUFBIiwKfSAgICAg'

        const {statusCode, error, message} = await getVehicleHandler({
            body: input
        });

        expect(statusCode).toBe(404);
        expect(error).toBe("Not Found")
        expect(message).toBe("Cannot find a record in the DB")
    })
})