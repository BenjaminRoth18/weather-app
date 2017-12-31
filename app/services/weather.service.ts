import { Forecast, WeatherModel } from '../model/weather.model';
import { State } from '../model/state.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as ApplicationSettings from 'application-settings'
import { getCurrentLocation } from 'nativescript-geolocation';
import { LoadingIndicator } from 'nativescript-loading-indicator';
import { LoaderOptions } from '../shared/loader';

const loader = new LoadingIndicator();
const http = require("http");

const DARKSKY_API_KEY = '6b77036350146f797b1fbbf2a0d78ee5';
const GOOGLEMAPS_API_KEY = 'AIzaSyC-j3mgUwYIcy3vKp1RDDpKcdG-Z9z88SU'

export class WeatherService {
    forecastURL: string = 'https://api.darksky.net/forecast/';
    googleGeocodeURL: string = 'https://maps.googleapis.com/maps/api/geocode/json?latlng';
    latitude: number;
    longitude: number;
    location: string;

    stateSubject: BehaviorSubject<State>;

    state: State = {
        weather: new WeatherModel('Search location', 20, 'clear-day'),
        tomorrow: new Forecast(new Date(), 40 , 4, 'clear-day'),
        day3: new Forecast(new Date(), 40, 6, 'clear-day'),
        day4: new Forecast(new Date(), 40, 8, 'clear-day'),
        isActive: false
    };

    getWeatherData() {
        const queryURL = 'https://api.darksky.net/forecast/' + DARKSKY_API_KEY + '/' + this.latitude + ',' + this.longitude + '?units=si';

        if (ApplicationSettings.hasKey('data')) {
            this.stateSubject.next(JSON.parse(ApplicationSettings.getString('data')));
        } else {
            http.getJSON('https://api.myjson.com/bins/kc6rv') // https://api.myjson.com/bins/kc6rv
                .then((response) => {
                    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                    const dateTomorrow = new Date(response.daily.data[0].time * 1000);
                    const dateTomorrowDay = weekdays[dateTomorrow.getDay()];
                    const dateDay2 = new Date(response.daily.data[1].time * 1000);
                    const dateDay2Day = weekdays[dateDay2.getDay()];
                    const dateDay3 = new Date(response.daily.data[2].time * 1000);
                    const dateDay3Day = weekdays[dateDay3.getDay()];

                    this.state = Object.assign({}, this.state, {
                        weather: new WeatherModel(
                            this.location,
                            Math.floor(response.currently.temperature),
                            response.currently.icon),
                        tomorrow:
                            new Forecast(
                                dateTomorrowDay,
                                Math.floor(response.daily.data[0].temperatureHigh),
                                Math.floor(response.daily.data[0].temperatureLow),
                                response.daily.data[0].icon),
                        day3:
                            new Forecast(
                                dateDay2Day,
                                Math.floor(response.daily.data[1].temperatureHigh),
                                Math.floor(response.daily.data[1].temperatureLow),
                                response.daily.data[1].icon),
                        day4:
                            new Forecast(
                                dateDay3Day,
                                Math.floor(response.daily.data[2].temperatureHigh),
                                Math.floor(response.daily.data[2].temperatureLow),
                                response.daily.data[2].icon),
                        isActive: true
                    });

                    this.stateSubject.next(this.state);
                    ApplicationSettings.setString('data', JSON.stringify(this.state));
                    console.log(JSON.stringify(this.state));
                    loader.hide();
                });
        }

        setInterval(() => {
            ApplicationSettings.clear();
        }, 1800000 )
    }

    getLocation()  {
        ApplicationSettings.clear();
        console.log('Get location started!');
        console.log('Latitude:' + this.latitude + ' Longitude: ' + this.longitude);

        http.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ this.latitude + ',' + this.longitude + '&key='+ GOOGLEMAPS_API_KEY)
            .then((data) => {
                console.log(JSON.stringify(data.results[0].formatted_address));
                this.location = data.results[0].formatted_address;
            });
    }

    getCurrentLocation() {
        loader.show(LoaderOptions);
        getCurrentLocation({ desiredAccuracy: 3 })
            .then((location) => {
                if (location) {
                    ApplicationSettings.clear();
                    this.latitude = location.latitude;
                    this.longitude = location.longitude;
                    this.getLocation();
                    this.getWeatherData();
                }
            }, (error) => {
                console.log(error.message);
            });
    }

    resetLocation() {
        console.log('Delete!');
        ApplicationSettings.clear();
        this.state = Object.assign({}, this.state, { isActive: false });
        this.stateSubject.next(this.state);
        console.log(JSON.stringify(this.state));
    }

    setLocation(location) {
        ApplicationSettings.clear();
        loader.show(LoaderOptions);
        http.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key='+ GOOGLEMAPS_API_KEY)
            .then((data) => {
                this.latitude = data.results[0].geometry.location.lat;
                this.longitude = data.results[0].geometry.location.lng;
                this.getLocation();
                this.getWeatherData();
            });
    }

    getState(): BehaviorSubject<State> {
        if (!this.stateSubject) {
            this.stateSubject = new BehaviorSubject(this.state);
        }
        return this.stateSubject;
    }
}