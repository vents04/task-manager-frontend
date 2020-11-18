import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthServiceService } from './services/authService/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor  implements HttpInterceptor { 

  constructor(private router: Router, private authService: AuthServiceService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<any> {
    if(request.url.indexOf("/signup") < 0 && request.url.indexOf("/login") < 0){  
      request = this.addAuthHeader(request);
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.status == 401){
            this.router.navigate(['/login']);
          }
          return throwError(error);
        })
      )
    }else{
      return next.handle(request);
    }
  }

  addAuthHeader(request: HttpRequest<any>){
    const token = this.authService.getAuthToken();
    if(token){
      return request.clone({
        setHeaders: {
          'x-auth-token': token
        }
      })
    }
    return request;
  }
}
