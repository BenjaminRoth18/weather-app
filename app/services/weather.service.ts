import { WeatherModel, ForecastDay, ForecastHour } from '../model/weather.model';
import { State } from '../model/state.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as ApplicationSettings from 'application-settings'
import { getCurrentLocation } from 'nativescript-geolocation';
import moment = require('moment-timezone');
import { SettingsService } from './settings.service';
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

    constructor(private settingsService: SettingsService) {}

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
                    this.state = Object.assign({}, this.state, {
                        weather: new WeatherModel(
                            moment().format('dddd'),
                            this.location,
                            Math.floor(response.currently.temperature),
                            response.currently.summary,
                            moment.unix(response.daily.data[0].sunriseTime).tz(response.timezone).format('HH:mm'),
                            moment.unix(response.daily.data[0].sunsetTime).tz(response.timezone).format('HH:mm'),
                            response.currently.icon,
                            this.settingsService.getStyle(response.currently.icon),
                            true),
                        forecast: {
                            hours: {
                                hour1: new ForecastHour(
                                    moment.unix(response.hourly.data[0].time).tz(response.timezone).format('HH:mm'),
                                    Math.floor(response.hourly.data[0].temperature),
                                    response.hourly.data[0].icon),
                                hour2: new ForecastHour(
                                    moment.unix(response.hourly.data[1].time).tz(response.timezone).format('HH:mm'),
                                    Math.floor(response.hourly.data[1].temperature),
                                    response.hourly.data[1].icon),
                                hour3: new ForecastHour(
                                    moment.unix(response.hourly.data[2].time).tz(response.timezone).format('HH:mm'),
                                    Math.floor(response.hourly.data[2].temperature),
                                    response.hourly.data[2].icon),
                                hour4: new ForecastHour(
                                    moment.unix(response.hourly.data[3].time).tz(response.timezone).format('HH:mm'),
                                    Math.floor(response.hourly.data[3].temperature),
                                    response.hourly.data[3].icon),
                                hour5: new ForecastHour(
                                    moment.unix(response.hourly.data[4].time).tz(response.timezone).format('HH:mm'),
                                    Math.floor(response.hourly.data[4].temperature),
                                    response.hourly.data[5].icon),
                                hour6: new ForecastHour(
                                    moment.unix(response.hourly.data[5].time).tz(response.timezone).format('HH:mm'),
                                    Math.floor(response.hourly.data[5].temperature),
                                    response.hourly.data[5].icon),
                                },

                            days: {
                                day1: new ForecastDay(
                                    moment.unix(response.daily.data[0].time).tz(response.timezone).hours(24).format('dddd'),
                                    Math.floor(response.daily.data[0].temperatureHigh),
                                    Math.floor(response.daily.data[0].temperatureLow),
                                    response.daily.data[0].icon),
                                day2: new ForecastDay(
                                    moment.unix(response.daily.data[0].time).tz(response.timezone).hours(48).format('dddd'),
                                    Math.floor(response.daily.data[1].temperatureHigh),
                                    Math.floor(response.daily.data[1].temperatureLow),
                                    response.daily.data[1].icon),
                                day3: new ForecastDay(
                                    moment.unix(response.daily.data[0].time).tz(response.timezone).hours(72).format('dddd'),
                                    Math.floor(response.daily.data[2].temperatureHigh),
                                    Math.floor(response.daily.data[2].temperatureLow),
                                    response.daily.data[2].icon),
                                day4: new ForecastDay(
                                    moment.unix(response.daily.data[0].time).tz(response.timezone).hours(96).format('dddd'),
                                    Math.floor(response.daily.data[3].temperatureHigh),
                                    Math.floor(response.daily.data[3].temperatureLow),
                                    response.daily.data[3].icon),
                                day5: new ForecastDay(
                                    moment.unix(response.daily.data[0].time).tz(response.timezone).hours(120).format('dddd'),
                                    Math.floor(response.daily.data[4].temperatureHigh),
                                    Math.floor(response.daily.data[4].temperatureLow),
                                    response.daily.data[5].icon),
                                day6: new ForecastDay(
                                    moment.unix(response.daily.data[0].time).tz(response.timezone).hours(144).format('dddd'),
                                    Math.floor(response.daily.data[5].temperatureHigh),
                                    Math.floor(response.daily.data[5].temperatureLow),
                                    response.daily.data[1].icon),
                            }
                        }
                    });

                    this.stateSubject.next(this.state);
                    // ApplicationSettings.setString('data', JSON.stringify(this.state));
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
            locations: this.locationHistory.reverse()
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