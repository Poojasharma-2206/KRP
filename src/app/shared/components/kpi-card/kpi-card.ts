import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  template: `
    <div class="card">
      <h4>{{ title }}</h4>
      <p>{{ value }}</p>
    </div>
  `,
  styles: [`
    .card {
      background: #1e293b;
      padding: 16px;
      border-radius: 12px;
      text-align: center;
    }
    h4 {
      margin: 0;
      font-size: 14px;
      color: #94a3b8;
    }
    p {
      font-size: 22px;
      margin-top: 8px;
      font-weight: bold;
    }
  `]
})
export class KpiCardComponent {
  @Input() title!: string;
  @Input() value!: string;
}