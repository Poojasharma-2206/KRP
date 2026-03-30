import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard';
import { NavbarComponent } from './navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, DashboardComponent],
  template: `
    <app-navbar></app-navbar>
    <app-dashboard></app-dashboard>
  `
})
export class App {}