function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

let now = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesdey",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = addZero(now.getHours());
let minutes = addZero(now.getMinutes());
h2.innerHTML = `${day}`;
let h3 = document.querySelector("h3");
h3.innerHTML = `${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchtown");
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = cityInput.value;
}
let searchFunction = document.querySelector("#searchcity");
searchFunction.addEventListener("submit", search);

let tempC = document.querySelector("#temp-c");
let tempF = document.querySelector("#temp-f");
let tempCur = document.querySelector("#temp-cur");
let tempCurC = 20;
let tempCurF = Math.round(tempCurC * 1.8 + 32);

function convertToC(event) {
  event.preventDefault();
  tempCur.innerHTML = tempCurC;
  console.log("converted to C");
}
tempC.addEventListener("click", convertToC);

function convertToF(event) {
  event.preventDefault();
  tempCur.innerHTML = tempCurF;
  tempC.classList.remove("bordered");
  tempF.classList.add("bordered");
  console.log("converted to F");
}
tempF.addEventListener("click", convertToF);

function dispayWeather(response) {
  console.log(response.data);
  document.querySelector("#citydisplay").innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  document.querySelector("#temp-cur").innerHTML = `${temp}°C`;
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a04e17ba071dc197f18aac16da60ad6b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(dispayWeather);
}

function go(event) {
  event.preventDefault();
  let city = document.querySelector("#searchtown").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "a04e17ba071dc197f18aac16da60ad6b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispayWeather);
}
let form = document.querySelector("#searchcity");
form.addEventListener("click", go);
form.addEventListener("submit", go);

function getCurrentLocation(event) {
  console.log("suka yibana");
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#mylocationbutton");
currentButton.addEventListener("click", getCurrentLocation);
