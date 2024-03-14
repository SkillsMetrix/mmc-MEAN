@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  background-color: steelblue;
  color: #fff;
}

h2 {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.container {
  max-width: 500px;
  margin: 100px auto;
  text-align: center;
}

input {
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #fff;
  background-color: transparent;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
}

input:focus {
  outline: none;
}

input::placeholder {
  color: #fff;
}

button {
  padding: 13px;
  width: 300px;
  border: none;
  background-color: #000;
  color: #fff;
  margin-top: 30px;
}

button:hover {
  background-color: #fff;
  color: #000;
  cursor: pointer;
}



------
    const weatherDisplay = document.querySelector('.weather')
const weatherForm = document.querySelector('#weather-form')
const cityInput = document.querySelector('#city-input')

// Fetch weather data from API
const fetchWeather = async (city) => {
  const url = `/api?q=${city}`

  const res = await fetch(url)
  const data = await res.json()

  if (data.cod === '404') {
    alert('City not found')
    return
  }

  if (data.cod === 401) {
    alert('Invalid API Key')
    return
  }

  const displayData = {
    city: data.name,
    temp: kelvinToFahrenheit(data.main.temp),
  }

  addWeatherToDOM(displayData)
}

// Add display data to DOM
const addWeatherToDOM = (data) => {
  weatherDisplay.innerHTML = `
    <h1>Weather in ${data.city}</h1>
    <h2>${data.temp} &deg;F</h2>
  `
  cityInput.value = ''
}

// Convert Kelvin to Fahrenheit
const kelvinToFahrenheit = (temp) => {
  return Math.ceil(((temp - 273.15) * 9) / 5 + 32)
}

// Event listener for form submission
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (cityInput.value === '') {
    alert('Please enter a city')
  } else {
    fetchWeather(cityInput.value)
  }
})

// Initial fetch
fetchWeather('Miami')



------

    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />

    <title>Weather App</title>
  </head>
  <body>
    <div class="container">
      <div class="weather"></div>
      <form id="weather-form">
        <input type="text" id="city-input" placeholder="Enter a city" />
        <button type="submit">Submit</button>
      </form>
    </div>

    <script src="main.js"></script>
  </body>
</html>
