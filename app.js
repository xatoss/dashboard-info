const city = document.getElementById("#city");
const btSearch = document.getElementById("#btSearch");
btSearch.addEventListener("click", searchWeather);
async function searchWeather() {
  try {
    const response = await fetch("");
    if (!response.ok) {
      throw new Error("Error en la respuesta ", response.status);
    }
    const data = await response.json();
  } catch (error) {
    console.log("Error to response: ", error.message);
  }
}
