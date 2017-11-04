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

      	// for (var i = 0; i < stockResults.length; i++) {
      	// 	var articleDiv = $("<div>");
      	// 	var headline = stockResults[i].headline.main;
      	// 	console.log("for loop running")
      	// 	articleDiv.append("<p>" + headline);
      	// 	articleDiv.text("<p>" + headline);
      		
      	// }
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


      	
