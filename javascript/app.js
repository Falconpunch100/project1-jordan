//user loads into the page 
//user should be able to add text into various search bar
//user then clicks on submit 
//create an on click function that then stores that item into an array 
//that array is then pulled into the the ajax call for the API 
// it will then have a jquery listener that will display that result in its corresponding html element 
//** THE PULL Should list most recent published recipes first then going backwards
//limit search result to 10
//those 10 images will then be displayed on the screen 






$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

})