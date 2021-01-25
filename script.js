const div = document.querySelector("#data");
const button = document.querySelector("#button");
const searchBox = document.querySelector("#search");

const proxy = "https://cors-anywhere.herokuapp.com/";
const url1 = proxy + "https://www.metaweather.com/api/location/search/?query="
const url2 = proxy + "https://www.metaweather.com/api/location/"

button.addEventListener("click", handler);
searchBox.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    handler();
  }
});

async function handler() {
  div.innerHTML = "Loading...";
  const search = searchBox.value;
  try {
    const data = await fetch(url1 + search).then(b => b.json());
    console.log(data);
    const woeid = data[0].woeid;
    const realData = await fetch(url2 + woeid).then(b => b.json());
    const today = realData.consolidated_weather[0];
    div.innerHTML = `Weather: ${today.weather_state_name}<br>
                      High: ${toFarenheit(today.max_temp)}°F<br>
                      Low: ${toFarenheit(today.min_temp)}°F`;
  } catch (err) {
      div.innerHTML = "Error!"
      console.log(err);
  }
}

function toFarenheit(celcius) {
  return Math.round(celcius * 9 / 5 + 32);
}
