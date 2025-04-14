/* import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('JwtInterceptor');

    
    const token = localStorage.getItem('token'); 

    if (token) {
      console.log('Token found:', token);
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}` // add the token to the request header
        }
      });
    }





    return next.handle(request);
  }
} 
*/
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('JwtInterceptor');

    // Don't add the token to login or register requests
    if (request.url.includes('/login') || request.url.includes('/register')) {
      return next.handle(request);
    }

    const token = localStorage.getItem('token'); 

    if (token) {
      console.log('Token found:', token);
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
