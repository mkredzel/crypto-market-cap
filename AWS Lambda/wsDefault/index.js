exports.handler = async (event) => {
    console.log("\nEVENT:\n" + JSON.stringify(event));

    //Build and return response with error message
    const response = {
        statusCode: 500,
        body: JSON.stringify('ERROR. Message not recognized.'),
    };
    return response;
};


