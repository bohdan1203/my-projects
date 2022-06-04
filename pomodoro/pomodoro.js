class Pomodoro {
  constructor(focusSession, shortBreak, longBreak) {
    this.focusSession = focusSession * 60;
    this.shortBreak = shortBreak * 60;
    this.longBreak = longBreak * 60;

    this.pomodorosCounter = 0;
    this.nextMode = "focus";

    this.timeout;

    this.display = document.getElementById("time");
    this.ding = document.getElementById("ding");
    this.title = document.getElementById("title");
    this.counter = document.getElementById("counter");
    this.display.textContent = this.getTimeString(this.focusSession);

    this.currentTimer;

    this.remaining = this.focusSession;

    this.breakDuration = this.shortBreak;
  }

  getTimeString(time) {
    let min = Math.trunc(time / 60);
    let sec = time % 60;

    min = min < 10 ? "0" + min : "" + min;
    sec = sec < 10 ? "0" + sec : "" + sec;

    return `${min}:${sec}`;
  }

  countOneSecond(time) {
    this.timeout = setInterval(() => {
      this.remaining = --time;
      this.display.textContent = this.getTimeString(time);
      document.title = this.getTimeString(time);

      if (time < 0) {
        this.ding.play();
        this.start();
      }
    }, 1000);
  }

  startFocusSession() {
    document.body.style.background = "tomato";
    this.title.textContent = "Focus";

    this.currentTimer = this.focusSession;
    this.pomodorosCounter++;
    this.currentMode = this.nextMode;
    this.nextMode = this.pomodorosCounter % 4 ? "shortBreak " : "longBreak";

    clearTimeout(this.timeout);
    this.display.textContent = this.getTimeString(this.focusSession);
    this.countOneSecond(this.focusSession);

    this.breakDuration =
      this.pomodorosCounter % 4 ? this.shortBreak : this.longBreak;

    this.remaining = this.focusSession;
  }

  startBreak() {
    document.body.style.background = "green";
    this.title.textContent = "Rest";
    this.counter.textContent = this.pomodorosCounter;

    this.currentTimer =
      this.pomodorosCounter % 4 ? this.shortBreak : this.longBreak;

    this.currentMode = this.nextMode;
    this.nextMode = "focus";

    this.display.textContent = this.getTimeString(this.breakDuration);
    clearTimeout(this.timeout);
    this.countOneSecond(this.breakDuration);

    this.remaining = this.breakDuration;
  }

  start() {
    this.nextMode === "focus" ? this.startFocusSession() : this.startBreak();

    console.log(this.nextMode);
  }

  pause() {
    clearTimeout(this.timeout);
  }

  continue() {
    clearTimeout(this.timeout);
    this.countOneSecond(this.remaining);
  }

  stop() {
    this.title.textContent = "Welcome!";
    document.body.style.background = "tomato";

    clearTimeout(this.timeout);
    this.nextMode = "focus";
    this.pomodorosCounter = 0;
    this.counter.textContent = this.pomodorosCounter;
    this.remaining = this.focusSession;
    this.display.textContent = this.getTimeString(this.focusSession);
  }

  reset() {
    this.nextMode = this.currentMode;

    if (this.currentMode === "focus") {
      this.pomodorosCounter--;
    }

    clearTimeout(this.timeout);
    this.remaining = this.currentTimer;
    this.display.textContent = this.getTimeString(this.currentTimer);

    console.log(this.currentMode, this.pomodorosCounter);
  }
}
