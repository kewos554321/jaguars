import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isNullOrEmpty } from '../utils/common-functions';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { Token } from '../models/token.model';
import { LocalStorageService } from './local-storage.service';
import { GlobalConstants } from '../constants/global-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // public onLogout: EventEmitter<void>;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    // private cacheService: CacheService,
    private localStorageService: LocalStorageService,
    // private sessionStorageService: SessionStorageService,
    // private routeStateService: RouteStateService,
    private tokenService: TokenService,
    private router: Router
  ) {
    // this.onLogout = new EventEmitter<void>();
  }

  login(email: string, password: string): Observable<any> {
    return this.fetchToken(email, password).pipe(tap(response => {
      console.log("login -> fetchToken-result=", JSON.stringify(response));
      if (response && response.token && response.refreshToken) {
        let token: Token = {
          token: response.token,
          refreshToken: response.refreshToken
        };
        this.tokenService.setLocalStorageToken(token);

        this.getUserProfile().pipe(tap(response => {
          console.log('login -> getUserProfile-result=', JSON.stringify(response));
          if (response && response.userProfile) {
            let user: User = {
              uuid: response.userProfile.uuid,
              name: response.userProfile.name,
              email: response.userProfile.email,
              type: response.userProfile.type
            };
            this.userService.setLocalStorageUserProfile(user);
            this.router.navigateByUrl("/");
          }
        })).subscribe();
      }
    }));

    // return this.fetchToken(email, password).pipe(
      // switchMap(jwtTokenResponse => {
      //   if (isNullOrEmpty(jwtTokenResponse)) {
          // console.log("Second login");

          // this.tokenService.setCurrentToken(jwtTokenResponse.token);

          // return this.userService.getProfile().pipe(
          //   switchMap(userProfile => {
          //     console.log("userProfile = " + userProfile.userProfile);
          //     console.log("userProfile.userType = " + userProfile.userProfile.userType);

          //     const user: User = {
          //       id: userProfile.userProfile.uuid,
          //       userName: userProfile.userProfile.userName,
          //       email: userProfile.userProfile.email,
          //       userType: userProfile.userProfile.userType
          //     };

          //     console.log("user.userType = " + user.userType);
          //     this.userService.userInfo = user;

          //     return this.userService.getUserPreferences();
          //   }),
          //   tap(userPreference => {
          //     console.log(userPreference);
          //     this.userService.preference = isNullOrEmpty(userPreference) ? new UserPreference() : userPreference;
          //     this.router.navigateByUrl("/");
          //   })
          // );
    //     } else {
    //       console.log("First login");
    //       this.router.navigateByUrl("/");
    //       return of(null);
    //     }
    //   }),
    //   catchError(e => {
    //     console.error('jwt authentication fail...', e);
    //     throw e;
    //   })
    // );
  }

  logout(): void {
    // this.onLogout.emit();
    this.http.get(`${environment.backendUrl}/api/logout`, { withCredentials: false })
      .subscribe({
        next: () => {
          this.clear();
        }
      });
  }

  clear(): void {
    this.tokenService.removeLocalStorageToken();
    this.userService.removeLocalStorageUserProfile();
    // this.cacheService.clear();
    // this.routeStateService.clear();
    // this.sessionStorageService.clear();
  }

  // async refreshTokenBy(userRefreshToken: UserRefreshToken) {
  //   const jwtResp = await this.getToken(
  //     this.userService.userInfo.email,
  //     'none',
  //     "external",
  //     userRefreshToken.facility,
  //     userRefreshToken.language,
  //     this.userService.userInfo.userType).toPromise()
  //   this.currentToken = jwtResp.token
  // }

  fetchToken(email: string, password: string): Observable<any> {
    return  this.http.post<any>(`${environment.backendUrl}/authenticate`, {
        email: email,
        password: password
      });
  }

  getUserProfile(): Observable<any> {
    let url = `${environment.backendUrl}/authorize`;
    return this.http.get<any>(url);
  }

  test(): void {

    this.http.get(`${environment.backendUrl}/user/sayHellow`, { responseType: 'text' })
    .subscribe({
      next: (result) => {
        console.log("result=", result);
      },
      error: (err) => {
        console.log("do error..., err=", JSON.stringify(err));
      }
    });

  }

  refreshToken(email: string, headers: HttpHeaders): Observable<any> {
    return  this.http.post<any>(`${environment.backendUrl}/refreshToken`, {
      email: email
    }, { headers });
  }

}


