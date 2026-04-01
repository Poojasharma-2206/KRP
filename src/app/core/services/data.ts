import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DashboardData } from '../../dashboard/dashboard.model';


@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);

  getDashboard() {
    return this.http.get<DashboardData>('assets/dashboard.json');
  }
}