let AWS = require("aws-sdk");

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

//Returns all of the connection IDs
module.exports.getConnectionIds = async () => {
    let params = {
        TableName: "WebSocketClients"
    };
    return documentClient.scan(params).promise();
};

//Deletes the specified connection ID
module.exports.deleteConnectionId = async (connectionId) => {
    console.log("Deleting connection Id: " + connectionId);

    let params = {
        TableName: "WebSocketClients",
        Key: {
            ConnectionId: connectionId
        }
    };
    return documentClient.delete(params).promise();
};

//Returns all of the connection IDs
module.exports.getCryptoData = async () => {
    let paramsBTC = {
         TableName: 'CryptoData',
       KeyConditionExpression: 'Currency = :currency and #ts > :timestamp',
       ExpressionAttributeNames: {
             '#ts':'Timestamp'
         },
         ExpressionAttributeValues: {
             ':currency': 'BTC',
             ':timestamp': (Date.now()-(3.154e+10*2))/1000
         }
     };
     let paramsLTC = {
         TableName: 'CryptoData',
       KeyConditionExpression: 'Currency = :currency and #ts > :timestamp',
       ExpressionAttributeNames: {
             '#ts':'Timestamp'
         },
         ExpressionAttributeValues: {
             ':currency': 'LTC',
             ':timestamp': (Date.now()-(3.154e+10*2))/1000
         }
     };
     let paramsETH = {
         TableName: 'CryptoData',
       KeyConditionExpression: 'Currency = :currency and #ts > :timestamp',
       ExpressionAttributeNames: {
             '#ts':'Timestamp'
         },
         ExpressionAttributeValues: {
             ':currency': 'ETH',
             ':timestamp': (Date.now()-(3.154e+10*2))/1000
         }
     };
     let paramsXRP = {
         TableName: 'CryptoData',
       KeyConditionExpression: 'Currency = :currency and #ts > :timestamp',
       ExpressionAttributeNames: {
             '#ts':'Timestamp'
         },
         ExpressionAttributeValues: {
             ':currency': 'XRP',
             ':timestamp': (Date.now()-(3.154e+10*2))/1000
         }
     };
     let paramsADA = {
         TableName: 'CryptoData',
       KeyConditionExpression: 'Currency = :currency and #ts > :timestamp',
       ExpressionAttributeNames: {
             '#ts':'Timestamp'
         },
         ExpressionAttributeValues: {
             ':currency': 'ADA',
             ':timestamp': (Date.now()-(3.154e+10*2))/1000
         }
     };
     let paramsXLM = {
         TableName: 'CryptoData',
       KeyConditionExpression: 'Currency = :currency and #ts > :timestamp',
       ExpressionAttributeNames: {
             '#ts':'Timestamp'
         },
         ExpressionAttributeValues: {
             ':currency': 'XLM',
             ':timestamp': (Date.now()-(3.154e+10*2))/1000
         }
     };
     
     let paramsTweets = {
         TableName: 'CryptoTweets',
     };
      
     let promiseBTC = async (params) => {
         return new Promise((resolve, reject) => {
          
             documentClient.query(params, (err, data) => {
                 if (err) {
                     reject((err));
                 } else {
                     let response = {
                         statusCode: 200,
                         body: data
                     };
                     resolve(response);
                 }
             });
         });
     };
     let promiseLTC = async (params) => {
         return new Promise((resolve, reject) => {
          
             documentClient.query(params, (err, data) => {
                 if (err) {
                     reject((err));
                 } else {
                     let response = {
                         statusCode: 200,
                         body: data
                     };
                     resolve(response);
                 }
             });
         });
     };
     let promiseETH = async (params) => {
         return new Promise((resolve, reject) => {
          
             documentClient.query(params, (err, data) => {
                 if (err) {
                     reject((err));
                 } else {
                     let response = {
                         statusCode: 200,
                         body: data
                     };
                     resolve(response);
                 }
             });
         });
     };
     let promiseXRP = async (params) => {
         return new Promise((resolve, reject) => {
          
             documentClient.query(params, (err, data) => {
                 if (err) {
                     reject((err));
                 } else {
                     let response = {
                         statusCode: 200,
                         body: data
                     };
                     resolve(response);
                 }
             });
         });
     };
     let promiseADA = async (params) => {
         return new Promise((resolve, reject) => {
          
             documentClient.query(params, (err, data) => {
                 if (err) {
                     reject((err));
                 } else {
                     let response = {
                         statusCode: 200,
                         body: data
                     };
                     resolve(response);
                 }
             });
         });
     };
     let promiseXLM = async (params) => {
         return new Promise((resolve, reject) => {
          
             documentClient.query(params, (err, data) => {
                 if (err) {
                     reject((err));
                 } else {
                     let response = {
                         statusCode: 200,
                         body: data
                     };
                     resolve(response);
                 }
             });
         });
     };
     
     let promiseTweets = async (params) => {
         return new Promise((resolve, reject) => {
          
            //Retrieve data item from DynamoDB and handle errors
            documentClient.scan(params, (err, data) => {
                if (err) {
                    reject((err));
                } else {
                    let response = {
                        statusCode: 200,
                        body: data
                    };
                    resolve(response);
                }
            });
         });
    };
     
    return Promise.all([promiseBTC(paramsBTC), promiseLTC(paramsLTC), promiseETH(paramsETH), promiseXRP(paramsXRP), promiseADA(paramsADA), promiseXLM(paramsXLM), promiseTweets(paramsTweets)]);
};
