const settings = {
  options: {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  },
  requestOptions: {
    method: "GET",
    redirect: "follow",
  },
};

const precise = (x) => {
  return Number.parseFloat(x).toPrecision(4);
};

const updatePopup = (data) => {
  let current = new Date();
  let ImgUrl = "http://openweathermap.org/img/wn";
  document.getElementById("icon").src =
    ImgUrl + `/${data.weather[0].icon}@2x.png`;
  document.getElementById("city-country").textContent =
    data.name + "," + data.sys.country;
  document.getElementById("clouds").textContent =
    data.weather[0].description.toUpperCase();
  document.getElementById("temperature").textContent = precise(
    data.main.temp - 273.15
  );
  document.getElementById("info1").textContent =
    precise(data.main.feels_like - 273.15) + " \xB0C";
  document.getElementById("info2").textContent = data.wind.speed;
  document.getElementById("info3").textContent = data.main.humidity + " %";
  document.getElementById("info4").textContent = data.wind.speed;
  document.getElementById("info5").textContent = data.main.pressure + " hPa";
  document.getElementById("time-date").textContent = current.toLocaleString();
};

const errorPopup = () => {
  document.getElementById("container").remove();
  let errscr = document.createElement("img");
  let page = document.getElementById("popup-body");
  errscr.src = "./Images/error.jpg";
  errscr.style.height = "250px";
  page.prepend(errscr);
};

const changeUnit = () => {
  let unit = document.getElementById("unit");
  let temp = document.getElementById("temperature");
  let feelslike = document.getElementById("info1");
  if (unit.innerText == "°F") {
    temp.textContent = precise(((parseFloat(temp.innerText) - 32) * 5) / 9);
    let value = feelslike.innerText.split(" ");
    feelslike.textContent =
      precise(((parseFloat(value[0]) - 32) * 5) / 9) + "°C";
    unit.innerText = "°C";
  } else {
    temp.textContent = precise((parseFloat(temp.innerText) * 9) / 5 + 32);
    let value = feelslike.innerText.split(" ");
    feelslike.textContent = precise((parseFloat(value[0]) * 9) / 5 + 32) + "°F";
    unit.innerText = "°F";
  }
};

const get_weather = (pos) => {
  let { latitude, longitude } = pos.coords;
  const URL = `https://weather.glennmendonca.repl.co/data?LAT=${latitude}&LON=${longitude}`;
  fetch(URL, settings.requestOptions)
    .then((response) => response.json())
    .then((result) => updatePopup(result))
    .catch((error) => errorPopup());
};

if ("geolocation" in navigator)
  navigator.geolocation.getCurrentPosition(
    get_weather,
    errorPopup,
    settings.options
  );
else errorPopup();

let unit = document.getElementById("unit");
unit.onclick = changeUnit;
