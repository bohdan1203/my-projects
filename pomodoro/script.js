let focusSession = 25;
let shortBreak = 5;
let longBreak = 15;
let pomodoro = new Pomodoro(focusSession, shortBreak, longBreak);

const buttons = document.querySelectorAll(".button");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const stopButton = document.getElementById("stop");
const continueButton = document.getElementById("continue");
const resetButton = document.getElementById("reset");

const settingsButton = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const overlay = document.getElementById("overlay");
const focusInput = document.getElementById("focus");
const shortBreakInput = document.getElementById("short-break");
const longBreakInput = document.getElementById("long-break");

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
});

settingsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  pomodoro.stop();
  displayRemoveButtons(
    [startButton],
    [stopButton, pauseButton, continueButton, resetButton]
  );

  focusSession = +focusInput.value;
  shortBreak = +shortBreakInput.value;
  longBreak = +longBreakInput.value;

  overlay.style.opacity = "0%";
  overlay.style.zIndex = "-1";
  settingsForm.style.zIndex = "-1";
  settingsForm.style.opacity = "0%";

  pomodoro = new Pomodoro(focusSession, shortBreak, longBreak);
});
