import { WeatherModel, ForecastDay, ForecastHour } from '../shared/model/weather.model';
import { State } from '../shared/model/state.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as ApplicationSettings from 'application-settings'
import { getCurrentLocation } from 'nativescript-geolocation';
import { CreatorService } from './creator.service';
import { Injectable } from '@angular/core';

const http = require("http");

const DARKSKY_API_KEY = '6b77036350146f797b1fbbf2a0d78ee5';
const GOOGLEMAPS_API_KEY = 'AIzaSyC-j3mgUwYIcy3vKp1RDDpKcdG-Z9z88SU';

@Injectable()
export class WeatherService {
    forecastURL: string = 'https://api.darksky.net/forecast/';
    googleGeocodeURL: string = 'https://maps.googleapis.com/maps/api/geocode/json?latlng';
    latitude: number;
    longitude: number;
    location: string;
    locationHistory: Array<any> = [];

    stateSubject: BehaviorSubject<State>;

    state: State = {
        loader: true,
        weather: new WeatherModel(new Date(), '', 20, 'It`s sunny!', 1509967519, 1510003982, 'clear-day', 'cloudy', false),
        forecast: {
            hours: {
                hour1: new ForecastHour(new Date(), 4, 'clear-day'),
                hour2: new ForecastHour(new Date(), 4, 'clear-day'),
                hour3: new ForecastHour(new Date(), 4, 'clear-day'),
                hour4: new ForecastHour(new Date(), 4, 'clear-day'),
                hour5: new ForecastHour(new Date(), 4, 'clear-day'),
                hour6: new ForecastHour(new Date(), 4, 'clear-day')
            },
            days: {
                day1: new ForecastDay(new Date(), 40 , 4, 'clear-day'),
                day2: new ForecastDay(new Date(), 40 , 4, 'clear-day'),
                day3: new ForecastDay(new Date(), 40 , 4, 'clear-day'),
                day4: new ForecastDay(new Date(), 40 , 4, 'clear-day'),
                day5: new ForecastDay(new Date(), 40 , 4, 'clear-day'),
                day6: new ForecastDay(new Date(), 40 , 4, 'clear-day')
            }
        },
        locations: []
    };

    constructor(private creatorService: CreatorService) {}

    loader(status) {
        if(status === true) {
            this.state = Object.assign({}, this.state, {
                loader: true
            });
            this.stateSubject.next(this.state);
        } else {
            this.state = Object.assign({}, this.state, {
                loader: false
            });
            this.stateSubject.next(this.state);
        }
    }

    getWeatherData() {
        const queryURL = 'https://api.darksky.net/forecast/' + DARKSKY_API_KEY + '/' + this.latitude + ',' + this.longitude + '?units=si';

        if (ApplicationSettings.hasKey('data')) {
            this.stateSubject.next(JSON.parse(ApplicationSettings.getString('data')));
        } else {
            http.getJSON(queryURL) // https://api.myjson.com/bins/1da7w3
                .then((response) => {
                    this.state = this.creatorService.createWeather(this.location, response, this.state);
                    this.stateSubject.next(this.state);
                    ApplicationSettings.setString('data', JSON.stringify(this.state));
                    this.loader(false);
                });
        }

        setInterval(() => {
            ApplicationSettings.clear();
        }, 1800000 )
    }

    getLocation()  {
        ApplicationSettings.clear();
        http.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ this.latitude + ',' + this.longitude + '&key='+ GOOGLEMAPS_API_KEY)
            .then((data) => {
                this.location = data.results[0].address_components[3].long_name;
            });
    }

    getCurrentLocation() {
        this.loader(true);
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

    setLocation(location) {
        this.loader(true);
        ApplicationSettings.clear();
        http.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key='+ GOOGLEMAPS_API_KEY)
            .then((data) => {
                this.latitude = data.results[0].geometry.location.lat;
                this.longitude = data.results[0].geometry.location.lng;
                this.getLocation();
                this.getWeatherData();
            });
    }

    addLocations(location) {
        if (!this.state.locations.includes(location)) {
            this.locationHistory.push(location);
        }

        if (this.locationHistory.length > 10) {
            this.locationHistory.shift();
        }

        this.state = Object.assign({}, this.state, {
            locations: this.locationHistory
        });

        this.stateSubject.next(this.state);
    }

    getState(): BehaviorSubject<State> {
        if (!this.stateSubject) {
            this.stateSubject = new BehaviorSubject(this.state);
        }
        return this.stateSubject;
    }
}