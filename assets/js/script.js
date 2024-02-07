/* 
    Javascript for Project 1
    Developers - Team 8 
    First Created - 1st February 2024

    This code handles logic for the "Movies for Munchies" application

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

var movieIndex = 0
// Event Listeners

// - "Search" button "click" event
$("#search-btn").on('click', function(event){
  // start a new search when the user clicks on the search button
  event.preventDefault()
  console.log("**** Starting New Search ****")
  searchForMealAndMovies() 
})
$("#next-btn").on('click', function(event){
  // start a move next when the user clicks on the next button
  event.preventDefault()
  console.log("**** move next ****")
  viewNext() 
})
$("#previous-btn").on('click', function(event){
  // start a go back when the user clicks on the previous button
  event.preventDefault()
  console.log("**** go back ****")
  viewPrevious() 
})


// Variable Declarations
// notes : The following variables are placed here so that they are in scope for all functions

// - API Calling
var apiURL_Food = "https://www.themealdb.com/api/json/v1/1/search.php"   
var apiURL_Movie = "https://api.themoviedb.org/3/search/movie"
var apiKey_Movie  = "b72e96c54ea2a07a5e26896ddd3161a7"    

// USER Input
var userInput_NameOfMeal = ""

// FOOD API 
// note : the object foodDetails is populated with the meal information returned from the Food API
var foodDetails = {
  Meal : "",          
  Catagory : "",
  Area: "",
  MealThumb : "",         // image
  Ingredients : [],       // array of ingredients
  Source : "",
  YouTube : ""
}

// MOVIE API
// notes : 
// The object movieDetails is populated with each movie returned from the Movie API
// It is then added to the moviesList array
var movieDetails = {
  Title : "",
  OriginalTitle : "", 
  OriginalLanguage : "",       
  Overview : "",
  Popularity : "",
  BackdropPath : "",      // image
  PosterPath : "",        // image
  ReleaseDate : ""
  }

var moviesList = []         // an array of movies returned from the Movie API

// MAIN LOGIC 

// Do Search - called when the user clicks on the "Search" button
function searchForMealAndMovies() {

  // Notes : 
  // By breaking tasks down into individual functions, team members can more easily be assigned to complete them.


  // (1) Get User Input and Initialise application
  // ---------------------------------------------

  // Reset variables to their initial values
  initialiseVariables()

  // Get User Input, Validate User Input and Populate the userInput_NameOfMeal variable
  getUserInputAndValidate()

  // Reset screen (clear any existing search results currently displayed on screen) 
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
     // searchMovieAPI(foodDetails.Meal)

  // Display the results from the "Movie API" (update screen using movieList variables)
  //displayResultsFromMovieAPI()


}



// SUPPORTING FUNCTIONS


// Reset variables to their initial values
function initialiseVariables() {

  // user Input
  userInput_NameOfMeal = ""

  // food Details
  foodDetails.Meal = ""    
  foodDetails.Catagory = ""
  foodDetails.Area = ""
  foodDetails.MealThumb  = ""
  foodDetails.Ingredients = []   
  foodDetails.Source = ""
  foodDetails.YouTube = ""

  // movie Details and movies List
  movieDetails.Title = "",
  movieDetails.OriginalTitle = "", 
  movieDetails.OriginalLanguage = "",       
  movieDetails.Overview = "",
  movieDetails.Popularity = "",
  movieDetails.BackdropPath = "",
  movieDetails.PosterPath = "",
  movieDetails.ReleaseDate = ""
  
  moviesList = []     // empty the list of movies

}


// Get User Input, Validate User Input and Populate Variable
function getUserInputAndValidate() {

  // get user input from the webpage
  userInput_NameOfMeal  = $("#search-input").val().trim().split(' ').join('_')
   
  // if the user has not entered anything at all, display an error message (eg. "please enter a meal")
  if (userInput_NameOfMeal === "") {
      alert("Please enter the name of a Meal")   // **** WE NEED TO REPLACE THIS, BECAUSE WE ARE NOT SUPPOSSED TO USE ALERTS 
  }
  else {
      console.log("User entered '" + userInput_NameOfMeal + "'")
  }
}


// Reset webpage (clear any existing search results)
function resetScreen() {
  // clear any existing search results (food and movies) from the WebPage

}


// Search "Food API" for the Meal that user entered and Populate food API variables with results
async function searchFoodAPI() {
  
  // build API query for Food
  var queryURL = apiURL_Food + "?s=" + userInput_NameOfMeal
  console.log("Food queryURL = " + queryURL)
  
  // run API query
  await fetch(queryURL).then(function (response) {
      return response.json()
  }).then(function (data) {

      // Check if a Meal was found
      if (data.meals === null) {
          console.log("Meal NOT Found by API")

      }
      else {
          console.log("Meal Found by API")

          // populate the variable (object) foodDetails with data returned from API
          foodDetails.Meal = data.meals[0].strMeal        
          foodDetails.Catagory = data.meals[0].strCategory
          foodDetails.Area = data.meals[0].strArea
          foodDetails.MealThumb = data.meals[0].strMealThumb
          foodDetails.Source = data.meals[0].strSource
          foodDetails.YouTube = data.meals[0].strYoutube

          if (data.meals[0].strIngredient1 != "") {foodDetails.Ingredients.push(data.meals[0].strIngredient1)} // if not empty string, add to Ingredients array
          if (data.meals[0].strIngredient2 != "") {foodDetails.Ingredients.push(data.meals[0].strIngredient2)}
          if (data.meals[0].strIngredient3 != "") {foodDetails.Ingredients.push(data.meals[0].strIngredient3)}
          if (data.meals[0].strIngredient4 != "") {foodDetails.Ingredients.push(data.meals[0].strIngredient4)}
          if (data.meals[0].strIngredient5 != "") {foodDetails.Ingredients.push(data.meals[0].strIngredient5)}
          if (data.meals[0].strIngredient6 != "") {foodDetails.Ingredients.push(data.meals[0].strIngredient6)}
          if (data.meals[0].strIngredient7 != "") {foodDetails.Ingredients.push(data.meals[0].strIngredient7)}
          if (data.meals[0].strIngredient8 != "") {foodDetails.Ingredients.push(data.meals[0].strIngredient8)}
          if (data.meals[0].strIngredient9 != "") {foodDetails.Ingredients.push(data.meals[0].strIngredient9)}
          if (data.meals[0].strIngredient10 != "") {foodDetails.Ingredients.push(data.meals[0].strIngredient10)}

          //console.log(`Food Details:` + foodDetails.Meal);

      } 

  }) // end of Food API fetch
  
  // build API query for Movies
  // console.log(`Food Name 1 `+ foodDetails.Meal);
      
  
  var queryString = [
       foodDetails.Meal.split(' ')[0], // remove spaces and first word of phrase
       foodDetails.Area,
  ]
  var IngredientsArray = foodDetails.Ingredients;
  for (var i = 0; i< IngredientsArray.length; i++) {
      queryString.push(IngredientsArray[i]);
  }
  
  // Select query word by creating a random index number from 0 to array lenght
  // That makes the result different if it calls same meal name
  var randomIndex = randomNum(0, IngredientsArray.length);
  console.log(`========= QUERY AS AN ARRAY ==============`);
  console.log(`Query Array : `+ JSON.stringify(queryString));
  console.log(`Query index is :` + randomIndex + ` and the query is `+ queryString[randomIndex]);
  // console.log(`Lenght `+ queryString.lenght);

  // Query URL due to selection of query 
  var queryURL2= apiURL_Movie + "?query=" + queryString[randomIndex].split(' ')[0] + "&api_key=" + apiKey_Movie
  console.log("Movie queryURL = " + queryURL2)
  // run API query
  await fetch(queryURL2).then(function (response2) {
      return response2.json()
  }).then(function (data2) {

      // Check if a Movies were found
      if (data2.results === null) {
          console.log("Movies NOT Found by API")

      }
      else {
          console.log("Movies Found by API")
      }

      // For each movie returned by the Movie API
      for (i=0; i< data2.results.length; i++) {

          if (data2.results[i].adult === false) {  // filter out adult movies 

              // save the movie Details to the variable (object) movieDetails
              movieDetails.Title = data2.results[i].title
              movieDetails.OriginalTitle = data2.results[i].original_title
              movieDetails.OriginalLanguage = data2.results[i].original_language
              movieDetails.Overview = data2.results[i].overview
              movieDetails.Popularity = data2.results[i].popularity
              movieDetails.BackdropPath = data2.results[i].backdrop_path
              movieDetails.PosterPath = data2.results[i].poster_path
              movieDetails.ReleaseDate = data2.results[i].release_date

              // add the movie details to the movies List array
              // notes : 
              // A clone of the movieDetails is appended to the array (so that we are adding a string value and not an object reference)

              let clone = JSON.parse(JSON.stringify(movieDetails))

              moviesList.push(clone)

          }

      }

      // sort the movies List by Popularity (descending order)
      moviesList.sort((a,b) => b.Popularity - a.Popularity)


    }) // end of Movie API fetch
    displayResultsFromMovieAPI();
}


// If the "Food API" returned No Data, let the user know 
function validateFoodAPIData() {
  // if the variable foodDetails contains no values, let the user know 
  if (foodDetails.Meal === "") {
      // display user message on webpage 

  }  
}


// Display the results from the "Food API" (update screen using foodAPI variables)
function displayResultsFromFoodAPI() {

  // populate the webpage with the values from the variable foodDetails

  // eg. 
  // webpage element = foodDetails.Meal
  // webpage element = foodDetails.MealThumb 
  // etc.

}


// Search "Movie API" and Populate movieList variable with results
// function searchMovieAPI(searchString) {

  // // build API query for Movies
  // var queryString = searchString.split(' ').join('_') // remove spaces

  // var queryURL= apiURL_Movie + "?query=" + queryString + "&api_key=" + apiKey_Movie
  // console.log("Movie queryURL = " + queryURL)

  // // run API query
  // fetch(queryURL).then(function (response) {
  //     return response.json()
  // }).then(function (data) {

  //     // Check if a Movies were found
  //     if (data.results === null) {
  //         console.log("Movies NOT Found by API")

  //     }
  //     else {
  //         console.log("Movies Found by API")
  //     }


  //     // For each movie returned by the Movie API
  //     for (i=0; i< data.results.length; i++) {

  //         if (data.results[i].adult === false) {  // filter out adult movies 

  //             // save the movie Details to the variable (object) movieDetails
  //             movieDetails.Title = data.results[i].title
  //             movieDetails.OriginalTitle = data.results[i].original_title
  //             movieDetails.OriginalLanguage = data.results[i].original_language
  //             movieDetails.Overview = data.results[i].overview
  //             movieDetails.Popularity = data.results[i].popularity
  //             movieDetails.BackdropPath = data.results[i].backdrop_path
  //             movieDetails.PosterPath = data.results[i].poster_path
  //             movieDetails.ReleaseDate = data.results[i].release_date

  //             // add the movie details to the movies List array
  //             // notes : 
  //             // A clone of the movieDetails is appended to the array (so that we are adding a string value and not an object reference)

  //             let clone = JSON.parse(JSON.stringify(movieDetails))

  //             moviesList.push(clone)

  //         }

  //     }

  //     // sort the movies List by Popularity (descending order)
  //     moviesList.sort((a,b) => b.Popularity - a.Popularity)


  //   }) // end of Movie API fetch

// }

// Display the results from the "Movie API" (update WebPage using moviesList variable)
function displayResultsFromMovieAPI() {

  console.log("Movies List :")
  console.log(moviesList)

  console.log("Top Movie :")
  console.log(moviesList[0])


  // display the first Movie in the list onto the WebPage
      
  // eg. 
  
  // $('#movieText').text(moviesList[0].Title);

  $('#movieText').text(moviesList[0].Title);
  $('#resultsPage').removeClass('hidden');
  var fullimageURL = `https://image.tmdb.org/t/p/w500/${moviesList[0].PosterPath}`
  console.log(fullimageURL);
  $('#movieImage').attr('src', fullimageURL);
  $('#searchPage').addClass('hidden');

  $('#foodText').text(foodDetails.Meal)
  $('#foodImage').attr("src", foodDetails.MealThumb );
  $('#foodImage').attr("alt", "Thumbnail of " + foodDetails.Meal);
  // webpage element = moviesList[0].PosterPath 
  // etc.

}


// TEST code

init()  // this should run when index.html opens
function init() {
  console.log("HTML reference to Javascript is ok")
}

function viewNext() {
  if (movieIndex < moviesList.length) {
    movieIndex = movieIndex + 1
  }
  $('#movieText').text(moviesList[movieIndex].Title);
  var fullimageURL = `https://image.tmdb.org/t/p/w500/${moviesList[movieIndex].PosterPath}`
  console.log(fullimageURL);
  $('#movieImage').attr("src", fullimageURL);
}
function viewPrevious() {
  if (movieIndex > 0) {
    movieIndex = movieIndex - 1
  }  
  $('#movieText').text(moviesList[movieIndex].Title);
  var fullimageURL = `https://image.tmdb.org/t/p/w500/${moviesList[movieIndex].PosterPath}`
  console.log(fullimageURL);
  $('#movieImage').attr("src", fullimageURL);
} 

function randomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}