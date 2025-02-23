import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JWTokenInterceptor} from './auth-interceptor';

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: JWTokenInterceptor, multi: true}
]
