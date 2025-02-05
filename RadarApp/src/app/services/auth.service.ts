import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('api/login', {email, password}).pipe(tap(response => {
      if (response && response.token) {
        this.setSession(response.token);
      }
    }))
  }
  setSession(authResult: any) {
    const expiresAt =moment().add(authResult.expiresAt, 'second');
    localStorage.setItem('id_token', String(authResult.idToken));
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
  logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public getExpiration(): moment.Moment {
    // TODO default value for expiration if not present??? --->       ^
    const expiration: string = localStorage.getItem('expires_at') ?? "";
    return moment(JSON.parse(expiration));
  }

  public getToken() {
    return localStorage.getItem('id_token');
  }
}
