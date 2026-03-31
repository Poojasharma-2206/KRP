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

  // 🔹 Filters
  searchText = signal('');
  selectedDept = signal('dept');
  selectedCompany = signal('company');
  selectedDesignation = signal('designation');

  // 🔹 Data
  employees: Employee[] = [
    {
      id: 1,
      name: 'John Doe',
      designation: 'Developer',
      company: 'ABC',
      phone: '9999999999',
      department: 'IT',
      reportingManager: 'Jane Smith',
      salary: 50000,
      joiningDate: '2023-01-10',
    },
    {
      id: 2,
      name: 'Alice',
      designation: 'Manager',
      company: 'XYZ',
      phone: '8888888888',
      department: 'HR',
      reportingManager: 'Bob',
      salary: 60000,
      joiningDate: '2022-07-15',
    },
  ];

  // 🔹 Dropdown Data
  departments = ['dept', ...new Set(this.employees.map(e => e.department))];
  companies = ['company', ...new Set(this.employees.map(e => e.company))];
  designations = ['designation', ...new Set(this.employees.map(e => e.designation))];

  // 🔹 Filter Logic
  filteredEmployees = computed(() => {
    return this.employees.filter(emp =>
      (this.selectedDept() === 'All' || emp.department === this.selectedDept()) &&
      (this.selectedCompany() === 'All' || emp.company === this.selectedCompany()) &&
      (this.selectedDesignation() === 'All' || emp.designation === this.selectedDesignation()) &&
      emp.name.toLowerCase().includes(this.searchText().toLowerCase())
    );
  });

  // 🔹 Navigation
  viewDetails(emp: Employee) {
    this.router.navigate(['/employee', emp.id]);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}