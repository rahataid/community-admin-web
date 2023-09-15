export interface DashBoardSummaryReportHooksReturn {
  data: number;
  loading: boolean;
  error: any;
}
export type DashboardReportsType = {
  data: number;
  loading: boolean;
  error: any;
};

export interface StatsData {
  gender: Record<string, number>;
  internetAccess: Record<string, number>;
  phoneOwnership: Record<string, number>;
  bankStatus: Record<string, number>;
}
