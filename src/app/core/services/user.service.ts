import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { GlobalConstants } from '../constants/global-constants';
import { isNullOrEmpty } from '../utils/common-functions';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: BehaviorSubject<User>;
  private baseUrl: string = `${environment.backendUrl}/user`;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
  ) {
    this.user = new BehaviorSubject<User>(this.getLocalStorageUserProfile());
  }

  getLocalStorageUserProfile(): User {
    let profile = this.localStorageService.getItem(GlobalConstants.currentUser);
    return isNullOrEmpty(profile) ? new User() : profile;
  }

  setLocalStorageUserProfile(value: User) {
    this.localStorageService.setItem(GlobalConstants.currentUser, value);
    this.user.next(value);
  }

  // getServerProfile(): User {
  //   let profile = this.localStorageService.getItem(GlobalConstants.currentUser);
  //   return isNullOrEmpty(profile) ? new User() : profile;
  // }

  removeLocalStorageUserProfile() {
    this.localStorageService.removeItem(GlobalConstants.currentUser);
  }
}
