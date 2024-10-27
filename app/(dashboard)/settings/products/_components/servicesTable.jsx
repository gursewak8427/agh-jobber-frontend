"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../_components/table";
import { ArrowUpDown } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../_components/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../_components/select";
import { Label } from "../../_components/label";
import { Input } from "../../_components/input";
import { Checkbox } from "../../_components/checkbox";
import { Switch } from "../../_components/switch";
import CustomButton from "@/components/CustomButton";

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

  // use this id to update records
  const [editServiceID, setEditServiceID] = useState(null);
  const [availableOnOthers, setAvailableOnOthers] = useState(true);
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
          <Dialog>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <DialogTrigger key={row.id} asChild>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => {
                      setEditServiceID(row.id);
                    }}
                    className="hover:cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </DialogTrigger>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit {"{{Service Name}}"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-1">
                <Label>Type</Label>
                <Select defaultValue="service">
                  <SelectTrigger className="">
                    <SelectValue placeholder="The type of good you are offering" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Name</Label>
                <Input placeholder="Washroom Shower, etc." />
              </div>
              <div className="space-y-1">
                <Label>Description</Label>
                <Input placeholder="Something about the product/service." />
              </div>
              <div className="grid grid-cols-3">
                <div className="space-y-1">
                  <Label>Cost ($)</Label>
                  <Input
                    className="rounded-r-none border-r-0"
                    placeholder="0.0"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Markup (%)</Label>
                  <Input className="rounded-none border-r-0" placeholder="0" />
                </div>
                <div className="space-y-1">
                  <Label>Unit Price ($)</Label>
                  <Input className="rounded-l-none" placeholder="2500.0" />
                </div>
              </div>
              <div className="w-full space-y-1">
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="file" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <Label>Exempt from Tax</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="available"
                    checked={availableOnOthers}
                    onCheckedChange={setAvailableOnOthers}
                  />
                  <Label htmlFor="available">
                    Available on quotes, jobs, invoices and online booking
                  </Label>
                </div>
              </div>
              {availableOnOthers && (
                <div className="border-t border-ct-text-secondary py-4 flex gap-4 items-center justify-between animate-in zoom-in-90">
                  <div className="">
                    <h4 className="font-semibold">Online Booking</h4>
                    <p className="text-sm text-opacity-80">
                      These settings are only available for online booking.{" "}
                      <a
                        className="text-green-600 hover:underline"
                        href="https://secure.getjobber.com/online_booking_settings/services"
                      >
                        Manage in online booking services
                      </a>
                    </p>
                  </div>
                  <Switch />
                </div>
              )}
              <DialogFooter className="sm:justify-between">
                <CustomButton title={"Delete"} variant={"destructive"} />
                <div className="flex items-center gap-2">
                  <DialogClose asChild>
                    <CustomButton title={"Cancel"} />
                  </DialogClose>
                  <CustomButton title={"Update"} variant={"primary"} />
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
          className="flex items-center gap-2 h-full w-full"
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
          className="flex items-center gap-2 w-full h-full"
        >
          Type
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ cell }) => <span className="capitalize">{cell.getValue()}</span>,
  },
];
