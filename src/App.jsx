import { useState } from 'react';
import './index.css';

const api={
  key:'2160d27279339c8e07121917cf7f8408',
  base:'https://api.openweathermap.org/data/2.5/'
}
const sunny='../assets/sunImage.png'
const cloudy='../assets/cloudyImage.png'

function App() {

  const CurrentDate=(date)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    let dates = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    return `${day} ${dates} ${month} ${year}`

  }

  const [location, setlocation] = useState('baghdad');
  const [Weather, setWeather] = useState({});
  const search=(event)=>{
    if(event.key==="Enter"){
      fetch(`${api.base}weather?q=${location}&appid=${api.key}&units=metric`)
      .then(res=>res.json())
      .then(result=>{setWeather(result)
                    setlocation('')
                    console.log(result);});
    }
    
  }
  return (
  <div className="App">
    <main>
      <div className="search">
        <input type="text" 
        className='search-field'
        placeholder='Search'
        onChange={(e)=>setlocation(e.target.value)}
        value={location}
        onKeyDown={search}
        />
      </div>
      {(typeof Weather.main != "undefined") ? (
           <div>
      <div className="location-container">
        <div className="location">{Weather.name}, {Weather.sys.country}</div>
        <div className="date">{CurrentDate(new Date())}</div>
      </div>
      <div className="weather-container">
   
        <img src={(Weather.main.temp > 16) ? sunny : cloudy}  alt="" height={100} width={100} />
        <div className="temp"> {Math.round(Weather.main.temp)}°c</div>
     
        <div className="weather">{Weather.weather[0].description}</div>
      </div>
      </div>
    ) : ('')}
    </main>
    </div>
  );
}

export default App;
