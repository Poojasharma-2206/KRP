import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api';

  getDashboard(dept: string = 'all'): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard?dept=${dept}`);
  }
}