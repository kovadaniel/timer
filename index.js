const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
let lastInterval = null;

const createTimerAnimator = () => {
  return (seconds) => {
    let secs = seconds;
    const updateTime = () => {
      const time = parseTime(secs);
      timerEl.innerHTML = padTime(time.hours) + ":" + padTime(time.mins) + ":" + padTime(time.secs);
      secs++;
    }
    if(lastInterval){
      clearInterval(lastInterval);
    }
    lastInterval = setInterval(updateTime, 1000);
    updateTime();
  };
};

const animateTimer = createTimerAnimator();

// initially input contents ''
let previousValue = '';

inputEl.addEventListener('input', e => {
  // Очистите input так, чтобы в значении
  // оставались только числа

  // make new value only if some numbers were added. If no numbers were added, set it previous value
  const parsed = e.target.value.match(/\d+/g).join('');
  const val = parsed;

  e.target.value = val;

  if(val !== previousValue) previousValue = val;
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});


// get time in {hours:<hours>, minutes:<minutes>, seconds:<seconds>} from given seconds
function parseTime(sec){
  const hours = Math.floor(sec / 3600);
  const minsAndSecs = sec % 3600;
  const mins = Math.floor(minsAndSecs / 60);
  const secs = minsAndSecs % 60;

  return {hours, mins, secs};
}

function padTime(num){
  return num.toString().padStart(2, "0");
}