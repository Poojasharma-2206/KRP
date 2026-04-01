import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FilterService {
  selectedCompanyId = signal<number>(0);
  selectedDepartment = signal<string>('All');
}