const postVehicleHandler = async (event) => {
    let validationMessage = "Please check the request body is correct and try again"

    try{
        const body = JSON.parse(Buffer.from(event.body, 'base64').toString());

        /* ------ other validation ------
        Reg is unique
        assuming no custom plates you would have a regex on the reg
        reg date is a date
        */

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
    } catch {
        return {
            statusCode: 400,
            error: "Validation Error",
            message: validationMessage
        }
    }
}

module.exports = postVehicleHandler