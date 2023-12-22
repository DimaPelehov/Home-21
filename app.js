// ================Варіант без поля для вводу міста==========================

// let weatherBlock = document.querySelector(".weather");
// console.log(weatherBlock);

// async function loadWeather(e) {
//   let weatherUrl =
//     "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=5d066958a60d315387d9492393935c19";
//   let response = await fetch(weatherUrl, {
//     method: "GET",
//   });

//   let responseResult = await response.json();

//   if (response.ok) {
//     getWeather(responseResult);
//   } else {
//     weatherBlock.innerHTML = responseResult.message;
//   }
// }

// function getWeather(data) {
//   //   console.log(data);

//   let location = data.name;
//   let temperature = Math.round(data.main.temp);
//   // Math.round- для округлення до цілого числа
//   let pressure = data.main.pressure;
//   let humidity = data.main.humidity;
//   let speed = Math.round(data.wind.speed);
//   let deg = data.wind.deg;
//   let description = data.weather[0].description;
//   let weatherIcon = data.weather[0].icon;

//   const actualInfo = `
//
//     <div class="weather_header">
//         <div class="location"><h1>${location}</h1></div>
//         <div class="weather-icon"><img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${description}"></div>
//   </div>
//   <div class="weather_main">
//     <div class="weather_main-item">
//       <h4>Тиск</h4>
//       <div class="pressure">${pressure}</div>
//     </div>
//     <div class="weather_main-item">
//       <h4>Волога</h4>
//       <div class="humidity">${humidity}</div>
//     </div>
//     <div class="weather_main-item">
//       <h4>Швидкість вітру</h4>
//       <div class="speed">${speed}</div>
//     </div>
//     <div class="weather_main-item">
//       <h4>Напрям вітру</h4>
//       <div class="deg">${deg}</div>
//     </div>
//   </div>
//   <div class="weather_footer">
//         <div class="temperature">
//       <h2>${temperature} <sup>o</sup>C</h2>
//         </div>
//         <div class="weather-description"><h2>${description}</h2></div>
//   </div>`;

//   weatherBlock.innerHTML = actualInfo;
// }

// loadWeather();

// ====================Варіант з формою для вводу міста=======================
let weatherBlock = document.querySelector(".weather");
let form = document.querySelector(".weather-form");
let input = document.querySelector(".weather-inp");

// функція запиту на сервер
async function getWeather(city) {
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`;
  let response = await fetch(weatherUrl);
  let responseResult = await response.json();
  return responseResult;
}

form.onsubmit = async function (e) {
  e.preventDefault();
  //   відмінили відправку форми
  let city = input.value.trim();
  //   trim потрібен для обрізання пробілів і ТАБів

  //   Отримуємо дані з сервера
  let data = await getWeather(city);

  // перевірка на помилку
  if (data.cod === "404") {
    alert("Введено некоректне значення");
  } else {
    let location = data.name;
    let temperature = Math.round(data.main.temp);
    // Math.round- для округлення до цілого числа
    let pressure = data.main.pressure;
    let humidity = data.main.humidity;
    let speed = Math.round(data.wind.speed);
    let deg = data.wind.deg;
    let description = data.weather[0].description;
    let weatherIcon = data.weather[0].icon;

    let actualInfo = `
      
    <div class="weather_header">
      <div class="location"><h1>${location}</h1></div>
      <div class="weather-icon">
        <img
          src="http://openweathermap.org/img/w/${weatherIcon}.png"
          alt="${description}"
        />
      </div>
    </div>
    <div class="weather_main">
      <div class="weather_main-item">
        <h4>Тиск</h4>
        <div class="pressure">${pressure}</div>
      </div>
      <div class="weather_main-item">
        <h4>Волога</h4>
        <div class="humidity">${humidity}</div>
      </div>
      <div class="weather_main-item">
        <h4>Швидкість вітру</h4>
        <div class="speed">${speed}</div>
      </div>
      <div class="weather_main-item">
        <h4>Напрям вітру</h4>
        <div class="deg">${deg}</div>
      </div>
    </div>
    <div class="weather_footer">
      <div class="temperature">
        <h2>${temperature} <sup>o</sup>C</h2>
      </div>
      <div class="weather-description"><h2>${description}</h2></div>
    </div>`;

    weatherBlock.innerHTML = actualInfo;
  }
};
