import { Component, AfterViewInit } from '@angular/core';
import { NgFor } from '@angular/common';
import Chart from 'chart.js/auto';
import { KpiCardComponent } from '../shared/components/kpi-card/kpi-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, KpiCardComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.loadCharts();
  }

  loadCharts() {
    // STACKED BAR
    new Chart('stackedBar', {
      type: 'bar',
      data: {
        labels: ['HR', 'Accounts', 'Sales', 'Marketing'],
        datasets: [
          { label: 'Low', data: [20, 25, 30, 15], backgroundColor: '#22c55e', stack: 'a' },
          { label: 'Medium', data: [30, 20, 25, 20], backgroundColor: '#f59e0b', stack: 'a' },
          { label: 'High', data: [10, 15, 20, 10], backgroundColor: '#ef4444', stack: 'a' },
        ],
      },
      options: {
        scales: {
          x: { stacked: true },
          y: { stacked: true },
        },
      },
    });

    // GROUPED BAR
    new Chart('groupedBar', {
      type: 'bar',
      data: {
        labels: ['HR', 'Accounts', 'Sales', 'Marketing'],
        datasets: [
          { label: 'Current', data: [60, 55, 70, 40], backgroundColor: '#4f8ef7' },
          { label: 'Previous', data: [50, 45, 60, 30], backgroundColor: '#a78bfa' },
        ],
      },
    });
  }
}
