const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const continueButton = document.getElementById("continue");

class Pomodoro {
  constructor(interval) {
    this.interval = interval;
    this.remaining = this.interval;
    this.timeout;
    this.display = document.getElementById("time");
    this.ding = document.getElementById("ding");
  }

  getTimeString(time) {
    let min = Math.trunc(time / 60);
    let sec = time % 60;

    min = min < 10 ? "0" + min : "" + min;
    sec = sec < 10 ? "0" + sec : "" + sec;

    return `${min}:${sec}`;
  }

  countOneSecond(time) {
    this.timeout = setTimeout(() => {
      --time;

      this.remaining = time;

      this.display.textContent = this.getTimeString(time);

      if (time > 0) {
        this.countOneSecond(time);
      } else {
        this.ding.play();
      }
    }, 1000);
  }

  start() {
    clearTimeout(this.timeout);
    this.remaining = this.interval;
    this.display.textContent = this.getTimeString(this.interval);
    this.countOneSecond(this.interval);
  }

  pause() {
    clearTimeout(this.timeout);
  }

  continue() {
    clearTimeout(this.timeout);
    console.log(this.remaining);
    this.countOneSecond(this.remaining);
  }

  reset() {
    clearTimeout(this.timeout);
    this.remaining = this.interval;
    this.display.textContent = this.getTimeString(this.interval);
  }
}

const pomodoro = new Pomodoro(3);

startButton.addEventListener("click", () => pomodoro.start());
pauseButton.addEventListener("click", () => pomodoro.pause());
resetButton.addEventListener("click", () => pomodoro.reset());
continueButton.addEventListener("click", () => pomodoro.continue());
