import React from 'react'
import './forecast-item.scss'

const ForecastItem = ({item})=> {
const {dt_txt,main,weather} = item




return (
    <div className='forecast-item'>
      <p>DATE/TIME : {dt_txt}</p>  
      <p>TEMPERATURE : {main.temp} Degree Celsius </p>
      <p>FEELS LIKE :  {main.feels_like} Degree Celsius</p>
      <p>WEATHER PARAMETER : {weather[0].main}</p>
      <p>DESCRIPTION : {weather[0].description}</p>
    </div>
)
}


export default ForecastItem