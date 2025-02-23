import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient;
  constructor(httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend);
  }

  baseUrl = 'http://localhost:3001/api/'

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'auth/login', {username, password}).pipe(tap(response => {
      if (response) {
        this.setSession(response);
      }
    }))
  }

  setSession(res: any) {
    let expiresAt = moment().add(parseInt(res.expiresIn), 'm');
    localStorage.setItem('token', String(res.token));
    localStorage.setItem('expires_at', expiresAt.toISOString());
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {

    return (moment().isBefore(this.getExpiration()) && this.getToken() != null);
  }

  public getExpiration(): moment.Moment {
    let expiration = localStorage.getItem('expires_at');
    let expiresAt = moment().subtract(100, "seconds");
    if (expiration != "" && expiration != null) {
      expiresAt = moment(expiration)
    }
    return expiresAt;
  }

  public getToken() {
    return localStorage.getItem('token');
  }
}
