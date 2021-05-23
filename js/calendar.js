const Months = [
   'January',
   'February',
   'March',
   'April',
   'May',
   'June',
   'July',
   'August',
   'September',
   'October',
   'November',
   'December'
];

const Days = [
   'Sunday',
   'Monday',
   'Teusday',
   'Wednesdey',
   'Thursday',
   'Friday',
   'Saturday'
];

const option = {
   weekday: 'long',
   year: 'numeric',
   month: 'long',
   day: 'numeric'
};

let nowYear = new Date().getFullYear();
let nowMonth = new Date().getMonth() + 1;
let selectedMonth;
let selectedDate;
let dates = document.getElementsByClassName('date');

// Render Now Date
document.querySelector('.now-date').innerHTML = `${Days[new Date().getDay()]}, ${new Date().getDate()} ${Months[new Date().getMonth()]} ${new Date().getFullYear()}`;

function RenderCalendar() {
   // Render Date and Month of Heading
   document.querySelector('.heading .month').innerHTML = Months[nowMonth - 1] + ' ' + nowYear;

   document.querySelector('.control .year-control .year').innerHTML = nowYear;

   const dateWrapper = document.querySelector('.date-wrapper');

   dateWrapper.innerHTML = ''

   // Render Previous Date
   let prevDate = new Date(nowYear, nowMonth - 1, 0).getDate();
   let prevDay = new Date(nowYear, nowMonth - 1).getDay();
   for (let i = prevDate - prevDay + 1; i <= prevDate; i++) {
      dateWrapper.innerHTML += `<span class="prev-date">${i}</span>`;
   }

   // Render Actuall Date
   for (let i = 1; i <= new Date(nowYear, nowMonth, 0).getDate(); i++) {
      if (i == new Date().getDate() && nowMonth == new Date().getMonth() + 1 && nowYear == new Date().getFullYear()) {
         dateWrapper.innerHTML += `<span class="today date" key="${nowYear}${nowMonth}${i}">${i}</span>`;
      } else {
         dateWrapper.innerHTML += `<span class="date" key="${nowYear}${nowMonth}${i}">${i}</span>`;
      }
   }

   // Render Next Date
   for (let i = 1; i <= 7 - new Date(nowYear, nowMonth).getDay(); i++) {
      if (7 - new Date(nowYear, nowMonth).getDay() != 7) {
         dateWrapper.innerHTML += `<span class="prev-date">${i}</span>`;
      }
   }

   // Looping Dates for Event Click
   for (let i = 0; i < dates.length; i++) {
      dates[i].addEventListener('click', function () {
         if (typeof selectedDate == 'object') {
            selectedDate.classList.remove('selected');
         }
         selectedDate = this;
         selectedDate.classList.add('selected');

         // Set This Date
         let thisDate = Days[new Date(`${nowMonth} ${this.innerHTML}, ${nowYear}`).getDay()];
         document.querySelector('.now-date').innerHTML = `${thisDate}, ${i+1} ${Months[nowMonth-1]} ${nowYear}`;

         console.log(thisDate, new Date(`${nowMonth} ${i}, ${nowYear}`).getDay());

         // Render Plans
         RenderPlans(this.getAttribute('key'));

      });
   }

   // Give Mark for Selected Month
   if (typeof selectedMonth == 'object') {
      selectedMonth.classList.remove('selected');
   }
   selectedMonth = document.querySelector(`.month-control div:nth-child(${nowMonth})`);
   selectedMonth.classList.add('selected');

   GiveMarkerPlan();
   document.querySelector('.plan-list').innerHTML = '';

}
RenderCalendar();

selectedDate = document.querySelector('.today');

function RenderThisDate() {
   // Set This Date
   let thisDate = Days[new Date(`${nowMonth} ${typeof selectedDate == 'object' ? selectedDate.innerHTML : new Date().getDate()}, ${nowYear}`).getDay()];
   document.querySelector('.now-date').innerHTML = `${thisDate}, ${typeof selectedDate == 'object' ? selectedDate.innerHTML : new Date().getDate()} ${Months[nowMonth-1]} ${nowYear}`;
}

// Render Events
function RenderEvents() {
   const eventList = document.querySelector('.event-list');
   eventList.innerHTML = '';
   let events = dataEvents[nowYear][Months[nowMonth - 1]];
   for (let key in events) {
      let eventItem = document.createElement('div');
      eventItem.classList.add('item');

      eventItem.innerHTML = `
            <div class = "event-date">${key} ${Months[nowMonth-1]} ${nowYear}</div> 
            <div class = "event-name">${events[key]}</div>
         `;
      eventList.appendChild(eventItem);

      // Give Marker for Each Date with Event
      for (let i = 0; i < dates.length; i++) {
         if (dates[i].innerHTML == key) {
            dates[i].classList.add('event');
         }
      }
   }

   if (eventList.children.length == 0) {
      eventList.innerHTML = `
         <div class="nothing">There Is No Events On This Month</div>
      `
   }

}
RenderEvents();

const planHeading = document.querySelector('.plan-heading');
const addPlan = document.querySelector('.add-plan');

function RenderPlans(key) {
   planHeading.style.display = 'block';

   addPlan.style.display = 'block';

   const planList = document.querySelector('.plan-list');
   planList.innerHTML = '';
   if (dataPlans[key] != undefined) {
      for (let index in dataPlans[key]) {
         let planItem = document.createElement('div');
         planItem.classList.add('item');
         planItem.setAttribute('index', index);
         planItem.innerHTML = `
            <span class="event-name">${dataPlans[key][index]}</span>
            <span class="far fa-edit edit"></span>
            <span class="far fa-trash-alt remove"></span>
         `;

         planList.appendChild(planItem);
      }
   } else {
      planList.innerHTML = `
         <div class="nothing">There Is No Plans For This Day</div>
      `
   }
}
RenderPlans(document.querySelector('.today').getAttribute('key'));

function GiveMarkerPlan() {
   for (let key in dataPlans) {
      for (let i = 0; i < dates.length; i++) {
         if (dates[i].getAttribute('key') == key) {
            dates[i].classList.add('plan');
         }
      }
   }
}
GiveMarkerPlan()

const yearLeft = document.querySelector('.year-left');
const yearRight = document.querySelector('.year-right');
let changeYearInterval;
let changeYearTimeout;

yearLeft.addEventListener('mousedown', function () {
   nowYear--;
   RenderCalendar();
   RenderEvents();

   const planHeading = document.querySelector('.plan-heading');
   planHeading.style.display = 'none';

   const addPlan = document.querySelector('.add-plan');
   addPlan.style.display = 'none';

   RenderSelectedDate();

   changeYearTimeout = setTimeout(() => {
      changeYearInterval = setInterval(() => {
         nowYear--;
         RenderCalendar();
         RenderEvents();

         const planHeading = document.querySelector('.plan-heading');
         planHeading.style.display = 'none';

         const addPlan = document.querySelector('.add-plan');
         addPlan.style.display = 'none';

         RenderSelectedDate();
      }, 100);
   }, 500);
});

yearLeft.addEventListener('mouseup', function () {
   clearTimeout(changeYearTimeout);
   clearInterval(changeYearInterval);
})

yearRight.addEventListener('mousedown', function () {
   nowYear++;
   RenderCalendar();
   RenderEvents();

   const planHeading = document.querySelector('.plan-heading');
   planHeading.style.display = 'none';

   const addPlan = document.querySelector('.add-plan');
   addPlan.style.display = 'none';

   RenderSelectedDate();

   changeYearTimeout = setTimeout(() => {
      changeYearInterval = setInterval(() => {
         nowYear++;
         RenderCalendar();
         RenderEvents();

         const planHeading = document.querySelector('.plan-heading');
         planHeading.style.display = 'none';

         const addPlan = document.querySelector('.add-plan');
         addPlan.style.display = 'none';

         RenderSelectedDate();
      }, 100);
   }, 500);
})

yearRight.addEventListener('mouseup', function () {
   clearTimeout(changeYearTimeout);
   clearInterval(changeYearInterval)
})

function changeMonth(monthNum) {
   nowMonth = monthNum;

   RenderCalendar();
   RenderEvents();

   const planHeading = document.querySelector('.plan-heading');
   planHeading.style.display = 'none';

   const addPlan = document.querySelector('.add-plan');
   addPlan.style.display = 'none';

   RenderSelectedDate();

   document.querySelector('.control .month-control').classList.remove('open');
}

function RenderSelectedDate() {
   const keySelectedDate = selectedDate.getAttribute('key');
   const newSelectedDate = document.querySelector(`.date[key="${keySelectedDate}"]`);
   console.log(typeof newSelectedDate, newSelectedDate);
   if (newSelectedDate != null) {
      newSelectedDate.classList.add('selected');
      RenderPlans(keySelectedDate);
      addPlan.style.display = 'block';
      planHeading.style.display = 'block';

      selectedDate = newSelectedDate;
   }
}

// Make New Plan
addPlan.addEventListener('click', function () {
   const planList = document.querySelector('.plan-list');
   if (planList.firstElementChild.classList.contains('nothing') == true) {
      planList.innerHTML = '';
   }

   let planItem = document.createElement('div');
   planItem.classList.add('item');
   planItem.innerHTML = `
      <span class="event-name" contenteditable="true"></span>
   `;

   planList.appendChild(planItem);

   planItem.firstElementChild.focus();

   planItem.firstElementChild.addEventListener('blur', function () {
      if (planItem.firstElementChild.innerHTML != '') {
         StoreNewPlan(planItem.firstElementChild.innerHTML);
      } else {
         planList.removeChild(planList.lastElementChild);
         if (planList.children.length == 0) {
            planList.innerHTML = `
            <div class="nothing">There Is No Plans For This Day</div>
         `
         }
      }
   })
});

function StoreNewPlan(plan) {
   const keyDate = selectedDate.getAttribute('key');
   if (dataPlans[keyDate] == undefined) {
      dataPlans[keyDate] = {};
   }
   let index = new Date().getTime()
   dataPlans[keyDate][index] = plan;

   console.log(dataPlans);

   const planList = document.querySelector('.plan-list');
   planList.innerHTML = '';
   RenderPlans(selectedDate.getAttribute('key'));
   GiveMarkerPlan();

   setDataPlansToLocalStorage();
}


// Edit and Remove Event
const planList = document.getElementsByClassName('plan-list')[0];
planList.addEventListener('click', function (ev) {
   if (ev.target.classList.contains('edit') == true) {
      const eventsName = document.querySelectorAll('.event-name');
      eventsName.forEach(function (event) {
         event.removeAttribute('contenteditable');
      })
      ev.target.previousElementSibling.setAttribute('contenteditable', 'true');
      ev.target.previousElementSibling.focus();
      ev.target.previousElementSibling.addEventListener('blur', function () {
         ev.target.previousElementSibling.removeAttribute('contenteditable');
         EditPlan(ev.target.parentElement.getAttribute('index'), ev.target.previousElementSibling.innerHTML);
      })
   } else if (ev.target.classList.contains('remove') == true) {
      RemovePlan(selectedDate.getAttribute('key'), ev.target.parentElement.getAttribute('index'));
   }
})

function EditPlan(index, plan) {
   const keyDate = selectedDate.getAttribute('key');
   dataPlans[keyDate][index] = plan;

   setDataPlansToLocalStorage();
}

function RemovePlan(keyDate, index) {
   delete dataPlans[keyDate][index];
   if (Object.keys(dataPlans[keyDate]).length == 0) {
      delete dataPlans[keyDate];
      document.querySelector(`.date[key="${keyDate}"]`).classList.remove('plan');
   }
   RenderPlans(selectedDate.getAttribute('key'));

   setDataPlansToLocalStorage();
}

const hamburgerMonth = document.querySelector('.control-hamburger-month');
const hamburgerEvent = document.querySelector('.control-hamburger-event');

hamburgerMonth.addEventListener('click', function () {
   document.querySelector('.control .month-control').classList.toggle('open');
   document.querySelector('.events').classList.remove('open');
})

hamburgerEvent.addEventListener('click', function () {
   document.querySelector('.control .month-control').classList.remove('open');
   document.querySelector('.events').classList.toggle('open');
})