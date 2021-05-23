let addedCity;

if (localStorage.getItem("CLOCK") == null) {
   addedCity = {};
} else {
   addedCity = JSON.parse(localStorage.getItem("CLOCK"));
}

function setAddedCityToLocalStorage() {
   localStorage.setItem("CLOCK", JSON.stringify(addedCity));
}

class CitiesObject {
   constructor(place, offset, selisih) {
      this.place = place;
      this.offset = offset;
      this.selisih = selisih;
   }

   showTime(key) {
      const Interval = setInterval(() => {
         const timezone = getTimezone(this.offset)
         if (document.querySelector(`#${key} .time`) == null) {
            clearInterval(Interval);
         } else {
            document.querySelector(`#${key} .time`).innerHTML = timezone.slice(0, -3)
         }
      }, 1000);

      document.querySelector(`#${key} .trash`).addEventListener("click", function () {
         clearInterval(Interval);
         delete addedCity[key];
         renderWorldClock();
         setAddedCityToLocalStorage();
      });
   }
}

const DataTimezone = {
   chicago: new CitiesObject("Chicago, USA", -6, "-06.00"),
   newyork: new CitiesObject("New York, USA", -5, "-05.00"),
   london: new CitiesObject("London, Inggris", 0, "+00.00"),
   manchester: new CitiesObject("Manchester, Inggris", 0, "+00.00"),
   amsterdam: new CitiesObject("Amsterdam, Belanda", 1, "+01.00"),
   paris: new CitiesObject("Paris, Prancis", 1, "+01.00"),
   madrid: new CitiesObject("Madrid, Spanyol", 1, "+01.00"),
   barcelona: new CitiesObject("Barcelona, Spanyol", 1, "+01.00"),
   roma: new CitiesObject("Roma, Italia", 1, "+01.00"),
   berlin: new CitiesObject("Berlin, Jerman", 1, "+01.00"),
   gaza: new CitiesObject("Gaza, Palestina", 2, "+02.00"),
   riyadh: new CitiesObject("Riyadh, Arab Saudi", 3, "+03.00"),
   mekkah: new CitiesObject("Mekkah, Arab Saudi", 3, "+03.00"),
   stpetersburg: new CitiesObject("St. Petersburg, Rusia", 3, "+03.00"),
   dubai: new CitiesObject("Dubai, UEA", 4, "+04.00"),
   abudabhi: new CitiesObject("Abu Dhabi, UEA", 4, "+04.00"),
   moskow: new CitiesObject("Moskow, Rusia", 3, "+03.00"),
   newdelhi: new CitiesObject("New Delhi, India", 5.5, "+05.30"),
   mumbai: new CitiesObject("Mumbai, India", 5.5, "+05.30"),
   yangon: new CitiesObject("Yangon, Myanmar", 6.5, "+06.30"),
   phnompenh: new CitiesObject("Phnom Penh, Kamboja", 7, "+07.00"),
   hanoi: new CitiesObject("Hanoi, Vietnam", 7, "+07.00"),
   jakarta: new CitiesObject("Jakarta, Indonesia", 7, "+07.00"),
   bangkok: new CitiesObject("Bangkok, Thailand", 7, "+07.00"),
   beijing: new CitiesObject("Beijing, Tiongkok", 8, "+08.00"),
   makassar: new CitiesObject("Makassar, Indonesia", 8, "+08.00"),
   kualalumpur: new CitiesObject("Kuala Lumpur, Malaysia", 8, "+08.00"),
   kotabharu: new CitiesObject("Kota Bharu, Malaysia", 8, "+08.00"),
   bandarseribegawan: new CitiesObject(
      "Bandar Seri Begawan, Brunei Darussalam",
      8,
      "+08.00"
   ),
   manila: new CitiesObject("Manila, Filipina", 8, "+08.00"),
   singapura: new CitiesObject("Singapura, Singapura", 8, "+08.00"),
   jayapura: new CitiesObject("Jayapura, Indonesia", 9, "+09.00"),
   dili: new CitiesObject("Dili, Timor Leste", 9, "+09.00"),
   tokyo: new CitiesObject("Tokyo, Jepang", 9, "+09.00"),
   seoul: new CitiesObject("Seoul, Korea Selatan", 9, "+09.00"),
   pyongyang: new CitiesObject("Pyongyang, Korea Utara", 9, "+09.00"),
   queensland: new CitiesObject("Queensland, Australia", 10, "+10.00"),
   sydney: new CitiesObject("Sydney, Australia", 11, "+11.00"),
   melbourne: new CitiesObject("Melbourne, Australia", 11, "+11.00"),
   lasvegas: new CitiesObject("Las Vegas, USA", -8, "-08.00"),
};