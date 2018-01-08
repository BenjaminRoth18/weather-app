export class WeatherModel {
    constructor(
        public date: any,
        public location: string,
        public temperature: number,
        public summary: string,
        public sunrise: any,
        public sunset: any,
        public icon: string,
        public style: string,
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