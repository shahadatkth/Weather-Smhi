import React from "react";


const RenderCity = (props) => {


    if(typeof props.Weatherplace.length !== "undefined" && props.Weatherplace.length !== ""){
        return props.Weatherplace.map((objectss,ind) =>{
            const validTime = new Date(objectss.validTime);
            var temparature = objectss.parameters.find( temp => temp.name === 't');
            var pressure = objectss.parameters.find( temp => temp.name === 'msl');
            var humidity = objectss.parameters.find( temp => temp.name === 'r');
            var imgNr = objectss.parameters.find( temp => temp.name === 'Wsymb2');

             return(
                 <tr key = {ind}>
                     <td>{validTime.toUTCString()}</td>
                     <td>{temparature.values[0]}&deg;C <img src={`https://www.smhi.se/startpage/images/WPT-icons/weathersymbols/80x60/day/${imgNr.values[0]}.png?v=1545133432571&proxy=wpt-abc`} alt="weather-icon"/></td>
                     <td>{pressure.values[0]}</td>
                     <td>{humidity.values[0]}</td>
                 </tr>
             )

            }
        );
    }else{
        return null;
    }

};

class WeatherList extends React.Component {

    render() {

        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Time</th>
                    <th>Temp<br/>&deg;C</th>
                    <th>Pressure<br/>(hPa)</th>
                    <th>Humidity<br/>(%)</th>
                </tr>
                </thead>
                <tbody>
                <RenderCity Weatherplace={this.props.onWeatherplace}></RenderCity>
                </tbody>
            </table>
        );
    }


}

export default WeatherList;
