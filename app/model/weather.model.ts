export class WeatherModel {
    constructor(
        public location: string,
        public temperature: number,
        public icon: string
    ) {}
}

export class Forecast {
    constructor(
        public day: any,
        public temperatureHigh: number,
        public temperatureLow: number,
        public icon: string
    ) {}
}