import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
  selectedDept = signal('All'); // latest reactive signal
  selectedEmployee = signal<Employee | null>(null);

  departments = ['All', 'IT'];

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
      company: 'ABC',
      phone: '8888888888',
      department: 'HR',
      reportingManager: 'Bob',
      salary: 60000,
      joiningDate: '2022-07-15',
    },
    // aur bhi data add kar
  ];

  filteredEmployees = computed(() => {
    if (this.selectedDept() === 'All') return this.employees;
    return this.employees.filter((emp) => emp.department === this.selectedDept());
  });
  // router: any;
  constructor(private router: Router) {}

  viewDetails(emp: Employee) {
    // this.selectedEmployee.set(emp);
    this.router.navigate(['/employee', emp.id]);
  }

  closeDetails() {
    this.selectedEmployee.set(null);
  }
}
