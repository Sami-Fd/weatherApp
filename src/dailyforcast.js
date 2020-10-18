import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Card } from 'react-bootstrap';


export default function dailyforcast(props) {
    const forcast5Day = props.daily && props.daily.map((threehour) =>
        <div className="col-sm-3 col-md-auto p-0" key={threehour.dt}>
            <Card>
                <Card.Header className="px-3 py-2">
                    <p>{threehour.dt_txt.substring(10, 16)}</p>
                </Card.Header>
                <Card.Body className="px-3 py-0">
                    <div className="m-auto">
                        <img src={`http://openweathermap.org/img/wn/${threehour.weather[0].icon}@2x.png`} alt="logo" />
                        <h2>{parseInt(threehour.main.temp)} <span>&#8451;</span></h2>
                        <p>Feels Like: {parseInt(threehour.main.feels_like)} <span>&#8451;</span></p>
                        <h4>{threehour.weather[0].main}</h4>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
    return (
        <>
            {forcast5Day}
        </>
    )
}
