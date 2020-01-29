//user loads into the page 
//user should be able to add text into various search bar
//user then clicks on submit 
//create an on click function that then stores that item into an array 
//that array is then pulled into the the ajax call for the API 
// it will then have a jquery listener that will display that result in its corresponding html element 
//** THE PULL Should list most recent published recipes first then going backwards
//limit search result to 10
//those 10 images will then be displayed on the screen 
var storedResponse = {
    "results": [
    {
    "id": 485365,
    "title": "Chicken Spinoccoli – Breaded Stuffed Chicken Breast With Spinach, Broccoli and Cheese",
    "readyInMinutes": 65,
    "servings": 4,
    "image": "chicken-spinoccoli-breaded-stuffed-chicken-breast-with-spinach-broccoli-and-cheese-485365.jpg",
    "imageUrls": [
    "chicken-spinoccoli-breaded-stuffed-chicken-breast-with-spinach-broccoli-and-cheese-485365.jpg"
    ]
    },
    {
    "id": 107878,
    "title": "Garlic Chicken",
    "readyInMinutes": 45,
    "servings": 4,
    "image": "garlic-chicken-2-107878.png",
    "imageUrls": [
    "garlic-chicken-2-107878.png",
    "garlic_chicken-107878.jpg"
    ]
    },
    {
    "id": 110434,
    "title": "Chicken Divan",
    "readyInMinutes": 50,
    "servings": 6,
    "image": "chicken-divan-110434.jpg",
    "imageUrls": [
    "chicken-divan-110434.jpg"
    ]
    },
    {
    "id": 129383,
    "title": "Chicken With Cranberries",
    "readyInMinutes": 45,
    "servings": 4,
    "image": "chicken-with-cranberries-2-129383.jpg",
    "imageUrls": [
    "chicken-with-cranberries-2-129383.jpg"
    ]
    },
    {
    "id": 136858,
    "title": "Chicken Saltimbocca",
    "readyInMinutes": 45,
    "servings": 4,
    "image": "chicken-saltimbocca-2-136858.png",
    "imageUrls": [
    "chicken-saltimbocca-2-136858.png"
    ]
    }
    ],
    "baseUri": "https://spoonacular.com/recipeImages/",
    "offset": 0,
    "number": 5,
    "totalResults": 326,
    "processingTimeMs": 332,
    "expires": 1580012636877,
    "isStale": false
    };

// API Key: d7615b5038b14b0e99d9079f0aee801d
//example request and response: https://api.spoonacular.com/recipes/search?query=cheese&number=2


//when search button is clicked the searchFood() function is run---- takes search keyword and adds into the queryURL then makes an AJAX call with the url and returnes the data
$("#submit").on("click", function(event){
    
    event.preventDefault();
    var searched = $(".searchbar").val().trim();
    var queryURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + searched + "&maxFat=25&number=5&apiKey=d7615b5038b14b0e99d9079f0aee801d";
     $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response);
        var result = response.results
        // $(".searchResults").text(JSON.stringify(response));
        var i;
        for (i = 0; i < result.length; i++){
            console.log(result[i].id);
            console.log(result[i].title);
            
        }
    });

    
});
//Create the new row
var newRow = $("<tr>").append(
    $("<td>").text(placeholder),
    $("<td>").text(placeholder),
    $("<td>").text(placeholder),
);
//Append new row to the table
$("#placeholder-table> tbody").append(newRow);