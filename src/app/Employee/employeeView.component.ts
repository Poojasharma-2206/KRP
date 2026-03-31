import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employeeView.html',
})
export class EmployeeDetailComponent implements OnInit {
  employee: any;

  employees = [
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
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employee = this.employees.find((e) => e.id === id);
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}
