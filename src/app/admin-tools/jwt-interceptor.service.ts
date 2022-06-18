import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccauntService } from '../services/accaunt.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private accaunt: AccauntService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.accaunt.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }

    return next.handle(req);
  }
}
