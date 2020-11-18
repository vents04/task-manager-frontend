import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
  }

  login(email: string, password: string){
    this.authService.login(email, password).pipe(
      catchError((err: any) => {
        return Observable.throw(err);
      })
    ).subscribe((res: any) => {
      this.authService.setSession(res.headers.get('x-auth-token'));
      console.log("logged in!");
    })
  }
}
