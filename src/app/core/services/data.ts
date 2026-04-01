import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CompanyData, DashboardJson } from '../../dashboard/dashboard.model';
@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);

  getDashboard() {
    return this.http.get<DashboardJson>('assets/dashboard.json');
  }
}