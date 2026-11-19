
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
   WEEK 1 — ORIGINAL FNF SONG CATALOG
===================================== */

const week1Songs = [

    // TUTORIAL
    { name: "Tutorial", version: "Original" },

    // WEEK 1
    { name: "Bopeebo", version: "Original" },
    { name: "Fresh", version: "Original" },
    { name: "DadBattle", version: "Original" },
    { name: "Bopeebo", version: "Erect" },
    { name: "Fresh", version: "Erect" },
    { name: "DadBattle", version: "Erect" },

    // WEEK 2
    { name: "Spookeez", version: "Original" },
    { name: "South", version: "Original" },
    { name: "Monster", version: "Original" },
    { name: "Spookeez", version: "Erect" },
    { name: "South", version: "Erect" },

    // WEEK 3
    { name: "Pico", version: "Original" },
    { name: "Philly Nice", version: "Original" },
    { name: "Blammed", version: "Original" },
    { name: "Pico", version: "Erect" },
    { name: "Philly Nice", version: "Erect" },
    { name: "Blammed", version: "Erect" },

    // WEEK 4
    { name: "Satin Panties", version: "Original" },
    { name: "High", version: "Original" },
    { name: "M.I.L.F", version: "Original" },
    { name: "Satin Panties", version: "Erect" },
    { name: "High", version: "Erect" },

    // WEEK 5
    { name: "Cocoa", version: "Original" },
    { name: "Eggnog", version: "Original" },
    { name: "Winter Horrorland", version: "Original" },
    { name: "Cocoa", version: "Erect" },
    { name: "Eggnog", version: "Erect" },

    // WEEK 6
    { name: "Senpai", version: "Original" },
    { name: "Roses", version: "Original" },
    { name: "Thorns", version: "Original" },
    { name: "Senpai", version: "Erect" },
    { name: "Roses", version: "Erect" },
    { name: "Thorns", version: "Erect" },

    // WEEK 7
    { name: "Ugh", version: "Original" },
    { name: "Guns", version: "Original" },
    { name: "Stress", version: "Original" },
    { name: "Ugh", version: "Erect" },

    // WEEKEND 1
    { name: "Darnell", version: "Original" },
    { name: "Lit Up", version: "Original" },
    { name: "2hot", version: "Original" },
    { name: "Blazin'", version: "Original" },
    { name: "Darnell", version: "Erect" }

];

console.log("Week 1 song catalog loaded:", week1Songs.length);


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

// START SONG PLACEHOLDER

startSongButton.addEventListener("click", () => {

    if (selectedSong === null || selectedDifficulty === null) {
        return;
    }

    const song = week1Songs[selectedSong];

    alert(
        "Song: " + song.name +
        "\nVersion: " + song.version +
        "\nDifficulty: " + selectedDifficulty +
        "\n\nGameplay will be connected in a later step!"
    );

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
