export class WeatherModel {
    constructor(
        public location: string,
        public temperature: number,
        public icon: string,
        public style: Style
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
    clear: boolean;
}