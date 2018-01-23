import { Component, Input } from '@angular/core';
import { SegmentedBar, SegmentedBarItem } from 'tns-core-modules/ui/segmented-bar';
import { Forecast } from '../../model/state.model';

@Component({
    selector: "Forecast",
    moduleId: module.id,
    templateUrl: "./forecast.component.html",
    styleUrls: ['forecast.component.css']
})
export class ForecastComponent {
    @Input('forecast') forecast: Forecast;

    myItems: Array<SegmentedBarItem>;
    selectedIndex = 0;
    visibility1 = true;
    visibility2 = false;

    constructor() {
        this.myItems = [];
        const forecastHourly = new SegmentedBarItem();
        const forecastWeekly = new SegmentedBarItem();
        forecastHourly.title = 'Hourly';
        forecastWeekly.title = 'Weekly';
        this.myItems.push(forecastHourly, forecastWeekly);
    }

    onSelectedIndexChange(args) {
        const segmentedBar = <SegmentedBar>args.object;
        const selectedIndex = segmentedBar.selectedIndex;

        switch (selectedIndex) {
            case 0:
                this.visibility1 = true;
                this.visibility2 = false;
                break;
            case 1:
                this.visibility1 = false;
                this.visibility2 = true;
                break;
        }
    }
}