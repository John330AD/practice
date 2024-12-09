document.addEventListener("DOMContentLoaded", () => {
    const healthDisplay = document.getElementById("health");
    const artifactsDisplay = document.getElementById("artifacts");
    const shapesContainer = document.getElementById("shapes-container");
    const nextButton = document.getElementById("next-button");
    const storyText = document.getElementById("story-text");
    const itemList = document.getElementById("item-list");

    let health = 100;
    let artifactsCollected = 0;
    let firstSelection = null;
    let isLevel1Complete = false;

    const itemsToCollect = [
        { name: "Mushroom", icon: "fas fa-mushroom" },
        { name: "Herb", icon: "fas fa-leaf" },
        { name: "Crystal", icon: "fas fa-gem" },
        { name: "Potion", icon: "fas fa-flask" },
        { name: "Scroll", icon: "fas fa-scroll" }
     
    ];

    function updateItemList() {
        itemList.innerHTML = ""; // Clear existing items
        itemsToCollect.forEach(item => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<i class='${item.icon}'></i> ${item.name}`;
            itemList.appendChild(listItem);
        });
    }

    function generateShapes() {
        const items = [...itemsToCollect, ...itemsToCollect]; // Duplicate items for matching
        items.sort(() => Math.random() - 0.5); // Shuffle items

        items.forEach(item => {
            const shape = document.createElement("div");
            shape.classList.add("shape");
            shape.dataset.itemName = item.name;

            const icon = document.createElement("i");
            icon.className = `${item.icon} icon`;
            shape.appendChild(icon);

            shape.addEventListener("click", () => handleShapeClick(shape, item));
            shapesContainer.appendChild(shape);
        });
    }

    function handleShapeClick(shape, item) {
        if (shape.classList.contains("revealed")) return;

        shape.classList.add("revealed");
        setTimeout(() => {
            if (!firstSelection) {
                firstSelection = shape;
            } else {
                if (firstSelection.dataset.itemName === shape.dataset.itemName) {
                    // Match found
                    artifactsCollected++;
                    artifactsDisplay.innerText = artifactsCollected;

                    firstSelection = null;

                    if (artifactsCollected === itemsToCollect.length) {
                        storyText.innerText = "Congratulations! Agatha collected all the items and can continue her journey!";
                        nextButton.style.display = "block";
                        nextButton.innerText = "Next Level";
                    }
                } else {
                    // No match, deduct health
                    health -= 10;
                    healthDisplay.innerText = health;

                    if (health <= 0) {
                        storyText.innerText = "Agatha has succumbed to her injuries. Game over.";
                        nextButton.innerText = "Retry";
                        nextButton.style.display = "block";
                    }

                    // Hide shapes again
                    setTimeout(() => {
                        firstSelection.classList.remove("revealed");
                        shape.classList.remove("revealed");
                        firstSelection = null;
                    }, 500);
                }
            }
        }, 500);
    }

    nextButton.addEventListener("click", () => {
        if (nextButton.innerText === "Retry") {
            location.reload();
        } else if (nextButton.innerText === "Next Level") {
            health = 100; // Reset health
            healthDisplay.innerText = health;
            storyText.innerText = "Loading Level 2...";
            nextButton.style.display = "none";

            // Dynamically load level2.js
            const level2Script = document.createElement("script");
            level2Script.src = "./level2.js";
            level2Script.onload = () => {
                console.log("Level 2 script loaded successfully.");
            };
            level2Script.onerror = () => {
                console.error("Failed to load Level 2 script.");
            };
            document.body.appendChild(level2Script);
        }
    });

    updateItemList();
    generateShapes();
});
