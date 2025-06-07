import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

interface UseTableOptions<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  initialSorting?: SortingState;
  initialFilters?: ColumnFiltersState;
}

export function useTable<TData>({
  data,
  columns,
  enableSorting = true,
  enableFiltering = false,
  enablePagination = false,
  pageSize = 10,
  initialSorting = [],
  initialFilters = [],
}: UseTableOptions<TData>) {
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(initialFilters);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  const tableData = useMemo(
    () => ({
      rows: table.getRowModel().rows,
      headers: table.getHeaderGroups(),
      canPreviousPage: table.getCanPreviousPage(),
      canNextPage: table.getCanNextPage(),
      pageCount: table.getPageCount(),
      currentPage: table.getState().pagination.pageIndex + 1,
      totalRows: table.getFilteredRowModel().rows.length,
    }),
    [table]
  );

  const tableActions = useMemo(
    () => ({
      previousPage: () => table.previousPage(),
      nextPage: () => table.nextPage(),
      setPageIndex: (index: number) => table.setPageIndex(index),
      firstPage: () => table.setPageIndex(0),
      lastPage: () => table.setPageIndex(table.getPageCount() - 1),
      setColumnFilter: (columnId: string, value: any) => {
        table.getColumn(columnId)?.setFilterValue(value);
      },
      resetFilters: () => table.resetColumnFilters(),
      resetSorting: () => table.resetSorting(),
    }),
    [table]
  );

  return {
    table,
    tableData,
    tableActions,
    sorting,
    columnFilters,
    pagination,
  };
}
