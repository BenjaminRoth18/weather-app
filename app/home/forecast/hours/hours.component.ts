import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from '../../../model/state.model';

@Component({
    selector: "Hours",
    moduleId: module.id,
    templateUrl: "./hours.component.html",
    styleUrls: ['hours.component.css']
})
export class HoursComponent implements OnInit {
    @Input('forecast') forecast: Forecast;

    ngOnInit() {

    }
}