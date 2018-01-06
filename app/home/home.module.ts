import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { Http } from '@angular/http';

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { WeatherComponent } from './weather/weather.component';
import { ForecastComponent } from './forecast/forecast.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        NativeScriptFormsModule,
        TNSFontIconModule.forRoot({
            'fa': './plugins/font-awesome/css/font-awesome.css',
            'wi': './plugins/weather/css/weather-icons.css'
        })
    ],
    declarations: [
        HomeComponent,
        WeatherComponent,
        ForecastComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
