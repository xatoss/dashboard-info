const MY_Api_KEY = "b192813590df15f9733b4ad1755430c1";
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
    MY_Api_KEY +
    "&units=metric&lang=es";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor: ", response.status);
    }
    const data = await response.json();
    const temp = data.main.temp;
    const city = data.name;
    const desc = data.weather[0].description;

    console.log(temp + " " + city + " " + desc);
  } catch (error) {
    console.log("Error al conectar con el servidor: ", error.message);
  }
}
