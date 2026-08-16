const api = CONFIG.WEATHER_API_KEY;
const theCity = document.querySelector("#city");
const btSearch = document.querySelector("#btSearch");

btSearch.addEventListener("click", () => {
  theCity.value = theCity.value.trim();
  searchWeather();
});

async function searchWeather() {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    theCity.value +
    "&appid=" +
    api +
    "&units=metric&lang=es";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor: ", response.status);
    }
    const data = await response.json();

    resultTable(data);
  } catch (error) {
    console.log("Error al conectar con el servidor: ", error.message);
  }
}

function resultTable(data) {
  const icon = document.createElement("i");

  const renderTable = document.querySelector("#renderTable");
  renderTable.innerHTML = "";
  const tr = document.createElement("tr");

  const tdTemp = document.createElement("td");
  tdTemp.textContent = data.main.temp;

  const tdCity = document.createElement("td");
  tdCity.textContent = data.name;

  const tdDesc = document.createElement("td");
  tdDesc.textContent = data.weather[0].description;

  icon.className = getWeatherIcon(data.weather[0].description);
  const tdIcon = document.createElement("td");
  tdIcon.appendChild(icon);

  const tdHum = document.createElement("td");
  tdHum.textContent = data.main.humidity;

  const tdWind = document.createElement("td");
  tdWind.textContent = data.wind.speed;

  tr.appendChild(tdCity);
  tr.appendChild(tdTemp);
  tr.appendChild(tdDesc);
  tr.appendChild(tdHum);
  tr.appendChild(tdWind);
  tr.appendChild(tdIcon);

  renderTable.appendChild(tr);
}
function getWeatherIcon(description) {
  if (description.includes("claro")) return "wi wi-day-sunny";
  if (description.includes("despejado")) return "wi wi-day-sunny";
  if (description.includes("nuboso")) return "wi wi-cloudy";
  if (description.includes("nublado")) return "wi wi-cloudy";
  if (description.includes("nubes")) return "wi wi-cloudy";
  if (description.includes("lluvia")) return "wi wi-rain";
  if (description.includes("llovizna")) return "wi wi-sprinkle";
  if (description.includes("tormenta")) return "wi wi-thunderstorm";
  if (description.includes("nieve")) return "wi wi-snow";
  if (description.includes("niebla")) return "wi wi-fog";
  return "wi wi-na";
}
