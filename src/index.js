import './styles.css';

class CoundownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    //
    this.root = document.createElement('div');
    this.root.classList.add('timer');
    this.root.setAttribute('id', 'this.selector');
    document.body.append(this.root);

    // this.root = document.querySelector(this.selector);
    this.template = `<div class="field">
        <span class="value" data-value="days">0</span>
        <span class="label">Days</span>
      </div>

      <div class="field">
        <span class="value" data-value="hours">0</span>
        <span class="label">Hours</span>
      </div>

      <div class="field">
        <span class="value" data-value="mins">0</span>
        <span class="label">Minutes</span>
      </div>

      <div class="field">
        <span class="value" data-value="secs">0</span>
        <span class="label">Seconds</span>
      </div>`;
    this.root.insertAdjacentHTML('beforeend', this.template);

    this.refs = {
      days: this.root.querySelector('span[data-value="days"]'),
      hours: this.root.querySelector('span[data-value="hours"]'),
      mins: this.root.querySelector('span[data-value="mins"]'),
      secs: this.root.querySelector('span[data-value="secs"]'),
    };
  }

  start() {
    const startTime = this.targetDate.getTime();
    setInterval(() => {
      const currentTime = Date.now();
      const timeToEnd = startTime - currentTime;
      this.updateClockFace(timeToEnd);
    }, 1000);
  }

  updateClockFace(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    this.clockValue(days, hours, mins, secs);
  }
  clockValue(days, hours, mins, secs) {
    this.refs.days.textContent = `${days}`;
    this.refs.hours.textContent = `${hours}`;
    this.refs.mins.textContent = `${mins}`;
    this.refs.secs.textContent = `${secs}`;
  }
  pad(value) {
    if (value.lenght > 2) {
      return String(value).padStart(3, '0');
    }

    return String(value).padStart(2, '0');
  }
}

const timer = new CoundownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
});

timer.start();

const timer2 = new CoundownTimer({
  selector: '#timer-2',
  targetDate: new Date('Jul 14, 2021'),
});

timer2.start();
