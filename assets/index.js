let coins = [];
let tweets = [];

//Open connection
var connection = new WebSocket("wss://l5bzvh51i7.execute-api.us-east-1.amazonaws.com/dev");

connection.onopen = function (event) {
    console.log("Connected: " + JSON.stringify(event));
    getCryptoData();
};

//Output messages from the server
connection.onmessage = function (msg) {

    for (let i = 0; i < 6; i++) {
        coins.push(JSON.parse(msg.data)[i].body.Items);
    }

    tweets.push(JSON.parse(msg.data)[6].body.Items);
}

//Log errors
connection.onerror = function (error) {
    console.log("WebSocket Error: " + JSON.stringify(error));
}

//Send message to server
function getCryptoData() {

    //Create message to be sent to server
    var msgObject = {
        action: "getCryptoData",
        data: "getCryptoData"
    };

    //Send message object
    connection.send(JSON.stringify(msgObject));

    //Log result
    console.log("Message sent: " + JSON.stringify(msgObject));
}

$(document).ready(function () {
    setTimeout(function () {
        $('body').addClass('loaded');
        setTimeout(() => {
            document.getElementById('tabs').style.display = "block";
        }, 500);
    }, 3500);
});