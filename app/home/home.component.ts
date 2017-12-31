import { Component, OnInit } from "@angular/core";
import { WeatherService } from '../services/weather.service';
import { Forecast, WeatherModel } from '../model/weather.model';
import * as ApplicationSettings from 'application-settings';
import { TextField } from "ui/text-field";
import { Page } from "ui/page";
import { enableLocationRequest } from "nativescript-geolocation";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['styles.css'],
})
export class HomeComponent implements OnInit {
    constructor(private weatherService: WeatherService, private page: Page) {}

    weather: WeatherModel;
    tomorrow: Forecast;
    day3: Forecast;
    day4: Forecast;
    isActive: boolean = false;

    ngOnInit() {
        enableLocationRequest();

        ApplicationSettings.clear();

        this.weatherService.getState().subscribe(state => {
            this.weather = state.weather;
            this.tomorrow = state.tomorrow;
            this.day3 = state.day3;
            this.day4 = state.day4;
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