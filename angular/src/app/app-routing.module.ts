import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecentlyAddedComponent} from "./recently-added/recently-added.component";
import {GoComponent} from "./go/go.component";
import {SettingsComponent} from "./settings/settings.component";
import {DictionaryComponent} from "./dictionary/dictionary.component";

const routes: Routes = [
    { path: '', component: RecentlyAddedComponent },
    { path: 'dictionary', component: DictionaryComponent },
    { path: 'go', component: GoComponent },
    { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
