import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import Chart from 'chart.js/auto';
import { KpiCardComponent } from '../shared/components/kpi-card/kpi-card';
import { Router } from '@angular/router';
import { DataService } from '../core/services/data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, KpiCardComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {

  private dataService = inject(DataService);
  private router = inject(Router);

  tableRows: any[] = [];

  kpi = {
    employeeCount: '-',
    avgKraScore: '-',
    budgetUtilization: '-',
    kraVsTarget: '-'
  };

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.dataService.getDashboard().subscribe(res => {
      console.log('DATA:', res);

      // ✅ KPI cards
      this.kpi = res.kpi;

      // ✅ Table rows with dynamic kraColor
      this.tableRows = res.table.map(row => ({
        ...row,
        kraColor: row.avgKra >= 85 ? '#22c55e' : row.avgKra >= 80 ? '#f59e0b' : '#ef4444'
      }));

      setTimeout(() => {
        this.loadCharts(res);
      }, 0);
    });
  }

  goToEmployees() {
    this.router.navigate(['/employees']);
  }

  loadCharts(data: any) {

    const depts = data.departments;

    // 🧨 Destroy old charts
    Chart.getChart('stackedBar')?.destroy();
    Chart.getChart('groupedBar')?.destroy();
    Chart.getChart('kraDonut')?.destroy();
    Chart.getChart('kraGauge')?.destroy();
    Chart.getChart('kraLineChart')?.destroy();
    Chart.getChart('policyDonut')?.destroy();

    // ── STACKED BAR ──
    new Chart('stackedBar', {
      type: 'bar',
      data: {
        labels: depts,
        datasets: [
          { label: 'Low',    data: data.low,    backgroundColor: '#22c55e', stack: 'a' },
          { label: 'Medium', data: data.medium, backgroundColor: '#f59e0b', stack: 'a' },
          { label: 'High',   data: data.high,   backgroundColor: '#ef4444', stack: 'a' },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#64748b' } },
          y: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#64748b' } },
        },
      },
    });

    // ── GROUPED BAR ──
    new Chart('groupedBar', {
      type: 'bar',
      data: {
        labels: depts,
        datasets: [
          { label: 'Pending',      data: data.pending, backgroundColor: '#ef4444' },
          { label: 'Policy focus', data: data.policy,  backgroundColor: '#4f8ef7' },
          { label: 'Support load', data: data.support, backgroundColor: '#f59e0b' },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#64748b' } },
          y: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#64748b' } },
        },
      },
    });

    // ── KRA DONUT ──
    new Chart('kraDonut', {
      type: 'doughnut',
      data: {
        labels: depts,
        datasets: [
          {
            data: data.kraDonut,
            backgroundColor: ['#22c55e','#f97316','#ef4444','#3b82f6','#f59e0b','#10b981','#8b5cf6','#ec4899'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
      },
    });

    // ── GAUGE ──
    const avgKra = +(data.kraScore.reduce((a: number, b: number) => a + b, 0) / data.kraScore.length).toFixed(1);

    new Chart('kraGauge', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [avgKra, 100 - avgKra],
            backgroundColor: ['#10b981', 'rgba(200,200,200,0.15)'],
            circumference: 180,
            rotation: 270,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: '75%',
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
      },
    });

    // ── LINE ──
    new Chart('kraLineChart', {
      type: 'line',
      data: {
        labels: depts,
        datasets: [
          {
            label: 'KRA score',
            data: data.kraScore,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.1)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Memo volume',
            data: data.memos,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239,68,68,0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#64748b' } },
          y: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#64748b' } },
        },
      },
    });

    // ── POLICY DONUT ──
    new Chart('policyDonut', {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'Non-compliant', 'Compliant', 'NA'],
        datasets: [
          {
            data: [15, 20, 55, 10],
            backgroundColor: ['#f59e0b', '#ef4444', '#22c55e', '#94a3b8'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
      },
    });
  }
}