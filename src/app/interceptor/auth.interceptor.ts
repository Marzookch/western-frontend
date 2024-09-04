import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from session storage
    const authToken = sessionStorage.getItem('authToken');

    // Clone the request and add the authorization header
    const authReq = authToken ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    }) : req;

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(authReq);
  }
}
