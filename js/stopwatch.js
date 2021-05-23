const ElMinute = document.querySelector('.menu-container.stopwatch .min');
const ElSecond = document.querySelector('.menu-container.stopwatch .sec');
const ElMilsec = document.querySelector('.menu-container.stopwatch .milsec');

const startBtn = document.querySelector('.menu-container.stopwatch .start');
const stopBtn = document.querySelector('.menu-container.stopwatch .stop');
const resetBtn = document.querySelector('.menu-container.stopwatch .reset');
const lapBtn = document.querySelector('.menu-container.stopwatch .lap');

let min = 0,
   sec = 0,
   milsec = 0;

const putaran = document.querySelector('.putaran');
let lapNumber = 1;
let lastLap = 0;
let newLap = 0;
let teLap = 0;
let selisihLap = 0;

document.querySelector('.cover').parentElement.style.opacity = '.4';

startBtn.addEventListener('click', function () {
   startBtn.style.display = 'none';
   lapBtn.style.display = 'flex';
   lapBtn.nextElementSibling.style.display = 'none';
   document.querySelector('.cover').parentElement.style.opacity = '1';

   const stopwatch = setInterval(() => {
      milsec++;
      if (milsec == 100) {
         milsec = 0;
         sec++;
         if (sec == 60) {
            sec = 0;
            min++;
         }
      }

      if (min.toString().length == 2) {
         ElMinute.innerHTML = min;
      } else {
         ElMinute.innerHTML = '0' + min.toString();
      }

      if (sec.toString().length == 2) {
         ElSecond.innerHTML = sec;
      } else {
         ElSecond.innerHTML = '0' + sec.toString();
      }

      if (milsec.toString().length == 2) {
         ElMilsec.innerHTML = milsec;
      } else {
         ElMilsec.innerHTML = '0' + milsec.toString();
      }

      stopBtn.addEventListener('click', function () {
         clearInterval(stopwatch);
         startBtn.style.display = 'flex';
         lapBtn.style.display = 'none';
         lapBtn.nextElementSibling.style.display = 'none';
      });

   }, 10);
});

resetBtn.addEventListener('click', function () {
   min = 0,
      sec = 0,
      milsec = 0;

   ElMinute.innerHTML = '00';
   ElSecond.innerHTML = '00';
   ElMilsec.innerHTML = '00';

   lapBtn.style.display = 'flex';
   lapBtn.nextElementSibling.style.display = 'flex';
   document.querySelector('.cover').parentElement.style.opacity = '.4';

   putaran.innerHTML = ''
   lapNumber = 1;
   lastLap = 0;
   newLap = 0;
   teLap = 0;
   selisihLap = 0;
});

lapBtn.addEventListener('click', function () {
   let newDiv = document.createElement('div');

   lastLap = teLap;
   newLap = (min * 60 * 1000) + (sec * 1000) + (milsec * 10);
   selisihLap = newLap - lastLap;

   let lapMin = Math.floor(selisihLap % (1000 * 60 * 60) / (1000 * 60));
   let lapSec = Math.floor(selisihLap % (1000 * 60) / (1000));
   let lapMilsec = Math.floor((selisihLap % 1000) / 10);

   if (lapMin.toString().length == 1) {
      lapMin = '0' + lapMin.toString();
   }

   if (lapSec.toString().length == 1) {
      lapSec = '0' + lapSec.toString();
   }

   if (lapMilsec.toString().length == 1) {
      lapMilsec = '0' + lapMilsec.toString();
   }

   newDiv.classList.add('item');
   newDiv.innerHTML = `
      <span class="lap-number"> ${lapNumber++}. </span>
      <div class="lap-result">
         <div> ${ElMinute.innerHTML} : ${ElSecond.innerHTML} : ${ElMilsec.innerHTML} </div> 
         <div> + ${lapMin} : ${lapSec} : ${lapMilsec} </div> 
      </div>
   `;

   teLap = newLap;

   putaran.insertAdjacentElement("afterbegin", newDiv);
})