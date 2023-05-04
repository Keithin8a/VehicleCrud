const AWS = require('aws-sdk');

const getRecord = async (documentClient, reg) => {
    const result = await documentClient.scan({
        TableName: process.env.DYNAMODB_VEHICLE_TABLE,
        FilterExpression: "reg = :val",
        ExpressionAttributeValues: {":val": {"S": reg}}
        })
    .promise();

    if((result.Count === 0)){
        return;
    }

    return result.Items[0];
}

const postVehicleHandler = async (event) => {  
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    try{
        const body = JSON.parse(Buffer.from(event.body, 'base64').toString());

        const existingRecord = getRecord(dynamoDB, body.reg);

        if(existingRecord){    
            return {
                statusCode: 400,
                error: "Validation Error",
                message: "Record already exists"
            }
        }
        /* ------ other validation ------
        assuming no custom plates you would have a regex on the reg
        reg date is a date
        */

    } catch {
        return {
            statusCode: 400,
            error: "Validation Error",
            message: "Please check the request body is correct and try again"
        }
    }

    const params = {
        TableName: process.env.DYNAMODB_VEHICLE_TABLE,
        Item: {
            make: body.make,
            model: body.model,
            reg: body.reg,
            registrationDate: body.registrationDate
        }
    }

    await dynamoDB.put(params).promise();

    const result = getRecord(dynamoDB, body.reg);

    if(result.Count === 0) {
        return {
            statusCode: 500,
            error: "Internal Server Error",
            message: "Please try again later"
        }
    }

    return {
        statusCode: 201,
        body: JSON.stringify(
            {
                data: result.Items[0]
            }
        )
    }
}

module.exports = postVehicleHandler