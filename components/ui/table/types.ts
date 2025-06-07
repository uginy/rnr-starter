import { ColumnDef } from '@tanstack/react-table';

export interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  loading?: boolean;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
}

export interface TableData<TData> {
  rows: any[];
  headers: any[];
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  currentPage: number;
  totalRows: number;
}

export interface TableActions {
  previousPage: () => void;
  nextPage: () => void;
  setPageIndex: (index: number) => void;
  firstPage: () => void;
  lastPage: () => void;
  setColumnFilter: (columnId: string, value: unknown) => void;
  resetFilters: () => void;
  resetSorting: () => void;
}
