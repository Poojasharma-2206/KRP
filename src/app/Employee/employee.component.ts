import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="employee-page">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let emp of employees">
            <td>{{ emp.id }}</td>
            <td>{{ emp.name }}</td>
            <td>{{ emp.designation }}</td>
            <td>{{ emp.company }}</td>
            <td>
              <button (click)="viewDetail(emp)">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class EmployeeComponent {
  employees = [
    { id: 1, name: 'Alice', designation: 'Manager', company: 'X Corp' },
    { id: 2, name: 'Bob', designation: 'Developer', company: 'Y Corp' },
    { id: 3, name: 'Charlie', designation: 'Analyst', company: 'Z Corp' },
  ];

  viewDetail(emp: any) {
    alert(`Employee Details:\nName: ${emp.name}\nDesignation: ${emp.designation}`);
  }
}
