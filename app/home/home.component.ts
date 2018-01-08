import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { WeatherService } from '../services/weather.service';
import { ForecastItem, WeatherModel } from '../model/weather.model';
import * as ApplicationSettings from 'application-settings';
import { enableLocationRequest } from "nativescript-geolocation";
import { LoadingIndicator } from 'nativescript-loading-indicator';
import { LoaderOptions } from '../shared/loader';

const loader = new LoadingIndicator();

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
        day6: ForecastItem
    };

    ngOnInit() {
        enableLocationRequest().then(() => {
            this.weatherService.getCurrentLocation();
        });

        ApplicationSettings.clear();

        this.weatherService.getState().subscribe(state => {
            this.weather = state.weather;
            this.forecast = state.forecast;

            if(state.loader === true) {
                loader.show(LoaderOptions);
            } else {
                loader.hide();
            }
        });
    }

    onSetCurrentLocation() {
        this.weatherService.getCurrentLocation();
    }

    onAddLocation() {
        const location = this.page.getViewById<TextField>("addLocation");
        this.weatherService.setLocation(encodeURI(location.text));
    }

    onRefresh() {
        this.weatherService.setLocation(encodeURI(this.weather.location));
    }
}