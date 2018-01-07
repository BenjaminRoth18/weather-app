import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
    getStyle(response) {
        let style: string;
        switch (response) {
            case 'cloudy':
                style = 'cloudy';
                break;

            case 'clear-day':
                style  = 'clear-day';
                break;

            case 'clear-night':
                style = 'clear-night';
                break;

            case 'rain':
                style = 'rain';
                break;

            case 'partly-cloudy-day':
                style = 'partly-cloudy-day';
                break;

            case 'snow':
                style = 'snow';
                break;

            default:
                style = 'default';
        }
        return style;
    }
}