import { Forecast, WeatherModel } from './weather.model';

export interface State {
    weather: WeatherModel;
    tomorrow: Forecast;
    day3: Forecast;
    day4: Forecast;
    isActive: boolean;
}