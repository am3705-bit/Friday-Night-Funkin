
/* =====================================
   FRIDAY NIGHT FUNKIN': NEW RIVALS
   MAIN JAVASCRIPT
===================================== */

// GET MAIN MENU BUTTONS

const menuButtons = document.querySelectorAll(
    "#menu-options button"
);

// GAME STATE

const gameState = {
    currentScreen: "main-menu",
    selectedMode: null,
    isPlaying: false
};

// MENU BUTTON ACTIONS

menuButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedOption = button.textContent.trim();

        console.log("Selected:", selectedOption);

        switch (selectedOption) {

            case "STORY MODE":
                openMode("story");
                break;

            case "FREE PLAY":
                openMode("freeplay");
                break;

            case "PRACTICE MODE":
                openMode("practice");
                break;

            case "CHARACTER GALLERY":
                openMode("characters");
                break;

            case "SONG GALLERY":
                openMode("songs");
                break;

            case "SETTINGS":
                openMode("settings");
                break;

            case "CREDITS":
                openMode("credits");
                break;

        }

    });

});

// OPEN GAME MODES


function openMode(mode) {

    gameState.selectedMode = mode;

    console.log("Opening game mode:", mode);

    if (mode === "story") {

        document.getElementById("main-menu").hidden = true;

        document.getElementById("story-mode").hidden = false;

        gameState.currentScreen = "story-mode";

        return;
    }

    alert(
        "You selected: " +
        mode.toUpperCase() +
        "\n\nThis section will be developed soon!"
    );

}


// GAME INITIALIZATION

function initializeGame() {

    console.log(
        "Friday Night Funkin': New Rivals loaded!"
    );

    console.log("Main menu initialized.");

}

// START GAME

initializeGame();
