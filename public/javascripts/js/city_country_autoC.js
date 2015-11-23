var input = document.getElementById('city_autoC');
var options = {
  types: ['(cities)'],
};

autocomplete = new google.maps.places.Autocomplete(input, options);