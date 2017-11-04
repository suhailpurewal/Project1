var apiKey = "42LHI6W5OA6L5CTI";
var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=" + apiKey


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






        $(function () { 
    var myChart = Highcharts.chart("chartSpot", {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
});


      	
