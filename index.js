let darkFonts = document.querySelector(".weather_body");
let darkWeatherCard = document.querySelectorAll(".weather_card");
let darkContainer = document.querySelector(".container");
let cityInput = document.querySelector(".city_name");
let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let toggleSwitch = document.querySelector(".ui-switch input");
let w_feelslike = document.querySelector(".weather_feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let citySearch = document.querySelector(".weather_search");
let receivedRecentCity = localStorage.getItem("recentCity");
let receivedDarkModeStatus = localStorage.getItem("darkMode");

const assignedCity = () => receivedRecentCity || "pune";

let darkmode;

const assignedMode = () => {
  if (receivedDarkModeStatus === "false") return false;
  toggleSwitch.checked = true;
  return true;
};

darkmode = assignedMode();
let city = assignedCity();

toggleSwitch.addEventListener("click", () => {
  darkmode = !darkmode;
  applyDarkMode(darkmode);
  console.log("Dark Mode:", darkmode ? "on" : "off");
});

function applyDarkMode(darkmode) {
  darkFonts.style.color = !darkmode ? "black" : "white";
  darkContainer.style.background = !darkmode ? "white" : "#424242";

  darkWeatherCard.forEach((card) => {
    card.style.color = !darkmode ? "black" : "#e1e1e1";
    card.style.background = !darkmode ? "white" : "#252525";
  });
  localStorage.setItem("darkMode", darkmode);
}
applyDarkMode(darkmode);

// Fetch all cities from API
let cityList = [];
const fetchCities = async () => {
  try {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries");
    if (!res.ok) throw new Error("Failed to fetch cities");
    const data = await res.json();
    cityList = data.data.flatMap((country) => country.cities) || [];
  } catch (error) {
    console.error("Error fetching cities:", error);
    cityList = [];
  }
};
fetchCities();

// Create suggestion box
tempSuggestionBox = document.createElement("div");
tempSuggestionBox.style.position = "absolute";
tempSuggestionBox.style.background = "#fff";
tempSuggestionBox.style.color = "#000";
tempSuggestionBox.style.border = "1px solid #ccc";
tempSuggestionBox.style.width = "100%";
tempSuggestionBox.style.zIndex = "1000";
tempSuggestionBox.style.borderRadius = "5px";
tempSuggestionBox.style.maxHeight = "150px";
tempSuggestionBox.style.overflowY = "auto";
tempSuggestionBox.style.display = "none";
citySearch.appendChild(tempSuggestionBox);

// Show suggestions as user types
cityInput.addEventListener("input", () => {
  let value = cityInput.value.toLowerCase();
  tempSuggestionBox.innerHTML = "";

  if (value && cityList?.length) {
    let filteredCities = cityList.filter((c) =>
      c.toLowerCase().includes(value)
    );

    filteredCities.slice(0, 10).forEach((cityName) => {
      let suggestionItem = document.createElement("div");
      suggestionItem.textContent = cityName;
      suggestionItem.style.padding = "10px";
      suggestionItem.style.cursor = "pointer";

      suggestionItem.addEventListener("click", () => {
        city = cityInput.value = cityName; // Update city globally
        tempSuggestionBox.style.display = "none";
        getWeatherData(); // Fetch weather data for selected city
      });

      tempSuggestionBox.appendChild(suggestionItem);
    });

    tempSuggestionBox.style.display = "block";
  } else {
    tempSuggestionBox.style.display = "none";
  }
});
const getCountryName = (code) =>
  new Intl.DisplayNames(["en"], { type: "region" }).of(code);

document.addEventListener("click", (e) => {
  if (!citySearch.contains(e.target)) {
    tempSuggestionBox.style.display = "none";
  }
});

// Search functionality
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();
  city = cityInput.value;
  getWeatherData();
  cityInput.value = "";
  tempSuggestionBox.style.display = "none";
});

const getWeatherData = async () => {
  try {
    if (!city.trim()) {
      throw new Error("City name is required!");
    }

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=11eedd6c6ad491c3c68b9bbe794c62a5`;
    const res = await fetch(weatherURL);

    // Check if response is not OK (e.g., 404 city not found)
    if (!res.ok) {
      throw new Error(`"${city}" city does not exit`);
    }

    const data = await res.json();

    // Check if required data exists before using it
    if (!data.sys || !data.sys.country) {
      throw new Error("Invalid weather data received from API");
    }

    localStorage.setItem("recentCity", city);

    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = new Date(dt * 1000).toLocaleString();

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src= "http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;

    let K = 273.15;
    w_temperature.innerHTML = `${(main.temp - K).toFixed()} &#176C`;
    w_minTem.innerHTML = `Min: ${(main.temp_min - K).toFixed()}&#176C`;
    w_maxTem.innerHTML = `Max: ${(main.temp_max - K).toFixed()}&#176C`;

    w_feelslike.innerHTML = `${(main.feels_like - K).toFixed()}&#176C`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    // Show error in UI and log to console
    console.error("Error fetching weather data:", error.message);
    cityName.innerHTML = `<span style="color:red; font-weight:bold";>${error.message}</span>`;
  }
};

document.addEventListener("DOMContentLoaded", getWeatherData());
