export interface AdminUserQueryParams {
  search?: string;
  statusFilter?: "all" | "locked" | "unconfirmed" | "inactive";
  page?: number;
  pageSize?: number;
}