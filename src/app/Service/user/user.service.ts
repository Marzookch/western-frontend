import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5000';

  constructor( private http: HttpClient ) { }



  isLoggedIn(): boolean {
   
    return !!sessionStorage.getItem('authToken');
  }

  signUp(email: string, password: string,name: string, number:string): Observable<any> {
    const user = { email, password, name ,number};
    return this.http.post<any>(`${this.baseUrl}/register`, user, {
      withCredentials: true,
    });
  }

  otpVerify( otp:string): Observable<any> {
    const user = { otp};
    return this.http.post<any>(`${this.baseUrl}/otpverify`, user, {
      withCredentials: true,
    });
  }

  login( email: string, password: string,): Observable<any> {
    const user = { email, password,};
    return this.http.post<any>(`${this.baseUrl}/login`, user, {
      withCredentials: true,
    });
  }

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products`);
  }

  getUserDetails() {
    return this.http.get(`${this.baseUrl}/user`);
  }
  
  updateUserDetails(userData: any): Observable<any> {
    const userId = userData._id; // Assuming you have the user's ID
    return this.http.post<any>(`${this.baseUrl}/add-address/${userId}`, userData, {
      withCredentials: true
    });
  }
}
