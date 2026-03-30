import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard";

export const routes: Routes = [
    {
      path: '',
      component: DashboardComponent
    },
    {
      path: 'charts',
      component: DashboardComponent // abhi same, baad me alag bana sakti hai
    }
  ];