"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../_components/table";
import { ArrowUpDown } from "lucide-react";

export default function ServicesTable() {
  const [sorting, setSorting] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  return (
    <div className="rounded-md border border-ct-text-secondary">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="font-semibold" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => {
                  // TODO: Open modal
                  // TODO: Set modal context id to the name value of this row for updating data
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

const data = [
  {
    name: "Some service",
    description:
      "Some lengthy description with the not so required description that no one cares about. Lorem ipsum is a very helpful dummy text that fills up as much space as you desire",
    type: "service",
  },
  {
    name: "Another service",
    description: "Some lengthy description",
    type: "service",
  },
  {
    name: "Some service 2",
    description: "Some lengthy description",
    type: "service",
  },
  {
    name: "Some service 3",
    description: "Some lengthy description",
    type: "service",
  },
  {
    name: "Some service 4",
    description: "Some lengthy description",
    type: "service",
  },
  {
    name: "Some service 5",
    description: "Some lengthy description",
    type: "service",
  },
  {
    name: "Some service 6",
    description: "Some lengthy description",
    type: "service",
  },
  {
    name: "Some service 7",
    description: "Some lengthy description",
    type: "service",
  },
  {
    name: "Some service 8",
    description: "Some lengthy description",
    type: "service",
  },
  {
    name: "Some service 9",
    description: "Some lengthy description",
    type: "service",
  },
];

const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-center gap-2"
        >
          Name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ cell }) => (
      <div className="w-full max-w-lg overflow-hidden truncate">
        {cell.getValue()}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-center gap-2"
        >
          Type
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ cell }) => <span className="capitalize">{cell.getValue()}</span>,
  },
];
