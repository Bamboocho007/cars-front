import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  setObj(key: string, value: any) {
    const stringifiedValue = JSON.stringify(value);
    window.localStorage.setItem(key, stringifiedValue);
  }

  getObj(key: string): any {
    const value = window.localStorage.getItem(key);
    if (value === null) return null;
    return JSON.parse(value);
  }
}
