import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { Http } from '@angular/http';

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        NativeScriptFormsModule,
        TNSFontIconModule.forRoot({
            'wi': './css/weather/weather-icons.css'
        })
    ],
    declarations: [
        HomeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
