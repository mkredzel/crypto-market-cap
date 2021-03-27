let AWS = require("aws-sdk");

//Configure AWS
AWS.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com",
});

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

/* Function returns a Promise that will save the text with the specified id. */
export function storeTwitterData(
  created_at: number,
  keyword: string,
  id: number,
  text: string,
  user: string
): Promise<string> {
  //Table name and data for table

  let params = {
    TableName: "CryptoTweets",
    Item: {
      Currency: keyword, //Crypto
      CreatedAt: created_at, //Tweet created at
      Id: id,
      Text: text,
      User: user
    },
  };
  
  //Store data in DynamoDB and handle errors
  return new Promise<string>((resolve, reject) => {
    documentClient.put(params, (err) => {
      if (err) {
        reject("Unable to add item: " + JSON.stringify(err));
      } else {
        resolve("Item added to table with id: " + id);
      }
    });
  });
}
