let wheel = document.querySelector('.wheel');
let spinBtn = document.querySelector('.spinBtn');
let value = Math.ceil(Math.random() * 3600);

const clickSound = new Audio('./sounds/Spinning_sound.mp3');
const winSound = new Audio('./sounds/Win_Sound.mp3');

function fadeOutVolume(audioElement) {
    const interval = 1500; // каждые 500 мс
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

spinBtn.onclick = function () {
    clickSound.currentTime = 0;
    clickSound.volume = 1.0;
    clickSound.play();
    
    // Начинаем уменьшать громкость после запуска звука
    fadeOutVolume(clickSound); // 🟡 ВОТ ТУТ добавляем
    
    wheel.style.transition = 'transform 5s ease-out'; // не забудь!
    wheel.style.transform = "rotate(" + value + "deg)";
    value += Math.ceil(Math.random() * 3600);
    
    setTimeout(() => {
        winSound.play();
        
        // Выигрыш
        const segments = [100, 1, 50, 0, 1000, 10, 5, 20];
        const degree = value % 360;
        const segmentIndex = Math.floor(((360 - degree + 22.5) % 360) / 45);
        const prize = segments[segmentIndex];
        
        // Обновляем текст
        document.getElementById('resultText').innerHTML =
        `Tabriklayman! Siz <strong>${prize} so'mlik</strong> tovar uchun kupon yutdingiz 🌸`;
        
        // Показываем всплывающее окно
        document.getElementById('overlay').classList.add('show');
    }, 5000);
    
    // Кнопка "Olish"
    document.getElementById('claimBtn').onclick = () => {
        document.getElementById('overlay').classList.remove('show');
    };
    
    
};
