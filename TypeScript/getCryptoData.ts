const axios = require("axios");
const AWS = require("aws-sdk");

//Set the region and endpoint
AWS.config.update({
	region: "us-east-1",
});

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

/* Stores data in the database */
class DBInterface {
	//Authentication for database
	username: string;
	password: string;

	constructor(username: string, password: string) {
		this.username = username;
		this.password = password;
	}

	connect() {
		//Put database connection code here
	}

	close() {
		//Close database connection here
	}
}

interface NomicsAPI {
	data: Array<CryptoData>;
}

interface CryptoData {
	forEach(arg0: (currency: any) => void);
	currency: string;
	timestamps: Array<string>;
	prices: Array<number>;
}

/* Downloads data from web service */
class DataDownloader {
	url: string;

	constructor(url: string) {
		this.url = url;
	}

	async getDataFromWebService(): Promise<NomicsAPI> {
		return axios.get(
			"https://api.nomics.com/v1/currencies/sparkline?key=YOUR_KEY&ids=BTC,ETH,XRP,LTC,XLM,ADA&start=2017-03-01T00%3A00%3A00Z&end=2021-03-11T00%3A00%3A00Z&convert=GBP"
		);
	}
}

/* Contains the main logic of the application */
class Main {
	dbInterface: DBInterface;
	dataDownloader: DataDownloader;

	constructor() {
		//Create instances of classes
		this.dbInterface = new DBInterface("root", "123");
		this.dataDownloader = new DataDownloader("");
	}

	async downloadData() {
		this.dbInterface.connect();

		try {
			//Execute promise and wait for result.
			let data: NomicsAPI = await this.dataDownloader.getDataFromWebService();

			data.data.forEach((crypto) => {
				crypto.prices.forEach((price, index) => {
					let timestamp = new Date(crypto.timestamps[index]).getTime() / 1000;
					//Table name and data for table
					let params = {
						TableName: "CryptoData",
						Item: {
							Currency: crypto.currency,
							Timestamp: timestamp,
							Price: price,
						},
					};

					//Store data in DynamoDB and handle errors
					documentClient.put(params, (err: any) => {
						if (err) {
							console.error("Unable to add item", params.Item);
							console.error("Error JSON:", JSON.stringify(err));
						} else {
							console.log("Record added to table:", params.Item);
						}
					});
				});
			});
		} catch (err) {
			console.error("Error occurred: " + err);
		} finally {
			this.dbInterface.close();
		}
	}
}

let main: Main = new Main();
main.downloadData();
