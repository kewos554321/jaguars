import { Injectable } from '@angular/core';
import { GlobalConstants } from '../constants/global-constants';
import { LocalStorageService } from './local-storage.service';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  // get isAuthenticated(): boolean {
  //   return !isNullOrEmpty(this.currentToken);
  // }

  // get currentUserInfo(): User {
  //   return this.userService.userInfo;
  // }

  getLocalStorageToken(): Token {
    return this.localStorageService.getItem(GlobalConstants.currentToken);
  }

  setLocalStorageToken(token: Token) {
    this.localStorageService.setItem(GlobalConstants.currentToken, token);
  }

  removeLocalStorageToken() {
    this.localStorageService.removeItem(GlobalConstants.currentToken);
  }
}
