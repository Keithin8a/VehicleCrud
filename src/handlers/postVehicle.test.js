const postVehicleHandler = require("./postVehicle");

jest.mock('aws-sdk/clients/dynamodb')

describe("postVehicleHandlerTest", () => {
    test('Creates the record in the DB and returns it in the response', async () => {
        const input = 'ewogICAgIm1ha2UiOiAidGVzdE1ha2UiLAogICAgIm1vZGVsIjogInRlc3RNb2RlbCIsCiAgICAicmVnIjogIkFBMTFCQkIiLAogICAgInJlZ2lzdHJhdGlvbkRhdGUiOiAiMS8xLzE5OTAiCn0='
        const expectedDbResponse = {
            make: "testMake",
            model: "testModel",
            reg: "AA11BBB",
            registrationDate: "1/1/1990"
        }     

        const response = await postVehicleHandler({
            body: input
        });

        const dbResponse = JSON.parse(response.body).data;

        expect(response.statusCode).toBe(201);
        expect(dbResponse).toEqual(expectedDbResponse)
    })

    test('400 status returned with malformed JSON', async () => {
        const input = 'ewogICAgbWFrZTogInRlc3RNYWtlIiwKICAgICJtb2RlbCI6ICJ0ZXN0TW9kZWwiLAogICAgInJlZyI6ICJBQTExQkJCIiwKICAgICJyZWdpc3RyYXRpb25EYXRlIjogIjEvMS8xOTkwIgp9'
        
        const {statusCode, error, message} = await postVehicleHandler({
            body: input
        });

        expect(statusCode).toBe(400);
        expect(error).toBe("Validation Error")
        expect(message).toBe("Please check the request body is correct and try again")
    })

    test('you cannot add duplicate reg numbers', async () => {
        const input = 'ewogICAgIm1ha2UiOiAidGVzdE1ha2UiLAogICAgIm1vZGVsIjogInRlc3RNb2RlbCIsCiAgICAicmVnIjogIkFBMTFCQkIiLAogICAgInJlZ2lzdHJhdGlvbkRhdGUiOiAiMS8xLzE5OTAiCn0='

        await postVehicleHandler({
            body: input
        });

        const {statusCode, error, message} = await postVehicleHandler({
            body: input
        });

        expect(statusCode).toBe(400);
        expect(error).toBe("Validation Error")
        expect(message).toBe("Record already exists")
    })
})