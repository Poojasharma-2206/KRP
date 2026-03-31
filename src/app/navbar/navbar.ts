import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent {
  private router = inject(Router);

  selectedCompany = 'All Companies';
  selectedDept = 'all';

  constructor() {
    // URL change hone pe dropdown bhi sync karo
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e: any) => {
      const url: string = e.urlAfterRedirects;
      const match = url.match(/\/dept\/(.+)/);
      this.selectedDept = match ? decodeURIComponent(match[1]) : 'all';
    });
  }

  onDeptChange(): void {
    if (this.selectedDept === 'all') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/dept', this.selectedDept]);
    }
  }
}
