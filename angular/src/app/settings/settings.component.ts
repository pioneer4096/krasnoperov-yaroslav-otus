import {Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ISettings, SettingsStorageService} from "../settings-storage.service";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    settings: ISettings = {
        wordsCount: 10,
        timeLimit: 1
    };

    constructor(private toastr: ToastrService, private settingsStorage: SettingsStorageService) {
        // this.settings = settingsStorage.getLatest();
    }

    ngOnInit(): void {
    }

    applySettings(): void {
        this.toastr.success('Hello world!', 'Toastr fun!');
        console.log('settings to apply = ', this.settings)
        // this.settingsStorage.save(this.settings);
    }

}
