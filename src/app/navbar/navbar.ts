// // import { Component, inject } from '@angular/core';
// // import { FormsModule } from '@angular/forms';
// // import { Router, NavigationEnd } from '@angular/router';
// // import { filter } from 'rxjs/operators';

// // @Component({
// //   selector: 'app-navbar',
// //   standalone: true,
// //   imports: [FormsModule],
// //   templateUrl: './navbar.html',
// //   styleUrls: ['./navbar.scss'],
// // })
// // export class NavbarComponent {
// //   private router = inject(Router);

// //   selectedCompany = 'All Companies';
// //   selectedDept = 'all';

// //   constructor() {
// //     // URL change hone pe dropdown bhi sync karo
// //     this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e: any) => {
// //       const url: string = e.urlAfterRedirects;
// //       const match = url.match(/\/dept\/(.+)/);
// //       this.selectedDept = match ? decodeURIComponent(match[1]) : 'all';
// //     });
// //   }

// //   onDeptChange(): void {
// //     if (this.selectedDept === 'all') {
// //       this.router.navigate(['/']);
// //     } else {
// //       this.router.navigate(['/dept', this.selectedDept]);
// //     }
// //   }
// // }

// import { Component, inject, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { NgFor } from '@angular/common';
// import { DataService } from '../core/services/data';
// import { FilterService } from '../core/services/filter.service';
// import { CompanyData } from '../dashboard/dashboard.model';

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [FormsModule, NgFor],
//   templateUrl: './navbar.html',
//   styleUrls: ['./navbar.scss'],
// })
// export class NavbarComponent implements OnInit {

//   private dataService = inject(DataService);
//   private filterService = inject(FilterService);

//   allCompanies: CompanyData[] = [];
//   departments: string[] = [];

//   // selectedCompanyId: number = 0;
//   selectedDepartment: string = 'All';

//   ngOnInit() {
//     this.dataService.getDashboard().subscribe(res => {
      
//       this.allCompanies = res.companies;
//       this.updateDepartments();
//     });
//   }

//   selectedCompanyId: string = '0';  // string rakho

// onCompanyChange() {
//   this.selectedDepartment = 'All';
//   this.updateDepartments();
//   this.filterService.selectedCompanyId.set(+this.selectedCompanyId); // + se number convert
//   this.filterService.selectedDepartment.set('All');
// }

// updateDepartments() {
//   const company = this.allCompanies.find(c => c.id === +this.selectedCompanyId); // + lagao
//   this.departments = company ? company.departments : [];
// }
//   // updateDepartments() {
//   //   const company = this.allCompanies.find(c => c.id === this.selectedCompanyId);
//   //   this.departments = company ? company.departments : [];
//   // }

//   // onCompanyChange() {
//   //   this.selectedDepartment = 'All';
//   //   this.updateDepartments();
//   //   this.filterService.selectedCompanyId.set(+this.selectedCompanyId);
//   //   this.filterService.selectedDepartment.set('All');
//   // }

//   onDepartmentChange() {
//     this.filterService.selectedDepartment.set(this.selectedDepartment);
//   }
// }

import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { DataService } from '../core/services/data';
import { FilterService } from '../core/services/filter.service';
import { CompanyData } from '../dashboard/dashboard.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent implements OnInit {

  private dataService = inject(DataService);
  private filterService = inject(FilterService);

  allCompanies: CompanyData[] = [];
  departments: string[] = [];
  selectedCompanyId: string = '0';
  selectedDepartment: string = 'All';

  ngOnInit() {
    this.dataService.getDashboard().subscribe(res => {
      this.allCompanies = res.companies.filter(c => c.id !== 0);
      this.filterService.selectedCompanyId.set(0);
      this.filterService.selectedDepartment.set('All');
    });
  }

  updateDepartments() {
    const id = +this.selectedCompanyId;
    if (id === 0) { this.departments = []; return; }
    const company = this.allCompanies.find(c => c.id === id);
    this.departments = company ? company.departments : [];
  }

  onCompanyChange() {
    this.selectedDepartment = 'All';
    this.updateDepartments();
    this.filterService.selectedCompanyId.set(+this.selectedCompanyId);
    this.filterService.selectedDepartment.set('All');
  }

  onDepartmentChange() {
    this.filterService.selectedDepartment.set(this.selectedDepartment);
  }
}