/* 
    Javascript for Project 1
    Developers - Team 8 ......our names go here!
    First Created - 1st February 2024

    This code handles logic for the "Movie for your Meal" app ......or something similar!

*/


// Query selectors

  //Nav bar
  var searchBtn = document.querySelector(".searchButton");
  var homeBtn = document.querySelector(".home");

  //User input section
  var mealInput = document.querySelector(".input-meal2");
  var searchMealBtn = document.querySelector("#meal-search");
  //Results section
  var resultsPage = document.querySelector('.hero-bg-image');

  //Footer


// Event Listeners

// - "Search" button "click" event
searchMealBtn.onclick = function(){
  console.log("Starting Search")
  searchForMealAndMovies() // start new search when user clicks the search button
}

// $("#search-button").on('click', function(event){
//   console.log("Starting Search")
//   searchForMealAndMovies() // start new search when user clicks the search button
// })


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
  Ingredients : [],        // an array is needed here
  foodImage
  //etc....
}

// MOVIE API
// note : the object movieDetails is populated with each movie returned from the Movie API and then added to the moviesList array
var movieDetails = {
  Title : "",             
  Genre : "",
  Actors : [],    
  movieImage
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
    // EDIT: This has been covered by the automatic HTML validator https://www.w3schools.com/js/js_validation.asp


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

// Get User Input, Validate User Input and Populate Variable
function getUserInputAndValidate() {
  // get user input from the webpage
  // if the user has not entered anything at all, display an error message (eg. "please enter a meal") 
    // EDIT: This has been covered by the automatic HTML validator https://www.w3schools.com/js/js_validation.asp

}

// Reset screen (clear any existing search results)
function resetScreen() {
  // clear any existing search results (movies) from the screen
}


// Search "Food API" for the Meal that user entered and Populate food API variables with results
function searchFoodAPI() {
  // search the Food API
  
  // populate the variable (object) foodDetails with data returned from 
}

// If the "Food API" returned No Data, let the user know 
function validateFoodAPIData() {
  // if the variable foodDetails contains no values, let the user know (display message on webpage)
  // EDIT: This has been covered by the automatic HTML validator https://www.w3schools.com/js/js_validation.asp
}

// Display the results from the "Food API" (update screen using foodAPI variables)
function displayResultsFromFoodAPI() {
  // populate the screen with the values from the variable foodDetails
  // note : at the moment we are only displaying the food name (foodAPI.Meal) and image (foodAPI.foodImage)
}



// Search "Movie API" and Populate movieList variable with results
function searchMovieAPI(searchString) {

  // build API query
  var queryURL= apiURL_TheMovieDB + "?query=" + searchString + "&api_key=" + apiKey_TheMovieDB

  // run API query
  fetch(queryURL).then(function (response) {
      return response.json();
  }).then(function (data) {
      console.log(data)
    });

  // For each movie returned by the Movie API
    
      // save movies details to the variable (object) movieDetails

      // add the movie (movieDetails) to the moviesList array
      // note : preferbly we wont add movies that already exit in the array



}

// Display the results from the "Movie API" (update screen using movieList variable)
function displayResultsFromMovieAPI() {

  // display the first Movie in the list (the array called movieDetails) onto the screen
  
}









// TEST code

init()
function init() {
  console.log("Javascript reference ok")
}

