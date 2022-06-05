// // TO DO NEXT

// // Theme settings

let focusSession = 25;
let shortBreak = 5;
let longBreak = 15;
let textContent = languages.english;

let pomodoro = new Pomodoro(focusSession, shortBreak, longBreak, textContent);

const title = document.getElementById("title");
const pomodoros = document.getElementById("pomodoros");

const buttons = document.querySelectorAll(".button");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const stopButton = document.getElementById("stop");
const continueButton = document.getElementById("continue");
const resetButton = document.getElementById("reset");

const settingsButton = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const overlay = document.getElementById("overlay");

const settingsTitle = document.getElementById("settings-title");
const timerSettingsTitle = document.getElementById("timer-settings");

const focusDuration = document.getElementById("focus-duration");
const shortBreakDuration = document.getElementById("short-break-duration");
const longBreakDuration = document.getElementById("long-break-duration");

const focusInput = document.getElementById("focus");
const shortBreakInput = document.getElementById("short-break");
const longBreakInput = document.getElementById("long-break");

const language = document.getElementById("language");
const languageSelect = document.getElementById("language-select");

const saveButton = document.getElementById("save");
const cancelButton = document.getElementById("cancel");

function setLanguage(textContent) {
  pomodoros.textContent = textContent.pomodoros;
  startButton.textContent = textContent.startButton;
  pauseButton.textContent = textContent.pauseButton;
  stopButton.textContent = textContent.stopButton;
  continueButton.textContent = textContent.continueButton;
  resetButton.textContent = textContent.resetButton;
  settingsTitle.textContent = textContent.settingsTitle;
  timerSettingsTitle.textContent = textContent.timerSettingsTitle;
  focusDuration.textContent = textContent.focusDuration;
  shortBreakDuration.textContent = textContent.shortBreakDuration;
  longBreakDuration.textContent = textContent.longBreakDuration;
  language.textContent = textContent.language;
  saveButton.textContent = textContent.saveButton;
  cancelButton.textContent = textContent.cancelButton;
}
setLanguage(textContent);

function displayRemoveButtons(displayButtons, removeButtons) {
  displayButtons.forEach((button) => button.classList.remove("hidden"));
  removeButtons.forEach((button) => button.classList.add("hidden"));
}

startButton.addEventListener("click", () => {
  pomodoro.start();
  displayRemoveButtons([pauseButton, stopButton], [startButton]);
});

pauseButton.addEventListener("click", () => {
  pomodoro.pause();
  displayRemoveButtons([continueButton, resetButton], [pauseButton]);
});

continueButton.addEventListener("click", () => {
  pomodoro.continue();
  displayRemoveButtons(
    [pauseButton, stopButton],
    [continueButton, resetButton]
  );
});

stopButton.addEventListener("click", () => {
  pomodoro.stop();
  displayRemoveButtons(
    [startButton],
    [stopButton, pauseButton, continueButton, resetButton]
  );
});

resetButton.addEventListener("click", () => {
  pomodoro.reset();
  displayRemoveButtons(
    [startButton],
    [resetButton, continueButton, stopButton]
  );
});

settingsButton.addEventListener("click", () => {
  overlay.style.opacity = "80%";
  overlay.style.zIndex = "2";
  settingsForm.style.zIndex = "3";
  settingsForm.style.opacity = "100%";
  settingsForm.style.display = "flex";
});

function closeSettings() {
  overlay.style.opacity = "0%";
  overlay.style.zIndex = "-1";
  settingsForm.style.zIndex = "-1";
  settingsForm.style.opacity = "0%";
  settingsForm.style.display = "none";
}

settingsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  newFocusSession = +focusInput.value;
  newShortBreak = +shortBreakInput.value;
  newLongBreak = +longBreakInput.value;

  console.log(focusSession, newFocusSession);
  console.log(shortBreak, newShortBreak);
  console.log(longBreak, newLongBreak);

  if (
    newFocusSession !== focusSession ||
    newShortBreak !== shortBreak ||
    newLongBreak !== longBreak
  ) {
    pomodoro.stop();
    displayRemoveButtons(
      [startButton],
      [stopButton, pauseButton, continueButton, resetButton]
    );

    focusSession = newFocusSession;
    shortBreak = newShortBreak;
    longBreak = newLongBreak;

    pomodoro = new Pomodoro(focusSession, shortBreak, longBreak, textContent);
  }

  textContent = languages[languageSelect.value];
  pomodoro.textContent = textContent;

  closeSettings();

  setLanguage(textContent);
});

cancelButton.addEventListener("click", closeSettings);
overlay.addEventListener("click", closeSettings);
document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    closeSettings();
  }
});
