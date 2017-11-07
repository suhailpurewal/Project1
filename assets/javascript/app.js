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



$.getJSON('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=FB&outputsize=full&apikey=42LHI6W5OA6L5CTI', function (data) {
    // Create the chart
    console.log(data);
    var convData = parseData(data["Time Series (Daily)"]);
    convData.sort(function(a,b){return a[0] - b[0]});
    Highcharts.stockChart('chartSpot', {


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


        var proxy = "https://cors-anywhere.herokuapp.com/"
        var queryURL = proxy + ["https://autoc.finance.yahoo.com/autoc?query=" + newCompany + "&region=EU&lang=en-GB&x=NYSE"];

            $.ajax({
              url: queryURL,
              method: "GET",
              crossDomain: true,
            }).done(function(response){
              console.log(response);
              
              var stockarry = [];

              
              if (response.ResultSet.Result.length === 0) {
                
                var nope = $("<p>").text("No Stock Found");

                $("#stocktickers").empty();
                $("#stocktickers").append(nope);

              }else{
                for (i = 0; i < response.ResultSet.Result.length; i++) {
                  if (response.ResultSet.Result[i].exchDisp === "NYSE") {
                    stockarry.push(response.ResultSet.Result[i]);

                    console.log(stockarry.length);

                    var stockticker1 = stockarry[0].symbol;
                    var stockname1 = stockarry[0].name;

                    var stk1 = $("<p>").text(stockname1 + ": " + stockticker1);

                    $("#instructions").addClass("hidden");
                    $("#stocktickers").empty();
                    $("#stocktickers").append(stk1)

                  }else if (response.ResultSet.Result[i].exchDisp === "NASDAQ") {
                    stockarry.push(response.ResultSet.Result[i]);

                    console.log(stockarry.length);

                    var stockticker1 = stockarry[0].symbol;
                    var stockname1 = stockarry[0].name;

                    var stk1 = $("<p>").text(stockname1 + ": " + stockticker1);

                    $("#instructions").addClass("hidden");
                    $("#stocktickers").empty();
                    $("#stocktickers").append(stk1)

                  }
                }
              }


              //console.log(stockarry)


              //var stockticker1 = stockarry[0].symbol;
              //var stockname1 = stockarry[0].name;
         

             // var stk1 = $("<p>").text("Stock 1: " + stockname1 + ": " + stockticker1 + ", ");
             // var stk2 = $("<p>").text("Stock 2: " + stockname2 + ": " + stockticker2 + ", ");
             // var stk3 = $("<p>").text("Stock 3: " + stockname3 + ": " + stockticker3);

              //$("#instructions").addClass("hidden");
              //$("#stocktickers").empty();
              //$("#stocktickers").append(stk1)//.append(stk2).append(stk3);

        


              
  
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


      	
