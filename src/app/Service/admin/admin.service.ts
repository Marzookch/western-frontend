import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  
  isLoggedIn(): boolean {
   
    return !!localStorage.getItem('token');
  }

  adminlogin(email: string, password: string): Observable<any> {
    const admin = { email, password };
    console.log(admin);

    return this.http.post<any>(`${this.baseUrl}/admin/admin-login`, admin, {
      withCredentials: true, // Include credentials in the request
    });
  }
  categoryadding(Category: string): Observable<any> {
    const category = { Category };

    return this.http.post<any>(
      `${this.baseUrl}/Category/admin-category-adding`,
      category,
      {
        withCredentials: true, // Include credentials in the request
      }
    );
  }



  getProducts(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/admin-admingetProducts?page=${page}&limit=${limit}`, {
      withCredentials: true // Include credentials if needed
    });
  }

  deleteProductById(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/admin/admin-products-delete/${productId}`, {
      withCredentials: true, // Include credentials if needed (e.g., for cookies)
    });
  }
  
  
  getCategoryList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Category/admin-category-listing`, {
      withCredentials: true // Include credentials if needed
    });
  }

  updateCategoryStatus(categoryId: string, status: boolean): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/Category/admin-update-status/${categoryId}`, { status }, {
      withCredentials: true
    });
  }

  addProduct(productData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/admin/admin-addproduct`, productData, {
        withCredentials: true
    });
}



  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  logout(): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/admin/logout`,
      {},
      {
        withCredentials: true, // Send cookies with request
      }
    );
  }

  // Method to remove token from local storage
  clearToken() {
    localStorage.removeItem('token');
  }
}
