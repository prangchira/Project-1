/* 
    Javascript for Project 1
    Developers - Team 8 ......our names go here!
    First Created - 1st February 2024

    This code handles logic for the "Movie for your Meal" app ......or something similar!

*/


// Event Listeners

// - "Search" button "click" event
$("#search-button").on('click', function(event){
  console.log("Starting Search")
  searchForMealAndMovies() // start new search when user clicks the search button
})

// Variable Declarations

// - API Calling
var apiURL_Food = "https://........"
var apiURL_TheMovieDB = "https://api.themoviedb.org/3/search/movie"

var apiKey_Food = "......"    
var apiKey_TheMovieDB  = "b72e96c54ea2a07a5e26896ddd3161a7"    


// notes : 
// The following variables are placed here so that they are in scope for ANY function.
// Variables that only need to be used within a single function should really be declared within that function and not here.

// USER Input
var userInput_NameOfMeal = ""

// FOOD API 
// note : the object foodDetails is populated with the meal returned from the Food API
var foodDetails = {
  Meal : "",          
  Catagory : "",
  Area: "",
  Ingredients : []        // an array is needed here
  //etc....
}

// MOVIE API
// note : the object movieDetails is populated with each movie returned from the Movie API and then added to the moviesList array
var movieDetails = {
  Title : "",             
  Genre : "",
  Actors : []     
  //etc....
  }
var moviesList = []


// MAIN LOGIC 

// Do Search - called when the user clicks on the "Search" button
function searchForMealAndMovies() {

  // Notes : 
  // By breaking tasks down into individual functions, team members can more easily be assigned to complete them.


  // (1) Get User Input and Initialise application
  // ---------------------------------------------

  // Get User Input, Validate User Input and Populate userInput_NameOfMeal variable
  getUserInputAndValidate()

  // Reset screen (clear any existing search results) 
  resetScreen()


  // (2) Get information from "Food API"
  // -----------------------------------

  // Search "Food API" for the Meal that the user entered and Populate foodAPI variables with results
  searchFoodAPI()

  // If the "Food API" returned No Data, let the user know and STOP Search
  validateFoodAPIData()

  // Display the results from the "Food API" (update screen using foodAPI variables)
  displayResultsFromFoodAPI()


  // (2) Get information from "Movie API"
  // ------------------------------------

  // REPEAT for items of information returned from the "Food API"                   
  
      // Search "Movie API" and Populate movieList variables with results
      searchMovieAPI("TEST")

  // Display the results from the "Movie API" (update screen using movieList variables)
  displayResultsFromMovieAPI()
}





// SUPPORTING FUNCTIONS

// (Get User Input, Validate User Input and Populate Variable
function getUserInputAndValidate() {}

// Reset screen (clear any existing search results)
function resetScreen() {}

// Search "Food API" for the Meal that user entered and Populate food API variables with results
function searchFoodAPI() {}

// If the "Food API" returned No Data, let the user know (update screen) and STOP (exit this function)
function validateFoodAPIData() {}

// Display the results from the "Food API" (update screen using foodAPI variables)
function displayResultsFromFoodAPI() {}

// Search "Movie API" and Populate movieList variable with results
function searchMovieAPI(searchString) {

  // build API query
  var queryURL= apiURL_TheMovieDB + "?query=" + searchString + "&api_key=" + apiKey_TheMovieDB

  // run API query
  fetch(queryURL).then(function (response) {
      return response.json();
  }).then(function (data) {
      console.log(data)
    })

    // save movies returned by API

    // etc......

}

// Display the results from the "Movie API" (update screen using movieList variable)
function displayResultsFromMovieAPI() {}








// TEST code

init()
function init() {
  console.log("Javascript reference ok")
}
