import { Injectable } from '@angular/core';
import { isJSON, isNullOrEmpty } from '../utils/common-functions';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key: string): any {
    let value = localStorage.getItem(key);
    if (isNullOrEmpty(value)) {
      return null;
    } else {
      return isJSON(value as string) ? JSON.parse(value as string) : value;
    }
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
