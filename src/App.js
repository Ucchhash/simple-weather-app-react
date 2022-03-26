import './App.css';
import React, {useState} from 'react';
const api = {
  key : '1c74eef91f7d69e7dfde66d0471e529b',
  baseurl : 'http://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if(evt.key === 'Enter'){
      fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`).then(res => res.json()).then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className = 'searchContainer'>
          <input type='text' className='searchBar' placeholder='Search...' onChange={e => setQuery(e.target.value)} value = {query} onKeyPress = {search} />
        </div>
        {(typeof weather.main != 'undefined') ? (
        <>
          <div className='locationContainer'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
          </div>
          <div className='weatherBox'>
            <div className='temp'>{Math.round(weather.main.temp)}°c</div>
            <div className='realFeel'>Feels Like : <span> {Math.round(weather.main.feels_like)}°c </span></div>
            <div className='weather'>{weather.weather[0].main}</div>
          </div>
        </>
        ) : ('')}
        
      </main>
    </div>

    
  );
}

export default App;
