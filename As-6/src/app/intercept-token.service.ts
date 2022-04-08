import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptTokenService implements HttpInterceptor {

  constructor(private a: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes("spotify.com")) {
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${this.a.getToken()}`
        }
      });
      }
    
    return next.handle(request);
  }
}
