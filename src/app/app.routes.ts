import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { EmployeeComponent } from './Employee/employee.component';


export const routes: Routes = [
  { path: '',                    component: DashboardComponent },
  { path: 'dept/:deptName',      component: DashboardComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: '**',                  redirectTo: '' }
];