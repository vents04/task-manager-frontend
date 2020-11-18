import { Injectable } from '@angular/core';
import { WebRequestService } from '../webRequestService/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private webService: WebRequestService) { }

  getAuthToken(){
    return localStorage.getItem('x-auth-token');
  }

  login(email: string, password: string){
    const payload = {
      email: email, 
      password: password
    }
    return this.webService.post('login', payload);
  }

  setSession(authToken: string){
    localStorage.setItem("x-auth-token", authToken);
  }

  removeSession(){
    localStorage.removeItem("x-auth-token");
  }
}
