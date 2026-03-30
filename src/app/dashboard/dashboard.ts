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
  tableRows = [
    {
      department: 'HR',
      empCount: 126,
      avgKra: 85,
      kraColor: '#ef4444',
      budget: '76%',
      policies: 18,
      memos: 7,
      visionScore: 89,
    },
    {
      department: 'Accounts',
      empCount: 74,
      avgKra: 80,
      kraColor: '#ef4444',
      budget: '69%',
      policies: 12,
      memos: 5,
      visionScore: 84,
    },
    {
      department: 'Sales',
      empCount: 165,
      avgKra: 82,
      kraColor: '#ef4444',
      budget: '88%',
      policies: 14,
      memos: 11,
      visionScore: 86,
    },
    {
      department: 'Marketing',
      empCount: 92,
      avgKra: 79,
      kraColor: '#ef4444',
      budget: '74%',
      policies: 13,
      memos: 9,
      visionScore: 83,
    },
    {
      department: 'IT',
      empCount: 118,
      avgKra: 86,
      kraColor: '#22c55e',
      budget: '79%',
      policies: 20,
      memos: 5,
      visionScore: 90,
    },
    {
      department: 'Operations',
      empCount: 154,
      avgKra: 83,
      kraColor: '#ef4444',
      budget: '85%',
      policies: 17,
      memos: 10,
      visionScore: 87,
    },
    {
      department: 'Support',
      empCount: 109,
      avgKra: 81,
      kraColor: '#ef4444',
      budget: '71%',
      policies: 12,
      memos: 14,
      visionScore: 84,
    },
    {
      department: 'Administration',
      empCount: 63,
      avgKra: 88,
      kraColor: '#22c55e',
      budget: '62%',
      policies: 10,
      memos: 3,
      visionScore: 91,
    },
  ];

  ngAfterViewInit() {
    this.loadCharts();
  }

  loadCharts() {
    const depts = [
      'HR',
      'Accounts',
      'Sales',
      'Marketing',
      'IT',
      'Operations',
      'Support',
      'Administration',
    ];
     const gridColor = 'rgba(0,0,0,0.06)';    // ← dark tha, ab light
  const tickColor = '#64748b';

    // ── STACKED BAR ──
    new Chart('stackedBar', {
      type: 'bar',
      data: {
        labels: depts,
        datasets: [
          {
            label: 'Low',
            data: [20, 25, 30, 15, 28, 22, 18, 12],
            backgroundColor: '#22c55e',
            stack: 'a',
          },
          {
            label: 'Medium',
            data: [30, 20, 25, 20, 32, 28, 24, 18],
            backgroundColor: '#f59e0b',
            stack: 'a',
          },
          {
            label: 'High',
            data: [10, 15, 20, 10, 14, 12, 16, 8],
            backgroundColor: '#ef4444',
            stack: 'a',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { stacked: true, ticks: { color: tickColor }, grid: { color: gridColor } },
          y: { stacked: true, ticks: { color: tickColor }, grid: { color: gridColor } },
        },
        plugins: { legend: { labels: { color: tickColor } } },
      },
    });

    // ── GROUPED BAR ──
    new Chart('groupedBar', {
      type: 'bar',
      data: {
        labels: depts,
        datasets: [
          { label: 'Pending', data: [3, 2, 4, 1, 3, 2, 3, 1], backgroundColor: '#ef4444' },
          {
            label: 'Policy focus',
            data: [18, 12, 14, 13, 20, 17, 12, 10],
            backgroundColor: '#4f8ef7',
          },
          { label: 'Support load', data: [5, 4, 6, 3, 5, 4, 7, 3], backgroundColor: '#f59e0b' },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { color: tickColor }, grid: { color: gridColor } },
          y: { ticks: { color: tickColor }, grid: { color: gridColor } },
        },
        plugins: { legend: { labels: { color: tickColor } } },
      },
    });

    // ── KRA DONUT ──
    new Chart('kraDonut', {
      type: 'doughnut',
      data: {
        labels: depts,
        datasets: [
          {
            data: [126, 74, 165, 92, 118, 154, 109, 63],
            backgroundColor: [
              '#22c55e',
              '#f97316',
              '#ef4444',
              '#3b82f6',
              '#f59e0b',
              '#10b981',
              '#8b5cf6',
              '#ec4899',
            ],
            borderWidth: 0,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: tickColor, font: { size: 11 }, boxWidth: 10, padding: 10 },
          },
        },
      },
    });

    // ── GAUGE (semicircle) ──
    new Chart('kraGauge', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [82.4, 17.6],
            backgroundColor: ['#10b981', 'rgba(255,255,255,0.08)'],
            borderWidth: 0,
            circumference: 180,
            rotation: 270,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
      },
    });

    // ── KRA vs MEMO LINE ──
    new Chart('kraLineChart', {
      type: 'line',
      data: {
        labels: depts,
        datasets: [
          {
            label: 'KRA score',
            data: [85, 80, 82, 79, 86, 83, 81, 88],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.08)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            yAxisID: 'y',
          },
          {
            label: 'Memo volume',
            data: [7, 5, 11, 9, 5, 10, 14, 3],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239,68,68,0.08)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { color: tickColor }, grid: { color: gridColor } },
          y: {
            position: 'left',
            ticks: { color: '#3b82f6' },
            grid: { color: gridColor },
            title: { display: true, text: 'KRA score', color: '#3b82f6' },
          },
          y1: {
            position: 'right',
            ticks: { color: '#ef4444' },
            grid: { drawOnChartArea: false },
            title: { display: true, text: 'Memo volume', color: '#ef4444' },
          },
        },
        plugins: { legend: { labels: { color: tickColor } } },
      },
    });

    // ── POLICY COMPLIANCE DONUT ──
    new Chart('policyDonut', {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'Non-compliant', 'Compliant', 'Not Applicable'],
        datasets: [
          {
            data: [15, 20, 55, 10],
            backgroundColor: ['#f59e0b', '#ef4444', '#22c55e', '#94a3b8'],
            borderWidth: 0,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: tickColor, font: { size: 11 }, boxWidth: 10, padding: 10 },
          },
        },
      },
    });
  }
}
