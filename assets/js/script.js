/* 
    Javascript for Project 1
    Developers - Team 8 
    First Created - 1st February 2024

    This code handles logic for the "Movies for Munchies" application

*/


// Event Listeners

// - "Search" button "click" event
$("#search-btn").on('click', function(event){
  // start a new search 
  event.preventDefault()
  console.log("**** Starting New Search ****")
  searchForMealAndMovies() 
})

// - "Next Movie" button "click" event
$("#next-btn").on('click', function(event){
  // display the next movie
  event.preventDefault()
  console.log("**** display the next movie ****")
  viewNext() 
})

// - "Previous Movie" button "click" event
$("#previous-btn").on('click', function(event){
  // display the next movie
  event.preventDefault()
  console.log("**** display the previoous movie ****")
  viewPrevious() 
})


// Variable Declarations
// notes : The following variables are placed here so that they are in scope for all functions

// API Calling
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

var moviesList = []       // an array of movies returned from the Movie API
var movieIndex = 0        // index used to select movies from the moviesList



// MAIN LOGIC for Search
// ---------------------

// Do Search - called when the user clicks on the "Search" button
function searchForMealAndMovies() {

  // Reset variables to their initial values
  initialiseVariables()

  // Get User Input, Validate User Input and Populate the userInput_NameOfMeal variable
  getUserInputAndValidate()

  // Search API's and Display Results
  searchAPIs()

}


// SEARCH FUNCTIONS


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
      // note : a user message is now displayed by the html, rather than by javascript
      console.log("User entered no search criteria")
  }
  else {
      console.log("User entered '" + userInput_NameOfMeal + "'")
  }
}


// Search API's and Display Results
async function searchAPIs() {
  

  // Search FOOD API
  // ---------------

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

      } 

  }) // end of Food API fetch
  

  // Search MOVIE API
  // ----------------

  // build API query for Movies  
  var queryString = [
       foodDetails.Meal.split(' ')[0], // remove spaces and first word of phrase
  ]

  var IngredientsArray = foodDetails.Ingredients;
  
  for (var i = 0; i< IngredientsArray.length; i++) {
      queryString.push(IngredientsArray[i]);
  }

  // Remove Japanese Movies from the API Query
  // note : our testing found Japanese adult movies which were not labelled as "Adult" by TheMovieDB
  function findJapanese(value) {
    return value === `Japanese`;
  }
  
  function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

  if (queryString.find(findJapanese)){
    console.log(`Japanese found`)
    removeItemAll(queryString, `Japanese`);
  } else {
    console.log(`Not found`)
  }

  console.log(`Final Query Array : ` + queryString)


  // Select a query word by creating a random index number from 0 to array lenght
  // Note : That makes the result different if it calls same meal name
  var randomIndex = randomNum(0, IngredientsArray.length);
  console.log(`Query Array : `+ JSON.stringify(queryString));
  console.log(`Query index is :` + randomIndex + ` and the query is `+ queryString[randomIndex]);


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
      console.log(JSON.stringify(data2))


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

      // SORT the movies List by Popularity (descending order)
      moviesList.sort((a,b) => b.Popularity - a.Popularity)

    }) // end of Movie API fetch


    // DISPLAY RESULTS OF API CALLS
    // ----------------------------
    displayResultsFromAPIs();
}



// Display the results from the FOOD API and MOVIE API calls
function displayResultsFromAPIs() {

  console.log("Food :")
  console.log(foodDetails)

  console.log("Movies List :")
  console.log(moviesList)

  console.log("Top Movie :")
  console.log(moviesList[0])

  // Prepare webpage for Displaying Results
  $('#searchPage').addClass('hidden');      // hide Search Page
  $('#resultsPage').removeClass('hidden');  // display Results Page

  // Display Food
  $('#foodText').text(foodDetails.Meal)
  $('#foodImage').attr("src", foodDetails.MealThumb );
  $('#foodImage').attr("alt", "Thumbnail of " + foodDetails.Meal);

  // Display Movie
  $('#movieText').text(moviesList[0].Title);
  
  if (moviesList[0].PosterPath) {
    var fullimageURL = `https://image.tmdb.org/t/p/w500/${moviesList[0].PosterPath}` // build path to image
    console.log(fullimageURL);
  } 
  else {
    var fullimageURL = `./assets/Img/no-image.jpg`; // display "no image" jpg if no image returned by API
    console.log(fullimageURL);
  }

  $('#movieImage').attr('src', fullimageURL);
  $('#movieImage').attr('alt', "Thumbnail of " + moviesList[0].Title);
  
}


// MOVIE NAVIGATION
// ----------------

// Display NEXT MOVIE from the Movies List (array)
function viewNext() {
  
  // set the Movie Index to the Next Movie in the List
  if (movieIndex < moviesList.length -1) {
    movieIndex = movieIndex + 1
  }
  else if (movieIndex === moviesList.length -1) {
    movieIndex = 0
  }

  // display the Movie
  $('#movieText').text(moviesList[movieIndex].Title);
  
  if (moviesList[movieIndex].PosterPath) {
    var fullimageURL = `https://image.tmdb.org/t/p/w500/${moviesList[movieIndex].PosterPath}`
    console.log(fullimageURL);
  } else {
    var fullimageURL = `./assets/Img/no-image.jpg`;
    console.log(fullimageURL);
  }

  $('#movieImage').attr("src", fullimageURL);
  $('#movieImage').attr('alt', "Thumbnail of " + moviesList[movieIndex].Title);
}


// Display PREVIOUS MOVIE from the Movies List (array)
function viewPrevious() {

  // set the Movie Index to the Previoius Movie in the List
  if (movieIndex > 0) {
    movieIndex = movieIndex - 1
  }  
  
  // display the Movie
  $('#movieText').text(moviesList[movieIndex].Title);
  
  if (moviesList[movieIndex].PosterPath) {
    var fullimageURL = `https://image.tmdb.org/t/p/w500/${moviesList[movieIndex].PosterPath}`
    console.log(fullimageURL);
  } else {
    var fullimageURL = `./assets/Img/no-image.jpg`;
    console.log(fullimageURL);
  }

  $('#movieImage').attr("src", fullimageURL);
  $('#movieImage').attr('alt', "Thumbnail of " + moviesList[movieIndex].Title);

} 



// UTILITY FUNCTIONS
// -----------------

// Random Number Generator
function randomNum(min, max) {
  
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);

}


// TEST code

init()  // this should run when index.html opens
function init() {
  console.log("HTML reference to Javascript is ok")
}