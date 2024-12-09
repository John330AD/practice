document.addEventListener("DOMContentLoaded", () => {
    const shapesContainer = document.getElementById("shapes-container");
    const healthDisplay = document.getElementById("health");
    const storyText = document.getElementById("story-text");
    const itemList = document.getElementById("item-list");

    let health = 100;
    let selectedTiles = [];
    let matchesFound = 0;

    const icons = [
        "fas fa-dragon",
        "fas fa-leaf",
        "fas fa-star",
        "fas fa-heart",
        "fas fa-gem",
        "fas fa-anchor",
    ];

    function updateLevel2Instructions() {
        itemList.innerHTML = "<li>Match all the tiles to complete Level 2!</li>";
    }

    function generateLevel2Board() {
        shapesContainer.innerHTML = ""; // Clear existing content

        const tileData = [...icons, ...icons]; // Duplicate the icons for matching
        tileData.sort(() => Math.random() - 0.5); // Shuffle tiles

        tileData.forEach(icon => {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.dataset.icon = icon;

            const iconElement = document.createElement("i");
            iconElement.className = icon;
            tile.appendChild(iconElement);

            tile.addEventListener("click", () => handleTileClick(tile));
            shapesContainer.appendChild(tile);
        });
    }

    function handleTileClick(tile) {
        if (selectedTiles.includes(tile) || tile.classList.contains("matched") || tile.classList.contains("revealed")) {
            return;
        }

        tile.classList.add("revealed");
        selectedTiles.push(tile);

        if (selectedTiles.length === 2) {
            checkMatch();
        }
    }

    function checkMatch() {
        const [tile1, tile2] = selectedTiles;

        if (tile1.dataset.icon === tile2.dataset.icon) {
            tile1.classList.add("matched");
            tile2.classList.add("matched");
            matchesFound++;
            selectedTiles = [];

            if (matchesFound === icons.length) {
                setTimeout(() => {
                    storyText.innerText = "Congratulations! You completed Level 2!";
                    shapesContainer.innerHTML = "<p>Well done! Stay tuned for the next challenge!</p>";
                }, 500);
            }
        } else {
            health -= 10;
            healthDisplay.innerText = health;

            if (health <= 0) {
                setTimeout(() => {
                    storyText.innerText = "Game Over. Agatha has failed her trial.";
                    generateLevel2Board(); // Restart level 2
                    health = 100;
                    healthDisplay.innerText = health;
                }, 500);
            } else {
                setTimeout(() => {
                    tile1.classList.remove("revealed");
                    tile2.classList.remove("revealed");
                    selectedTiles = [];
                }, 1000);
            }
        }
    }

    updateLevel2Instructions();
    generateLevel2Board();
});
