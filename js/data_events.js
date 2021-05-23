let dataEvents = {};

// Set Year For Add To dataEvents Due To Not Error
for (let i = 1; i <= 5000; i++) {
   dataEvents[i] = {};
}

dataEvents[2020] = {
   January: {
      1: 'Tahun Baru Masehi 2020',
      25: 'Tahun Baru Imlek'
   },
   March: {
      22: "Isra Mi'raj Nabi Muhammad SAW",
      25: 'Hari Raya Nyepi 1942'
   },
   April: {
      10: 'Wafat Isa Al Masih'
   },
   May: {
      1: 'Hari Buruh Nasional',
      7: 'Hari Raya Waisak 2564',
      21: 'Kenaikan Isa Al Masih',
      24: 'Hari Raya Idul Fitri 1441 Hijriyah'
   },
   June: {
      1: 'Hari Lahir Pancasila',
   },
   July: {
      31: 'Hari Raya Idul Adha 1441 Hijriyah',
   },
   August: {
      17: 'Hari Kemerdekaan Republik Indonesia Ke-76',
      20: 'Tahun Baru Islam 1442 Hijriyah'
   },
   October: {
      29: 'Maulid Nabi Muhammad SAW 1442 Hijriyah'
   },
   December: {
      25: 'Hari Raya Natal',
      31: 'Malam Tahun Baru'
   }
}

dataEvents[2021] = {
   January: {
      1: 'Tahun Baru Masehi 2021'
   },
   February: {
      12: 'Tahun Baru Imlek 2572'
   },
   March: {
      11: "Isra Mi'raj Nabi Muhammad SAW",
      14: 'Hari Raya Nyepi 1943'
   },
   April: {
      2: 'Wafat Isa Al Masih'
   },
   May: {
      1: 'Hari Buruh Nasional',
      13: 'Kenaikan Isa Al Masih',
      14: 'Hari Raya Idul Fitri 1442 Hijriyah',
      26: 'Hari Raya Waisak 2565',
   },
   June: {
      1: 'Hari Lahir Pancasila',
   },
   July: {
      20: 'Hari Raya Idul Adha 1442 Hijriyah',
   },
   August: {
      10: 'Tahun Baru Islam 1443 Hijriyah',
      17: 'Hari Kemerdekaan Republik Indonesia Ke-77'
   },
   October: {
      19: 'Maulid Nabi Muhammad SAW 1442 Hijriyah'
   },
   December: {
      25: 'Hari Raya Natal',
      31: 'Malam Tahun Baru'
   }
}

let dataPlans;
if (localStorage.getItem('PLAN') == undefined) {
   dataPlans = {}
} else {
   dataPlans = JSON.parse(localStorage.getItem('PLAN'));
}

// Set Data To LocalStorage
function setDataPlansToLocalStorage() {
   localStorage.setItem('PLAN', JSON.stringify(dataPlans));
}