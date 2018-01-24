import { ForecastDay, ForecastHour, WeatherModel } from './weather.model';

export interface State {
    loader: any;
    weather: WeatherModel;
    forecast: Forecast;
    locations: Array<string>;
}

export interface Forecast {
    hours: ForecastHours,
    days: ForecastDays
}

export interface ForecastHours {
    hour1: ForecastHour,
    hour2: ForecastHour,
    hour3: ForecastHour,
    hour4: ForecastHour,
    hour5: ForecastHour,
    hour6: ForecastHour
}

export interface ForecastDays {
    day1: ForecastDay,
    day2: ForecastDay,
    day3: ForecastDay,
    day4: ForecastDay,
    day5: ForecastDay,
    day6: ForecastDay
}