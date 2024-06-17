document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("isLoggedIn") === "true") {
        showGenerator();
        loadFavorites();
    }
 });
 function generateColor() {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    document.getElementById("colorDisplay").style.backgroundColor = color;
    document.getElementById("hexCode").textContent = color;
 }
 function saveFavorite() {
    const color = document.getElementById("hexCode").textContent;
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.length >= 10) {
        alert("Můžete uložit pouze 10 oblíbených barev.");
        return;
    }
    if (favorites.includes(color)) {
        alert("Tato barva již je v oblíbených.");
        return;
    }
    favorites.push(color);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
 }
 function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const list = document.getElementById("favoriteColors");
    list.innerHTML = '';
    favorites.forEach(color => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${color}</span> <button onclick="removeFavorite('${color}')">Odstranit</button>`;
        li.style.backgroundColor = color;
        list.appendChild(li);
    });
 }
 function removeFavorite(color) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(fav => fav !== color);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
 }
 function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username && password) {
        localStorage.setItem("isLoggedIn", "true");
        showGenerator();
    } else {
        alert("Zadejte uživatelské jméno a heslo.");
    }
 }
 function showGenerator() {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("generator").classList.remove("hidden");
    document.getElementById("favorites").classList.remove("hidden");
    loadFavorites();
 }