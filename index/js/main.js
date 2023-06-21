const typingText = document.querySelector(".input-field p");
const inpField = document.querySelector(".input");
const tryAgainBtn = document.querySelector(".button-refresh");
const timeTag = document.querySelector(".time");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const headerImg = document.querySelectorAll(".header-img-item");
const main = document.querySelector(".main");
const headerChild2 = document.querySelector(".header-list-child-second");
const fieldLanguage = document.querySelector(".field-language");
const tipsKeys = document.querySelector(".tips-keys");
const selectLanguage = document.querySelector(".select-language");
const infoGroup = document.querySelector(".info-type");
const btnItem = document.querySelectorAll(".btn-item");
const VERSION = document.querySelector(".VERSION");


let timer;
let maxTime = 30;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;
let wpm;
let cpm;

typingText.innerHTML = `! click on the "refresh" button to generate the text OR use "ctrl + z"`;

function checkActive(){
    if (btnItem[0].hasAttribute("id") == true){
        cpm = (charIndex*4) - mistakes;
    }

    if (btnItem[1].hasAttribute("id") == true){
        cpm = (charIndex*2) - mistakes;
    }

    if (btnItem[2].hasAttribute("id") == true){
        cpm = (charIndex) - mistakes;
    }
}


function activeItem30() {
    btnItem[1].setAttribute("id", "active-item");

    btnItem[0].removeAttribute("id");
    btnItem[2].removeAttribute("id");

    maxTime = 30;

    resetGame();
}

function activeItem60() {
    btnItem[2].setAttribute("id", "active-item");

    btnItem[0].removeAttribute("id");
    btnItem[1].removeAttribute("id");

    maxTime = 60;

    resetGame();

}

function activeItem15() {
    btnItem[0].setAttribute("id", "active-item");
    
    btnItem[1].removeAttribute("id");
    btnItem[2].removeAttribute("id");

    maxTime = 15;

    resetGame();

}


function loadParagraph() {
    let ranIndexEN = Math.floor(Math.random() * ENparagraphs.length);
    let ranIndexRU = Math.floor(Math.random() * RUparagraphs.length);

    if(selectLanguage.value === "eng"){
        typingText.innerHTML = "";
        ENparagraphs[ranIndexEN].split("").forEach(charr => {
            let span = `<span>${charr}</span>`
            typingText.innerHTML += span;
        });
    }

    if(selectLanguage.value === "rus"){
        typingText.innerHTML = "";
        RUparagraphs[ranIndexRU].split("").forEach(char => {
            let spanq = `<span>${char}</span>`
            typingText.innerHTML += spanq;
        });
    }
    


    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}


function DetailsNone() {
    typingText.style.cursor = "none";
    
    for( let i = 0; i < headerImg.length; i++){
	    headerImg[i].style.opacity = 0;
	};
    
    headerChild2.style.opacity = 0;
    fieldLanguage.style.opacity = 0;
    VERSION.style.opacity = 0;
    tipsKeys.style.opacity = 0;

    // timeTag.style.opacity = 1;
    infoGroup.style.opacity = 1;
    
}

function cursorTrue(){
    typingText.style.cursor = "crosshair";
    inpField.style.cursor = "crosshair";

    for( let i = 0; i < headerImg.length; i++){
	    headerImg[i].style.opacity = 1;
	};
    
    headerChild2.style.opacity = 1;
    fieldLanguage.style.opacity = 1;
    VERSION.style.opacity = 1;
    tipsKeys.style.opacity = 1;
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round((((charIndex) - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        checkActive();

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = cpm;

        
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
    

}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
    
    if (timeLeft === 0){
        headerChild2.style.opacity = 1;
        fieldLanguage.style.opacity = 1;
        VERSION.style.opacity = 1;
        tipsKeys.style.opacity = 1;
    }else{
        return;
    }

}


function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
    // timeTag.style.opacity = 0;
    infoGroup.style.opacity = 0;
}

selectLanguage.addEventListener("change", loadParagraph);
inpField.addEventListener("input", DetailsNone);
typingText.addEventListener("mousemove", cursorTrue);
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame); 

btnItem[0].addEventListener("click", activeItem15);
btnItem[1].addEventListener("click", activeItem30);
btnItem[2].addEventListener("click", activeItem60);

document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.code === "KeyZ"){
        resetGame();
        e.preventDefault();
    }
});