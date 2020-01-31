//user loads into the page 
//user should be able to add text into various search bar
//user then clicks on submit 
//create an on click function that then stores that item into an array 
//that array is then pulled into the the ajax call for the API 
// it will then have a jquery listener that will display that result in its corresponding html element 
//** THE PULL Should list most recent published recipes first then going backwards
//limit search result to 10
//those 10 images will then be displayed on the screen 

$(window).on("load", function() {
var randomNum = Math.floor(Math.random()* 716429)
console.log(randomNum)
var randomLink = "https://api.spoonacular.com/recipes/"+randomNum+"/information?includeNutrition=false&apiKey=d7615b5038b14b0e99d9079f0aee801d";
$.ajax({
    url: randomLink,
    method: "GET"
}).then(function(listener) {
console.log(listener);



})
});

// API Key: d7615b5038b14b0e99d9079f0aee801d
//example request and response: https://api.spoonacular.com/recipes/search?query=cheese&number=2
var recipeId;
var picture;
//when search button is clicked the searchFood() function is run---- takes search keyword and adds into the queryURL then makes an AJAX call with the url and returnes the data
$("#submit").on("click", function(event){
    
    event.preventDefault();
    var searched = $(".searchbar").val().trim();
    var queryURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + searched + "&maxFat=25&number=2&apiKey=d7615b5038b14b0e99d9079f0aee801d";
     $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response);
        var result = response.results
        var i;
        for (i = 0; i < result.length; i++){

            recipeId = result[i].id;
            var image = "https://spoonacular.com/recipeImages/"+recipeId+"-556x370.jpg";
            picture = $("<img>");
            picture.attr("data-image", recipeId);
            picture.attr("src", image);
            
            var p = $("<ul>");
            p.addClass("foodList");
            p.text(result[i].title);
            
            $(".searchResults").append(picture,p);
        }
    }); 
    clearImages();
});

$(document).on("click", "img", function(event){
    event.preventDefault();
    //make a new api call
    var pictureID = $(this).attr("data-image");
    console.log(pictureID);
    var recipeLink = "https://api.spoonacular.com/recipes/"+pictureID+"/information?includeNutrition=false&apiKey=d7615b5038b14b0e99d9079f0aee801d";

    $.ajax({
        url: recipeLink,
        method: "GET"
    }).then(function(data) {
        var sourceURL= data.sourceUrl
        console.log(sourceURL);
        window.open(sourceURL, '_blank')
        // location.href = sourceURL;
    })
   
}); 

function clearImages() {
    $(".searchResults").empty();
}