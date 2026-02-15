const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('questionSection');
const apologyMessage = document.getElementById('apologyMessage');
const loveMessage = document.getElementById('loveMessage');
const emojiContainer = document.getElementById('emojiContainer');

const apologyText = `Кіті,

Я знаю, що вчинив погано. Я не заслуговую на твоє вибачення, але все одно хочу перепросити за свій вчинок.

Мені дуже шкода за те, що сталося. Я розумію, як тобі було боляче, і мені соромно за свої дії.

Ти заслуговуєш на набагато краще, ніж те, як я поводився. Вибач мене, будь ласка... 🥺`;

const loveText = `Але!

Я дуже сильно тебе люблю! ❤️

Ти - найдорожча людина в моєму житті. Кожна хвилина з тобою - це щастя.

Я не можу передати словами, як сильно я тобою дорожу. Ти робиш моє життя яскравішим, теплішим і наповненим сенсом.

Дякую, що ти є в моєму житті. Ти - моє золотко! 💕✨`;

const heartButton = document.getElementById('heartButton');

heartButton.addEventListener('click', function(e) {
    const rect = heartButton.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        createExplodingHeart(centerX, centerY);
    }
});

function createExplodingHeart(startX, startY) {
    const heart = document.createElement('div');
    heart.className = 'exploding-heart';
    heart.textContent = '❤️';
    heart.style.left = startX + 'px';
    heart.style.top = startY + 'px';
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 150 + Math.random() * 200;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    heart.style.setProperty('--tx', tx + 'px');
    heart.style.setProperty('--ty', ty + 'px');
    heart.style.animation = `explode ${0.8 + Math.random() * 0.4}s ease-out forwards`;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1200);
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton);

function moveButton() {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    
    const maxX = containerRect.width - noBtn.offsetWidth - 40;
    const maxY = containerRect.height - noBtn.offsetHeight - 40;
    
    const randomX = Math.random() * maxX + 20;
    const randomY = Math.random() * maxY + 20;
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

moveButton();

yesBtn.addEventListener('click', () => {
    questionSection.style.display = 'none';
    apologyMessage.classList.add('active');
    
    startEmojiAnimation('🥺');
    
    typeText('apologyText', apologyText, () => {
        setTimeout(() => {
            apologyMessage.classList.remove('active');
            loveMessage.classList.add('active');

            stopEmojiAnimation();
            startEmojiAnimation('❤️');
            
            typeText('loveText', loveText);
        }, 3000);
    });
});

function typeText(elementId, text, callback) {
    const element = document.getElementById(elementId);
    element.textContent = '';
    element.classList.remove('no-cursor');
    let index = 0;
    
    const interval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
        } else {
            clearInterval(interval);
            element.classList.add('no-cursor');
            
            if (elementId === 'loveText') {
                heartButton.classList.add('active');
            }
            
            if (callback) callback();
        }
    }, 50);
}

let emojiInterval;

function startEmojiAnimation(emoji) {
    emojiInterval = setInterval(() => {
        createFallingEmoji(emoji);
    }, 200);
}

function stopEmojiAnimation() {
    clearInterval(emojiInterval);
}

function createFallingEmoji(emoji) {
    const emojiElement = document.createElement('div');
    emojiElement.className = 'falling-emoji';
    emojiElement.textContent = emoji;
    emojiElement.style.left = Math.random() * 100 + '%';
    emojiElement.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    emojiContainer.appendChild(emojiElement);
    
    setTimeout(() => {
        emojiElement.remove();
    }, 6000);
}