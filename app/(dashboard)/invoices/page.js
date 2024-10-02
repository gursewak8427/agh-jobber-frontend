"use client";

import * as React from "react";
import { Clock, FileText, DollarSign, CheckCircle, XCircle, Wallet, Info, ArrowRight, ChevronDown, ChevronRight, Calendar, Search, MoreHorizontal, PlusIcon } from 'lucide-react';
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import Greeting from "@/components/Greeting";
import Workflow from "@/components/Workflow";
import { Button, Divider } from '@mui/material';
import PageHeading from '@/components/PageHeading';
import CustomTable from '@/components/CustomTable';
import Link from 'next/link';
import CustomButton from '@/components/CustomButton';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchallClients, fetchClients, fetchInvoices } from "@/store/slices/client";
import { useAppDispatch } from "@/store/hooks";
import SelectClient from "@/app/_components/client/SelectClient";

const columns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1, // Allow the column to take available space
    minWidth: 150,
  },
  {
    field: "invoiceno",
    headerName: "Invoice number",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "paymentduedate",
    headerName: "Due date",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "name",
    headerName: "Subject",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "costs",
    headerName: "Total",
    flex: 1,
    minWidth: 100,
  },
  // {
  //   field: "balance",
  //   headerName: "Balance",
  //   flex: 1,
  //   minWidth: 100,
  // },
];


// Function to handle status rendering
const getStatusBox = status => {
  switch (status) {
    case "active": return <div className="w-full h-full flex items-center justify-start capitalize">
      <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
      {status}
    </div>
    case "lead": return <div className="w-full h-full flex items-center justify-start capitalize">
      <div className="w-3 h-3 bg-green-800 rounded-full mr-2"></div>
      {status}
    </div>

    default:
      break;
  }
}

export default function Page() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { clientslist, invoices, loadingList } = useSelector(state => state.clients);
  const [open, setOpen] = React.useState(null)


  React.useEffect(() => {
    dispatch(fetchallClients());
    dispatch(fetchInvoices());
  }, [])

  return (
    <div className="flex flex-col gap-8 px-4 py-6">
      <PageHeading title={"Invoices"}>
        <div className="flex items-center gap-2">
          <CustomButton onClick={() => {
            setOpen("select_client")
          }} title={"New Invoice"} variant={"primary"} />
          <CustomButton title={"More Actions"} frontIcon={<MoreHorizontal />} />
        </div>
      </PageHeading>

      <div className="flex flex-wrap gap-4 text-sm text-tprimary dark:text-dark-text">
        {/* Conversion rate */}
        <div className="w-[300px] p-4 rounded-md border-2 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Overview</h3>
            <ChevronRight className='' />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-red-500">Past due (0)</span>
              <span className="text-gray-800">$0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-yellow-500">Sent but not due (0)</span>
              <span className="text-gray-800">$0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Draft (0)</span>
              <span className="text-gray-800">$0</span>
            </div>
          </div>
        </div>

        {/* Sent */}
        <div className="w-[300px] p-4 rounded-md border-2 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Issued</h3>
            <ChevronRight className='' />
          </div>
          <p className="text-sm text-gray-500">Past 30 days</p>
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-3xl font-semibold">0</span>
            <span className="text-sm text-tprimary bg-primary-dark px-2 py-1 rounded-xl dark:hover:bg-dark-hover">$0</span>
          </div>
        </div>

        {/* Converted */}
        <div className="w-[300px] p-4 rounded-md border-2 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Average Invoice</h3>
            <ChevronRight className='' />
          </div>
          <p className="text-sm text-gray-500">Past 30 days</p>
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-3xl font-semibold">$0</span>
            <span className="text-sm text-tprimary bg-primary-dark px-2 py-1 rounded-xl">0%</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="space-x-2 flex items-center">
          <div className="text-lg font-semibold">Filtered clients</div>
          <div className="text-gray-400">(45 results)</div>
        </div>
      </div>

      <div className="w-[97%] space-y-4">
        <div className="w-full flex gap-2 items-center justify-between">
          <div className="space-x-2 flex text-tprimary dark:text-dark-text">
            <div className="flex items-center gap-2 border-primary-dark border dark:hover:bg-dark-hover hover:bg-primary-dark cursor-pointer px-4 py-2 rounded-[40px] text-sm">
              <span>Tags</span>
              <span><PlusIcon className='w-4 h-4' /></span>
            </div>
            <div className="flex items-center gap-2 border-primary border dark:bg-dark-primary bg-primary dark:hover:bg-dark-hover hover:bg-primary-dark cursor-pointer px-4 py-2 rounded-[40px] text-sm">
              <span>Status</span>
              <span>|</span>
              <span>Leads and active</span>
            </div>
          </div>

          {/* Search Input */}
          <div
            className={`border-2 cursor-pointer px-4 py-2 rounded-lg flex items-center transition-all w-[250px]`}>
            <Search className="mr-2 text-gray-500 w-[25px]" />
            <input
              type="text"
              placeholder="Search Clients..."
              className='bg-transparent focus:outline-none w-full'
            />
          </div>
        </div>


        {/* Table */}
        <Box
          sx={{
            width: "100%", // Make sure the container takes the full width
            overflowX: "auto", // Handle horizontal overflow
          }}
        >
          <DataGrid
            loading={loadingList}
            slotProps={{
              loadingOverlay: {
                variant: 'skeleton',
                noRowsVariant: 'skeleton',
              },
            }}
            autoHeight
            columns={columns}
            onRowClick={({ row }) => {
              router.push(`/invoices/view/${row?.id}`)
            }}
            rows={invoices?.map(invoice => {
              return {
                id: invoice?.id,
                invoiceno: invoice?.invoiceno,
                name: invoice?.name,
                paymentduedate: invoice?.paymentduedate,
                status: invoice?.status,
                subject: invoice?.subject,
                costs: `$${invoice?.costs}`,
              }
            })}
            sx={{
              minWidth: 900, // Ensures the table doesn't shrink too much
              // disable cell selection style
              '.MuiDataGrid-cell:focus': {
                outline: 'none'
              },
              // pointer cursor on ALL rows
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer'
              },
              "@media (max-width: 600px)": {
                ".MuiDataGrid-columnHeaders": {
                  fontSize: "0.75rem",
                },
                ".MuiDataGrid-cell": {
                  fontSize: "0.75rem",
                },

              },
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>

      <SelectClient open={open == "select_client"} onClose={() => setOpen(null)} onSelect={id => {
        router.push(`/invoices/new?client_id=${id}`)
      }} clients={clientslist} />
    </div>
  );
}
