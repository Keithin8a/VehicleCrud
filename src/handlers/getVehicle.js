const dbResponse = {
    make: "testMake",
    model: "testModel",
    reg: "AA11BBB",
    registrationDate: "1/1/1990"
}

const getVehicleHandler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                data: dbResponse
            }
        )
    }
}

module.exports = getVehicleHandler