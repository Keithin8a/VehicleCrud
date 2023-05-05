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

const getVehicleHandler = async (event) => {
    const body = JSON.parse(Buffer.from(event.body, 'base64').toString());

    /* ------ validation ------
    assuming no custom plates you would have a regex on the reg
    */
    
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const response = await getRecord(dynamoDB, body.reg);

    if(!response){
        return {
            statusCode: 404,
            error: "Not Found",
            message: "Cannot find a record in the DB"
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                data: response
            }
        )
    }
}

module.exports = getVehicleHandler