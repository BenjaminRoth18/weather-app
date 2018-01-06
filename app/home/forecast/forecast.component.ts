import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "Forecast",
    moduleId: module.id,
    templateUrl: "./forecast.component.html",
    styleUrls: ['forecast.component.css']
})
export class ForecastComponent implements OnInit {
    @Input('forecast') forecast;

    ngOnInit() {
    }
}