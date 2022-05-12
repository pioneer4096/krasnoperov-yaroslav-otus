import { CommonModule } from '@angular/common'
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule }   from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RecentlyAddedComponent} from './recently-added/recently-added.component';
import {GoComponent} from './go/go.component';
import {SettingsComponent} from './settings/settings.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GameStatComponent } from './game-stat/game-stat.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        RecentlyAddedComponent,
        GoComponent,
        SettingsComponent,
        GameStatComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        CommonModule
    ],
    providers: [HttpClientModule, HttpClient],
    bootstrap: [AppComponent]
})
export class AppModule {
}
