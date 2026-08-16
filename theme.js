const btdarkMode = document.querySelector("#btDarkMode");

btdarkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    btDarkMode.textContent = "☀️ Modo Claro";
  } else {
    btDarkMode.textContent = "🌙 Modo Oscuro";
  }
});
