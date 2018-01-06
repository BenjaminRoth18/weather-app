export class WeatherModel {
    constructor(
        public date: any,
        public location: string,
        public temperature: number,
        public sunrise: any,
        public sunset: any,
        public icon: string,
        public style: Style,
        public active: boolean
    ) {}
}

export class ForecastItem {
    constructor(
        public day: any,
        public temperatureHigh: number,
        public temperatureLow: number,
        public icon: string
    ) {}
}

export interface Style {
    color: string
}