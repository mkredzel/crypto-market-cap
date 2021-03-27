let AWS = require("aws-sdk");

//Create client for accessing DynamoDB
let documentClient = new AWS.DynamoDB.DocumentClient();

//Create instance of Comprehend
let comprehend = new AWS.Comprehend();

//Function that will be called
exports.handler = (event) => {
    console.log(JSON.stringify(event));
    
        event.Records.forEach((record) => {
            if (record.eventName === "INSERT") {
                let currency = record.dynamodb.Keys.Currency.S;
                let createdAt = record.dynamodb.Keys.CreatedAt.N;
                let user = record.dynamodb.NewImage.User.S;
                let text = record.dynamodb.NewImage.Text.S;
                let id = record.dynamodb.NewImage.Id.N;
                
                let params = {
                    LanguageCode: "en",
                    Text: text,
                };
        
                let getSentiment = async (params) => {
                    return new Promise((resolve, reject) => {
                        //Call comprehend to detect sentiment of text
                        comprehend.detectSentiment(params, (err, data) => {
                            //Log result or error
                            if (err) {
                                reject((err));
                            } else {
                                let response = {
                                    statusCode: 200,
                                    body: JSON.stringify(data)
                                };
                                resolve(response);
                            }
                        });
                    });
                };
                
                let updateCryptoTweets = async function (currency, createdAt, user, text, id) {
                    const sentiment = await getSentiment(params);
        
                    let p = {
                        TableName: "CryptoTweets",
                        Item: {
                            Currency: currency,
                            CreatedAt: parseInt(createdAt), 
                            User: user,
                            Text: text,
                            Id: id,
                            Sentiment: JSON.parse(sentiment.body)
                        }
                    };
                    
                    //Store data in DynamoDB and handle errors
                    documentClient.put(p, (err, data) => {
                        if (err) {
                            console.error("Error JSON:", JSON.stringify(err));
                        } else {
                            console.log("Record added to table:", p.Item);
                        }
                    });
                };
                updateCryptoTweets(currency, createdAt, user, text, id);
            }
        });
    
};