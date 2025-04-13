import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiLoginUrl = 'https://localhost:7016/api/Auth';
  private apiUrl = 'https://localhost:7016/api/Banking';
  private tokenKey = 'jwtToken';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginPayload = { username, password };
    return this.http.post(`${this.apiLoginUrl}/login`, loginPayload);
  }

  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getAccountBalance(): Observable<any> {
    return this.http.get(`${this.apiUrl}/balance`, this.createAuthHeaders());
  }

  deposit(amount: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/deposit`,
      { amount },
      this.createAuthHeaders()
    );
  }

  withdraw(amount: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/withdraw`,
      { amount },
      this.createAuthHeaders()
    );
  }

  private createAuthHeaders() {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return { headers };
  }
}
