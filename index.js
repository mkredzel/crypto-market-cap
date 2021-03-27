let app = new Vue({
  el: "#app",
  data: {
    coins: [],
    tweets: [],
    table: [],
    tab1: "nav-link active",
    tab2: "nav-link",
    tab3: "nav-link",
    content: "",
    task: "graph",
    cryptoName: "BTC",
    crypto: -1,
  },
  methods: {
    highlightRow() {
      // Highlight selected row
      setTimeout(() => {
        $("." + this.cryptoName).css("color", "#3498DB");
      }, 100);
    },
    displayData(task, crypto) {
      // Load data depending on selected task/tab
      if (crypto == -1) {
        this.content = "Choose cryptocurrency to display content";
      } else {
        let currency = app.table[crypto].currency;
        if (this.cryptoName) {
          $("." + this.cryptoName).css("color", "#fff");
        }

        this.cryptoName = currency;
        this.crypto = crypto;
        this.highlightRow();
      }

      if (task === "graph") {
        this.loadCryptoChart();
      } else if (task === "sentiment") {
        this.loadSentimentChart();
      }
    },
    activateTab1() {
      this.tab1 = "nav-link active";
      this.tab2 = "nav-link";
      this.tab3 = "nav-link";
      this.task = "graph";
      this.loadCryptoChart();
    },
    activateTab2() {
      this.tab1 = "nav-link";
      this.tab2 = "nav-link active";
      this.tab3 = "nav-link";
      this.task = "sentiment";
      this.loadSentimentChart();
    },
    activateTab3() {
      this.tab1 = "nav-link";
      this.tab2 = "nav-link";
      this.tab3 = "nav-link active";
      this.task = "tweets";
    },
    // Loads graph
    loadCryptoChart() {
      zingchart.exec("sentimentChart", "destroy");
      let chartData = {
        values: [],
        dates: [],
      };

      if (this.cryptoName) {
        this.coins[this.crypto].forEach((coin) => {
          let date = new Date(coin.Timestamp * 1000).toLocaleDateString(
            "en-GB"
          );
          chartData.values.push(parseFloat(coin.Price));
          chartData.dates.push(date);
        });

        let cryptoChartConfig = {
          showProgress: false,
          backgroundColor: "#111",
          graphset: [
            {
              type: "area",
              backgroundColor: "#111",
              width: "100%",
              height: "80%",
              x: "0px",
              y: "0px",
              plot: {
                preview: "true",
              },
              plotarea: {
                marginTop: "5%",
                marginBottom: "15%",
                marginLeft: "8%",
              },
              scaleX: {
                values: chartData.dates,
                lineWidth: "1px",
                tick: {
                  lineWidth: "1px",
                },
                zooming: true,
              },
              scaleY: {
                format: "£%v",
                guide: {
                  items: [
                    {
                      backgroundColor: "#111",
                    },
                  ],
                  lineColor: "#3498DB",
                  lineStyle: "solid",
                },
                item: {
                  padding: "5px",
                },
                lineWidth: "1px",
                tick: {
                  lineWidth: "1px",
                },
              },
              crosshairX: {
                alpha: 0.3,
                lineColor: "#3498DB",
                lineWidth: "2px",
                scaleLabel: {
                  backgroundColor: "#3498DB",
                },
                shared: true,
                valueLabel: {
                  decimals: 4,
                  text: "Price: £%v",
                  textAlign: "left",
                },
              },
              tooltip: {
                visible: false,
              },
              zoom: {
                shared: true,
              },
              preview: {
                margin: "0 5% 6% 11%",
                alpha: 0,
                backgroundColor: "none",
                handle: {
                  backgroundColor: "#3498DB",
                  width: "15px",
                  height: "15px",
                },
                shared: true,
                width: "100%",
                height: "26%",
                y: "94%",
              },
              series: [
                {
                  values: chartData.values,
                  alphaArea: 0.5,
                  backgroundColor: "#3498DB",
                  lineColor: "#3498DB",
                  lineWidth: "2px",
                  marker: {
                    visible: false,
                  },
                },
              ],
            },
          ],
        };

        setTimeout(() => {
          zingchart.render({
            id: "cryptoChart",
            data: cryptoChartConfig,
            height: "100%",
            width: "100%",
          });
        }, 250);
      }
    },
    loadSentimentChart() {
      // Load sentiment chart
      zingchart.exec("cryptoChart", "destroy");

      let crypto = this.cryptoName;
      let positiveTweetsCount = 0;
      let negativeTweetsCount = 0;
      let neutralTweetsCount = 0;
      let mixedTweetsCount = 0;

      this.tweets[0].forEach((tweet) => {
        if (tweet.Currency == crypto) {
          let sentiment = tweet.Sentiment.Sentiment;
          if (sentiment === "POSITIVE") {
            positiveTweetsCount++;
          } else if (sentiment === "NEGATIVE") {
            negativeTweetsCount++;
          } else if (sentiment === "NEUTRAL") {
            neutralTweetsCount++;
          } else {
            mixedTweetsCount++;
          }
        }
      });

      let sentimentChartConfig = {
        type: "pie",
        backgroundColor: "#111",
        title: {
          text: crypto + " Sentiment Overview",
          align: "center",
          fontColor: "#fff",
          fontSize: "25px",
          offsetX: "10px",
        },
        plot: {
          tooltip: {
            text: "%npv%",
            padding: "5 10",
            fontSize: "18px",
          },
          valueBox: {
            text: "%t\n%npv%",
            placement: "out",
          },
          animation: {
            effect: "ANIMATION_EXPAND_VERTICAL",
            method: "ANIMATION_REGULAR_EASE_OUT",
            sequence: "ANIMATION_BY_PLOT",
            speed: 500,
          },
          borderColor: "#2B313B",
          borderWidth: "4px",
        },
        plotarea: {
          margin: "40 0 0 0",
        },
        series: [
          {
            text: "Positive",
            values: [positiveTweetsCount],
            backgroundColor: "#6FB07F",
          },
          {
            text: "Negative",
            values: [negativeTweetsCount],
            backgroundColor: "#FF7965",
          },
          {
            text: "Mixed",
            values: [mixedTweetsCount],
            backgroundColor: "#6877e5",
          },
          {
            text: "Neutral",
            values: [neutralTweetsCount],
            backgroundColor: "#717172",
          },
        ],
      };

      setTimeout(() => {
        zingchart.render({
          id: "sentimentChart",
          data: sentimentChartConfig,
          height: "100%",
          width: "100%",
        });
      }, 250);
    },
  },
  mounted: function () {
    // Process coins data to create the table
    this.coins = coins;
    this.tweets = tweets;
    setTimeout(() => {
      this.coins.forEach((coin) => {
        let oldAmount = parseFloat(coin[coin.length - 2].Price).toFixed(3);
        let newAmount = parseFloat(coin[coin.length - 1].Price).toFixed(3);
        let amountDifference = oldAmount - newAmount;
        let percentageDifferece = (100 * amountDifference) / oldAmount;

        this.table.push({
          currency: coin[coin.length - 1].Currency,
          timestmap: coin[coin.length - 1].Timestamp,
          price: parseFloat(coin[coin.length - 1].Price).toFixed(3),
          priceDifference: (percentageDifferece * -1).toFixed(2),
        });
      });
      this.displayData("graph", 0);
    }, 4000);
  },
});
