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
  const renderTable = document.querySelector("#renderTable");
  renderTable.innerHTML = "";
  const tr = document.createElement("tr");

  const tdTemp = document.createElement("td");
  tdTemp.textContent = data.main.temp;

  const tdCity = document.createElement("td");
  tdCity.textContent = data.name;

  const tdDesc = document.createElement("td");
  tdDesc.textContent = data.weather[0].description;

  const tdHum = document.createElement("td");
  tdHum.textContent = data.main.humidity;

  const tdWind = document.createElement("td");
  tdWind.textContent = data.wind.speed;

  tr.appendChild(tdCity);
  tr.appendChild(tdTemp);
  tr.appendChild(tdDesc);
  tr.appendChild(tdHum);
  tr.appendChild(tdWind);

  renderTable.appendChild(tr);
}
