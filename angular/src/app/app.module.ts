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
import { DictionaryComponent } from './dictionary/dictionary.component';
import { CdTimerModule } from 'angular-cd-timer';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
    declarations: [
        AppComponent,
        RecentlyAddedComponent,
        GoComponent,
        SettingsComponent,
        GameStatComponent,
        DictionaryComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CdTimerModule,
        ToastrModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
