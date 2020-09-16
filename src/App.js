import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import CurrentWeather from './components/current-weather/current-weather'
import CurrentState from './components/current-state/current-state'
import ForeCast from './components/forcast/forcast'



function App() {
  return (
    <div className='App'>
      <Switch>

      <Route exact path='/' component={CurrentWeather}/>
      <Route exact path='/forecast' component={ForeCast}/>
      < Route path={`/:collectionId`} component={CurrentState}  />
  
      </Switch> 
              

    </div>
    
  );
}

export default App;
