import React, {useState} from 'react'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Unsplash, {toJson} from 'unsplash-js';
import './current-weather.scss'
import {ReactComponent as SearchLogo} from '../../assests/search.svg'
import {getSearch,getSearchState} from '../../redux/search/search.action'


const WEATHER_KEY= process.env.REACT_APP_WEATHER_API_KEY;
const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_API_KEY

const unsplash = new Unsplash({accessKey : `${UNSPLASH_KEY}`})

const CurrentWeather = ({getSearch,getSearchState}) => {
    
    const [search, setSearch] = useState('')
    
    const [image,setImage] = useState('')
    const [details, setDetails] = useState({temp:'',feel:'',para:'',description:'',name:''})
    
    
    const { name,temp,feel,para,description}= details
    



const handleSubmit = async (e) => {
    getSearch(search)
    e.preventDefault()
    
    setSearch('')
    try {const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${WEATHER_KEY}`)
    
     const resJson = await response.json()
    
    
    setDetails({name:resJson.name,
        temp:resJson.main.temp, 
        feel:resJson.main.feels_like,
        para:resJson.weather[0].main,
        description:resJson.weather[0].description})
        
        getSearchState(resJson.name)
}
    catch(error) {
       
       alert('ERROR IN PROCESSING :( ... TRY AGAIN')
       setDetails({name:'',
        temp:'', 
        feel:'',
        para:'',
        description:''})
    }
    

}

const onSearchSubmit = async (e) => {
    e.preventDefault()
    
    unsplash.search.photos('weather',1,30)
    .then(toJson)
    .then(json =>{
        
        setImage(json.results[Math.floor(Math.random() * 30 + 1)]
        
        )}
    )
   
    
}



const funcClick = (e) => {
    
    handleSubmit(e)
    onSearchSubmit(e)
}




    return (
 <div className='current' style={{backgroundImage: `url(${image && name ? image.urls.regular : 'unsplashTwo.jpg'})`}}>
      
      <div className='current__item'>
      <h1 className='current__head'>WEATHER FORECASTER</h1>

            <form className='current__form'>
               <input className='current__input'
               placeholder='search for your favourite state Current Weather'
               type='text'
               value={search}
               onChange={event => setSearch(event.target.value)}
               />
               <button className='current__button' onClick={funcClick}>
                   <SearchLogo className='search__logo'/>
                   <span>search</span>
                   
                   </button>

           </form>
           <div className='current__details'>
                
    <p>CITY : {name}</p>
                <p>MAIN TEMPERATURE : {temp ? `${temp} Degrees Celsius` : ''} </p>
                <p>FEELS LIKE : {feel ? `${feel} Degrees Celsius` : ''} </p>
                <p>WEATHER PARAMETER: {para} </p>
                <p>DESCRIPTION : {description} </p>
      
           </div>
           
           <Link to='/forecast' className='current__link'>GET FORECAST FOR EVERY THREE HOURS FOR NEXT FIVE DAYS</Link>

      </div>
        

 </div>
     
   
        
    )
}


const mapDispatchToProps = dispatch => ({
    getSearch: (item) => dispatch(getSearch(item)),
    getSearchState : (item) => dispatch(getSearchState(item))
})

export default connect(null,mapDispatchToProps)(CurrentWeather)