import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    public setItem(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public getItem(key: string) {
        const item = localStorage.getItem(key);
        if(item) {
            console.warn(typeof item)
            return JSON.parse(item);
        }
        else {
            return null;
        }
    }

    public removeItem(key:string) {
        localStorage.removeItem(key);
    }

    public clear(){
        localStorage.clear();
    }
}
