import React, { useEffect, useState } from 'react';
import DailyForcast from './dailyforcast'
import 'bootstrap/dist/css/bootstrap.css';
import { Card, CardGroup } from 'react-bootstrap';
import axios from 'axios'
function App() {
  const [weatherNow, setWeatherNow] = useState([])
  const [weatherHourly, setWeatherHourly] = useState([])
  const [geoInfo, setGeoInfo] = useState('')
  const [weatherurl, setWeatherUrl] = useState('')
  const [weatherHourlyurl, setWeatherHourlyUrl] = useState('')
  const apiUrl = 'http://api.openweathermap.org/data/2.5/'
  const token = '34d902902083fd07f0d48c58c89efcb4'
  useEffect(() => {
    function getLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        const url = `${apiUrl}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${token}`
        const hourlyUrl = `${apiUrl}forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&cnt=8&appid=${token}`
        setWeatherUrl(url)
        setWeatherHourlyUrl(hourlyUrl)
      }, error => {
        getGeoInfo()
        if (geoInfo) {
          const url = `${apiUrl}weather?q=${geoInfo}&units=metric&appid=${token}`
          setWeatherUrl(url)
        }
      })
    }

    const fetchWeather = async () => {
      const { data } = await axios.get(weatherurl)
      setWeatherNow(data)
    }
    const fetchWeatherHourly = async () => {
      const { data } = await axios.get(weatherHourlyurl)
      setWeatherHourly(data.list)
    }

    const getGeoInfo = async () => {
      const url = 'https://ipapi.co/json/'
      const { data } = await axios.get(url)
      setGeoInfo(data.city)
    }
    getLocation()
    fetchWeather()
    fetchWeatherHourly()
  }, [weatherHourlyurl, weatherurl, geoInfo])
  return (
    <>
      {/* <input type="text" onChange={e => setCity(e.target.value)} /> */}
      {(typeof weatherNow.main != "undefined") ? (
        <div className="container">

          <Card>
            <Card.Header className="p-1">
              <h3>{weatherNow.name}, {weatherNow.sys.country}</h3>
              <p>{Date().toLocaleString().substring(0, 24)}</p>
            </Card.Header>
            <Card.Body className="p-1">
              <div className="row">
                <div className="col-6">
                  <img src={`http://openweathermap.org/img/wn/${weatherNow.weather[0].icon}@2x.png`} alt="logo" />
                  <h1>{parseInt(weatherNow.main.temp)} <span>&#8451;</span></h1>
                  <p>Feels Like: {parseInt(weatherNow.main.feels_like)} <span>&#8451;</span></p>
                  <h4>{weatherNow.weather[0].main}</h4>
                </div>
                <div className="col-6 my-auto">
                  <div className="row my-4">
                    <div className="col-6">
                      <h6>Min: {parseInt(weatherNow.main.temp_min)} <span>&#8451;</span></h6>
                    </div>
                    <div className="col-6">
                      <h6>Max: {parseInt(weatherNow.main.temp_max)} <span>&#8451;</span></h6>
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className="col-6">
                      <h6>Humidity: {parseInt(weatherNow.main.humidity)} <span>&#37;</span></h6>
                    </div>
                    <div className="col-6">
                      <h6>Pressure: {parseInt(weatherNow.main.pressure)} <span>Pha</span></h6>
                    </div>
                  </div>
                  <div className="row justify-content-center my-4">
                    <h6>
                      Wind Speed: {parseInt(weatherNow.wind.speed)} <span>m/s</span></h6>

                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
          <CardGroup >
            {weatherHourly && <DailyForcast daily={weatherHourly} />}
          </CardGroup>
        </div>
      ) : ('')}
    </>
  );
}

export default App;
