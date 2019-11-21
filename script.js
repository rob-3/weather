const div = document.getElementById("data");
const button = document.getElementById("button");
const searchBox = document.getElementById("search");

const url0 = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query="
const url1 = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/"

button.addEventListener("click", handler);
searchBox.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    handler();
  }
});

function handler() {
  div.innerHTML = "Loading...";
  const search = searchBox.value;
  fetch(url0 + search)
    .then(b => b.json())
    .then(data => {
      const woeid = data[0].woeid;
      fetch(url1 + woeid)
        .then(b => b.json())
        .then(realData => {
          const today = realData.consolidated_weather[0];
          div.innerHTML = `Weather: ${today.weather_state_name}<br>
                            High: ${toFarenheit(today.max_temp)}°F<br>
                            Low: ${toFarenheit(today.min_temp)}°F`;
        });
    })
    .catch(() => {
      div.innerHTML = "Error!"
    });
}

function toFarenheit(celcius) {
  return Math.round(celcius * 9 / 5 + 32);
}
