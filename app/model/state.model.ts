import { ForecastItem, WeatherModel } from './weather.model';

export interface State {
    weather: WeatherModel;
    forecast: Forecast;
}

export interface Forecast {
    day1: ForecastItem,
    day2: ForecastItem,
    day3: ForecastItem,
    day4: ForecastItem,
    day5: ForecastItem,
    day6: ForecastItem
}