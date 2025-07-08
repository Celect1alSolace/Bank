// Полный JavaScript код

let wheel = document.querySelector('.wheel');
let spinBtn = document.querySelector('.spinBtn');
let value = Math.ceil(Math.random() * 3600);
let currentRotation = 0;

const clickSound = new Audio('./sounds/Spinning_sound.mp3');
const winSound = new Audio('./sounds/Win_Sound.mp3');

// История призов
let history = JSON.parse(localStorage.getItem("wheelHistory")) || [];

function fadeOutVolume(audioElement) {
    const interval = 1500;
    const fadeStep = 0.1;
    
    const fade = setInterval(() => {
        if (audioElement.volume > fadeStep) {
            audioElement.volume -= fadeStep;
        } else {
            audioElement.volume = 0;
            clearInterval(fade);
        }
    }, interval);
}

function saveToHistory(prize) {
    const entry = {
        prize: `${prize} 000 so'm`,
        time: new Date().toLocaleString()
    };
    history.unshift(entry);
    localStorage.setItem("wheelHistory", JSON.stringify(history));
}

function renderHistory() {
    const list = document.getElementById("historyList");
    list.innerHTML = "";
    history.forEach(entry => {
        const li = document.createElement("li");
        li.innerHTML = `✅ ${entry.prize} - <span>${entry.time}</span>`;
        list.appendChild(li);
    });
}

// Кнопки истории
if (document.getElementById("historyBtn")) {
    document.getElementById("historyBtn").onclick = () => {
        renderHistory();
        document.getElementById("historyPopup").classList.add("show");
    };
}

if (document.getElementById("closeHistory")) {
    document.getElementById("closeHistory").onclick = () => {
        document.getElementById("historyPopup").classList.remove("show");
    };
}

if (document.getElementById("clearHistory")) {
    document.getElementById("clearHistory").onclick = () => {
        localStorage.removeItem("wheelHistory");
        history = [];
        renderHistory();
    };
}

spinBtn.onclick = function () {
    clickSound.currentTime = 0;
    clickSound.volume = 1.0;
    clickSound.play();
    fadeOutVolume(clickSound);
    
    wheel.style.transition = 'transform 5s ease-out';
    currentRotation = value;
    
    wheel.style.transform = "rotate(" + value + "deg)";
    value += Math.ceil(Math.random() * 3600);
    
    setTimeout(() => {
        winSound.play();
        
        const segments = [400, 375, 350, 325, 300, 250, 225, 200];
        const degree = currentRotation % 360;
        const segmentIndex = Math.floor(((360 - degree + 22.5) % 360) / 45);
        const prize = segments[segmentIndex];
        
        saveToHistory(prize);
        
        document.getElementById('resultText').innerHTML =
        `Tabriklayman! Siz <strong>${prize} 000 so'mlik</strong> tovar uchun kupon yutdingiz 🌸<br><br>Yana bir bor tug‘ilgan kuningiz muborak bo‘lsin! 🌸`;
        
        document.getElementById('overlay').classList.add('show');
    }, 5000);
    
    document.getElementById('claimBtn').onclick = () => {
        document.getElementById('overlay').classList.remove('show');
    };
};
