import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Employee {
  id: number;
  name: string;
  designation: string;
  company: string;
  phone: string;
  department: string;
  reportingManager: string;
  salary: number;
  joiningDate: string;
}

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent {
  constructor(private router: Router) {}

  searchText = signal('');
  selectedDept = signal('All');
  selectedCompany = signal('All');
  selectedDesignation = signal('All');

  employees: Employee[] = [
    { id: 1, name: 'John Doe',   designation: 'Developer', company: 'Shakti Pvt Ltd', phone: '9999999999', department: 'IT',    reportingManager: 'Jane Smith', salary: 50000, joiningDate: '2023-01-10' },
    { id: 2, name: 'Alice',      designation: 'Manager',   company: 'ABC Corp',       phone: '8888888888', department: 'HR',    reportingManager: 'Bob',        salary: 60000, joiningDate: '2022-07-15' },
    { id: 3, name: 'Ravi Kumar', designation: 'Analyst',   company: 'Shakti Pvt Ltd', phone: '7777777777', department: 'Sales', reportingManager: 'John Doe',   salary: 45000, joiningDate: '2023-05-20' },
    { id: 4, name: 'Priya Shah', designation: 'HR Lead',   company: 'Zenith Solutions',phone: '6666666666', department: 'HR',    reportingManager: 'Alice',      salary: 55000, joiningDate: '2021-11-01' },
    { id: 5, name: 'Mohit Jain', designation: 'Developer', company: 'ABC Corp',       phone: '5555555555', department: 'IT',    reportingManager: 'Ravi Kumar', salary: 48000, joiningDate: '2024-02-14' },
  ];

  departments   = ['All', ...new Set(this.employees.map(e => e.department))];
  companies     = ['All', ...new Set(this.employees.map(e => e.company))];
  designations  = ['All', ...new Set(this.employees.map(e => e.designation))];

  // ✅ Filter logic fix
  filteredEmployees = computed(() => {
    return this.employees.filter(emp =>
      (this.selectedDept()        === 'All' || emp.department  === this.selectedDept()) &&
      (this.selectedCompany()     === 'All' || emp.company     === this.selectedCompany()) &&
      (this.selectedDesignation() === 'All' || emp.designation === this.selectedDesignation()) &&
      emp.name.toLowerCase().includes(this.searchText().toLowerCase())
    );
  });

  viewDetails(emp: Employee) {
    this.router.navigate(['/employee', emp.id]);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}