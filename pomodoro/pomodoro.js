// https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Pomodoro-Clock.md

const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");

class Pomodoro {
  constructor(interval) {
    this.interval = interval;
    this.remaining = this.interval;
    this.timeout;
    this.display = document.getElementById("ele");
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
        console.log("time is out");
      }
    }, 1000);
  }

  start() {
    clearTimeout(this.timeout);
    this.display.textContent = this.getTimeString(this.interval);
    this.countOneSecond(this.interval);
  }

  pause() {
    clearTimeout(this.timeout);
    console.log(this.remaining);
  }
}

const pomodoro = new Pomodoro(1500);

startButton.addEventListener("click", () => pomodoro.start());
pauseButton.addEventListener("click", () => pomodoro.pause());