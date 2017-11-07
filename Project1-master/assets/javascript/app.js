var apiKey = "42LHI6W5OA6L5CTI";
var ticker;
var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+ ticker + "&interval=1min&apikey=" + apiKey


// top panel div is called #search
// bottom panel is called #results

// response.docs[x].web_url - url
// response.docs[x].headline.main - headline url
// response.docs[x].byline.original - author
// response.docs[x].pub_date - posting date
// response.docs[x].new_desk - 
$(document).ready(function(){
    $(".nav-tabs a").click(function(){
        $(this).tab('show');
       });
    });
stockSearch();
function stockSearch() {
$("#submit").on("click", function() {
  ticker = $("#companyName").val().trim()
})
};

stockSearch();

 $(".submitBtn").on("click", function()
      {

        var stockSymbol = $("#stockSymbol").val().trim();
        var myStockHoldings = $("#myStockHoldings").val().trim();
        var cryptoSymbol = $("#cryptoSymbol").val().trim();
        var myCryptoHoldings = $("#myCryptoHoldings").val();
        var watchSymbol = $("#watchSymbol").val().trim();

        var newStockRow = $("<tr>");
        var newCryptoRow = $("<tr>");
        var newWatchRow = $("<tr>");


        var newStockSymbol = $("<td>").text(stockSymbol);
        var newStockHoldings = $("<td>").text(myStockHoldings);
        var newStockValue = $("<td>").text("");
        var newCryptoSymbol = $("<td>").text(cryptoSymbol);
        var newCryptoHoldings = $("<td>").text(myCryptoHoldings);
        var newCryptoValue = $("<td>").text("");
        var newWatchSymbol = $("<td>").text(watchSymbol);
        var newWatchValue = $("<td>").text("");
        var newWatchDate = $("<td>").text("");

        newStockRow.append(newStockSymbol);
        newStockRow.append(newStockValue);
        newStockRow.append(newStockHoldings);
        newCryptoRow.append(newCryptoSymbol);
        newCryptoRow.append(newCryptoHoldings);
        newCryptoRow.append(newCryptoValue);
        newWatchRow.append(newWatchSymbol);
        newWatchRow.append(newWatchValue);
        newWatchRow.append(newWatchDate);

        $("#stocks").append(newStockRow);
        $("#cryptos").append(newCryptoRow);
        $("#watchList").append(newWatchRow);

      });




$.getJSON('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=FB&outputsize=full&apikey=42LHI6W5OA6L5CTI', function (data) {
    // Create the chart
    console.log(data);
    var convData = parseData(data["Time Series (Daily)"]);
    convData.sort(function(a,b){return a[0] - b[0]});
    Highcharts.stockChart('chartSpot', {

      // $.ajax({
      //   url: queryURL,
      //   method: "GET"
      // }).done(function(Stock) {
      // 	console.log(Stock);
      // 	var stockResults = Stock.response.docs;
      // 	console.log(stockResults);

      // 	for (var i = 0; i < stockResults.length; i++) {
      // 		var articleDiv = $("<div>");
      // 		var headline = stockResults[i].headline.main;
      // 		console.log("for loop running")
      // 		articleDiv.append("<p>" + headline);
      // 		articleDiv.text("<p>" + headline);
      		
      // 	}

     

      	// for (var i = 0; i < stockResults.length; i++) {
      	// 	var articleDiv = $("<div>");
      	// 	var headline = stockResults[i].headline.main;
      	// 	console.log("for loop running")
      	// 	articleDiv.append("<p>" + headline);
      	// 	articleDiv.text("<p>" + headline);
      		
      	// }

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

        $(".add-company").on("click", function(event) {
          event.preventDefault();
          var newCompany = $("#newcomp").val().trim();
          console.log(newCompany);
          displayStock(newCompany);
        });

        function displayStock(newCompany) {

          var queryURL =  "https://autoc.finance.yahoo.com/autoc?query=" + newCompany + "&region=EU&lang=en-GB";

            $.ajax({
              url: queryURL,
              method: "GET",
              crossDomain: true,
            }).done(function(response){
              var results = response.data;
              console.log(results)
            })
          };


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

// need to sort array before sending data to high charts - got it
// compact works but full gives error after 200 or so items - got it - SLOW NOW
// even after converting to UNIX date is not working correctly in highcharts. - GOT IT
// seperate API calls for crypto and stocks - need seperate areas.


      	
