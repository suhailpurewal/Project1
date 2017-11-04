var config = {
    apiKey: "AIzaSyB3pRLg6RLHApVRY2lFeE_8ZCgKYL7wp94",
    authDomain: "employeedata-a2042.firebaseapp.com",
    databaseURL: "https://employeedata-a2042.firebaseio.com",
    projectId: "employeedata-a2042",
    storageBucket: "employeedata-a2042.appspot.com",
    messagingSenderId: "91433535570"
  };

firebase.initializeApp(config);
var database = firebase.database();

$(document).ready(function(){
    $(".nav-tabs a").click(function(){
        $(this).tab('show');
       });
    });



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


$("#stocks").on("click", function() {    // need to update with on click for each individual row
  var ticker = "FB";
$.getJSON('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + ticker + '&outputsize=full&apikey=42LHI6W5OA6L5CTI', function (data) {
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




}

// need to sort array before sending data to high charts - got it
// compact works but full gives error after 200 or so items - got it - SLOW NOW
// even after converting to UNIX date is not working correctly in highcharts. - GOT IT
// seperate API calls for crypto and stocks - need seperate areas.


      	
