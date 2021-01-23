// reload page
document.querySelector('.button-primary').onclick = function () {
    window.location.reload(); // перезагружаем страницу
};

let mapCity = new Map();// создание коллекции map

mapCity.set('London', 1006984);
mapCity.set('Paris', 2968496);
mapCity.set('Kyiv', 703448);
mapCity.set('Sidney', 5172078);
mapCity.set('Moscov', 524901);
mapCity.set('SHARM', 349340);
mapCity.set('New York', 5106292);
mapCity.set('Vladivostok', 2013348);
mapCity.set('Bali', 2235029);
mapCity.set('Berlin', 6545310);


console.log('----------------');
console.log(mapCity.size+"размер map");
console.log(mapCity.get('Paris')+"ключ парижа");

let cityId  = mapCity.get('London');

let urlApiWeather ='http://api.openweathermap.org/data/2.5/weather?id='+cityId+'&appid=46709215d3fea6278217820f7c17781a';
console.log(urlApiWeather+"вызывается без смены города");

let selectCity = document.querySelector('select');
selectCity.onchange = function() {
    let indexSelected = selectCity.selectedIndex,
        option = selectCity.querySelectorAll('option')[indexSelected];
    let selectedId = option.getAttribute('id');
    console.log(selectedId+'---selectedId')
    cityId = mapCity.get(selectedId);
    // if (cityId == undefined || null) alert('not city')
    console.log(cityId+"----вызывается во время выбора города");
    console.log(urlApiWeather+"-----смена города");
    urlApiWeather = 'http://api.openweathermap.org/data/2.5/weather?id='+cityId+'&appid=46709215d3fea6278217820f7c17781a';
    console.log(urlApiWeather+"-----смена города");
    getApiWeather(urlApiWeather);  // вызов функции getApiWeather с обновленным url
};

//method fetch get request API weather
function getApiWeather(url) {
fetch(url)
    .then(function (rest) {
        return rest.json()
    })
    .then(function (data) {
        // console.log(data);
        document.querySelector('.package-name').innerHTML = data.name;
        document.querySelector('.wind').innerHTML = data.wind.speed + ' км/ч';
        document.querySelector('.price').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
        document.querySelector('.price').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
        document.querySelector('.features').innerHTML =
            `<img src = "http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
    })
    .catch(function (url) {
    });
}
getApiWeather(urlApiWeather); // вызов функции getApiWeather с обновленным url