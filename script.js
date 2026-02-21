// --- Screen Switching Utility ---
function showScreen(screenId) {
  document.getElementById("title-screen").style.display = "none";
  document.getElementById("nickname-screen").style.display = "none";
  document.getElementById("mode-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("leaderboard-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
  document.getElementById(screenId).style.display = "block";
}
function showLeaderboard() {
  fetchLeaderboard(function (data) {
    let html = " ";
    data.slice(0, 10).forEach((entry) => {
      html += `<li><b>${entry.nickname}</b> - ${entry.score} questions - ${entry.timetaken}s - ${entry.attempts_used} attempt(s) </li>`;
    });
    html += "</ol>";
    document.getElementById("leaderboard").innerHTML = html;
  });
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
  showScreen("mode-screen");
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
document.getElementById("back-to-mode-btn").onclick = () =>
  showScreen("mode-screen");
document.getElementById("back-to-mode-btn2").onclick = () =>
  showScreen("mode-screen");
document.getElementById("end-mode-btn").onclick = () =>
  showScreen("mode-screen");

// On page load, show the title screen
showScreen("title-screen");

// --- Game Data: Multi-Tier Questions ---
const questions = [
  {
    text: "Where were you last night?",
    tier: "primary",
    unlocks: [
      {
        text: "What were you doing there?",
        tier: "secondary",
        unlocks: [
          {
            text: "Did anything unusual happen?",
            tier: "tertiary",
            unlocks: []
          },
          { text: "Did you meet anyone?", tier: "tertiary", unlocks: [] }
        ]
      },
      {
        text: "Did you see anyone there?",
        tier: "secondary",
        unlocks: [
          { text: "Who was it?", tier: "tertiary", unlocks: [] },
          { text: "Did you talk to them?", tier: "tertiary", unlocks: [] }
        ]
      }
    ]
  },
  {
    text: "Did you see anyone?",
    tier: "primary",
    unlocks: [
      {
        text: "Who did you see?",
        tier: "secondary",
        unlocks: [
          { text: "What were they doing?", tier: "tertiary", unlocks: [] },
          { text: "Did they notice you?", tier: "tertiary", unlocks: [] }
        ]
      },
      {
        text: "Did you talk to them?",
        tier: "secondary",
        unlocks: [
          { text: "What did you talk about?", tier: "tertiary", unlocks: [] },
          { text: "Did anything stand out?", tier: "tertiary", unlocks: [] }
        ]
      }
    ]
  },
  {
    text: "Did you hear anything strange?",
    tier: "primary",
    unlocks: [
      {
        text: "What did you hear?",
        tier: "secondary",
        unlocks: [
          { text: "Was it loud or quiet?", tier: "tertiary", unlocks: [] },
          {
            text: "Did it happen more than once?",
            tier: "tertiary",
            unlocks: []
          }
        ]
      },
      {
        text: "When did you hear it?",
        tier: "secondary",
        unlocks: [
          {
            text: "Where were you at the time?",
            tier: "tertiary",
            unlocks: []
          },
          { text: "Who was nearby?", tier: "tertiary", unlocks: [] }
        ]
      }
    ]
  },
  {
    text: "Who else was around?",
    tier: "primary",
    unlocks: [
      {
        text: "Did you recognize anyone?",
        tier: "secondary",
        unlocks: [
          { text: "Who did you recognize?", tier: "tertiary", unlocks: [] },
          { text: "How do you know them?", tier: "tertiary", unlocks: [] }
        ]
      },
      {
        text: "Did you notice anything suspicious?",
        tier: "secondary",
        unlocks: [
          { text: "What was suspicious?", tier: "tertiary", unlocks: [] },
          { text: "Did you report it?", tier: "tertiary", unlocks: [] }
        ]
      }
    ]
  }
];

// Suspects (final answer)
const suspects = [
  { name: "The janitor" },
  { name: "The librarian" },
  { name: "It was an accident" },
  { name: "The student" },
  { name: "The teacher" },
  { name: "It was a setup" },
  { name: "The security guard" },
  { name: "Nobody" }
];

let difficulty = "easy"; // for future expansion

// --- Game State ---
let playerNickname = "";
let availableQuestions = [];
let clues = [];
let questionsAsked = 0;
let gameOver = false;
let startTime = Date.now();
let correctSuspectIndex = Math.floor(Math.random() * suspects.length);
let questionSequence = [];
let gameResult = "";
let starsEarned = 0;
let attempts = 3;
let disabledSuspects = [];

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
    btn.textContent = qObj.text;
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
// --- Track checked status for each suspect ---
let checkedSuspects = Array(suspects.length).fill(false);

function renderSuspects() {
  // answersDiv is your container on the LEFT now
  answersDiv.innerHTML = "";

  suspects.forEach((suspect, idx) => {
    const isDisabled = disabledSuspects[idx] || checkedSuspects[idx];

    // Outer card element – this will be placed in the suspects grid
    const btn = document.createElement("button");
    btn.className = "suspect-btn";
    btn.dataset.suspectId = idx; // you can use idx directly

    // Inner structure for 3D flip
    const inner = document.createElement("div");
    inner.className = "suspect-card-inner";

    // FRONT face
    const front = document.createElement("div");
    front.className = "suspect-face suspect-front";
    const frontImg = document.createElement("img");
    frontImg.src = suspect.image; // <-- use suspect front image
    frontImg.alt = suspect.name || "Suspect";
    front.appendChild(frontImg);

    // BACK face (shared card-back image)
    const back = document.createElement("div");
    back.className = "suspect-face suspect-back";
    const backImg = document.createElement("img");
    backImg.src = "images/card-back.png"; // <-- your card back image
    backImg.alt = "Card back";
    back.appendChild(backImg);

    // Assemble faces into inner
    inner.appendChild(front);
    inner.appendChild(back);

    // Add inner to button
    btn.appendChild(inner);

    // If disabled, mark it so CSS flips card and we block clicks
    if (isDisabled) {
      btn.classList.add("disabled");
      btn.disabled = true;
    } else {
      btn.disabled = false;
      btn.onclick = () => guessSuspect(idx); // your existing logic
    }

    // Append to container
    answersDiv.appendChild(btn);
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
  const clueTemplates = {
    "Where were you last night?": [
      "I was cleaning.",
      "I was shelving books.",
      "I slipped and fell.",
      "I was studying.",
      "I was teaching.",
      "I was setting things up.",
      "I was patrolling.",
      "I was relaxing."
    ],
    "What were you doing there?": [
      "Organizing supplies.",
      "Reading.",
      "Walking.",
      "Writing.",
      "Explaining.",
      "Preparing.",
      "Checking doors.",
      "Thinking."
    ],
    "Did anything unusual happen?": [
      "Nothing unusual.",
      "Saw something odd.",
      "Heard a strange noise.",
      "Everything was normal.",
      "Noticed a missing item.",
      "Someone was nervous.",
      "Saw a locked door.",
      "Saw someone running."
    ],
    "Did you meet anyone?": [
      "Met the janitor.",
      "Met the librarian.",
      "Met nobody.",
      "Met the teacher.",
      "Met the student.",
      "Met the security guard.",
      "Met nobody.",
      "Met nobody."
    ],
    "Did you see anyone there?": [
      "Saw the security guard.",
      "Saw the janitor.",
      "Saw nobody.",
      "Saw the teacher.",
      "Saw the student.",
      "Saw the librarian.",
      "Saw the janitor.",
      "Saw nobody."
    ],
    "Who was it?": [
      "It was the janitor.",
      "It was the librarian.",
      "It was nobody.",
      "It was the teacher.",
      "It was the student.",
      "It was the security guard.",
      "It was nobody.",
      "It was nobody."
    ],
    "Did you talk to them?": [
      "Briefly said hello.",
      "No conversation.",
      "Didn't talk.",
      "Had a chat.",
      "No interaction.",
      "Just waved.",
      "No conversation.",
      "Didn't talk."
    ],
    "Did you see anyone?": [
      "I saw the librarian.",
      "I saw the janitor.",
      "I saw nobody.",
      "I saw the teacher.",
      "I saw the student.",
      "I saw the security guard.",
      "I saw the janitor.",
      "I saw nobody."
    ],
    "Who did you see?": [
      "Saw the librarian.",
      "Saw the janitor.",
      "Saw nobody.",
      "Saw the teacher.",
      "Saw the student.",
      "Saw the security guard.",
      "Saw the janitor.",
      "Saw nobody."
    ],
    "What were they doing?": [
      "Shelving books.",
      "Cleaning.",
      "Talking.",
      "Studying.",
      "Teaching.",
      "Patrolling.",
      "Relaxing.",
      "Nothing."
    ],
    "Did they notice you?": [
      "Yes.",
      "No.",
      "Not sure.",
      "They waved.",
      "They ignored me.",
      "They were busy.",
      "They looked away.",
      "No."
    ],
    "What did you talk about?": [
      "Talked about work.",
      "Talked about books.",
      "Talked about nothing.",
      "Talked about class.",
      "Talked about cleaning.",
      "Talked about security.",
      "Talked about nothing.",
      "Talked about nothing."
    ],
    "Did anything stand out?": [
      "Nothing stood out.",
      "Something was strange.",
      "Heard a noise.",
      "Saw a missing item.",
      "Saw a locked door.",
      "Saw someone running.",
      "Saw a broken item.",
      "Nothing stood out."
    ],
    "Did you hear anything strange?": [
      "I heard footsteps.",
      "I heard a crash.",
      "I heard silence.",
      "I heard laughter.",
      "I heard a phone ring.",
      "I heard whispers.",
      "I heard music.",
      "I heard nothing."
    ],
    "What did you hear?": [
      "Footsteps.",
      "Crash.",
      "Silence.",
      "Laughter.",
      "Phone ring.",
      "Whispers.",
      "Music.",
      "Nothing."
    ],
    "Was it loud or quiet?": [
      "Loud.",
      "Quiet.",
      "Very quiet.",
      "Very loud.",
      "Medium.",
      "Soft.",
      "Silent.",
      "Loud."
    ],
    "Did it happen more than once?": [
      "Yes.",
      "No.",
      "Not sure.",
      "Once.",
      "Twice.",
      "Many times.",
      "Never.",
      "No."
    ],
    "When did you hear it?": [
      "Around 9pm.",
      "Around 8pm.",
      "Quickly after arriving.",
      "Late at night.",
      "Early evening.",
      "Right before leaving.",
      "After patrol.",
      "Before relaxing."
    ],
    "Where were you at the time?": [
      "In the library.",
      "In the hallway.",
      "In the classroom.",
      "At home.",
      "In the office.",
      "In the storage room.",
      "In the lounge.",
      "Outside."
    ],
    "Who was nearby?": [
      "Janitor.",
      "Librarian.",
      "Nobody.",
      "Teacher.",
      "Student.",
      "Security guard.",
      "Nobody.",
      "Nobody."
    ],
    "Who else was around?": [
      "The security guard was there.",
      "The student was there.",
      "Nobody was around.",
      "The librarian was there.",
      "The janitor was there.",
      "The teacher was there.",
      "The librarian was there.",
      "Nobody was there."
    ],
    "Did you recognize anyone?": [
      "Recognized the security guard.",
      "Recognized the student.",
      "Didn't recognize anyone.",
      "Recognized the librarian.",
      "Recognized the janitor.",
      "Recognized the teacher.",
      "Recognized the librarian.",
      "Didn't recognize anyone."
    ],
    "Who did you recognize?": [
      "Janitor.",
      "Librarian.",
      "Nobody.",
      "Teacher.",
      "Student.",
      "Security guard.",
      "Nobody.",
      "Nobody."
    ],
    "How do you know them?": [
      "From work.",
      "From school.",
      "From the library.",
      "From the classroom.",
      "From the office.",
      "From security.",
      "From cleaning.",
      "From nowhere."
    ],
    "Did you notice anything suspicious?": [
      "Saw someone acting strange.",
      "Heard whispers.",
      "Nothing suspicious.",
      "Saw someone hiding.",
      "Saw a broken item.",
      "Saw a locked door.",
      "Saw someone running.",
      "Nothing suspicious."
    ],
    "What was suspicious?": [
      "Strange behavior.",
      "Odd sounds.",
      "Missing item.",
      "Locked door.",
      "Running person.",
      "Broken item.",
      "Silent area.",
      "Nothing."
    ],
    "Did you report it?": [
      "Yes.",
      "No.",
      "Not sure.",
      "Later.",
      "Immediately.",
      "Didn't report.",
      "Reported to security.",
      "No."
    ]
  };
  if (clueTemplates[questionText]) {
    return `Clue: ${clueTemplates[questionText][suspectIdx]}`;
  }
  return `Clue: [generic answer to "${questionText}"]`;
}

// --- Guess Suspect Logic ---
function guessSuspect(idx) {
  if (gameOver || attempts <= 0) return;

  let endTime = Date.now();

  if (idx === correctSuspectIndex) {
    attempts -= 1;
    gameOver = true;
    gameResult = "1";
    showEndScreen(true); // win
    sendGameData(); // or whatever you use to send results
  } else {
    attempts -= 1;
    disabledSuspects[idx] = true;
    renderSuspects();
    updateAttempts();
    if (attempts <= 0) {
      gameOver = true;
      gameResult = "0";
      showEndScreen(false); // lose
      sendGameData();
    } else {
      attemptsDiv.textContent = `Attempts left: ${attempts} Sorry, wrong suspect! `;
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
    timerDiv.textContent = `Time: ${elapsed} seconds`;
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
  attempts = 3;
  clues = [];
  questionsAsked = 0;
  gameOver = false;
  startTime = Date.now();
  scoreDiv.textContent = "";
  timerDiv.textContent = "";
  attemptsDiv.textContent = "";
  cluesDiv.innerHTML = "";
  // Only primary questions at start
  availableQuestions = questions.map((q) => ({ ...q, unlocks: q.unlocks }));
  correctSuspectIndex = Math.floor(Math.random() * suspects.length);
  checkedSuspects = Array(suspects.length).fill(false);
  disabledSuspects = Array(suspects.length).fill(false);
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
      : "Sorry, you ran out of attempts :(") +
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