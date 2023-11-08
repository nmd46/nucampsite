console.log("javascript connected");

const carousel = new bootstrap.Carousel("#homeCarousel", {
  interval: 2000,
  pause: false,
});

const carouselButton = document.getElementById("carouselButton");
const faIcon = document.getElementById("faButton");

carouselButton.addEventListener("click", function () {
  if (faIcon.classList.contains("fa-pause")) {
    faIcon.classList.remove("fa-pause");
    faIcon.classList.add("fa-play");
    carousel.pause();
  } else {
    faIcon.classList.remove("fa-play");
    faIcon.classList.add("fa-pause");
    carousel.cycle();
  }
});

async function fetchWeather() {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  let city = "Chicago";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayWeather(data);
  } catch (error) {
    console.error(error);
  }
}

fetchWeather();

function displayWeather(data) {
  const img = document.createElement("img");
  img.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.appendChild(img);

  let temperature = document.querySelector("#weather-temp");
  temperature.textContent = data.main.temp + "\u00b0";

  let description = document.querySelector("#weather-description");
  description.textContent = data.weather[0].main;
}
