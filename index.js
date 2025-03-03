let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelslike = document.querySelector(".weather_feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

//  get the country name
const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

//get date and time
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(curDate);
};

let city = "pune";

// search functionality
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  let cityName = document.querySelector(".city_name");
  city = cityName.value;
  getWeatherData();
  cityName.value = "";
});

const getWeatherData = async () => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=11eedd6c6ad491c3c68b9bbe794c62a5`;
  try {
    const res = await fetch(weatherURL);
    const data = await res.json();
    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src= "http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;

    let K = 273.15;

    w_temperature.innerHTML = `${main.temp.toFixed() - K.toFixed()} &#176C`;
    w_minTem.innerHTML = `Min: ${main.temp_min.toFixed() - K.toFixed()}&#176C`;
    w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed() - K.toFixed()}&#176C`;

    w_feelslike.innerHTML = `${main.feels_like.toFixed() - K.toFixed()}&#176C`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.log(error.message);
  }
};
console.log(dateTime);
document.body.addEventListener("load", getWeatherData());
