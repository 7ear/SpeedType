const standartBtn = document.querySelector(".standart");
const darkBtn = document.querySelector(".dark");
const blackBtn = document.querySelector(".black");
const hackBtn = document.querySelector(".hack");
const technoBtn = document.querySelector(".techno");
const lightBtn = document.querySelector(".light");

const theme = window.localStorage.getItem("theme");


function applyTheme(theme) {
    document.body.classList.remove("standart-theme" , "dark-theme" , "hack-theme" , "light-theme" , "black-theme" , "techno-theme");
    document.body.classList.add(`${theme}`);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "auto";

    applyTheme(savedTheme);

    standartBtn.addEventListener("click",() => {
        localStorage.setItem("theme", "standart-theme");
        applyTheme("standart-theme");
    });

    darkBtn.addEventListener("click",() => {
        localStorage.setItem("theme", "dark-theme");
        applyTheme("dark-theme");
    });


    blackBtn.addEventListener("click",() => {
        localStorage.setItem("theme", "black-theme");
        applyTheme("black-theme");
    });

    hackBtn.addEventListener("click",() => {
        localStorage.setItem("theme", "hack-theme");
        applyTheme("hack-theme");
    });

    technoBtn.addEventListener("click",() => {
        localStorage.setItem("theme", "techno-theme");
        applyTheme("techno-theme");
    });

    lightBtn.addEventListener("click",() => {
        localStorage.setItem("theme", "light-theme");
        applyTheme("light-theme");
    });
});