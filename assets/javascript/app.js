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
// FB LINK & TABLE CREATION FOR STOCKS
database.ref("/wallet").on("value", function(snapshot) {
$(".stockTable").empty();
snapshot.forEach(function(walletList) {
  makeWalletTable(walletList.val());
});
});
// FB LINK & TABLE CREATION FOR CRYPTO
database.ref("/crypto").on("value", function(snapshot) {
$("#cryptoTable").empty();
snapshot.forEach(function(cryptoList) {
  makeCryptoTable(cryptoList.val());
});
});
// FB LINK & TABLE CREATION FOR WATCH LIST
database.ref("/watch").on("value", function(snapshot) {
$("#watchTable").empty();
snapshot.forEach(function(watchList) {
  makeWatchTable(watchList.val());
});
});
//CLICK LISTENER & SUBMITTING INFO TO FB FOR STOCKS
      $("#stockSubmit").on("click", function() {
        var stockSymbol = $("#stockSymbol").val().trim();
        var myStockHoldings = $("#myStockHoldings").val().trim();              
        var newStock = {
          stockSymbol: $("#stockSymbol").val().trim(),
          myStockHoldings: $("#myStockHoldings").val().trim(),
        }
        database.ref("wallet").push(newStock);

      });
// function to make stock table
  function makeWalletTable(wallet){
    var thisId = wallet.stockSymbol;
    var tr = $('<tr class="text-center">');
    tr.append($('<td class="text-center" id="' + thisId + '">').text(wallet.stockSymbol));
    tr.append($('<td class="text-center" id="' + thisId + '">').text(wallet.myStockHoldings * 100)); // need to actually link to current price via yahoo or something
    tr.append($('<td class="text-center" id="' + thisId + '">').text(wallet.myStockHoldings));
    tr.append($('<button type="button" class="btn btn-default btn-sm removeButton"> <span class="glyphicon-remove" aria-hidden="true"></span></button')
      .on("click", function(event) {
        event.stopPropagation();
        console.log("clicked delete");
        var jThis = $(this);
        jThis.closest('tr').remove();
        // delete item from firebase
        removeWallet(thisId);
      })
    );

    $(".stockTable").append(tr);
  }
  // function to search through FB for matching ID and delete just the one item
function removeWallet(thisId){
  database.ref("/wallet").once('value').then(function(wallet) {
    wallet.forEach(function(stock) {
      console.log(stock.val());
      if (thisId === stock.val().stockSymbol) {
        console.log("in stock statement");
        console.log(stock.val());
        stock.ref.remove();
      }
    });
  });
};



//function to remove row locally
// $("btn.removeButton").on("click", function() {
//   console.log("clicked delete");
//   var remove = this.event.id;
//   $(this).closest('tr').remove();
  
// })

// click listener & submitting info to FB for Crypto
      $("#cryptoSubmit").on("click", function() {
        var cryptoSymbol = $("#cryptoSymbol").val().trim();
        var myCryptoHoldings = $("#myCryptoHoldings").val();
        var newCrypto = {
          cryptoSymbol: $("#cryptoSymbol").val().trim(),
          myCryptoHoldings: $("#myCryptoHoldings").val(),
        }
        database.ref("crypto").push(newCrypto);        

      });
// function to make crypto table
  function makeCryptoTable(crypto){
    var thisIdc = crypto.cryptoSymbol;
    var tr = $('<tr>');
    tr.append($('<td class="text-center" id="' + thisIdc + '">').text(crypto.cryptoSymbol));
    tr.append($('<td class="text-center" id="' + thisIdc + '">').text("value"));
    tr.append($('<td class="text-center" id="' + thisIdc + '">').text(crypto.myCryptoHoldings));
       tr.append($('<button type="button" class="btn btn-default btn-sm removeButton"> <span class="glyphicon-remove" aria-hidden="true"></span></button')
      .on("click", function(event) {
        event.stopPropagation();
        console.log("clicked delete");
        var kThis = $(this);
        kThis.closest('tr').remove();
        // delete item from firebase
        removeCrypto(thisIdc);
      })
    );
    $("#cryptoTable").append(tr);
  }
// function to remove crypto from DB & table when clicking X
function removeCrypto(thisIdc){
  database.ref("/crypto").once('value').then(function(cryptos) {
    cryptos.forEach(function(crypto) {
      console.log(crypto.val());
      console.log(thisIdc);
      if (thisIdc === crypto.val().cryptoSymbol) {
        console.log("in crypto statement");
        console.log(crypto.val());
        crypto.ref.remove();
      }
    });
  });
};


// click listener & submitting info to FB for watch list
      $("#watchSubmit").on("click", function() {
        var watchSymbol = $("#watchSymbol").val().trim();
        var newWatchSymbol = $("<td>").text(watchSymbol);
        var newWatch = {
          watchSymbol: $("#watchSymbol").val().trim(),
        }
        database.ref("watch").push(newWatch); 


      });
// function to make watch list table
  function makeWatchTable(watch){
    var thisIdw = watch.watchSymbol;
    var tr = $('<tr>');
    tr.append($('<td class="text-center" id="' + thisIdw + '">').text(watch.watchSymbol));
    tr.append($('<button type="button" class="btn btn-default btn-sm"> <span class="glyphicon-remove" aria-hidden="true"></span></button')
    .on("click", function(event) {
        event.stopPropagation();
        console.log("clicked watch delete");
        var lThis = $(this);
        lThis.closest('tr').remove();
        // delete item from firebase
        removeWatch(thisIdw);
      })
    );


    $("#watchTable").append(tr);
  }
  // function to remove watched items from DB and from table on X click
function removeWatch(thisIdw){
  database.ref("/watch").once('value').then(function(watches) {
    watches.forEach(function(watch) {
      console.log(watch.val());
      console.log(thisIdw);
      if (thisIdw === watch.val().watchSymbol) {
        console.log("in watch statement");
        console.log(watch.val());
        watch.ref.remove();
      }
    });
  });
};

// need to do clone 131-169 TWO more times for crypto and for watch list, changing some of the internal data inbetween
$(".stockTable").on("click", function() {    // need to update with on click for each individual row
  var ticker = event.target.id;
  console.log(ticker);
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

// need to use YAHOO or something to get current price of each symbol to do math in table.
// API calls for current price - and for crypto.


        