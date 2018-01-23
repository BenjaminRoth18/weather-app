import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms'
import { Http } from '@angular/http';
import { HomeRoutingModule } from './home-routing.module';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { SidebarDrawerComponent } from './drawer/sidebar-drawer.component';
import { HomeComponent } from './home.component';
import { WeatherComponent } from './weather/weather.component';
import { ForecastComponent } from './forecast/forecast.component';
import { DaysComponent } from './forecast/days/days.component';
import { HoursComponent } from './forecast/hours/hours.component';
import { NativeScriptUISideDrawerModule } from 'nativescript-pro-ui/sidedrawer/angular';
import { WeatherService } from '../services/weather.service';
import { SettingsService } from '../services/settings.service';
import { CreatorService } from '../services/creator.service';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUISideDrawerModule,
        HomeRoutingModule,
        NativeScriptFormsModule,
        TNSFontIconModule.forRoot({
            'fa': './plugins/font-awesome/css/font-awesome.css',
            'wi': './plugins/weather/css/weather-icons.css'
        })
    ],
    declarations: [
        SidebarDrawerComponent,
        HomeComponent,
        WeatherComponent,
        ForecastComponent,
        DaysComponent,
        HoursComponent
    ],
    providers: [
        WeatherService,
        SettingsService,
        CreatorService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
