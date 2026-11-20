
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


// BACK BUTTON — RETURN TO MAIN MENU

const backButton = document.getElementById("back-to-menu");

backButton.addEventListener("click", () => {

    document.getElementById("story-mode").hidden = true;

    document.getElementById("main-menu").hidden = false;

    gameState.currentScreen = "main-menu";

    gameState.selectedMode = null;

});




/* =====================================
   WEEK 1 — ORIGINAL SONG CATALOG
===================================== */

const week1Songs = [
    {
        name: "Jellyfish Jam",
        opponent: "SpongeBob",
        player: "Boyfriend",
        location: "Jellyfish Fields",
        version: "Original"
    }
];

console.log("Original Week 1 song catalog loaded:", week1Songs.length);

/* =====================================
   WEEK 1 — DIFFICULTY SYSTEM
===================================== */

const songDifficulties = [
    "Easy",
    "Normal",
    "Hard",
    "Chaos",
    "Nightmare",
    "Expert",
    "SUPER"
];

const superUnlockRequirement = 90;

let playerMastery = {};

function isSuperUnlocked() {

    const masteryScores = Object.values(playerMastery);

    if (masteryScores.length === 0) {
        return false;
    }

    const totalMastery = masteryScores.reduce(
        (total, score) => total + score,
        0
    );

    const averageMastery =
        totalMastery / masteryScores.length;

    return averageMastery >= superUnlockRequirement;

}

function getAvailableDifficulties() {

    if (isSuperUnlocked()) {
        return [...songDifficulties];
    }

    return songDifficulties.filter(
        difficulty => difficulty !== "SUPER"
    );

}

console.log("Available difficulties:", getAvailableDifficulties());


/* =====================================
   WEEK 1 — SONG SELECTION SYSTEM
===================================== */

const week1SongScreen = document.getElementById("week1-song-screen");
const songList = document.getElementById("song-list");
const difficultyList = document.getElementById("difficulty-list");

const startSongButton = document.getElementById("start-song-button");
const backToWeeksButton = document.getElementById("back-to-weeks");

let selectedSong = null;
let selectedDifficulty = null;

// OPEN WEEK 1

document.querySelectorAll(".week-button").forEach(button => {

    button.addEventListener("click", () => {

        if (button.dataset.week === "1") {

            document.getElementById("story-mode").hidden = true;
            week1SongScreen.hidden = false;

            gameState.currentScreen = "week1-songs";

        }

    });

});

// DISPLAY SONGS

function displayWeek1Songs() {

    songList.innerHTML = "";

    week1Songs.forEach((song, index) => {

        const songButton = document.createElement("button");

        songButton.textContent =
            song.name + " — " + song.version;

        songButton.classList.add("song-button");

        songButton.addEventListener("click", () => {

            selectedSong = index;

            document.querySelectorAll(".song-button").forEach(button => {
                button.classList.remove("selected");
            });

            songButton.classList.add("selected");

            updateStartButton();

        });

        songList.appendChild(songButton);

    });

}

// DISPLAY DIFFICULTIES

function displayDifficulties() {

    difficultyList.innerHTML = "";

    getAvailableDifficulties().forEach(difficulty => {

        const difficultyButton = document.createElement("button");

        difficultyButton.textContent = difficulty;

        difficultyButton.classList.add("difficulty-button");

        difficultyButton.addEventListener("click", () => {

            selectedDifficulty = difficulty;

            document.querySelectorAll(".difficulty-button").forEach(button => {
                button.classList.remove("selected");
            });

            difficultyButton.classList.add("selected");

            updateStartButton();

        });

        difficultyList.appendChild(difficultyButton);

    });

}

// ENABLE START BUTTON WHEN BOTH ARE SELECTED

function updateStartButton() {

    startSongButton.disabled =
        selectedSong === null || selectedDifficulty === null;

}

startSongButton.addEventListener("click", () => {
    const songSelectionScreen = document.getElementById("song-selection-screen");
    const gameplayScreen = document.getElementById("gameplay-screen");

    if (!gameplayScreen) {
        alert("Gameplay screen could not be found!");
        return;
    }

    if (songSelectionScreen) {
        songSelectionScreen.hidden = true;
    }

    gameplayScreen.hidden = false;

    console.log("Jellyfish Jam gameplay screen opened!");
});
// BACK TO WEEK SELECTION

backToWeeksButton.addEventListener("click", () => {

    week1SongScreen.hidden = true;

    document.getElementById("story-mode").hidden = false;

    gameState.currentScreen = "story-mode";

});

// INITIALIZE SONG SELECTION

displayWeek1Songs();
displayDifficulties();
