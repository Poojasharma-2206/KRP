export interface DashboardData {
  departments: string[];

  kpi: {
    employeeCount: string;
    avgKraScore: string;
    budgetUtilization: string;
    kraVsTarget: string;
  };

  low: number[];
  medium: number[];
  high: number[];
  pending: number[];
  policy: number[];
  support: number[];
  kraScore: number[];
  memos: number[];
  kraDonut: number[];

  table: {
    department: string;
    empCount: number;
    avgKra: number;
    budget: string;
    policies: number;
    memos: number;
    visionScore: number;
  }[];
}