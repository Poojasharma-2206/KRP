export interface KpiData {
  employeeCount: string;
  avgKraScore: string;
  budgetUtilization: string;
  kraVsTarget: string;
}

export interface TableRow {
  department: string;
  empCount: number;
  avgKra: number;
  budget: string;
  policies: number;
  memos: number;
  visionScore: number;
  kraColor?: string;
}

export interface CompanyData {
  id: number;
  name: string;
  departments: string[];
  kpi: KpiData;
  low: number[];
  medium: number[];
  high: number[];
  pending: number[];
  policy: number[];
  support: number[];
  kraScore: number[];
  memos: number[];
  kraDonut: number[];
  table: TableRow[];
}

export interface DashboardJson {
  companies: CompanyData[];
}