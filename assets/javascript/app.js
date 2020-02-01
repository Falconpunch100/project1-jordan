//user loads into the page 
//user should be able to add text into various search bar
//user then clicks on submit 
//create an on click function that then stores that item into an array 
//that array is then pulled into the the ajax call for the API 
// it will then have a jquery listener that will display that result in its corresponding html element 
//** THE PULL Should list most recent published recipes first then going backwards
//limit search result to 10
//those 10 images will then be displayed on the screen 
// API Key: d7615b5038b14b0e99d9079f0aee801d
//example request and response: https://api.spoonacular.com/recipes/search?query=cheese&number=2
// helper search functions
function bindImageClickEvents() {
    $(".search-result img").click(function(event){
        event.preventDefault();
        //make a new api call
        var pictureID = $(this).attr("data-image");
        console.log(pictureID);
        var recipeLink = "https://api.spoonacular.com/recipes/" + pictureID + "/information?includeNutrition=false&apiKey=d7615b5038b14b0e99d9079f0aee801d";
    
        $.ajax({
            url: recipeLink,
            method: "GET"
        }).then(function(response) {
            //console.log(JSON.stringify(data));
            var sourceURL= response.sourceUrl
            console.log(sourceURL);
            window.open(sourceURL, '_blank'); // open link in new tab, we don't want user to leave our page!
            // location.href = sourceURL;
        })
    }); 
}

function searchAndDisplayResult(query) {
    // clear previous results, and show loading messages
    $("#search-results").html("Loading...");

    var queryURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + query + "&maxFat=25&number=0&apiKey=d7615b5038b14b0e99d9079f0aee801d";
    $.ajax({
       url: queryURL,
       method: "GET"
   }).then(function(response) {
       // console.log(JSON.stringify(response));
       // clear loading message
       $("#search-results").empty();

       var result = response.results
       for (var i = 0; i < result.length; i++) {
           // html to build
           // <div class="search-result">
           //     <div class="search-result-image">
           //         <img src="https://i.pinimg.com/474x/b5/3d/e7/b53de7415b690b4af325e052bf44d20a.jpg" />
           //     </div>
           //     <div class="search-result-details">
           //         <div class="search-result-details-title">
           //         Potato Stew
           //         </div>
           //     </div>
           // </div>
           var recipeId = result[i].id;

           // build image tags
           var imageUrl = "https://spoonacular.com/recipeImages/" + recipeId + "-556x370.jpg";
           var img = $("<img>");
           img.attr("data-image", recipeId);
           img.attr("src", imageUrl);

           var searchResultImageDiv = $('<div class="search-result-image">');
           searchResultImageDiv.html(img);

           // build recipe text tags
           var searchResultDetailsTitleDiv = $('<div class="search-result-details-title">');
           searchResultDetailsTitleDiv.html(result[i].title);
           
           var searchResultDetailsDiv = $('<div class="search-result-details">');
           searchResultDetailsDiv.html(searchResultDetailsTitleDiv);

           var searchResultDiv = $('<div class="search-result">');
           searchResultDiv.append(searchResultImageDiv);
           searchResultDiv.append(searchResultDetailsDiv);

           $("#search-results").append(searchResultDiv);
       }
       bindImageClickEvents()
   }); 
}

//when search button is clicked the searchFood() function is run---- takes search keyword and adds into the queryURL then makes an AJAX call with the url and returnes the data
$("#submit").on("click", function(event){
    event.preventDefault();
    var searchQuery = $(".searchbar").val().trim();
    searchAndDisplayResult(searchQuery);
});

$(document).ready(function() {
    // https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range/1527834
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var queries = ['apple', 'orange', 'pumpkin', 'corn'];
    var randomQuery = getRandomInt(0, queries.length - 1);
    searchAndDisplayResult(queries[randomQuery]);
});
var postal;
var weatherAPI 
//creating the secondary API call to our geolocation
$(window).on("load", function() {
    var geoLocation = "https://geolocation-db.com/jsonp/0f761a30-fe14-11e9-b59f-e53803842572";
    
	$.ajax({
		url: geoLocation,
		jsonpCallback: "callback",
		dataType: "jsonp",
		success: function( location ) {
            console.log(location.country_name)
            console.log(location.postal)
            postal = location.postal
            weatherAPI = "https://api.openweathermap.org/data/2.5/weather?zip=" + postal + "&appid=f020cb128a346025ae9c0806ba1c8552";
		}
	}).then(function() {
        $.ajax({
            url: weatherAPI,
            method: "GET"
        }).then(function(data) {
            console.log(data);
            var location = data.name
            $("#location").text(location + ", " + data.sys.country)
            var mainTemp= parseInt((data.main.temp -273.15) *1.80 + 32)
            $("#temp").text(mainTemp + " F")
            var feelsLike = parseInt((data.main.feels_like -273.15) *1.80 + 32)
            $("#feelsLike").text(feelsLike + " F")
            var tempMin = parseInt((data.main.temp_min -273.15) *1.80 + 32)
            $("#min").text(tempMin + " F")
            var tempMax =  parseInt((data.main.temp_max -273.15) *1.80 + 32)
            $("#max").text(tempMax + " F")
        })
    });		
});
