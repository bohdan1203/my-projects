class Pomodoro {
  constructor(focusSession, shortBreak, longBreak, cycles) {
    this.focusSession = focusSession;
    this.shortBreak = shortBreak;
    this.longBreak = longBreak;
    this.cycles = cycles;

    this.currentBreakType = this.shortBreak;
    this.remaining = this.focusSession;
    this.timeout;
    this.display = document.getElementById("time");
    this.ding = document.getElementById("ding");
    this.title = document.getElementById("title");
    this.currentMode = "focus";
    this.pomodorosCouter = 0;
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
        if (this.cycles) {
          this.currentMode === "rest"
            ? this.startBreak()
            : this.startFocusSession();
        } else {
          this.title.textContent = "Well Done!";
          document.body.style.background = "green";
        }
      }
    }, 1000);
  }

  startFocusSession() {
    console.log("Cycles remaining: ", this.cycles - 1);
    this.title.textContent = "Focus";
    document.body.style.background = "tomato";
    clearTimeout(this.timeout);
    this.remaining = this.focusSession;
    this.display.textContent = this.getTimeString(this.focusSession);
    this.countOneSecond(this.focusSession);
    this.cycles--;
    this.currentMode = "rest";
    this.pomodorosCouter++;
    this.currentBreakType =
      this.pomodorosCouter % 4 ? this.shortBreak : this.longBreak;
  }

  startBreak() {
    this.title.textContent = "Rest";
    document.body.style.background = "green";
    clearTimeout(this.timeout);
    this.remaining = this.currentBreakType;
    this.display.textContent = this.getTimeString(this.currentBreakType);
    this.countOneSecond(this.currentBreakType);
    this.currentMode = "focus";
  }

  pause() {
    clearTimeout(this.timeout);
  }

  continue() {
    clearTimeout(this.timeout);
    console.log(this.remaining);
    this.countOneSecond(this.remaining);
  }

  stopReset() {
    clearTimeout(this.timeout);
    this.remaining = this.focusSession;
    this.display.textContent = this.getTimeString(this.focusSession);
  }
}
