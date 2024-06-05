let coins = 0;
let logoCount = 5; // Start with 5 logos
const userId = "123456"; // Example user ID, replace with actual Telegram user ID

document.addEventListener("DOMContentLoaded", () => {
    const coinCounter = document.getElementById("coin-counter");
    const coinSound = document.getElementById("coin-sound");
    const gameContainer = document.getElementById("game-container");
    const connectWalletButton = document.getElementById("connect-wallet");
    const connectYouTubeButton = document.getElementById("connect-youtube");

    // Create initial logos
    for (let i = 0; i < logoCount; i++) {
        createLogo(gameContainer);
    }

    // Increase logos periodically
    setInterval(() => {
        createLogo(gameContainer);
    }, 900);

    connectWalletButton.addEventListener("click", () => {
        alert("Connect Wallet with Telegram feature coming soon!");
    });

    connectYouTubeButton.addEventListener("click", () => {
        alert("Connect YouTube Channel feature coming soon!");
    });

    function createLogo(container) {
        const logo = document.createElement("div");
        logo.className = "logo";
        logo.style.backgroundImage = getRandomLogo();

        logo.addEventListener("click", (event) => {
            coins++;
            coinCounter.innerText = `Coins: ${coins}`;
            playCoinSound();
            createSparkle(event.clientX, event.clientY);
            logo.remove(); // Remove the logo when clicked
            createLogo(container); // Add a new logo
            saveAction(userId, coins); // Save action to backend
        });

        positionLogoRandomly(logo, container);
        container.appendChild(logo);
        moveLogo(logo, container);
    }

    function positionLogoRandomly(logo, container) {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const x = Math.random() * (containerWidth - logo.clientWidth);
        const y = Math.random() * (containerHeight - logo.clientHeight);
        logo.style.left = `${x}px`;
        logo.style.top = `${y}px`;
    }

    function getRandomLogo() {
        const logos = [
            'url("https://cryptologos.cc/logos/bitcoin-btc-logo.png")',
            'url("https://cryptologos.cc/logos/binance-coin-bnb-logo.png")',
            'url("https://cryptologos.cc/logos/tron-trx-logo.png")',
            'url("https://cryptologos.cc/logos/ethereum-eth-logo.png")',
            'url("https://cryptologos.cc/logos/xrp-xrp-logo.png")',
            // Add more logo URLs if desired
        ];
        return logos[Math.floor(Math.random() * logos.length)];
    }

    function playCoinSound() {
        coinSound.currentTime = 0; // Rewind to the start
        coinSound.play();
    }

    function createSparkle(x, y) {
        const sparkleContainer = document.createElement("div");
        sparkleContainer.className = "sparkle";
        sparkleContainer.style.left = `${x}px`;
        sparkleContainer.style.top = `${y}px`;
        document.body.appendChild(sparkleContainer);

        setTimeout(() => {
            sparkleContainer.remove();
        }, 1000);
    }

    function moveLogo(logo, container) {
        setInterval(() => {
            positionLogoRandomly(logo, container);
        }, 2000);
    }

    function saveAction(userId, coins) {
        // Example function to save action to backend
        fetch('https://example.com/save-action', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                coins: coins
            })
        })
        .then(response => response.json())
        .then(data => console.log('Action saved:', data))
        .catch(error => console.error('Error saving action:', error));
    }
});
