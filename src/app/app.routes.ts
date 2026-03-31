import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { EmployeeComponent } from './Employee/employee.component';
import { EmployeeDetailComponent } from './Employee/employeeView.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dept/:deptName', component: DashboardComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'employee/:id', component: EmployeeDetailComponent },
  { path: '**', redirectTo: '' },
];
