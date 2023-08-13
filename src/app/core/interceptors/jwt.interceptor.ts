import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, filter, finalize, of, pipe, switchMap, take, tap, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Token } from '../models/token.model';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { isNullOrEmpty } from '../utils/common-functions';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private currentToken: any = null;
  private currentUserEmail: any;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.currentUserEmail = userService.getLocalStorageUserProfile().email;
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.currentToken = this.tokenService.getLocalStorageToken();
    // console.log("intercept: request=", JSON.stringify(request));
    if (request.url.includes('refreshToken')) {
      request = this.change2RefreshToken(request, this.currentToken.refreshToken);
      // console.log('Current token has been changed to refresh token, currentToken=', this.currentToken.token);

    } else if (this.currentToken && this.currentToken.token && !this.isRefreshing) {
      request = this.addToken(request, this.currentToken.token);
      // console.log('token is not null, currentToken=', this.currentToken.token);
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: any, caught: Observable<HttpEvent<any>>) => {
        if (error instanceof HttpErrorResponse && error.status === 401 && request.url.includes('refreshToken')) {
          return this.navigateToLogin();
        }

        if (error instanceof HttpErrorResponse && error.status === 401) {
          console.log("JwtInterceptor: handle401Error..., isRefreshing=", this.isRefreshing);
          return this.handle401Error(request, next);
        }
        throw error;
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.isRefreshing) {
      console.log("Start to take current token to refresh..., currentToken=", JSON.stringify(this.currentToken), ', currentUserEmail=', JSON.stringify(this.currentUserEmail));
      this.isRefreshing = true;
      return this.authService.refreshToken(this.currentUserEmail, request.headers).pipe(
        switchMap((response: any) => {
          if (response && response.token && response.refreshToken) {
            let token: Token = { token: response.token, refreshToken: response.refreshToken };
            this.tokenService.removeLocalStorageToken();
            this.tokenService.setLocalStorageToken(token);
            console.log('Token object has been refreshed, newToken=', JSON.stringify(token));
            request = this.addToken(request, response.token);
            return next.handle(request);
          }
          throw new Error('Failed to refresh token or token not returned.');
        }),
        catchError(error => {
          console.log("Error during token refresh: ", error); // Handle error that might have occurred during the refresh token call
          return this.navigateToLogin();
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    } else {
      console.log("Token is being refresh...");
      // If a token refresh is in progress, wait until it's done and retry the request.
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          request = this.addToken(request, token);
          return next.handle(request);
        })
      );
    }
  }

  private navigateToLogin(): Observable<never> {
    this.router.navigate(['login']);
    return throwError('User needs to authenticate again.');
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private change2RefreshToken(request: HttpRequest<any>, refreshToken: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${refreshToken}`
      }
    });
  }
}
