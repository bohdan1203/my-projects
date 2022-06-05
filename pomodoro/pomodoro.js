class Pomodoro {
  constructor(focusSession, shortBreak, longBreak) {
    this.focusSession = focusSession * 60;
    this.shortBreak = shortBreak * 60;
    this.longBreak = longBreak * 60;

    this.ding = document.getElementById("ding");

    this.pomodorosCounter = 0;
    this.counter = document.getElementById("counter");
    this.counter.textContent = this.pomodorosCounter;
    this.display = document.getElementById("time");
    this.display.textContent = this.getTimeString(this.focusSession);

    this.nextMode = "focus";
    this.timeout;
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

      if (time < 0) {
        this.ding.play();
        this.start();
      }
    }, 1000);
  }
  startFocusSession() {
    clearTimeout(this.timeout);
    document.body.style.background = "tomato";

    this.currentTimer = this.focusSession;
    this.pomodorosCounter++;
    this.currentMode = this.nextMode;
    this.nextMode = this.pomodorosCounter % 4 ? "shortBreak " : "longBreak";

    this.display.textContent = this.getTimeString(this.focusSession);
    this.countOneSecond(this.focusSession);
    this.breakDuration =
      this.pomodorosCounter % 4 ? this.shortBreak : this.longBreak;
    this.remaining = this.focusSession;
  }
  startBreak() {
    clearTimeout(this.timeout);
    document.body.style.background = "green";

    this.counter.textContent = this.pomodorosCounter;
    this.currentTimer =
      this.pomodorosCounter % 4 ? this.shortBreak : this.longBreak;
    this.currentMode = this.nextMode;
    this.nextMode = "focus";
    this.display.textContent = this.getTimeString(this.breakDuration);

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
