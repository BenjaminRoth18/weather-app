import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from '../../../model/state.model';

@Component({
    selector: "Days",
    moduleId: module.id,
    templateUrl: "./days.component.html",
    styleUrls: ['days.component.css']
})
export class DaysComponent implements OnInit {
    @Input('forecast') forecast: Forecast;

    ngOnInit() {
    }
}