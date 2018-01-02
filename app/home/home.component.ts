import { Component, OnInit } from "@angular/core";
import { WeatherService } from '../services/weather.service';
import { ForecastItem, WeatherModel } from '../model/weather.model';
import * as ApplicationSettings from 'application-settings';
import { TextField } from "ui/text-field";
import { Page } from "ui/page";
import { enableLocationRequest } from "nativescript-geolocation";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(private weatherService: WeatherService, private page: Page) {}

    weather: WeatherModel;
    forecast: {
        day1: ForecastItem,
        day2: ForecastItem,
        day3: ForecastItem,
        day4: ForecastItem,
        day5: ForecastItem,
        day6: ForecastItem,
    };
    isActive: boolean = false;

    ngOnInit() {
        enableLocationRequest().then(() => {
            console.log('its enabled!');
            this.weatherService.getCurrentLocation();
        });

        ApplicationSettings.clear();

        this.weatherService.getState().subscribe(state => {
            this.weather = state.weather;
            this.forecast = state.forecast;
            this.isActive = state.isActive;
        });
    }

    onSetCurrentLocation() {
        this.weatherService.getCurrentLocation();
    }

    onAddLocation() {
        const location = this.page.getViewById<TextField>("addLocation");
        this.weatherService.setLocation(encodeURI(location.text));
    }

    onReset() {
        this.weatherService.resetLocation();
    }
}