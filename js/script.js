

var queryUrl= `https://api.themoviedb.org/3/search/movie?query=Garlic&api_key=b72e96c54ea2a07a5e26896ddd3161a7`
  fetch(queryUrl).then(function (response) {
      return response.json();
  }).then(function (data) {
console.log(data)
    })

    console.log('hi');