import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5000';

  constructor( private http: HttpClient ) { }

  userlogin(email: string, password: string): Observable<any> {
    const user = { email, password };
    return this.http.post<any>(`${this.baseUrl}/login`, user, {
      withCredentials: true,
    });
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('usertoken');
  }

  
}
