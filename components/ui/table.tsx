import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { cn } from '../../lib/utils';

interface TableProps<TData> {
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

export function Table<TData>({
  data,
  columns,
  loading = false,
  enableSorting = true,
  enableFiltering = false,
  enablePagination = false,
  pageSize = 10,
  className,
  headerClassName,
  rowClassName,
  cellClassName,
}: TableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
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

  const memoizedRows = useMemo(() => table.getRowModel().rows, [table]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center p-8">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-gray-600 dark:text-gray-400">Loading...</Text>
      </View>
    );
  }

  return (
    <View className={cn('flex-1 w-full', className)}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-1 w-full"
        contentContainerStyle={{ minWidth: '100%' }}
      >
        <View className="w-full" style={{ minWidth: '100%' }}>
          {/* Header */}
          <View className="flex-row bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <TouchableOpacity
                  key={header.id}
                  className={cn(
                    'flex-1 px-4 py-3 border-r border-gray-200 dark:border-gray-700 min-w-[120px]',
                    headerClassName,
                    header.column.getCanSort() && 'active:bg-gray-100 dark:active:bg-gray-700'
                  )}
                  onPress={header.column.getToggleSortingHandler()}
                  disabled={!header.column.getCanSort()}
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </Text>
                    {header.column.getCanSort() && (
                      <Text className="ml-2 text-gray-400">
                        {{
                          asc: '↑',
                          desc: '↓',
                        }[header.column.getIsSorted() as string] ?? '↕'}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>

          {/* Body */}
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            {memoizedRows.map((row, index) => (
              <View
                key={row.id}
                className={cn(
                  'flex-row border-b border-gray-100 dark:border-gray-800',
                  index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-950',
                  rowClassName
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <View
                    key={cell.id}
                    className={cn(
                      'flex-1 px-4 py-3 border-r border-gray-100 dark:border-gray-800 min-w-[120px]',
                      cellClassName
                    )}
                  >
                    <Text className="text-gray-700 dark:text-gray-300 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>

          {/* Pagination */}
          {enablePagination && (
            <View className="flex-row items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} (
                {table.getFilteredRowModel().rows.length} total)
              </Text>

              <View className="flex-row items-center space-x-2">
                <TouchableOpacity
                  onPress={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  className={cn(
                    'px-3 py-2 rounded-md',
                    table.getCanPreviousPage()
                      ? 'bg-blue-500 active:bg-blue-600'
                      : 'bg-gray-300 dark:bg-gray-700'
                  )}
                >
                  <Text
                    className={cn(
                      'text-sm font-medium',
                      table.getCanPreviousPage() ? 'text-white' : 'text-gray-500'
                    )}
                  >
                    ««
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className={cn(
                    'px-3 py-2 rounded-md',
                    table.getCanPreviousPage()
                      ? 'bg-blue-500 active:bg-blue-600'
                      : 'bg-gray-300 dark:bg-gray-700'
                  )}
                >
                  <Text
                    className={cn(
                      'text-sm font-medium',
                      table.getCanPreviousPage() ? 'text-white' : 'text-gray-500'
                    )}
                  >
                    ‹
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className={cn(
                    'px-3 py-2 rounded-md',
                    table.getCanNextPage()
                      ? 'bg-blue-500 active:bg-blue-600'
                      : 'bg-gray-300 dark:bg-gray-700'
                  )}
                >
                  <Text
                    className={cn(
                      'text-sm font-medium',
                      table.getCanNextPage() ? 'text-white' : 'text-gray-500'
                    )}
                  >
                    ›
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  className={cn(
                    'px-3 py-2 rounded-md',
                    table.getCanNextPage()
                      ? 'bg-blue-500 active:bg-blue-600'
                      : 'bg-gray-300 dark:bg-gray-700'
                  )}
                >
                  <Text
                    className={cn(
                      'text-sm font-medium',
                      table.getCanNextPage() ? 'text-white' : 'text-gray-500'
                    )}
                  >
                    »»
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
