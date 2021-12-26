import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let timerTime = null;
let isStart = false;
const TIMER_INRERVAL = 1000;

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    daysLаbel: document.querySelector('.value[data-days]'),
    hoursLаbel: document.querySelector('.value[data-hours]'),
    minutesLаbel: document.querySelector('.value[data-minutes]'),
    secondsLаbel: document.querySelector('.value[data-seconds]'),

}

refs.btnStart.addEventListener('click', onBtnStartClick)

switchDisabledBtn();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        timerTime = selectedDates[0] - options.defaultDate
        
        if (timerTime <= 0) {
            window.alert('Выбранная дата должна быть больше текущей!');
            return;
        }

        isStart = !isStart;
        switchDisabledBtn();      
  },
};

new flatpickr('#datetime-picker', options);

function onBtnStartClick() {
    redrawValues();
    isStart = !isStart;
    switchDisabledBtn();
    setInterval(resetInterval, TIMER_INRERVAL);

}

function resetInterval() {
    timerTime -= TIMER_INRERVAL
    console.log(timerTime);   
    redrawValues();
}

function redrawValues() {
    const convertTime = convertMs(timerTime);
    refs.daysLаbel.textContent = convertTime.days;
    refs.hoursLаbel.textContent = convertTime.hours;
    refs.minutesLаbel.textContent = convertTime.minutes;
    refs.secondsLаbel.textContent = convertTime.seconds;
}

function switchDisabledBtn () {
    refs.btnStart.disabled = !isStart;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}