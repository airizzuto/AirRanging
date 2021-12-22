
export interface PaginationOptions {
  pageSize: number;
  currentPage: number;
}

export interface PaginationInfo {
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface Pagination extends PaginationOptions, PaginationInfo { }
