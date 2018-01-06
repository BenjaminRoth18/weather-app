import { Component, Input, OnInit } from "@angular/core";
import { WeatherModel } from '../../model/weather.model';

@Component({
    selector: "Weather",
    moduleId: module.id,
    templateUrl: "./weather.component.html",
    styleUrls: ['weather.component.css']
})
export class WeatherComponent implements OnInit {
    @Input() weather: WeatherModel;

    ngOnInit() {

    }
}