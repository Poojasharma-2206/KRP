// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-employee-detail',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './employeeView.html',
// })
// export class EmployeeDetailComponent implements OnInit {
//   employee: any;

//   employees = [
//     {
//       id: 1,
//       name: 'John Doe',
//       designation: 'Developer',
//       company: 'ABC',
//       phone: '9999999999',
//       department: 'IT',
//       reportingManager: 'Jane Smith',
//       salary: 50000,
//       joiningDate: '2023-01-10',
//     },
//     {
//       id: 2,
//       name: 'Alice',
//       designation: 'Manager',
//       company: 'ABC',
//       phone: '8888888888',
//       department: 'HR',
//       reportingManager: 'Bob',
//       salary: 60000,
//       joiningDate: '2022-07-15',
//     },
//   ];

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//   ) {}

//   ngOnInit() {
//     const id = Number(this.route.snapshot.paramMap.get('id'));
//     this.employee = this.employees.find((e) => e.id === id);
//   }

  

//   goBack() {
//     this.router.navigate(['/employees']);
//   }
// }



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employeeView.html',
  styleUrls: ['./employeeView.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  employee: any;

  employees = [
    { id: 1, name: 'John Doe',   designation: 'Developer', company: 'Shakti Pvt Ltd',  phone: '9999999999', department: 'IT',    reportingManager: 'Jane Smith', salary: 50000, joiningDate: '2023-01-10' },
    { id: 2, name: 'Alice',      designation: 'Manager',   company: 'ABC Corp',        phone: '8888888888', department: 'HR',    reportingManager: 'Bob',        salary: 60000, joiningDate: '2022-07-15' },
    { id: 3, name: 'Ravi Kumar', designation: 'Analyst',   company: 'Shakti Pvt Ltd',  phone: '7777777777', department: 'Sales', reportingManager: 'John Doe',   salary: 45000, joiningDate: '2023-05-20' },
    { id: 4, name: 'Priya Shah', designation: 'HR Lead',   company: 'Zenith Solutions', phone: '6666666666', department: 'HR',   reportingManager: 'Alice',      salary: 55000, joiningDate: '2021-11-01' },
    { id: 5, name: 'Mohit Jain', designation: 'Developer', company: 'ABC Corp',        phone: '5555555555', department: 'IT',    reportingManager: 'Ravi Kumar', salary: 48000, joiningDate: '2024-02-14' },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employee = this.employees.find(e => e.id === id);
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}