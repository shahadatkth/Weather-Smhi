import React, {Component} from 'react';
import SearchBar from './SearchBar';
import './App.css';
import WeatherList from "./WeatherList";



class App extends Component {
    state = {
        place: {}
    };

    getWeatherData(latlng) {
        const URL = 'https://opendata-download-metanalys.smhi.se/api/category/mesan1g/version/2/geotype/point';
        let fetching = false;

        if (fetching) return Promise.reject('Request in progress');
        fetching = true;
        return fetch(URL + `/lon/${latlng.lng.toFixed(3)}/lat/${latlng.lat.toFixed(3)}/data.json`)
            .then(dataWrappedByPromise => dataWrappedByPromise.json())
            .then((data) => {
                fetching = false;
                return (data);
            })

            .catch(err => {
                console.log("error catch search:", err.message);
                fetching = false;
                return Promise.reject(err); // If you want to handle the error in a chained .catch()
            })

    }

    getFormattedAddress(place) {



        let location_obj = {};

        location_obj['name'] = place.name;
        if(typeof place.geometry !== "undefined" && place.geometry !== ""){
            location_obj['lat'] = place.geometry.location.lat();
            location_obj['lng'] = place.geometry.location.lng();
            return location_obj;
        }else return;

    }

    showPlaceDetails(place) {


        let latlng = this.getFormattedAddress(place);
        if(typeof latlng !== "undefined" && typeof latlng !== "undefined") {
            this.getWeatherData(latlng).then(data => {
                console.log(data);
                this.setState({place: data.timeSeries,
                    error_message: ""});
            });
        } else this.setState({error_message: "Please insert city of Sweden"});


    }

    render() {
        return (
            <div className="container">
                <SearchBar onPlaceChanged={this.showPlaceDetails.bind(this)}/>
                <div className="error_message"><label className="wrong">{this.state.error_message}</label></div>
                <WeatherList onWeatherplace={this.state.place}/>

            </div>
        );
    }
}

export default App;