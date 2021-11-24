
export interface PaginationOptions {
  pageSize: number;
  currentPage: number;
}

export interface PaginationInfo extends PaginationOptions {
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
