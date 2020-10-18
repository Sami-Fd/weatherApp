import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function getweather() {
    const [weatherData, setWeatherData] = useState([])
    useEffect(() => {
        const fetchWeather = async () => {
            const url = 'http://api.openweathermap.org/data/2.5/weather?q=metz&appid=34d902902083fd07f0d48c58c89efcb4'
            const { data } = await axios.get(url)

            setWeatherData(data)
            console.log(data)

        }

    }, [weatherData])
    return (
        <div>

        </div>
    )
}
