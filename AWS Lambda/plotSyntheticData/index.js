//Axios will handle HTTP requests to web service
const axios = require ('axios');



//Import AWS
let AWS = require("aws-sdk");

//Data that we are going to send to endpoint
//REPLACE THIS WITH YOUR OWN DATA!
let endpointData = {
    "instances":
        [
            {"start": "2020-03-18 13:00:00", "target": [ 297.5273722513413, 306.0324183274635, 305.2896693182765, 313.8898608958495, 332.2910123570675, 335.6519058186424, 358.61501916295373, 334.8578308554459, 359.49150344395304, 343.07845640259666, 322.80481088723286, 312.7805274249652, 309.19598289836716, 296.4939802471887, 275.4352161929947, 277.4735976946023, 252.41148028008269, 248.47166398031735, 258.5844487286545, 256.09547653868316, 260.0366351377824, 270.3188090174023, 278.72151482763627, 312.0404830788864, 304.39605129127057, 325.4371600802656, 334.2478336970091, 350.0332761608915, 374.12451425540274, 365.82032076828085, 402.4617047049628, 375.70514370519305, 370.5800704750501, 380.07975572744505, 366.6042145613823, 356.15201407344665, 332.11108512048486, 334.8110579650313, 306.9625585846818, 288.7685769799687, 289.51067479401166, 288.1815557148459, 276.4723888931905, 300.3233638178383, 288.5955940619757, 294.3049122927632, 308.9427458100403, 342.3864955954841, 336.08633071658284, 380.8951381454315, 398.804504207199, 384.65598380529383, 424.80103579001434, 424.064713156869, 409.96589691711625, 430.2160829085374, 423.6317201382352, 408.5733559456749, 393.55251962075675, 369.5040468208446, 373.4897892141232, 358.445111371261, 328.91556800468845, 322.9108765360957, 320.1963167974296, 314.2810564095322, 324.8153001599675, 315.39561677689693, 343.2773567433327, 350.3109266606982, 340.8059177365245, 380.61817156481743, 377.10881763261875, 392.80807248309054, 399.478355254654, 438.1094472290739, 455.7908186333847, 439.7528103427478, 468.66256027856036, 461.5575265095585, 448.4480928114895, 446.2604014831694, 448.06369334200764, 418.1010974885063, 388.12040199616246, 382.89686966407703, 375.4715160598396, 373.4798270562482, 353.95116833001305, 341.8559615940417, 344.4938476745639, 368.00921982047544, 369.60636041877876, 379.078872056899, 407.1445917699194, 405.6276428097994, 404.34480135669816, 430.8186567233327, 463.0034852281371, 477.713859483055, 477.124584599275, 477.81990294909093, 495.7129375176171, 509.06828084980936, 473.7750225983877, 486.10176797503823, 448.29234889325704, 444.835370999855, 418.60168610270455, 420.8728496021044, 415.1468682572924, 390.82256945960347, 401.25506199608566, 392.3170305099556, 398.86125770468783, 389.48415442058234, 380.8164929902079, 418.50802079641113, 432.3901002617583, 432.51528492502587, 433.30930764202986, 478.7059279650968, 503.13597269314084, 483.0358218409362, 524.7967286521534, 539.4561734139443, 529.9183230940306, 534.5841730164866, 529.428799329578, 514.4567160491416, 507.49572362540766, 470.4370836048062, 465.798833316551, 471.8668369066483, 427.49174723858465, 440.1656223368899, 416.88908174414354, 403.8994473198385, 444.1536014621825, 426.67802873147076, 452.1696396498512, 451.14341680100404, 464.53103481788844, 488.1277698778384, 478.876533483958, 504.8939506273511, 514.2485441496701, 545.5379456687186, 531.4125883646933, 565.5285801895336, 536.5087757971892, 572.662814464093, 524.3459635362116, 544.3121606058928, 510.9798674725685, 521.7550398304757, 516.8663325648647, 472.3248304572898, 494.7330813993089, 455.4515776264108, 447.42113282967705, 444.98892787751265, 460.1383068617272, 465.4818896919293, 449.32162665044405, 486.02715979037765, 510.78823708112424, 481.49543094599585, 532.4475112962008, 513.6695476990509, 560.9697366628122, 573.2754126252141, 597.0781317967688, 602.8423171264491, 614.478950644194, 562.1086748743322, 591.8905621696086, 557.4079123796556, 587.0542747698054, 537.8435766085228, 526.7255070890183, 506.3105756041528, 522.132911207358, 515.9660152284754, 504.03649314595515, 509.9394938410662, 488.6624896005176, 508.2746405532429, 489.9844571087147, 494.9754716242448, 533.6461921044286, 559.5464897187034, 573.746949164136, 599.8663652180014, 581.2591607104334, 619.7917013434662, 613.4406551801536, 634.5853379974122, 606.5726503931604, 625.5925737329682, 630.9649499292594, 606.7694548124089, 572.4679959965771, 583.7753073355128, 572.7287498406512, 539.4837374777076, 535.7650700715635, 524.8579405528116, 555.2386309388772, 548.9148368721138, 526.7944411319394, 550.9379566237415, 518.280380516761, 548.2925838988675, 541.3449666252232, 589.5151889819381, 603.1012639110786, 588.0557838953125, 593.3465790675593, 665.4242178391643, 620.0790693684596, 679.1533782172955, 641.5020416396374, 653.8770608600007, 668.7731886428586, 624.8536537746219, 647.62389991407, 624.7173417613766, 594.091682879458, 604.4999166240946, 599.636308893727, 576.106140398401, 566.519363516891, 535.2774344934691, 553.5777819090927, 572.2486826618652, 554.8987150611184, 567.0725613344258, 599.007711523057, 612.0519533172724, 631.589145124423, 651.2023833241176, 653.9956620513342, 675.1664658382911, 675.7478436241455, 674.7022502168581, 686.8593432639826, 683.6274811779034, 684.6060774116564, 681.7520173553037, 695.2419618390348, 670.6095469493042, 634.3417350896715, 631.9674266557695, 638.5838199081411, 622.673894124152, 615.375176593381, 601.1610010532005, 604.0370455727801, 625.8579005390171, 584.8178354494768, 627.4409672549207, 639.3979599129925, 653.5419889383064, 651.751417578121, 660.5387110922248, 664.3114027129733, 724.9874524124355, 742.6545488712169, 688.8050010709416, 751.233550988987, 754.4190519209694, 713.3374646012857, 677.1338673001646, 725.2722769792118, 693.4765172650311, 685.5456671776792, 663.2957475412526, 645.6104025077751, 641.5124703196396, 614.3997263667574, 603.9338598496853, 598.7950825404233, 653.8687282927151, 662.2317462081363, 641.0225419625712, 663.773179099195, 661.0522901481702, 666.1809002506297, 684.7560824558669, 716.2791256939684, 733.4932772460536, 765.3496834234776, 723.6921463469661, 760.767061335676, 724.4769103382101, 721.8149455643579, 780.8726576533788, 732.6866123855266, 741.9845111823407, 697.1964903580626, 692.6151396107398, 688.5324381249244, 699.1961223592905, 699.0547396858211, 662.9060462393446, 675.8398662195378, 651.0268280810232, 683.3816974826357, 665.226021550043, 710.2543085639096, 718.9290839531809, 741.2172926211576, 763.3702135817128, 774.1021374140463, 762.3348135933314, 787.3003108570257, 819.995549093093, 825.3690345978183, 755.6116392272403, 755.25875977551, 753.7350206714026, 733.5149806328362, 788.4674795105251, 757.3843329145102, 712.2637145982723, 734.1082122836202, 699.7794736160222, 684.8527224359153, 723.6793600905572, 709.2290075965731, 677.9029584305017, 711.5337744444565, 733.0745158630281, 760.2954546146441, 768.5993755565052, 758.5053981362311, 764.9306412498892, 789.79810196265, 798.5655814339783, 829.6074367742963, 825.454577346173, 822.3417872413515, 795.586216122864, 785.2968680756748, 829.5340413040444, 805.652371189234, 790.7931403540913, 764.7026675837158, 734.7817435045464, 741.1041924145001, 752.9879641481593, 707.6481795162362, 697.7248235073178, 718.167600251692, 698.7671498691814, 712.2192783625873, 769.9083611905588, 765.6155708510114, 764.7168196262959, 801.5358307554559, 813.2787041348287, 800.6593334556246, 832.4254771467175, 828.1537645302158, 847.1210239236887, 829.1730553330211, 845.2115776878525, 871.632642083292, 830.4306673968347, 868.7801406128432, 828.648871512783, 823.0624224058432, 806.104819229091, 821.2292013588803, 751.365457241363, 792.0479048889754, 753.3916966101075, 734.4694965087859, 777.9949088092023, 755.9487580223696, 758.7112323000633, 792.8035958304852, 783.2902048692994, 857.3145202251967, 811.6213846831058, 871.0558350802069, 881.0254951350619, 891.8322577725878, 882.7515994042494, 913.632927686676, 873.4266194399315, 848.5424997078352, 881.1069396867023, 832.97020019812, 851.0956896405371, 884.6077071625864, 847.0712542198104, 849.3224231423914, 785.9455472840771, 804.9966508444298, 809.5478878422178, 824.6496720828271, 771.8576852790461, 817.8124590275964, 844.7957976057319, 791.8267352831521, 843.0423730878672, 869.4528834831544, 871.6594998470034, 925.0998911821755, 867.5599700165737, 885.0378641366794, 885.736510607873, 944.7785410272094, 901.5093552526446, 956.0625747704502, 901.8727717671798, 915.2146235111403, 931.5305374136155, 896.3369696128918, 889.2158105708326, 847.3963590751425, 874.2995115735724, 795.8824847768194, 793.7551142804696, 841.8067804087476, 801.4128583513187, 810.250083818834, 872.1380394425108, 903.8562106318542, 859.2268244853772, 856.0556383247604, 939.2968145773485, 890.8297140703075, 940.6023609344212, 988.4291602067503, 957.6233291452496, 979.0436232454978, 926.075299067343, 926.6497573718641, 942.2488604916012, 952.5483777859083, 922.0724705768396, 922.2769273153556, 941.3749109271797, 906.968667646986, 912.5611127889206, 875.9196992976273, 830.8037310812409, 881.5687242094034, 863.8805426586546, 919.9228875026548, 916.2686335073514, 939.9330853905333, 934.8882303530141, 941.4851087021483, 904.2960199407734, 974.469956157312, 968.7079426826175, 984.5338736756815, 1005.1066719493734, 956.7504327023953, 972.2451366553571, 1013.7032431809994, 1011.99681219803, 1020.8876835363355, 993.4198361430637, 986.342439094093, 904.8890311876436, 904.8985473835031, 916.4380825525328, 924.9781620583516, 913.5628341857102, 861.6487987917064, 866.3594996984491, 935.4834459061801, 918.547045429271, 898.8170334866996, 925.733530898191, 939.2107322065403, 963.8219415812941, 1045.2825191085183, 996.9260238031429, 1050.7346811057555, 1052.4141337599183, 1026.0752967948597, 1073.1576842075337, 1010.4166087131356, 994.295496999692, 1031.204386688485, 1000.6161397687658, 951.0951812944234, 988.8987359882599, 940.2542272708989, 901.4417391758673, 909.7578006054226, 901.2854962827136, 887.9147591957021, 959.2615456072205 ]}
        ],
    "configuration":
        {
            "num_samples": 50,
            "output_types":["mean"]
        }
};

//Name of endpoint
//REPLACE THIS WITH THE NAME OF YOUR ENDPOINT
const endpointName = "CryptoMarketcap-endpoint";

//Parameters for calling endpoint
let params = {
    EndpointName: endpointName,
    Body: JSON.stringify(endpointData),
    ContentType: "application/json",
    Accept: "application/json"
};

//AWS class that will query endpoint
let awsRuntime = new AWS.SageMakerRuntime({});

//Handler for Lambda function
exports.handler = event => {
    //Call endpoint and handle response
    awsRuntime.invokeEndpoint(params, (err, data)=>{
        if (err) {//An error occurred
            console.log(err, err.stack);

            //Return error response
            const response = {
                statusCode: 500,
                body: JSON.stringify('ERROR: ' + JSON.stringify(err)),
            };
            return response;
        }
        else{//Successful response
            //Convert response data to JSON
            let responseData = JSON.parse(Buffer.from(data.Body).toString('utf8'));

            
            let values = responseData.predictions[0].mean;
            console.log(values);
            
            let hours = [];
            
            for(let i=0; i<values.length; ++i){
                hours.push(i+500);
            }
            
            //The ID of the student's data that I will download
            let studentID = 'M00540191';
            
            //URL where student data is available
            let url = 'https://39kicq1lg9.execute-api.us-east-1.amazonaws.com/prod/';
            
            //Authentication details for Plotly
            //ADD YOUR OWN AUTHENTICATION DETAILS
            const PLOTLY_USERNAME = 'mkredzel';
            const PLOTLY_KEY = '0OCYQH6y3TQRmctj7hjd';
            
            //Initialize Plotly with user details.
            let plotly = require('plotly')(PLOTLY_USERNAME, PLOTLY_KEY);
            
            exports.handler = async (event) => {
                try {
                    //Get synthetic data
                    let yValues = (await axios.get(url + studentID)).data.target;
            
                    //Add basic X values for plot
                    let xValues = [];
                    for(let i=0; i<yValues.length; ++i){
                        xValues.push(i);
                    }
            
                    //Call function to plot data
                    let plotResult = await plotData(studentID, xValues, yValues);
                    console.log("Plot for student '" + studentID + "' available at: " + plotResult.url);
            
                    return {
                        statusCode: 200,
                        body: "Ok"
                    };
                }
                catch (err) {
                    console.log("ERROR: " + JSON.stringify(err));
                    return {
                        statusCode: 500,
                        body: "Error plotting data for student ID: " + studentID
                    };
                }
            };
            
            //Plots the specified data
            async function plotData(studentID, xValues, yValues){
                //Data structure
                let studentData = {
                    x: xValues,
                    y: yValues,
                    type: "scatter",
                    mode: 'line',
                    name: 'Original Data',
                    marker: {
                        color: 'rgb(219, 64, 82)',
                        size: 12
                    }
                };
                
                let predictionsData = {
                    x: hours,
                    y: values,
                    type: "scatter",
                    mode: 'line',
                    name: 'Predictions - mean',
                    marker: {
                        color: '#17becf',
                        size: 12
                    }
                };
                let data = [studentData, predictionsData];
            
                let layout = {
                    title: "Synthetic Data for Student " + studentID,
                    font: {
                        size: 25
                    },
                    xaxis: {
                        title: 'Time (hours)'
                    },
                    yaxis: {
                        title: 'Value'
                    }
                };
                let graphOptions = {
                    layout: layout,
                    filename: "date-axes",
                    fileopt: "overwrite"
                };
            
                return new Promise ( (resolve, reject)=> {
                    plotly.plot(data, graphOptions, function (err, msg) {
                        if (err)
                            reject(err);
                        else {
                            resolve(msg);
                        }
                    });
                });
            };
            
            exports.handler({});

            //Return successful response
            const response = {
                statusCode: 200,
                body: JSON.stringify('Predictions stored.'),
            };
            return response;
        }
    });
};

