let waktuTujuan,
   waktuMulai,
   waktuSelisih;

const timerHour = document.querySelector('.menu-container.timer .hour');
const timerMin = document.querySelector('.menu-container.timer .min');
const timerSec = document.querySelector('.menu-container.timer .sec');

function checkTwoDigits(hours, minutes, seconds) {
   // Check Two Digits
   if (hours.toString().length == 2) {
      timerHour.innerHTML = hours;
   } else {
      timerHour.innerHTML = '0' + hours.toString();
   }

   if (minutes.toString().length == 2) {
      timerMin.innerHTML = minutes;
   } else {
      timerMin.innerHTML = '0' + minutes.toString();
   }

   if (seconds.toString().length == 2) {
      timerSec.innerHTML = seconds;
   } else {
      timerSec.innerHTML = '0' + seconds.toString();
   }
}

const termStart = document.querySelector('.control-button .start');
const termContinue = document.querySelector('.control-button .continue');
const termPause = document.querySelector('.control-button .pause');
const termCancel = document.querySelector('.control-button .cancel');
const termCover = document.querySelector('.control-button .cover');
termCover.parentElement.style.opacity = '.5';

let hours,
   minutes,
   seconds,
   milsecs,
   paused = false;

function timer(waktu) {
   waktuTujuan = new Date().getTime() + (waktu);

   const set = setInterval(() => {
      waktuMulai = new Date().getTime();
      waktuSelisih = waktuTujuan - waktuMulai;

      hours = Math.floor(waktuSelisih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      minutes = Math.floor(waktuSelisih % (1000 * 60 * 60) / (1000 * 60));
      seconds = Math.floor(waktuSelisih % (1000 * 60) / (1000));
      milsecs = Math.floor(waktuSelisih % 1000);

      checkTwoDigits(hours, minutes, seconds);

      // Menghentikan Timer jika sudah habis
      if (waktuSelisih <= 0) {
         clearInterval(set);
         document.querySelector('.menu-container.timer .starter').style.display = 'none';
         document.querySelector('.menu-container.timer .setter').style.display = 'grid';
         paused = false;

         termCancel.style.zIndex = '0';
         termStart.style.zIndex = '1';
         termPause.style.zIndex = '1';
         termContinue.style.zIndex = '1';
         termCover.style.zIndex = '3';
         termCover.parentElement.style.opacity = '.5';

         document.querySelector('.activities-disable').style.display = 'none';
      }

      termPause.addEventListener('click', function () {
         clearInterval(set);
         paused = true;

         termPause.style.zIndex = '0';
         termContinue.style.zIndex = '3';
      })

      termCancel.addEventListener('click', function () {
         clearInterval(set);
         document.querySelector('.menu-container.timer .starter').style.display = 'none';
         document.querySelector('.menu-container.timer .setter').style.display = 'grid';
         paused = false;

         termCancel.style.zIndex = '0';
         termStart.style.zIndex = '1';
         termPause.style.zIndex = '1';
         termContinue.style.zIndex = '1';
         termCover.style.zIndex = '3';

         document.querySelector('.activities-disable').style.display = 'none';
      })
   }, 1);
}

termStart.addEventListener('click', function () {
   if (Main.data.hour.current !== 0 || Main.data.minute.current !== 0 || Main.data.second.current !== 0) {
      if (!paused) {
         timer(parseInt(Main.data.hour.current * 60 * 60 * 1000) + parseInt(Main.data.minute.current * 60 * 1000) + parseInt(Main.data.second.current * 1000));
         document.querySelector('.menu-container.timer .starter').style.display = 'grid';
         document.querySelector('.menu-container.timer .setter').style.display = 'none';
      }
      paused = false;

      termStart.style.zIndex = '0';
      termCancel.style.zIndex = '1';
      termCover.style.zIndex = '0';
      termCover.parentElement.style.opacity = '1';

      document.querySelector('.activities-disable').style.display = 'block';
   }
})

termContinue.addEventListener('click', function () {
   if (paused) {
      setTimeout(() => {
         timer(parseInt(hours * 60 * 60 * 1000) + parseInt(minutes * 60 * 1000) + parseInt(seconds * 1000));
      }, milsecs);
   }

   termContinue.style.zIndex = '0';
   termPause.style.zIndex = '3';
})


// Activity Timer Item Action
function activitiyTimerAction() {
   const activityTimers = document.querySelectorAll('.activities .activity-item');
   for (let i = 0; i < activityTimers.length; i++) {
      activityTimers[i].addEventListener('click', function (ev) {
         // Set Date For Timer
         Main.setDate(activityTimers[i].querySelector('.activity-timer').innerHTML);

         // Give Mark For Activity Timer When Click
         for (let j = 0; j < activityTimers.length; j++) {
            if (j == i) {
               activityTimers[j].classList.add('selected-timer')
               activityTimers[j].lastElementChild.style.display = 'grid'
            } else {
               activityTimers[j].classList.remove('selected-timer')
               activityTimers[j].lastElementChild.style.display = 'none'
            }
         }
      })
   }
}

activitiyTimerAction();


// Add New Activity Timer
const activitiesWrapper = document.querySelector('.activities');
const addButton = document.querySelector('.activities .add-button');
const addCancel = document.querySelector('.add-activity .add-cancel');
const addConfirm = document.querySelector('.add-activity .add-confirm');
const inputActivityName = document.querySelector('.add-activity .input-activity-name');

inputActivityName.addEventListener('focus', function () {
   activitiesWrapper.parentElement.style.zIndex = '200';
})

inputActivityName.addEventListener('blur', function () {
   activitiesWrapper.parentElement.style.zIndex = '0';
})

activitiesWrapper.addEventListener('click', function (ev) {
   if (ev.target.classList.contains('delete') == true) {
      deleteActivityTimer(ev.target.parentElement.id);
   }
})

addButton.addEventListener('click', function () {
   document.querySelector('.add-activity').style.transform = 'translateY(0)';
})

addCancel.addEventListener('click', function () {
   document.querySelector('.add-activity').style.transform = 'translateY(110%)';
   setTimeout(() => {
      inputActivityName.value = '';
      AddActivity.setDate('00:00:00');
   }, 300);
})

addConfirm.addEventListener('click', function () {
   document.querySelector('.add-activity').style.transform = 'translateY(110%)';
   AddNewActivity(inputActivityName.value, AddActivity.getDate().toTimeString());
   activitiyTimerAction();
   setTimeout(() => {
      inputActivityName.value = '';
      AddActivity.setDate('00:00:00');
   }, 300);
})

function AddNewActivity(name, timer) {
   let activityTimer = timer.slice(0, 8);
   let activityId = new Date().getTime();
   const newActivity = document.createElement('div');
   newActivity.classList.add('activity-item');
   newActivity.id = activityId;
   newActivity.innerHTML = `
      <div class="activity-name">${name}</div>
      <div class="activity-timer">${activityTimer}</div>
      <span class="fas fa-minus delete"></span>
   `
   activitiesWrapper.insertBefore(newActivity, addButton);

   activitiesData[activityId] = {
      name: name,
      timer: activityTimer
   }

   setTimerToLocalStorage();
}


// Local Storage Actions
let activitiesData;

function setTimerToLocalStorage() {
   localStorage.setItem('TIMER', JSON.stringify(activitiesData))
}

if (JSON.parse(localStorage.getItem('TIMER')) == null) {
   activitiesData = {};
} else {
   activitiesData = JSON.parse(localStorage.getItem('TIMER'));
}


function renderTimer() {
   for (let key in activitiesData) {
      const newActivity = document.createElement('div');
      newActivity.classList.add('activity-item');
      newActivity.id = key;
      newActivity.innerHTML = `
         <div class="activity-name">${activitiesData[key].name}</div>
         <div class="activity-timer">${activitiesData[key].timer}</div>
         <span class="fas fa-minus delete"></span>
      `
      activitiesWrapper.insertBefore(newActivity, addButton);
   }
   activitiyTimerAction();
}

renderTimer();

function deleteActivityTimer(id) {
   delete activitiesData[id];
   activitiesWrapper.removeChild(document.getElementById(id))
   setTimerToLocalStorage();
}