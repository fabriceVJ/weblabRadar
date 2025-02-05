import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    const token = this.authService.getToken();

    if (token) {
      const clonedReq = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`},
      })
      return next.handle(clonedReq)
    }
    return next.handle(req);


  }
}
