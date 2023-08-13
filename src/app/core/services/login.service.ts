import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignupRequest } from '../models/SignupRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = `${environment.backendUrl}/user`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
  ) {}

  onSignup(request: SignupRequest): Observable<void> {
    const url = this.baseUrl + `/signup`;
    return this.http.post<void>(url, request, this.httpOptions);
  }

}


