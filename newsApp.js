let currentPage = 1;
async function searchNews() {
  const api = CONFIG.NEWS_API_KEY;
  const url =
    "https://newsapi.org/v2/everything?q=españa&pageSize=10&page=" +
    currentPage +
    "&apiKey=" +
    api;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error del servidor", response.status);
    }
    const data = await response.json();
    renderNews(data);
  } catch (error) {
    console.log("Error al conectar con el servidor:", error.message);
  }
}
searchNews();

function renderNews(data) {
  const newsContainer = document.querySelector("#newsContainer");
  newsContainer.innerHTML = " ";

  data.articles.forEach((article) => {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const a = document.createElement("a");

    h3.textContent = article.title;
    p.textContent = article.description;
    a.href = article.url;
    a.textContent = "read more";
    a.target = "_blank";

    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(a);

    newsContainer.appendChild(div);
  });
}
function pagination() {
  const btBefore = document.querySelector("#btBefore");
  const btAfter = document.querySelector("#btAfter");
  const infoPage = document.querySelector("#infoPage");

  btBefore.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      infoPage.textContent = "Pagina " + currentPage;
      searchNews(currentPage);
    }
  });

  btAfter.addEventListener("click", () => {
    currentPage++;
    infoPage.textContent = "Pagina " + currentPage;
    searchNews(currentPage);
  });
}
pagination();
