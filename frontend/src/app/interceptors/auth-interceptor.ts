import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JWTokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    console.log("intercepting request");
    const token = this.authService.getToken();
    console.log("token" + token)
    if (token) {
      console.log("token in frontend before sending" + token)
      const clonedReq = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`},
      })
      return next.handle(clonedReq)
    }
    throw Error();
  }
}
