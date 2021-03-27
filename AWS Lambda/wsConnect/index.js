let AWS = require("aws-sdk");

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    //Get connection ID from event
    let connId = event.requestContext.connectionId;
    console.log("Client connected with ID: " + connId);

    //Parameters for storing connection ID in DynamoDB
    let params = {
        TableName: "WebSocketClients",
        Item: {
            ConnectionId: connId
        }
    };

    //Store connection Id for later communication with client
    try {
        await documentClient.put(params).promise();
        console.log("Connection ID stored.");

        //Return response
        return {
            statusCode: 200,
            body: "Client connected with ID: " + connId
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            body: "Server Error: " + JSON.stringify(err)
        };
    }
};

