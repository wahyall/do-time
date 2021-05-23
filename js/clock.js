function mainClock() {
   const mainHour = document.querySelector('.hour span');
   const mainMin = document.querySelector('.min span');
   const mainSec = document.querySelector('.sec span');

   const time = new Date().toLocaleTimeString().split('.');

   let hourDeg = time[0] * 30 + time[1] / 60 * 30;
   let minDeg = time[1] * 6 + time[2] / 60 * 6;
   let secDeg = time[2] * 6;


   mainHour.style.transform = `rotate(${hourDeg}deg)`;
   mainMin.style.transform = `rotate(${minDeg}deg)`;
   mainSec.style.transform = `rotate(${secDeg}deg)`;
}
mainClock();

// Set Main Clock Number
function mainClockNumber() {
   const hourNum = document.querySelector('.hour-num');
   const minNum = document.querySelector('.min-num');
   const secNum = document.querySelector('.sec-num');

   hourNum.innerHTML = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
   minNum.innerHTML = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
   secNum.innerHTML = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();

   setInterval(() => {
      const hourNum = document.querySelector('.hour-num');
      const minNum = document.querySelector('.min-num');
      const secNum = document.querySelector('.sec-num');

      hourNum.innerHTML = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
      minNum.innerHTML = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
      secNum.innerHTML = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();

   }, 500);
}
mainClockNumber();

// Make clock animation each World Clock
function worldClock(id, offset) {
   const worldHour = document.querySelector(`#${id} .clock .hour span`);
   const worldMin = document.querySelector(`#${id} .clock .min span`);
   const worldSec = document.querySelector(`#${id} .clock .sec span`);

   const time = getTimezone(offset).split('.');

   let hourDeg = time[0] * 30 + time[1] / 60 * 30;
   let minDeg = time[1] * 6 + time[2] / 60 * 6;
   let secDeg = time[2] * 6;

   worldHour.style.transform = `rotate(${hourDeg}deg)`;
   worldMin.style.transform = `rotate(${minDeg}deg)`;
   worldSec.style.transform = `rotate(${secDeg}deg)`;
}

// Get Countries Timezone
function getTimezone(offset) {
   // Mengambil Waktu UTC Sebagai Patokan Untuk Mengetahui Waktu Di Daerah Lain
   let utcYear = new Date().getUTCFullYear();
   let utcMonth = new Date().getUTCMonth();
   let utcDate = new Date().getUTCDate();
   let utcHour = new Date().getUTCHours();
   let utcMinute = new Date().getUTCMinutes();
   let utcSecond = new Date().getUTCSeconds();
   let utcMilisecond = new Date().getUTCMilliseconds();

   // Offset Adalah Selisih Jam Antara UTC dan Daerah Yang Ingin Dituju
   let utc = new Date(`${utcMonth + 1} ${utcDate}, ${utcYear} ${utcHour}:${utcMinute}:${utcSecond}:${utcMilisecond}`);
   let utcTime = utc.getTime();
   return new Date(utcTime + (3600000 * offset)).toLocaleTimeString()
}


const cityWrapper = document.querySelector('.city-wrapper');

function renderWorldClock() {
   cityWrapper.innerHTML = '';
   for (let key in addedCity) {
      const city = document.createElement('div');
      const cityName = DataTimezone[key].place.split(', ');
      city.id = key;
      city.classList.add('city');
      city.innerHTML = `
      <div class="clock">
         <div class="hour">
            <div>
               <span></span>
            </div>
         </div>
         <div class="min">
            <div>
               <span></span>
            </div>
         </div>
         <div class="sec">
            <div>
               <span></span>
            </div>
         </div>
      </div>
      <div class="place">
         <div class="name">${cityName[0]}</div>
         <div class="utc-offset">UTC ${DataTimezone[key].selisih}</div>
      </div>
      <div class="time"></div>
      <div class="trash fas fa-minus" style="text-align: center;"></div>
   `;
      cityWrapper.appendChild(city);

      worldClock(key, DataTimezone[key].offset);

      let timezone = getTimezone(DataTimezone[key].offset);
      document.querySelector(`#${key} .time`).innerHTML = timezone.slice(0, -3);
      DataTimezone[key].showTime(key);
   }

   if (cityWrapper.children.length == 0) {
      cityWrapper.innerHTML = `
         <div class="nothing">
            <div>There Is No World Clocks</div>
            <div>Add To See Clocks Around The World</div>
         </div>
      `
   }
}
renderWorldClock();

const citiesListWrapper = document.querySelector('.city-list .list');

function renderCityList() {
   for (let key in DataTimezone) {
      const item = document.createElement('div');
      item.classList.add('item');
      item.classList.add('sort');
      item.id = key;
      item.setAttribute('data-sort', 'name');
      item.innerHTML = `
         <div class="name">${DataTimezone[key].place}</div>
         <div class="utc-offset">UTC ${DataTimezone[key].selisih}</div>
      `;
      citiesListWrapper.appendChild(item);
   }
}
renderCityList();

const addCityButton = document.querySelector('.add-city');
const cityList = document.querySelector('.city-list');
const cancelSearch = document.querySelector('.search-form .cancel');
addCityButton.addEventListener('click', function () {
   cityList.style.transform = 'translateY(0)';
});
cancelSearch.addEventListener('click', function () {
   cityList.style.transform = 'translateY(100%)';
})

const cities = document.querySelectorAll('.city-list .list .item')
cities.forEach(function (city) {
   city.addEventListener('click', function () {
      addedCity[city.id] = new Date().getTime();
      renderWorldClock();
      cityList.style.transform = 'translateY(100%)';
      setAddedCityToLocalStorage()
   })
})