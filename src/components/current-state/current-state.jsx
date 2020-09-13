import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Unsplash, {toJson} from 'unsplash-js';
import '../current-weather/current-weather.scss'

import {getSearch,getSearchState} from '../../redux/search/search.action'


const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const KEYSPLASH = process.env.REACT_APP_UNSPLASH_API_KEY

const unsplash = new Unsplash({accessKey : `${KEYSPLASH}`})


class CurrentState extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
        img:'',
        temp: '',
        feel: '',
        para: '',
        description:'',
        name:''
      }
     };
      
     getWeather = async () => {
        this.props.getSearch(this.props.match.params.collectionId)
       
        try {const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.props.match.params.collectionId}&appid=${API_KEY}`)
        
        const resJson = await response.json()
        
        
        this.setState({name:resJson.name,
            temp:resJson.main.temp, 
            feel:resJson.main.feels_like,
            para:resJson.weather[0].main,
            description:resJson.weather[0].description}, () => getSearchState(resJson.name))
            
    }
        catch(error) {
           
           alert('ERROR IN PROCESSING :( ... TRY AGAIN')
        }
        
    
    }
 
    getImage = async () => {
       
        
        unsplash.search.photos('weather',1,30)
        .then(toJson)
        .then(json =>{
            
            this.setState({image:json.results[Math.floor(Math.random() * 30 + 1)]}
            
            )}
        )
       
        
    }
   componentWillMount() {
    this.getWeather()
    this.getImage()
      
   }
   
  
 render() {

    return (
        <div className='current' style={{backgroundImage: `url(${this.state.image ? this.state.image.urls.regular : 'unsplashTwo.jpg'})`}}>
             
             <div className='current__item'>
             <h1 className='current__head'>WEATHER FORECASTER</h1>
       
                   
                  <div className='current__details'>
                       
           <p>CITY : {this.state.name}</p>
                       <p>MAIN TEMPERATURE : {this.state.temp ? `${this.state.temp} Degrees Celsius` : ''} </p>
                       <p>FEELS LIKE : {this.state.feel ? `${this.state.feel} Degrees Celsius` : ''} </p>
                       <p>WEATHER PARAMETER: {this.state.para} </p>
                       <p>DESCRIPTION : {this.state.description} </p>
                     
       
                      
                  </div>
                  
                  <Link to='/forecast' className='current__link'>GET FORECAST FOR EVERY THREE HOURS FOR NEXT FIVE DAYS</Link>
       
             </div>
               
       
        </div>
            
          
               
           )

 }

}




// const CurrentState = ({getSearch,getSearchState,match}) => {
    

//     const [search, setSearch] = useState('')
    
//     const [image,setImage] = useState('')
//     const [details, setDetails] = useState({temp:'',feel:'',para:'',description:'',name:''})
    
    
//     const { name,temp,feel,para,description}= details
    



// const handleSubmit = async (e) => {
//     getSearch(match.params.collectionId)
//     e.preventDefault()
    
//     setSearch('')
//     try {const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${match.params.collectionId}&appid=${API_KEY}`)
    
//     const resJson = await response.json()
    
    
//     setDetails({name:resJson.name,
//         temp:resJson.main.temp, 
//         feel:resJson.main.feels_like,
//         para:resJson.weather[0].main,
//         description:resJson.weather[0].description})
//         getSearchState(resJson.name)
// }
//     catch(error) {
       
//        alert(error)
//     }
    

// }

// const onSearchSubmit = async (e) => {
//     e.preventDefault()
    
//     unsplash.search.photos('weather',1,30)
//     .then(toJson)
//     .then(json =>{
        
//         setImage(json.results[Math.floor(Math.random() * 30 + 1)]
        
//         )}
//     )
   
    
// }



// const funClick = (e) => {
    
//     handleSubmit(e)
//     onSearchSubmit(e)
// }



//     return (
//  <div className='current' style={{backgroundImage: `url(${image ? image.urls.regular : 'unsplashTwo.jpg'})`}}>
      
//       <div className='current__item'>
//       <h1 className='current__head'>WEATHER FORECASTER</h1>

//             <form className='current__form'>
//                <input className='current__input'
//                placeholder='search for your favourite state Current Weather'
//                type='text'
//                value={search}
//                onChange={event => setSearch(event.target.value)}
//                />
//                <button className='current__button' onClick={funClick}>
//                    <SearchLogo className='search__logo'/>
//                    <span>search</span>
                   
//                    </button>

//            </form>
//            <div className='current__details'>
                
//     <p>CITY : {name}</p>
//                 <p>MAIN TEMPERATURE : {temp ? `${temp} Degrees Celsius` : ''} </p>
//                 <p>FEELS LIKE : {feel ? `${feel} Degrees Celsius` : ''} </p>
//                 <p>WEATHER PARAMETER: {para} </p>
//                 <p>DESCRIPTION : {description} </p>
              

               
//            </div>
           
//            <Link to='/forecast' className='current__link'>GET FORECAST FOR EVERY THREE HOURS FOR NEXT FIVE DAYS</Link>

//       </div>
        

//  </div>
     
   
        
//     )
// }


const mapDispatchToProps = dispatch => ({
    getSearch: (item) => dispatch(getSearch(item)),
    getSearchState : (item) => dispatch(getSearchState(item))
})

export default connect(null,mapDispatchToProps)(CurrentState)