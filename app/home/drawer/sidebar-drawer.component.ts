import { Component, OnInit, Input } from '@angular/core';

import { RadSideDrawer } from 'nativescript-pro-ui/sidedrawer';
import { WeatherService } from '../../services/weather.service';

@Component({
    selector: "SidebarDrawer",
    moduleId: module.id,
    templateUrl: "./sidebar-drawer.component.html",
    styleUrls: ['sidebar-drawer.component.css']
})
export class SidebarDrawerComponent implements OnInit {
    @Input() drawer: RadSideDrawer;
    @Input() locations: string[];

    constructor(private weatherService: WeatherService) {}

    ngOnInit() {}

    onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }

    onLoadLocation(location) {
        this.weatherService.setLocation(encodeURI(location));
        this.drawer.closeDrawer();
    }
}