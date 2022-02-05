import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=<enter-key-api-after-register>`

  const searchLocation = (event) => {

    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder='Enter Location'
          onKeyPress={searchLocation}
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.sys ? data.sys.country === 'US' ? <h1>{data.main.temp.toFixed()}°F</h1> : <h1>{data.main ? <h1>{Math.round((data.main.temp - 32) / 1.8000)}°C</h1> : null}</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? data.sys.country === 'US' ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : <p>{data.main ? <p className='bold'>{Math.round((data.main.feels_like - 32) / 1.8000)}°C</p> : null}</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;