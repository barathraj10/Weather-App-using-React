import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const Weather = () => {

    const inputRef=useRef();
    const [weatherData,setWeatherData]=useState(false);
    const [transition,setTrasnsition]=useState(false);

    const allIcons={
        "01d":clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow,

    }

    const search=async(city)=>{
        try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response=await fetch(url);
            const data=await response.json();
            console.log(data);
            const icon=allIcons[data.weather[0].icon];

            setTrasnsition(true);
            setTimeout(() => {
                setWeatherData({
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    temperature: Math.floor(data.main.temp),
                    location: data.name,
                    icon: icon,
                });
                setTransition(false); // End transition effect
            }, 300);
        }
        catch(error){

        }
    }

    useEffect(()=>{
        search("Salem");
    },[])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search'
            onKeyDown={(event)=>{
                if(event.key==="Enter"){
                     search(inputRef.current.value);
                     inputRef.current.value="";
                }
            }}></input>
            <img src={search_icon}
                onClick={()=>{search(inputRef.current.value);
                    inputRef.current.value="";
                }
                }></img>
        </div>
        <div class={`weather-details ${transition?'fade-in':'fade-out'}`}>
            <img src={weatherData.icon} alt="" className='weather-icon'/>
            <p className='temp'>{weatherData.temperature}॰c </p>
            <p className='location'>{weatherData.location}</p>

            <div className="weather-data">
                <div className="col">
                    <img src={humidity} alt="" />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind} alt="" />
                    <div>
                        <p>{weatherData.windSpeed}kmph</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
            </div>
    </div>
  )
}

export default Weather
