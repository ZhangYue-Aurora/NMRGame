// --- Screen Switching Utility ---
function showScreen(screenId) {
  document.getElementById("title-screen").style.display = "none";
  document.getElementById("nickname-screen").style.display = "none";
  document.getElementById("mode-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("leaderboard-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("tutorial-screen").style.display = "none";
  document.getElementById(screenId).style.display = "block";
}

// --- Button Event Listeners ---
// Show nickname screen after title
document.getElementById("start-btn").onclick = () =>
  showScreen("nickname-screen");
document.getElementById("leaderboard-btn").onclick = () => {
  showScreen("leaderboard-screen");
  showLeaderboard();
};
document.getElementById("end-replay-btn").onclick = () => {
  showScreen("game-screen");
  startGame();
};
document.getElementById("end-leaderboard-btn").onclick = () => {
  showScreen("leaderboard-screen"); // or whatever your leaderboard screen's id is
  showLeaderboard(); // your leaderboard rendering function
};

// Handle nickname submission
document.getElementById("nickname-submit-btn").onclick = () => {
  const input = document.getElementById("nickname-input");
  playerNickname = input.value.trim();
  if (!playerNickname) {
    alert("Please enter a nickname!");
    return;
  }
  showTutorial();
};
document.getElementById("easy-btn").onclick = () => {
  difficulty = "easy";
  showScreen("game-screen");
  startGame();
};
document.getElementById("hard-btn").onclick = () => {
  difficulty = "hard";
  showScreen("game-screen");
  startGame();
};
document.getElementById("back-to-title-btn").onclick = () =>
  showScreen("title-screen");
document.getElementById("nickname-to-title-btn").onclick = () =>
  showScreen("title-screen");
document.getElementById("back-to-mode-btn").onclick = () =>
  showScreen("mode-screen");
document.getElementById("back-to-mode-btn2").onclick = () =>
  showScreen("mode-screen");
document.getElementById("end-mode-btn").onclick = () =>
  showScreen("mode-screen");
document.getElementById("leaderboard-prev").onclick = () => {
  if (!leaderboardDifficulties.length) return;

  currentLeaderboardIndex--;
  if (currentLeaderboardIndex < 0) {
    currentLeaderboardIndex = leaderboardDifficulties.length - 1;
  }

  renderCurrentLeaderboard();
};

document.getElementById("leaderboard-next").onclick = () => {
  if (!leaderboardDifficulties.length) return;

  currentLeaderboardIndex++;
  if (currentLeaderboardIndex >= leaderboardDifficulties.length) {
    currentLeaderboardIndex = 0;
  }

  renderCurrentLeaderboard();
};

document.getElementById("tutorial-prev").onclick = () => {
  if (currentTutorialIndex > 0) {
    currentTutorialIndex--;
    renderTutorialPage();
  }
};

document.getElementById("tutorial-next").onclick = () => {
  if (currentTutorialIndex < tutorialPages.length - 1) {
    currentTutorialIndex++;
    renderTutorialPage();
  }
};

document.getElementById("tutorial-skip-btn").onclick = () => {
  showScreen("mode-screen"); 
  // or wherever you want them to go after skipping
};

document.getElementById("tutorial-btn").onclick = () => {
  showTutorial();
};

// On page load, show the title screen
showScreen("title-screen");

// --- Game Data: Multi-Tier Questions ---
const gameData = {
  easy: {
    questions: [
      {
        text: "easy-question-1",
        tier: "primary",
        unlocks: [
          {
            text: "easy-question-1.1",
            tier: "secondary",
            unlocks: [
              { text: "easy-question-1.1.1", tier: "tertiary", unlocks: [] },
              { text: "easy-question-1.1.2", tier: "tertiary", unlocks: [] }
            ]
          },
          {
            text: "easy-question-1.2",
            tier: "secondary",
            unlocks: [
              { text: "easy-question-1.2.1", tier: "tertiary", unlocks: [] },
              { text: "easy-question-1.2.2", tier: "tertiary", unlocks: [] }
            ]
          }
        ]
      },
      {
        text: "easy-question-2",
        tier: "primary",
        unlocks: [
          {
            text: "easy-question-2.1",
            tier: "secondary",
            unlocks: [
              { text: "easy-question-2.1.1", tier: "tertiary", unlocks: [] },
              { text: "easy-question-2.1.2", tier: "tertiary", unlocks: [] }
            ]
          },
          {
            text: "easy-question-2.2",
            tier: "secondary",
            unlocks: [
              { text: "easy-question-2.2.1", tier: "tertiary", unlocks: [] },
              { text: "easy-question-2.2.2", tier: "tertiary", unlocks: [] }
            ]
          }
        ]
      },
      {
        text: "easy-question-3",
        tier: "primary",
        unlocks: [
          {
            text: "easy-question-3.1",
            tier: "secondary",
            unlocks: [
              { text: "easy-question-3.1.1", tier: "tertiary", unlocks: [] },
              { text: "easy-question-3.1.2", tier: "tertiary", unlocks: [] }
            ]
          },
          {
            text: "easy-question-3.2",
            tier: "secondary",
            unlocks: [
              { text: "easy-question-3.2.1", tier: "tertiary", unlocks: [] },
              { text: "easy-question-3.2.2", tier: "tertiary", unlocks: [] }
            ]
          }
        ]
      },
      {
        text: "easy-question-4",
        tier: "primary",
        unlocks: [
          {
            text: "easy-question-4.1",
            tier: "secondary",
            unlocks: [
              { text: "easy-question-4.1.1", tier: "tertiary", unlocks: [] },
              { text: "easy-question-4.1.2", tier: "tertiary", unlocks: [] }
            ]
          },
          {
            text: "easy-question-4.2",
            tier: "secondary",
            unlocks: [
              { text: "easy-question-4.2.1", tier: "tertiary", unlocks: [] },
              { text: "easy-question-4.2.2", tier: "tertiary", unlocks: [] }
            ]
          }
        ]
      }
    ],
    suspects: [
      { name: "easy-suspect-1", image: "images/suspect1-front.png" },
      { name: "easy-suspect-2", image: "images/suspect2-front.png" },
      { name: "easy-suspect-3", image: "images/suspect3-front.png" },
      { name: "easy-suspect-4", image: "images/suspect4-front.png" },
      { name: "easy-suspect-5", image: "images/suspect5-front.png" },
      { name: "easy-suspect-6", image: "images/suspect6-front.png" },
      { name: "easy-suspect-7", image: "images/suspect7-front.png" },
      { name: "easy-suspect-8", image: "images/suspect8-front.png" }
    ]
  },

  hard: {
    questions: [
      {
        text: "hard-question-1",
        tier: "primary",
        unlocks: [
          {
            text: "hard-question-1.1",
            tier: "secondary",
            unlocks: [
              { text: "hard-question-1.1.1", tier: "tertiary", unlocks: [] },
              { text: "hard-question-1.1.2", tier: "tertiary", unlocks: [] }
            ]
          },
          {
            text: "hard-question-1.2",
            tier: "secondary",
            unlocks: [
              { text: "hard-question-1.2.1", tier: "tertiary", unlocks: [] },
              { text: "hard-question-1.2.2", tier: "tertiary", unlocks: [] }
            ]
          }
        ]
      },
      {
        text: "hard-question-2",
        tier: "primary",
        unlocks: [
          {
            text: "hard-question-2.1",
            tier: "secondary",
            unlocks: [
              { text: "hard-question-2.1.1", tier: "tertiary", unlocks: [] },
              { text: "hard-question-2.1.2", tier: "tertiary", unlocks: [] }
            ]
          },
          {
            text: "hard-question-2.2",
            tier: "secondary",
            unlocks: [
              { text: "hard-question-2.2.1", tier: "tertiary", unlocks: [] },
              { text: "hard-question-2.2.2", tier: "tertiary", unlocks: [] }
            ]
          }
        ]
      },
      {
        text: "hard-question-3",
        tier: "primary",
        unlocks: [
          {
            text: "hard-question-3.1",
            tier: "secondary",
            unlocks: [
              { text: "hard-question-3.1.1", tier: "tertiary", unlocks: [] },
              { text: "hard-question-3.1.2", tier: "tertiary", unlocks: [] }
            ]
          },
          {
            text: "hard-question-3.2",
            tier: "secondary",
            unlocks: [
              { text: "hard-question-3.2.1", tier: "tertiary", unlocks: [] },
              { text: "hard-question-3.2.2", tier: "tertiary", unlocks: [] }
            ]
          }
        ]
      },
      {
        text: "hard-question-4",
        tier: "primary",
        unlocks: [
          {
            text: "hard-question-4.1",
            tier: "secondary",
            unlocks: [
              { text: "hard-question-4.1.1", tier: "tertiary", unlocks: [] },
              { text: "hard-question-4.1.2", tier: "tertiary", unlocks: [] }
            ]
          },
          {
            text: "hard-question-4.2",
            tier: "secondary",
            unlocks: [
              { text: "hard-question-4.2.1", tier: "tertiary", unlocks: [] },
              { text: "hard-question-4.2.2", tier: "tertiary", unlocks: [] }
            ]
          }
        ]
      }
    ],
    suspects: [
      { name: "hard-suspect-1", image: "images/suspect1-front.png" },
      { name: "hard-suspect-2", image: "images/suspect2-front.png" },
      { name: "hard-suspect-3", image: "images/suspect3-front.png" },
      { name: "hard-suspect-4", image: "images/suspect4-front.png" },
      { name: "hard-suspect-5", image: "images/suspect5-front.png" },
      { name: "hard-suspect-6", image: "images/suspect6-front.png" },
      { name: "hard-suspect-7", image: "images/suspect7-front.png" },
      { name: "hard-suspect-8", image: "images/suspect8-front.png" }
    ]
  }
}
const clueTemplates = {
    easy: {
    "easy-question-1": {
      type: "count",
      values: [1, 2, 3, 4, 5, 6, 7, 8],
      template: "easy-clue-1-{n} There {isAre} {n} item{s}."
    },
    "easy-question-2": [
      "easy-clue-2-1",
      "easy-clue-2-2",
      "easy-clue-2-3",
      "easy-clue-2-4",
      "easy-clue-2-5",
      "easy-clue-2-6",
      "easy-clue-2-7",
      "easy-clue-2-8"
    ],
    "easy-question-3": [
      "easy-clue-3-1",
      "easy-clue-3-2",
      "easy-clue-3-3",
      "easy-clue-3-4",
      "easy-clue-3-5",
      "easy-clue-3-6",
      "easy-clue-3-7",
      "easy-clue-3-8"
    ],
    "easy-question-4": [
      "easy-clue-4-1",
      "easy-clue-4-2",
      "easy-clue-4-3",
      "easy-clue-4-4",
      "easy-clue-4-5",
      "easy-clue-4-6",
      "easy-clue-4-7",
      "easy-clue-4-8"
    ],
    "easy-question-1.1": [
      "easy-clue-1.1-1",
      "easy-clue-1.1-2",
      "easy-clue-1.1-3",
      "easy-clue-1.1-4",
      "easy-clue-1.1-5",
      "easy-clue-1.1-6",
      "easy-clue-1.1-7",
      "easy-clue-1.1-8"
    ],
    "easy-question-1.2": [
      "easy-clue-1.2-1",
      "easy-clue-1.2-2",
      "easy-clue-1.2-3",
      "easy-clue-1.2-4",
      "easy-clue-1.2-5",
      "easy-clue-1.2-6",
      "easy-clue-1.2-7",
      "easy-clue-1.2-8"
    ],
    "easy-question-2.1": [
      "easy-clue-2.1-1",
      "easy-clue-2.1-2",
      "easy-clue-2.1-3",
      "easy-clue-2.1-4",
      "easy-clue-2.1-5",
      "easy-clue-2.1-6",
      "easy-clue-2.1-7",
      "easy-clue-2.1-8"
    ],
    "easy-question-2.2": [
      "easy-clue-2.2-1",
      "easy-clue-2.2-2",
      "easy-clue-2.2-3",
      "easy-clue-2.2-4",
      "easy-clue-2.2-5",
      "easy-clue-2.2-6",
      "easy-clue-2.2-7",
      "easy-clue-2.2-8"
    ],
    "easy-question-3.1": [
      "easy-clue-3.1-1",
      "easy-clue-3.1-2",
      "easy-clue-3.1-3",
      "easy-clue-3.1-4",
      "easy-clue-3.1-5",
      "easy-clue-3.1-6",
      "easy-clue-3.1-7",
      "easy-clue-3.1-8"
    ],
    "easy-question-3.2": [
      "easy-clue-3.2-1",
      "easy-clue-3.2-2",
      "easy-clue-3.2-3",
      "easy-clue-3.2-4",
      "easy-clue-3.2-5",
      "easy-clue-3.2-6",
      "easy-clue-3.2-7",
      "easy-clue-3.2-8"
    ],
    "easy-question-4.1": [
      "easy-clue-4.1-1",
      "easy-clue-4.1-2",
      "easy-clue-4.1-3",
      "easy-clue-4.1-4",
      "easy-clue-4.1-5",
      "easy-clue-4.1-6",
      "easy-clue-4.1-7",
      "easy-clue-4.1-8"
    ],
    "easy-question-4.2": [
      "easy-clue-4.2-1",
      "easy-clue-4.2-2",
      "easy-clue-4.2-3",
      "easy-clue-4.2-4",
      "easy-clue-4.2-5",
      "easy-clue-4.2-6",
      "easy-clue-4.2-7",
      "easy-clue-4.2-8"
    ],
    "easy-question-1.1.1": [
      "easy-clue-1.1.1-1",
      "easy-clue-1.1.1-2",
      "easy-clue-1.1.1-3",
      "easy-clue-1.1.1-4",
      "easy-clue-1.1.1-5",
      "easy-clue-1.1.1-6",
      "easy-clue-1.1.1-7",
      "easy-clue-1.1.1-8"
    ],
    "easy-question-1.1.2": [
      "easy-clue-1.1.2-1",
      "easy-clue-1.1.2-2",
      "easy-clue-1.1.2-3",
      "easy-clue-1.1.2-4",
      "easy-clue-1.1.2-5",
      "easy-clue-1.1.2-6",
      "easy-clue-1.1.2-7",
      "easy-clue-1.1.2-8"
    ],
    "easy-question-1.2.1": [
      "easy-clue-1.2.1-1",
      "easy-clue-1.2.1-2",
      "easy-clue-1.2.1-3",
      "easy-clue-1.2.1-4",
      "easy-clue-1.2.1-5",
      "easy-clue-1.2.1-6",
      "easy-clue-1.2.1-7",
      "easy-clue-1.2.1-8"
    ],
    "easy-question-1.2.2": [
      "easy-clue-1.2.2-1",
      "easy-clue-1.2.2-2",
      "easy-clue-1.2.2-3",
      "easy-clue-1.2.2-4",
      "easy-clue-1.2.2-5",
      "easy-clue-1.2.2-6",
      "easy-clue-1.2.2-7",
      "easy-clue-1.2.2-8"
    ],
    "easy-question-2.1.1": [
      "easy-clue-2.1.1-1",
      "easy-clue-2.1.1-2",
      "easy-clue-2.1.1-3",
      "easy-clue-2.1.1-4",
      "easy-clue-2.1.1-5",
      "easy-clue-2.1.1-6",
      "easy-clue-2.1.1-7",
      "easy-clue-2.1.1-8"
    ],
    "easy-question-2.1.2": [
      "easy-clue-2.1.2-1",
      "easy-clue-2.1.2-2",
      "easy-clue-2.1.2-3",
      "easy-clue-2.1.2-4",
      "easy-clue-2.1.2-5",
      "easy-clue-2.1.2-6",
      "easy-clue-2.1.2-7",
      "easy-clue-2.1.2-8"
    ],
    "easy-question-2.2.1": [
      "easy-clue-2.2.1-1",
      "easy-clue-2.2.1-2",
      "easy-clue-2.2.1-3",
      "easy-clue-2.2.1-4",
      "easy-clue-2.2.1-5",
      "easy-clue-2.2.1-6",
      "easy-clue-2.2.1-7",
      "easy-clue-2.2.1-8"
    ],
    "easy-question-2.2.2": [
      "easy-clue-2.2.2-1",
      "easy-clue-2.2.2-2",
      "easy-clue-2.2.2-3",
      "easy-clue-2.2.2-4",
      "easy-clue-2.2.2-5",
      "easy-clue-2.2.2-6",
      "easy-clue-2.2.2-7",
      "easy-clue-2.2.2-8"
    ],
    "easy-question-3.1.1": [
      "easy-clue-3.1.1-1",
      "easy-clue-3.1.1-2",
      "easy-clue-3.1.1-3",
      "easy-clue-3.1.1-4",
      "easy-clue-3.1.1-5",
      "easy-clue-3.1.1-6",
      "easy-clue-3.1.1-7",
      "easy-clue-3.1.1-8"
    ],
    "easy-question-3.1.2": [
      "easy-clue-3.1.2-1",
      "easy-clue-3.1.2-2",
      "easy-clue-3.1.2-3",
      "easy-clue-3.1.2-4",
      "easy-clue-3.1.2-5",
      "easy-clue-3.1.2-6",
      "easy-clue-3.1.2-7",
      "easy-clue-3.1.2-8"
    ],
    "easy-question-3.2.1": [
      "easy-clue-3.2.1-1",
      "easy-clue-3.2.1-2",
      "easy-clue-3.2.1-3",
      "easy-clue-3.2.1-4",
      "easy-clue-3.2.1-5",
      "easy-clue-3.2.1-6",
      "easy-clue-3.2.1-7",
      "easy-clue-3.2.1-8"
    ],
    "easy-question-3.2.2": [
      "easy-clue-3.2.2-1",
      "easy-clue-3.2.2-2",
      "easy-clue-3.2.2-3",
      "easy-clue-3.2.2-4",
      "easy-clue-3.2.2-5",
      "easy-clue-3.2.2-6",
      "easy-clue-3.2.2-7",
      "easy-clue-3.2.2-8"
    ],
    "easy-question-4.1.1": [
      "easy-clue-4.1.1-1",
      "easy-clue-4.1.1-2",
      "easy-clue-4.1.1-3",
      "easy-clue-4.1.1-4",
      "easy-clue-4.1.1-5",
      "easy-clue-4.1.1-6",
      "easy-clue-4.1.1-7",
      "easy-clue-4.1.1-8"
    ],
    "easy-question-4.1.2": [
      "easy-clue-4.1.2-1",
      "easy-clue-4.1.2-2",
      "easy-clue-4.1.2-3",
      "easy-clue-4.1.2-4",
      "easy-clue-4.1.2-5",
      "easy-clue-4.1.2-6",
      "easy-clue-4.1.2-7",
      "easy-clue-4.1.2-8"
    ],
    "easy-question-4.2.1": [
      "easy-clue-4.2.1-1",
      "easy-clue-4.2.1-2",
      "easy-clue-4.2.1-3",
      "easy-clue-4.2.1-4",
      "easy-clue-4.2.1-5",
      "easy-clue-4.2.1-6",
      "easy-clue-4.2.1-7",
      "easy-clue-4.2.1-8"
    ],
    "easy-question-4.2.2": [
      "easy-clue-4.2.2-1",
      "easy-clue-4.2.2-2",
      "easy-clue-4.2.2-3",
      "easy-clue-4.2.2-4",
      "easy-clue-4.2.2-5",
      "easy-clue-4.2.2-6",
      "easy-clue-4.2.2-7",
      "easy-clue-4.2.2-8"
    ]
    },
    hard: {
    "hard-question-1": [
      "hard-clue-1-1",
      "hard-clue-1-2",
      "hard-clue-1-3",
      "hard-clue-1-4",
      "hard-clue-1-5",
      "hard-clue-1-6",
      "hard-clue-1-7",
      "hard-clue-1-8"
    ],
    "hard-question-2": [
      "hard-clue-2-1",
      "hard-clue-2-2",
      "hard-clue-2-3",
      "hard-clue-2-4",
      "hard-clue-2-5",
      "hard-clue-2-6",
      "hard-clue-2-7",
      "hard-clue-2-8"
    ],
    "hard-question-3": [
      "hard-clue-3-1",
      "hard-clue-3-2",
      "hard-clue-3-3",
      "hard-clue-3-4",
      "hard-clue-3-5",
      "hard-clue-3-6",
      "hard-clue-3-7",
      "hard-clue-3-8"
    ],
    "hard-question-4": [
      "hard-clue-4-1",
      "hard-clue-4-2",
      "hard-clue-4-3",
      "hard-clue-4-4",
      "hard-clue-4-5",
      "hard-clue-4-6",
      "hard-clue-4-7",
      "hard-clue-4-8"
    ],
    "hard-question-1.1": [
      "hard-clue-1.1-1",
      "hard-clue-1.1-2",
      "hard-clue-1.1-3",
      "hard-clue-1.1-4",
      "hard-clue-1.1-5",
      "hard-clue-1.1-6",
      "hard-clue-1.1-7",
      "hard-clue-1.1-8"
    ],
    "hard-question-1.2": [
      "hard-clue-1.2-1",
      "hard-clue-1.2-2",
      "hard-clue-1.2-3",
      "hard-clue-1.2-4",
      "hard-clue-1.2-5",
      "hard-clue-1.2-6",
      "hard-clue-1.2-7",
      "hard-clue-1.2-8"
    ],
    "hard-question-2.1": [
      "hard-clue-2.1-1",
      "hard-clue-2.1-2",
      "hard-clue-2.1-3",
      "hard-clue-2.1-4",
      "hard-clue-2.1-5",
      "hard-clue-2.1-6",
      "hard-clue-2.1-7",
      "hard-clue-2.1-8"
    ],
    "hard-question-2.2": [
      "hard-clue-2.2-1",
      "hard-clue-2.2-2",
      "hard-clue-2.2-3",
      "hard-clue-2.2-4",
      "hard-clue-2.2-5",
      "hard-clue-2.2-6",
      "hard-clue-2.2-7",
      "hard-clue-2.2-8"
    ],
    "hard-question-3.1": [
      "hard-clue-3.1-1",
      "hard-clue-3.1-2",
      "hard-clue-3.1-3",
      "hard-clue-3.1-4",
      "hard-clue-3.1-5",
      "hard-clue-3.1-6",
      "hard-clue-3.1-7",
      "hard-clue-3.1-8"
    ],
    "hard-question-3.2": [
      "hard-clue-3.2-1",
      "hard-clue-3.2-2",
      "hard-clue-3.2-3",
      "hard-clue-3.2-4",
      "hard-clue-3.2-5",
      "hard-clue-3.2-6",
      "hard-clue-3.2-7",
      "hard-clue-3.2-8"
    ],
    "hard-question-4.1": [
      "hard-clue-4.1-1",
      "hard-clue-4.1-2",
      "hard-clue-4.1-3",
      "hard-clue-4.1-4",
      "hard-clue-4.1-5",
      "hard-clue-4.1-6",
      "hard-clue-4.1-7",
      "hard-clue-4.1-8"
    ],
    "hard-question-4.2": [
      "hard-clue-4.2-1",
      "hard-clue-4.2-2",
      "hard-clue-4.2-3",
      "hard-clue-4.2-4",
      "hard-clue-4.2-5",
      "hard-clue-4.2-6",
      "hard-clue-4.2-7",
      "hard-clue-4.2-8"
    ],
    "hard-question-1.1.1": [
      "hard-clue-1.1.1-1",
      "hard-clue-1.1.1-2",
      "hard-clue-1.1.1-3",
      "hard-clue-1.1.1-4",
      "hard-clue-1.1.1-5",
      "hard-clue-1.1.1-6",
      "hard-clue-1.1.1-7",
      "hard-clue-1.1.1-8"
    ],
    "hard-question-1.1.2": [
      "hard-clue-1.1.2-1",
      "hard-clue-1.1.2-2",
      "hard-clue-1.1.2-3",
      "hard-clue-1.1.2-4",
      "hard-clue-1.1.2-5",
      "hard-clue-1.1.2-6",
      "hard-clue-1.1.2-7",
      "hard-clue-1.1.2-8"
    ],
    "hard-question-1.2.1": [
      "hard-clue-1.2.1-1",
      "hard-clue-1.2.1-2",
      "hard-clue-1.2.1-3",
      "hard-clue-1.2.1-4",
      "hard-clue-1.2.1-5",
      "hard-clue-1.2.1-6",
      "hard-clue-1.2.1-7",
      "hard-clue-1.2.1-8"
    ],
    "hard-question-1.2.2": [
      "hard-clue-1.2.2-1",
      "hard-clue-1.2.2-2",
      "hard-clue-1.2.2-3",
      "hard-clue-1.2.2-4",
      "hard-clue-1.2.2-5",
      "hard-clue-1.2.2-6",
      "hard-clue-1.2.2-7",
      "hard-clue-1.2.2-8"
    ],
    "hard-question-2.1.1": [
      "hard-clue-2.1.1-1",
      "hard-clue-2.1.1-2",
      "hard-clue-2.1.1-3",
      "hard-clue-2.1.1-4",
      "hard-clue-2.1.1-5",
      "hard-clue-2.1.1-6",
      "hard-clue-2.1.1-7",
      "hard-clue-2.1.1-8"
    ],
    "hard-question-2.1.2": [
      "hard-clue-2.1.2-1",
      "hard-clue-2.1.2-2",
      "hard-clue-2.1.2-3",
      "hard-clue-2.1.2-4",
      "hard-clue-2.1.2-5",
      "hard-clue-2.1.2-6",
      "hard-clue-2.1.2-7",
      "hard-clue-2.1.2-8"
    ],
    "hard-question-2.2.1": [
      "hard-clue-2.2.1-1",
      "hard-clue-2.2.1-2",
      "hard-clue-2.2.1-3",
      "hard-clue-2.2.1-4",
      "hard-clue-2.2.1-5",
      "hard-clue-2.2.1-6",
      "hard-clue-2.2.1-7",
      "hard-clue-2.2.1-8"
    ],
    "hard-question-2.2.2": [
      "hard-clue-2.2.2-1",
      "hard-clue-2.2.2-2",
      "hard-clue-2.2.2-3",
      "hard-clue-2.2.2-4",
      "hard-clue-2.2.2-5",
      "hard-clue-2.2.2-6",
      "hard-clue-2.2.2-7",
      "hard-clue-2.2.2-8"
    ],
    "hard-question-3.1.1": [
      "hard-clue-3.1.1-1",
      "hard-clue-3.1.1-2",
      "hard-clue-3.1.1-3",
      "hard-clue-3.1.1-4",
      "hard-clue-3.1.1-5",
      "hard-clue-3.1.1-6",
      "hard-clue-3.1.1-7",
      "hard-clue-3.1.1-8"
    ],
    "hard-question-3.1.2": [
      "hard-clue-3.1.2-1",
      "hard-clue-3.1.2-2",
      "hard-clue-3.1.2-3",
      "hard-clue-3.1.2-4",
      "hard-clue-3.1.2-5",
      "hard-clue-3.1.2-6",
      "hard-clue-3.1.2-7",
      "hard-clue-3.1.2-8"
    ],
    "hard-question-3.2.1": [
      "hard-clue-3.2.1-1",
      "hard-clue-3.2.1-2",
      "hard-clue-3.2.1-3",
      "hard-clue-3.2.1-4",
      "hard-clue-3.2.1-5",
      "hard-clue-3.2.1-6",
      "hard-clue-3.2.1-7",
      "hard-clue-3.2.1-8"
    ],
    "hard-question-3.2.2": [
      "hard-clue-3.2.2-1",
      "hard-clue-3.2.2-2",
      "hard-clue-3.2.2-3",
      "hard-clue-3.2.2-4",
      "hard-clue-3.2.2-5",
      "hard-clue-3.2.2-6",
      "hard-clue-3.2.2-7",
      "hard-clue-3.2.2-8"
    ],
    "hard-question-4.1.1": [
      "hard-clue-4.1.1-1",
      "hard-clue-4.1.1-2",
      "hard-clue-4.1.1-3",
      "hard-clue-4.1.1-4",
      "hard-clue-4.1.1-5",
      "hard-clue-4.1.1-6",
      "hard-clue-4.1.1-7",
      "hard-clue-4.1.1-8"
    ],
    "hard-question-4.1.2": [
      "hard-clue-4.1.2-1",
      "hard-clue-4.1.2-2",
      "hard-clue-4.1.2-3",
      "hard-clue-4.1.2-4",
      "hard-clue-4.1.2-5",
      "hard-clue-4.1.2-6",
      "hard-clue-4.1.2-7",
      "hard-clue-4.1.2-8"
    ],
    "hard-question-4.2.1": [
      "hard-clue-4.2.1-1",
      "hard-clue-4.2.1-2",
      "hard-clue-4.2.1-3",
      "hard-clue-4.2.1-4",
      "hard-clue-4.2.1-5",
      "hard-clue-4.2.1-6",
      "hard-clue-4.2.1-7",
      "hard-clue-4.2.1-8"
    ],
    "hard-question-4.2.2": [
      "hard-clue-4.2.2-1",
      "hard-clue-4.2.2-2",
      "hard-clue-4.2.2-3",
      "hard-clue-4.2.2-4",
      "hard-clue-4.2.2-5",
      "hard-clue-4.2.2-6",
      "hard-clue-4.2.2-7",
      "hard-clue-4.2.2-8"
    ]
    }
  };

// for future expansion

// --- Game State ---
let playerNickname = "";
let availableQuestions = [];
let currentQuestions = [];
let currentSuspects = [];
let clues = [];
let questionsAsked = 0;
let gameOver = false;
let startTime = Date.now();
let correctSuspectIndex = Math.floor(Math.random() * currentSuspects.length);
let questionSequence = [];
let gameResult = "";
let starsEarned = 0;
let attempts = 3;
let checkedSuspects = new Array(currentSuspects.length).fill(false);
let disabledSuspects = new Array(currentSuspects.length).fill(false);
let difficulty = "easy"; 
let leaderboardData = {};
let leaderboardDifficulties = [];
let currentLeaderboardIndex = 0;
let tutorialPages = [
  "images/tutorial-1.png",
  "images/tutorial-2.png",
  "images/tutorial-3.png",
  "images/tutorial-4.png",
  "images/tutorial-5.png"
];
let currentTutorialIndex = 0;

// --- UI Elements ---
const questionsDiv = document.getElementById("questions");
const answersDiv = document.getElementById("suspects-grid");
const cluesDiv = document.getElementById("clues");
const scoreDiv = document.getElementById("score");
const timerDiv = document.getElementById("timer");
const attemptsDiv = document.getElementById("attempts");
const replayBtn = document.getElementById("replay-btn");

// --- Helper: Add Questions to Available If Not Already There ---
function addQuestionsToAvailable(unlocks) {
  unlocks.forEach((q) => {
    if (!availableQuestions.some((existing) => existing.text === q.text)) {
      availableQuestions.push(q);
    }
  });
}

// --- Render Questions ---
function renderQuestions() {
  questionsDiv.innerHTML = "";
  availableQuestions.forEach((qObj) => {
    const btn = document.createElement("button");
    const unlockCount = qObj.unlocks ? qObj.unlocks.length : 0;
    const stars = unlockCount > 0 ? "✦".repeat(unlockCount) + " " : "";
    btn.textContent = stars + qObj.text;
    btn.className = "question-btn";
    // Add a class for the tier
    if (qObj.tier === "primary") btn.classList.add("primary");
    if (qObj.tier === "secondary") btn.classList.add("secondary");
    if (qObj.tier === "tertiary") btn.classList.add("tertiary");

    btn.onclick = () => askQuestion(qObj, btn);
    questionsDiv.appendChild(btn);
  });
}

// --- Render Suspects ---
function renderSuspects() {
  answersDiv.innerHTML = "";

  currentSuspects.forEach((suspect, idx) => {
    const isDisabled = disabledSuspects[idx];
    const isChecked = checkedSuspects[idx];
    const shouldFlip = isDisabled || isChecked;

    const wrapper = document.createElement("div");
    wrapper.className = "suspect-card-wrapper";

    const cardButton = document.createElement("button");
    cardButton.className = "suspect-card";

    if (shouldFlip) {
      cardButton.classList.add("flipped");
    }

    if (isDisabled || isChecked) {
      cardButton.disabled = true;
    } else {
      cardButton.onclick = () => guessSuspect(idx, cardButton);
    }

    const inner = document.createElement("div");
    inner.className = "suspect-card-inner";

    const front = document.createElement("div");
    front.className = "suspect-face suspect-front";

    const frontImg = document.createElement("img");
    frontImg.src = suspect.image;
    frontImg.alt = suspect.name;
    front.appendChild(frontImg);

    const back = document.createElement("div");
    back.className = "suspect-face suspect-back";

    const backImg = document.createElement("img");
    backImg.src = "images/card-back.png";
    backImg.alt = "Card back";
    back.appendChild(backImg);

    inner.appendChild(front);
    inner.appendChild(back);
    cardButton.appendChild(inner);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "suspect-checkbox";
    checkbox.checked = isChecked;

    /* Disable checkbox permanently if wrong guess */
    if (isDisabled) {
      checkbox.disabled = true;
    }

    checkbox.onchange = function () {
      if (disabledSuspects[idx]) return;

      checkedSuspects[idx] = checkbox.checked;

      const cardButton = document.querySelectorAll(".suspect-card")[idx];

      if (checkbox.checked) {
        cardButton.classList.add("flipped");
        cardButton.disabled = true;
      } else {
        cardButton.classList.remove("flipped");
        cardButton.disabled = false;
      }
    };

    wrapper.appendChild(cardButton);
    wrapper.appendChild(checkbox);
    answersDiv.appendChild(wrapper);
  });
}

// --- Ask Question Logic (Handles All Tiers) ---
function askQuestion(qObj, btn) {
  if (gameOver) return;
  questionsAsked++;
  questionSequence.push(qObj.text);

  // Generate and store clue
  let clue = getClue(qObj.text, correctSuspectIndex);
  clues.push({ question: qObj.text, clue: clue });

  // Show clue on button, turn grey
  btn.textContent = clue;
  btn.classList.add("greyed");
  btn.disabled = true;

  updateScore();
  updateClues();

  // After 1 second, unlock sub-questions and remove button from list and re-render questions
  setTimeout(() => {
    // Unlock sub-questions (if any)
    if (qObj.unlocks && qObj.unlocks.length > 0) {
      addQuestionsToAvailable(qObj.unlocks);
    }
    // Remove this question from availableQuestions
    availableQuestions = availableQuestions.filter((q) => q.text !== qObj.text);
    renderQuestions();
  }, 1000);
}

// --- Get Clue Logic (No suspect name revealed) ---
function getClue(questionText, suspectIdx) {
  if (!clueTemplates[difficulty]) {
    return `Clue: [invalid difficulty]`;
  }
  
  const difficultySet = clueTemplates[difficulty];
  
    const clueData = difficultySet[questionText];
  if (!clueData) return `Clue: [generic answer to "${questionText}"]`;

  // 🔥 CASE 1: Normal array (your current structure)
  if (Array.isArray(clueData)) {
    return `Clue: ${clueData[suspectIdx]}`;
  }

  // 🔥 CASE 2: Count template structure
  if (clueData.type === "count") {
    const n = clueData.values[suspectIdx];
    let sentence = clueData.template
    .replace("{n}", n)
    .replace("{n}", n)
    .replace("{isAre}", n === 1 ? "is" : "are")
    .replace("{s}", n === 1 ? "" : "s");

  return `Clue: ${sentence}`;
  }

  return `Clue: [unknown clue format]`;
}

// --- Guess Suspect Logic ---
function guessSuspect(idx) {
  if (gameOver || attempts <= 0) return;

  let endTime = Date.now();

  const cardButton = document.querySelectorAll(".suspect-card")[idx];

  if (!cardButton) return;

  if (idx === correctSuspectIndex) {
    attempts -= 1;
    gameOver = true;
    gameResult = "1";
    showEndScreen(true); // win
    sendGameData(); // or whatever you use to send results
  } else {
    attempts -= 1;
    // Add shake animation
    cardButton.classList.add("shake");

    setTimeout(() => {
      cardButton.classList.remove("shake");

      // 2️⃣ Flip smoothly (no re-render)
      cardButton.classList.add("flipped");
      cardButton.disabled = true;

      // 3️⃣ Disable checkbox
      const checkbox = document.querySelectorAll(".suspect-checkbox")[idx];
      if (checkbox) checkbox.disabled = true;
      disabledSuspects[idx] = true;
      updateAttempts();
    }, 400);
    if (attempts <= 0) {
      gameOver = true;
      gameResult = "0";
      showEndScreen(false); // lose
      sendGameData();
    } else {
      attemptsDiv.textContent = `Attempts left: ${attempts} Sorry, wrong suspect!`;
    }
  }
}

// --- Always-Visible Clues Logic ---
function updateClues() {
  cluesDiv.innerHTML = clues.map((c) => `<div>${c.clue}</div>`).join("");
}

// --- Update Score ---
function updateScore() {
  scoreDiv.textContent = `Questions asked: ${questionsAsked}`;
}

// --- Real-Time Timer ---
function updateTimer() {
  if (
    !gameOver &&
    document.getElementById("game-screen").style.display === "block"
  ) {
    let elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    timerDiv.textContent = `Timer: ${elapsed} s`;
  }
}
setInterval(updateTimer, 100);

// --- Update Attempts ---
function updateAttempts() {
  attemptsDiv.textContent = `Attempts left: ${attempts} Click any card to take a guess!`;
}

// --- Replay Button Logic ---
replayBtn.onclick = () => startGame();

// --- Game Setup ---
function startGame() {
  attempts = difficulty === "easy" ? 3 : 2; // optional difficulty tuning
  clues = [];
  questionsAsked = 0;
  gameOver = false;
  startTime = Date.now();
  
  scoreDiv.textContent = "";
  timerDiv.textContent = "";
  attemptsDiv.textContent = "";
  cluesDiv.innerHTML = "";
  
  currentQuestions = gameData[difficulty].questions;
  currentSuspects = gameData[difficulty].suspects;
  
  // Only primary questions at start
  availableQuestions = currentQuestions.map((q) => ({ ...q, unlocks: q.unlocks }));
  
  correctSuspectIndex = Math.floor(Math.random() * currentSuspects.length);
  
  checkedSuspects = Array(currentSuspects.length).fill(false);
  disabledSuspects = Array(currentSuspects.length).fill(false);
  questionSequence = [];

  renderQuestions();
  renderSuspects();
  updateClues();
  updateScore();
  updateAttempts();
}

// !!End Stars Screen!!
function showEndScreen(win) {
  // Calculate stars
  starsEarned = 0;
  if ((Date.now() - startTime) / 1000 < 180) starsEarned += 1; // under 3 min
  if (questionsAsked <= 3) starsEarned += 1;
  if (win) {
    starsEarned += 1;
  } else {
    starsEarned = 0;
  }

  // Display stars
  document.getElementById("end-stars").textContent =
    "★".repeat(starsEarned) + "☆".repeat(3 - starsEarned);

  // Summary
  document.getElementById("end-summary").innerHTML =
    (win
      ? `Yay! ${playerNickname}, you found the correct answer!`
      : `Sorry ${playerNickname}, you ran out of attempts :( `) +
    `<br>Questions asked: <b>${questionsAsked}</b>` +
    `<br>Time taken: <b>${((Date.now() - startTime) / 1000).toFixed(1)}s</b>` +
    `<br>Attempts left: <b>${attempts}</b>`;

  // Show the end screen
  showScreen("end-screen");
}

// Send data at end of game
function sendGameData() {
  console.log("sendGameData called");

  const formData = new URLSearchParams();
  formData.append("nickname", playerNickname);
  formData.append("score", questionsAsked);
  formData.append("timetaken", ((Date.now() - startTime) / 1000).toFixed(1));
  formData.append("question_sequence", questionSequence.join(" | "));
  formData.append("result", gameResult);
  formData.append("attempts_used", 3 - attempts);
  formData.append("stars", starsEarned);
  formData.append("difficulty", difficulty);

  fetch(
    "https://script.google.com/macros/s/AKfycbw3nyBLcwM5DSZXymMqzBtExM-S84q1ibFojqIlKGW8dREdfdgldlJ77b-nr1QRWNpx/exec",
    {
      method: "POST",
      body: formData
    }
  )
    .then((res) => res.json())
    .then((resp) => console.log("Data sent:", resp))
    .catch((err) => console.error("Send error:", err));
}

// Fetch leaderboard data
function fetchLeaderboard(callback) {
  fetch(
    "https://script.google.com/macros/s/AKfycbw3nyBLcwM5DSZXymMqzBtExM-S84q1ibFojqIlKGW8dREdfdgldlJ77b-nr1QRWNpx/exec"
  )
    .then((res) => res.json())
    .then((data) => callback(data));
}

function showLeaderboard() {
  const leaderboardDiv = document.getElementById("leaderboard");
  leaderboardDiv.innerHTML =
    "<div style='padding: 30px 0; font-size: 1.2em; color: #888;'>Loading...</div>";

  fetchLeaderboard(function (data) {
    if (!data || !data.length) {
      leaderboardDiv.innerHTML =
        "<div style='padding: 30px 0; font-size: 1.1em; color: #b00;'>No leaderboard data yet.</div>";
      return;
    }

    // 🔥 Group by difficulty
    leaderboardData = {};

    data.forEach((entry) => {
      const diff = entry.difficulty || "unknown";

      if (!leaderboardData[diff]) {
        leaderboardData[diff] = [];
      }

      leaderboardData[diff].push(entry);
    });

    leaderboardDifficulties = Object.keys(leaderboardData);

    if (!leaderboardDifficulties.length) {
      leaderboardDiv.innerHTML = "No difficulty data found.";
      return;
    }

    currentLeaderboardIndex = 0;

    renderCurrentLeaderboard();
  });
}

function renderCurrentLeaderboard() {
  const leaderboardDiv = document.getElementById("leaderboard");
  const label = document.getElementById("leaderboard-difficulty-label");

  const currentDifficulty =
    leaderboardDifficulties[currentLeaderboardIndex];

  label.textContent = currentDifficulty.toUpperCase();

  const entries = leaderboardData[currentDifficulty];

  if (!entries || !entries.length) {
    leaderboardDiv.innerHTML = "<div>No players in this difficulty yet.</div>";
    return;
  }

  let html = "<ol>";

  entries.slice(0, 10).forEach((entry) => {
    html += `
      <li>
        <b>${entry.nickname}</b> 
        - ${entry.stars} ⭐ 
        - ${entry.score} questions 
        - ${entry.timetaken}s 
        - in ${entry.attempts_used} attempt(s)
      </li>`;
  });

  html += "</ol>";

  leaderboardDiv.innerHTML = html;
}

function showTutorial() {
  currentTutorialIndex = 0;
  showScreen("tutorial-screen"); // assuming you already use this
  renderTutorialPage();
}

function renderTutorialPage() {
  const img = document.getElementById("tutorial-image");
  const indicator = document.getElementById("tutorial-page-indicator");

  img.src = tutorialPages[currentTutorialIndex];

  indicator.textContent =
    `${currentTutorialIndex + 1} / ${tutorialPages.length}`;

  // Disable arrows at edges (optional but nice UX)
  document.getElementById("tutorial-prev").disabled =
    currentTutorialIndex === 0;

  document.getElementById("tutorial-next").disabled =
    currentTutorialIndex === tutorialPages.length - 1;
}