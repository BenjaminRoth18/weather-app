import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { WeatherModel, ForecastDay, ForecastHour } from '../shared/model/weather.model';
import moment = require('moment-timezone');

@Injectable()
export class CreatorService {
    location: string;

    constructor(private settingsService: SettingsService) {}

    createWeather(location, response, state) {
        const weather = Object.assign({}, state, {
            weather: new WeatherModel(
                moment().format('dddd'),
                location,
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
        return weather;
    }
}