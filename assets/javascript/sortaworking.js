var apiKey = "42LHI6W5OA6L5CTI";
var ticker;
var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+ ticker + "&interval=1min&apikey=" + apiKey



        $(document).ready(function(){
    $(".nav-tabs a").click(function(){
        $(this).tab('show');
       });
    });

function stockSearch() {
$("#submit").on("click", function() {
  ticker = $("#companyName").val().trim()
})
};

stockSearch();


      // $.ajax({
      //   url: queryURL,
      //   method: "GET"
      // })
      // .done(function(data) {
      // 	console.log(data);
      // 	var stockResults = Stock.response.docs;
      // 	console.log(stockResults);
      		
      // 	}


$.getJSON('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AAPL&outputsize=full&apikey=42LHI6W5OA6L5CTI', function (data) {
    // Create the chart
    console.log(data);
    var convData = parseData(data["Time Series (Daily)"]);
    convData.sort(function(a,b){return a[0] - b[0]});
    Highcharts.stockChart('chartSpot', {




        rangeSelector: {
            selected: 1
        },

        title: {
            text: ticker +  " Stock Price" 
        },

        series: [{
            name: ticker,
            data: convData,
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
});

function parseData(data){
  var response = [];

  Object.keys(data).forEach(function(key){
    var entry = [];
    var dateConv = moment(key).format("x");
    entry.push(Number.parseFloat(dateConv));
    console.log(dateConv);
    entry.push(Number.parseFloat(data[key]["4. close"]));
    response.push(entry);
    console.log(entry);
  })
  return response;

}


      	
