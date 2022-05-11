import {Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ISettings, SettingsStorageService} from "../settings-storage.service";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    settings: ISettings;

    constructor(private toastr: ToastrService, private settingsStorage: SettingsStorageService) {
    }

    ngOnInit(): void {
        this.settings = this.settingsStorage.load();
    }

    applySettings(): void {
        try {
            this.settingsStorage.save(this.settings);
            this.toastr.success('Настройки применены', 'ОК');
        }
        catch (e) {
            this.toastr.error(e.message || 'no-message-set', 'ОШИБКА');
        }

    }

}
