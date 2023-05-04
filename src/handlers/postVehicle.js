const postVehicleHandler = async (event) => {
    const body = JSON.parse(Buffer.from(event.body, 'base64').toString());

    const item = {
        make: body.make,
        model: body.model,
        reg: body.reg,
        registrationDate: body.registrationDate
    }

    return {
        statusCode: 201,
        body: JSON.stringify(
            {
                data: item
            }
        )
    }
}

module.exports = postVehicleHandler