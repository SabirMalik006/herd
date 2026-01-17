"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./card";
import { Input } from "./input";
import { Button } from "./button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Badge } from "./badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Search, Eye, Pencil, Trash2 } from "lucide-react";

export type DataTableColumn<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
};

export interface DataTableProps<T> {
  title?: string;
  description?: string;
  columns: DataTableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyText?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  searchPosition?: "left" | "right";
  filterLabel?: string;
  filterValue?: string;
  filterOptions?: { value: string; label: string }[];
  onFilterChange?: (v: string) => void;
  actions?: {
    onView?: (row: T) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
  };
  pagination?: {
    page: number;
    perPage: number;
    total: number;
    onPageChange: (page: number) => void;
    onPerPageChange?: (pp: number) => void;
    perPageOptions?: number[];
  };
  headerContent?: React.ReactNode;
  totalLabel?: string; // e.g., "users", "results"
}

export function DataTable<T extends { id?: string | number }>({
  title,
  description,
  columns,
  data,
  isLoading,
  emptyText = "No records found.",
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  searchPosition = "right",
  filterLabel = "Filter",
  filterValue,
  filterOptions,
  onFilterChange,
  actions,
  pagination,
  headerContent,
  totalLabel = "results",
}: DataTableProps<T>) {
  return (
    <Card>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
          {searchPosition === "left" ? (
            <>
              <div className="flex items-center gap-3">
                <div className="relative w-full md:w-64">
                  {onSearchChange && (
                    <>
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="pl-8"
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {filterOptions && onFilterChange && (
                  <div className="flex items-center gap-2">
                    <Select value={filterValue} onValueChange={onFilterChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={filterLabel} />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {headerContent && (
                  <div className="flex items-center gap-2">
                    {headerContent}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                {filterOptions && onFilterChange && (
                  <div className="flex items-center gap-2">
                    <Select value={filterValue} onValueChange={onFilterChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={filterLabel} />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {headerContent && (
                  <div className="flex items-center gap-2">
                    {headerContent}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-full md:w-64">
                  {onSearchChange && (
                    <>
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="pl-8"
                      />
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table className="border-collapse">
            <TableHeader>
              <TableRow>
                {columns.map((c) => (
                  <TableHead key={String(c.key)} className={c.className}>{c.header}</TableHead>
                ))}
                {actions && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="py-6 text-center">
                    <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto" />
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="py-6 text-center text-muted-foreground">
                    {emptyText}
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, idx) => (
                  <TableRow key={(row.id as any) ?? idx}>
                    {columns.map((c) => (
                      <TableCell key={String(c.key)} className={c.className}>
                        {c.render ? c.render(row) : (row as any)[c.key]}
                      </TableCell>
                    ))}
                    {actions && (
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {actions.onView && (
                            <Button variant="outline" size="sm" onClick={() => actions.onView!(row)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          {actions.onEdit && (
                            <Button variant="outline" size="sm" onClick={() => actions.onEdit!(row)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          )}
                          {actions.onDelete && (
                            <Button variant="outline" size="sm" className="text-red-600" onClick={() => actions.onDelete!(row)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {pagination && (() => {
          const totalPages = Math.max(1, Math.ceil(pagination.total / pagination.perPage));
          const safePage = Math.min(Math.max(1, pagination.page), totalPages);
          const start = pagination.total === 0 ? 0 : (safePage - 1) * pagination.perPage + 1;
          const end = Math.min(safePage * pagination.perPage, pagination.total);
          return (
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="text-sm text-muted-foreground">
                {`Showing ${start} to ${end} of ${pagination.total} ${totalLabel}`}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => pagination.onPageChange(1)}
                    disabled={safePage <= 1}
                  >
                    «
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => pagination.onPageChange(Math.max(1, safePage - 1))}
                    disabled={safePage <= 1}
                  >
                    ‹
                  </Button>
                  <span className="px-3 py-1 text-sm font-medium bg-secondary rounded">
                    {safePage}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => pagination.onPageChange(Math.min(totalPages, safePage + 1))}
                    disabled={safePage >= totalPages}
                  >
                    ›
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => pagination.onPageChange(totalPages)}
                    disabled={safePage >= totalPages}
                  >
                    »
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Rows per page</span>
                  {pagination.onPerPageChange && (
                    <Select value={String(pagination.perPage)} onValueChange={(v) => pagination.onPerPageChange?.(parseInt(v))}>
                      <SelectTrigger className="w-[70px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(pagination.perPageOptions ?? [10, 25, 50]).map((n) => (
                          <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
      </CardContent>
    </Card>
  );
}

export default DataTable;


