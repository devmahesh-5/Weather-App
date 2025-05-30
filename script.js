// const city = document.querySelector("#cityInput").value;
const searchBtn = document.querySelector(".search-btn");
const cityName = document.querySelector("#cityName");
const tempValue = document.querySelector("#tempValue");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");


async function getWeather() {
    const city = document.querySelector("#cityInput").value;
   try{

    const resLocation= await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=872bb1e9a49c3dab9e9f4756a7a89587`);
    const data1=await resLocation.json();
    const latitude=data1[0]['lat'];
    const longitude=data1[0]['lon'];
    // console.log(data1[0]['lat']);
    // console.log(data1[0]['lon']);
    const resWeather= await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=872bb1e9a49c3dab9e9f4756a7a89587&units=metric`);
    const data2=await resWeather.json();
    if (data2['list'][0]['main']['temp']<16) {
        document.querySelector(".temp").style.color="blue";
    }
   tempValue.innerText=data2['list'][0]['main']['temp'];
    humidity.innerText=data2['list'][0]['main']['humidity'];
    windSpeed.innerText=data2['list'][0]['wind']['speed']*3.6;
    cityName.innerText=data1[0]['name'];
    }catch(err){
        cityName.innerText=`${city} not found`;
        console.log(`Error: ${err}`);
    }
 
}
searchBtn.addEventListener("click", getWeather);
