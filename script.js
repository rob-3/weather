const div0 = document.getElementById("data0");
const div1 = document.getElementById("data1");
const div2 = document.getElementById("data2");
const button = document.getElementById("button");
const searchBox = document.getElementById("search");

button.addEventListener("click", handler);
searchBox.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    handler();
  }
});

const url0 = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query="
const url1 = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/"

function handler() {
  div0.innerHTML = "Loading...";
  div1.innerHTML = "";
  div2.innerHTML = "";
  const search = searchBox.value;
  fetch(url0 + search)
    .then(b => b.json())
    .then(data => {
      const woeid = data[0].woeid;
      fetch(url1 + woeid)
        .then(b => b.json())
        .then(realData => {
          const today = realData.consolidated_weather[0];
          div0.innerHTML = `Weather: ${today.weather_state_name}`;
          div1.innerHTML = `High: ${toFarenheit(today.max_temp)}°F`;
          div2.innerHTML = `Low: ${toFarenheit(today.min_temp)}°F`;
        });
    })
    .catch(() => {
      div0.innerHTML = "Error!"
      div1.innerHTML = ""
      div2.innerHTML = ""
    });
}

function toFarenheit(celcius) {
  return Math.round(celcius * 9 / 5 + 32);
}
