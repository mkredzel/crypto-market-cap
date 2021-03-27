let AWS = require("aws-sdk");

//Import functions for database
let db = require('database');

module.exports.getSendMessagePromises = async (message, domainName, stage) => {
    
    //Get connection IDs of clients
    let clientIdArray = (await db.getConnectionIds()).Items;
    
    console.log("\nClient IDs:\n" + JSON.stringify(clientIdArray));
    
    let data = await db.getCryptoData();
    
    //Create API Gateway management class.
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
        endpoint: domainName + '/' + stage
    });
    
    //Try to send message to connected clients
    let msgPromiseArray = clientIdArray.map( async item => {
        try{
            console.log("Sending message '" + message + "' to: " + item.ConnectionId);
            
            //Create parameters for API Gateway
            let apiMsg = {
                ConnectionId: item.ConnectionId,
                Data: JSON.stringify(data) 
            };
            
            await apigwManagementApi.postToConnection(apiMsg).promise();
            
            console.log("Message '" + message + "' sent to: " + item.ConnectionId);
        } catch(err) {
            console.log("Failed to send message to: " + item.ConnectionId);
    
            //Delete connection ID from database
            if(err.statusCode == 410) {
                try {
                    await db.deleteConnectionId(item.ConnectionId);
                }
                catch (err) {
                    console.log("ERROR deleting connectionId: " + JSON.stringify(err));
                    throw err;
                }
            }
            else{
                console.log("UNKNOWN ERROR: " + JSON.stringify(err));
                throw err;
            }
        }
    });
    return msgPromiseArray;
};