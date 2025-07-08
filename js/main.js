let wheel = document.querySelector('.wheel');
let spinBtn = document.querySelector('.spinBtn');
let value = Math.ceil(Math.random() * 3600); // начальное значение
let currentRotation = 0; // будет хранить текущее вращение

const clickSound = new Audio('./sounds/Spinning_sound.mp3');
const winSound = new Audio('./sounds/Win_Sound.mp3');

function fadeOutVolume(audioElement) {
    const interval = 1500; // каждые 1.5 сек
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
    fadeOutVolume(clickSound);

    wheel.style.transition = 'transform 5s ease-out';

    // ✅ сохраняем текущее значение до вращения
    currentRotation = value;

    wheel.style.transform = "rotate(" + value + "deg)";
    value += Math.ceil(Math.random() * 3600);

    setTimeout(() => {
        winSound.play();

        // 🎯 точные призы
        const segments = [400, 375, 350, 325, 300, 250, 225, 200];
        const degree = currentRotation % 360;
        const segmentIndex = Math.floor(((360 - degree + 22.5) % 360) / 45);
        const prize = segments[segmentIndex];

        // 🎉 Сообщение
        document.getElementById('resultText').innerHTML =
            `Tabriklayman! Siz <strong>${prize} 000 so'mlik</strong> tovar uchun kupon yutdingiz 🌸<br><br>Yana bir bor tug‘ilgan kuningiz muborak bo‘lsin! 🌸`;

        // Показать окно
        document.getElementById('overlay').classList.add('show');
    }, 5000); // = длительность анимации

    // Закрытие окна
    document.getElementById('claimBtn').onclick = () => {
        document.getElementById('overlay').classList.remove('show');
    };
};
