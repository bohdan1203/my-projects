const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const stopButton = document.getElementById("stop");
const continueButton = document.getElementById("continue");
const resetButton = document.getElementById("reset");
const buttons = document.querySelectorAll(".button");

const pomodoro = new Pomodoro(10, 3, 5);

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
