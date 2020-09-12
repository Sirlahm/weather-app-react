import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import CurrentWeather from './components/current-weather/current-weather'
import ForeCast from './components/forcast/forcast'
// const dotenv = require('dotenv').config()


function App() {
  return (
    <div className='App'>
      <Switch>

      <Route exact path='/' component={CurrentWeather}/>
      <Route exact path='/forecast' component={ForeCast}/>
      </Switch>
  

    </div>
    
  );
}

export default App;
