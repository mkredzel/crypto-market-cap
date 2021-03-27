//Module that reads keys from .env file
const dotenv = require("dotenv");

//Node Twitter library
const Twitter = require("twitter");

//Database module
import { storeTwitterData } from "./storeTwitterData";

//Copy variables in file into environment variables
dotenv.config();

//Set up the Twitter client with the credentials
let client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});
	
let cryptocurrencies: Array<string> = [
  "BTC",
  "ETH",
  "XRP",
  "LTC",
  "XLM",
  "ADA",
];

//Downloads and outputs tweet text
async function searchTweets(keyword: string) {
  try {
	//Set up parameters for the search
	let searchParams = {
	  q: keyword,
	  count: 1,
	  lang: "en",
	};

	//Wait for search to execute asynchronously
	let result = await client.get("search/tweets", searchParams);

	let promiseArray: Array<Promise<string>> = [];

	//Output the result
	result.statuses.forEach((tweet: any) => {
	  //Store save data promise in array
	  promiseArray.push(
		storeTwitterData(
		  Number(new Date(tweet.created_at).getTime() / 1000),
		  keyword,
		  Number(tweet.id),
		  tweet.text,
		  tweet.user.name
		)
	  );
	});

	//Execute all of the save data promises
	let databaseResult: Array<string> = await Promise.all(promiseArray);
	console.log("Database result: " + JSON.stringify(databaseResult));
  } catch (error) {
	console.log(JSON.stringify(error));
  }
}

//Call function to search for tweets with specified subject
cryptocurrencies.forEach((crypto) => {
  searchTweets(crypto);
});