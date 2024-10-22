"use client"
import { Clock, FileText, DollarSign, CheckCircle, XCircle, Wallet, Info, ArrowRight, ChevronDown, ChevronRight, Calendar, Search, Trash2, Archive } from 'lucide-react';

import Greeting from "@/components/Greeting";
import Workflow from "@/components/Workflow";
import { Box, Button, Divider, IconButton } from '@mui/material';
import PageHeading from '@/components/PageHeading';
import CustomTable from '@/components/CustomTable';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchQuotes } from '@/store/slices/client';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { formatUserDate } from '@/utils';

const columns = [
  {
    field: "name",
    headerName: "Client",
    flex: 1, // Allow the column to take available space
    minWidth: 150,
  },
  {
    field: "quoteno",
    headerName: "Quote number",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "address",
    headerName: "Property",
    flex: 1,
    minWidth: 150,
    // renderCell: (params) => getStatusBox(params.value),
  },
  {
    field: "created",
    headerName: "Created",
    flex: 1,
    minWidth: 100,
    renderCell: (params) => formatUserDate(params.value),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 100,
    renderCell: (params) => getStatusBox(params?.value?.toString()),
  },
  {
    field: "costs",
    headerName: "Total",
    type: 'number',
    flex: 1,
    minWidth: 150,
    valueFormatter: (value) => {
      if (value == null) {
        return '--';
      }
      return `$${parseFloat(value)?.toFixed(2)}`;
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    minWidth: 100,
    renderCell: (params) => {
      return <>
        <div className="flex items-center">
          <IconButton onClick={(e) => {
            e?.stopPropagation()
            alert(`Archieve ${params?.row?.id}`)
          }}><Archive className="text-black" /></IconButton>
          <IconButton
            onClick={(e) => {
              e?.stopPropagation()
              alert(`Delete ${params?.row?.id}`)
            }}><Trash2 className="text-red-400" /></IconButton>
        </div>
      </>
    },
  },
];



// Function to handle status rendering
const getStatusBox = status => {
  console.log(status)
  switch (status) {
    case "Draft": return <div className="w-full h-full flex items-center justify-start capitalize">
      <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
      {status}
    </div>
    case "Lead": return <div className="w-full h-full flex items-center justify-start capitalize">
      <div className="w-3 h-3 bg-green-800 rounded-full mr-2"></div>
      {status}
    </div>
    case "Awaiting Response": return <div className="w-full h-full flex items-center justify-start capitalize">
      <div className="w-3 h-3 bg-green-800 rounded-full mr-2"></div>
      {status}
    </div>

    default:
      break;
  }
}

export default function Page() {
  const router = useRouter()
  const dispatch = useDispatch();

  const [rows, setRows] = useState([])
  const { quotes, loadingList } = useSelector(state => state.clients)

  useEffect(() => {
    dispatch(fetchQuotes())
  }, [])

  console.log({ quotes });

  const getRows = quotes => {
    return quotes?.map((quote, index) => ({
      ...quote
    }))
  }

  return (
    <div className="flex flex-col gap-8 px-4 py-6">
      <PageHeading title={"Quotes"}>
        <Link href={"/quotes/templates"} className='bg-green-700 px-4 py-2 rounded-md text-white font-semibold'>New Quote</Link>
      </PageHeading>

      <div className="flex flex-wrap gap-4 bg-gray-50 text-sm text-tprimary dark:bg-dark-secondary dark:text-dark-text">
        {/* Overview */}
        <div className="w-[300px] p-4 rounded-md border-2">
          <h3 className="font-semibold mb-4">Overview</h3>
          <ul className="">
            <li className="flex items-center space-x-2 p-1 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
              <span className="w-2 h-2 rounded-full bg-gray-600"></span>
              <span>Draft (0)</span>
            </li>
            <li className="flex items-center space-x-2 p-1 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
              <span className="w-2 h-2 rounded-full bg-yellow-600"></span>
              <span>Awaiting Response (0)</span>
            </li>
            <li className="flex items-center space-x-2 p-1 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>Changes Requested (0)</span>
            </li>
            <li className="flex items-center space-x-2 p-1 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
              <span className="w-2 h-2 rounded-full bg-green-800"></span>
              <span>Approved (0)</span>
            </li>
          </ul>
        </div>

        {/* Conversion rate */}
        <div className="w-[300px] p-4 rounded-md border-2 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Conversion rate</h3>
            <ChevronRight className='' />
          </div>
          <p className="text-sm text-gray-500 dark:text-dark-text">Past 30 days</p>
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-3xl font-semibold">0%</span>
          </div>
        </div>

        {/* Sent */}
        <div className="w-[300px] p-4 rounded-md border-2 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Sent</h3>
            <ChevronRight className='' />
          </div>
          <p className="text-sm text-gray-500 dark:text-dark-text">Past 30 days</p>
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-3xl font-semibold">0</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-dark-text">$0</p>
        </div>

        {/* Converted */}
        <div className="w-[300px] p-4 rounded-md border-2 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Converted</h3>
            <ChevronRight className='' />
          </div>
          <p className="text-sm text-gray-500 dark:text-dark-text">Past 30 days</p>
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-3xl font-semibold">0</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-dark-text">$0</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="space-x-2 flex items-center">
          <div className="text-lg font-semibold">All quotes</div>
          <div className="text-gray-400 dark:text-dark-text">(0 results)</div>
        </div>
      </div>

      <div className="w-[97%] space-y-4">
        <div className="w-full flex gap-2 items-center justify-between">
          <div className="space-x-2 flex text-tprimary dark:text-dark-text">
            <div className="flex items-center gap-2 bg-primary dark:bg-dark-secondary dark:hover:bg-dark-hover hover:bg-primary-dark cursor-pointer px-4 py-2 rounded-[40px] text-sm">
              <span>Status</span>
              <span>|</span>
              <span>All</span>
            </div>
            <div className="flex items-center gap-2 bg-primary dark:bg-dark-secondary dark:hover:bg-dark-hover hover:bg-primary-dark cursor-pointer px-4 py-2 rounded-[40px] text-sm">
              <Calendar className='w-5 h-5' />
              <span>All</span>
            </div>
          </div>

          {/* Search Input */}
          <div
            className={`border-2 cursor-pointer px-4 py-2 rounded-lg flex items-center transition-all w-[250px]`}>
            <Search className="mr-2 text-gray-500 w-[25px]" />
            <input
              type="text"
              placeholder="Search quotes..."
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
            onRowClick={({ row }) => {
              router.push(`/quotes/view/${row?.id}`)
            }}
            rows={getRows(quotes)}
            columns={columns}
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
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
}
