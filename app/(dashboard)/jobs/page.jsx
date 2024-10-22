"use client"
import { Clock, FileText, DollarSign, CheckCircle, XCircle, Wallet, Info, ArrowRight, ChevronDown, ChevronRight, Calendar, Search, MoreHorizontal, ArrowUp, ArrowDown, Archive, Trash2 } from 'lucide-react';

import Greeting from "@/components/Greeting";
import Workflow from "@/components/Workflow";
import { Box, Button, Divider, IconButton } from '@mui/material';
import PageHeading from '@/components/PageHeading';
import CustomTable from '@/components/CustomTable';
import Link from 'next/link';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'next/navigation';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { archivedJob, deleteJob, fetchJobs } from '@/store/slices/client';
import { formatUserDate } from '@/utils';

export default function Page() {
  const router = useRouter();
  const { jobs, loadingList } = useSelector(state => state.clients);
  const dispatch = useDispatch();


  const columns = [
    {
      field: "client",
      headerName: "Client",
      flex: 1, // Allow the column to take available space
      minWidth: 150,
    },
    {
      field: "jobno",
      headerName: "Job number",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "property",
      headerName: "Property",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "schedule",
      headerName: "Schedule",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => formatUserDate(params.value),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => getStatusBox(params.value),
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      minWidth: 100,
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
              dispatch(archivedJob({ id: params?.row?.id, type: 'archive' }))
            }}><Archive className="text-black" /></IconButton>
            <IconButton
              onClick={(e) => {
                e?.stopPropagation()
                dispatch(deleteJob({ id: params?.row?.id, type: 'delete' }))
              }}><Trash2 className="text-red-400" /></IconButton>
          </div>
        </>
      },
    },
  ];

  // Function to handle status rendering
  const getStatusBox = status => {
    switch (status) {
      case "Has a late visit": return <div className="text-sm flex items-center justify-start capitalize bg-red-400 bg-opacity-20 px-2 py-1 rounded-full w-40 mt-2">
        <div className="w-3 h-3 bg-red-700 rounded-full mr-2"></div>
        {status}
      </div>
      case "Upcoming": return <div className="text-sm flex items-center justify-start capitalize bg-green-400 bg-opacity-20 px-3 py-1 rounded-full w-40 mt-2">
        <div className="w-3 h-3 bg-green-800 rounded-full mr-2"></div>
        {status}
      </div>
      case "Archived": return <div className="text-sm flex items-center justify-start capitalize bg-gray-400 bg-opacity-20 px-2 py-1 rounded-full text-yellow-700 w-40 mt-2">
        <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
        {status}
      </div>
      default:
        break;
    }
  }

  useEffect(() => {
    dispatch(fetchJobs());
  }, [])

  console.log({ jobs })

  return (
    <div className="flex flex-col gap-8 px-4 py-6">
      <PageHeading title={"Jobs"}>
        <div className="flex items-center gap-2">
          <CustomButton onClick={() => router.push("/jobs/new")} title={"New job"} variant={"primary"} />
          <CustomButton title={"More Actions"} frontIcon={<MoreHorizontal />} />
        </div>
      </PageHeading>

      <div className="flex flex-wrap gap-4 bg-gray-50 text-sm text-tprimary dark:bg-dark-secondary dark:text-dark-text">
        {/* Overview */}
        <div className="w-[300px] p-4 rounded-md border-2">
          <h3 className="font-semibold mb-4">Overview</h3>
          <ul className="">
            <li className="flex items-center space-x-2 p-1 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>Ending within 30 days (0)</span>
            </li>
            <li className="flex items-center space-x-2 p-1 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>Late (0)</span>
            </li>
            <li className="flex items-center space-x-2 p-1 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
              <span className="w-2 h-2 rounded-full bg-yellow-600"></span>
              <span>Requires Invoicing (0)</span>
            </li>
            <li className="flex items-center space-x-2 p-1 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
              <span className="w-2 h-2 rounded-full bg-yellow-600"></span>
              <span>Action Required (0)</span>
            </li>
            <li className="flex items-center space-x-2 p-1 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
              <span className="w-2 h-2 rounded-full bg-yellow-600"></span>
              <span>Unscheduled (0)</span>
            </li>
          </ul>
        </div>

        {/* Recent visits */}
        <div className="w-[300px] p-4 rounded-md border-2 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Recent visits</h3>
            <ChevronRight className='' />
          </div>
          <p className="text-sm text-gray-500">Past 30 days</p>
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-3xl font-semibold">4</span>
            {
              true ? <span className="text-sm text-gray-400 flex items-center bg-green-700 bg-opacity-20 px-2 py-1 rounded-full gap-1">
                <span><ArrowUp className='w-4 h-4 text-green-700' /></span>
                <span className='text-green-700'>100%</span>
              </span> : <span className="text-sm text-gray-400 flex items-center bg-red-700 bg-opacity-20 px-2 py-1 rounded-full gap-1">
                <span><ArrowDown className='w-4 h-4 text-red-700' /></span>
                <span className='text-red-700'>50%</span>
              </span>
            }
          </div>
          <p className='text-gray-500'>$12,381</p>
        </div>

        {/* Visits scheduled */}
        <div className="w-[300px] p-4 rounded-md border-2 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Visits scheduled</h3>
            <ChevronRight className='' />
          </div>
          <p className="text-sm text-gray-500">Next 30 days</p>
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-3xl font-semibold">2</span>
            {
              false ? <span className="text-sm text-gray-400 flex items-center bg-green-700 bg-opacity-20 px-2 py-1 rounded-full gap-1">
                <span><ArrowUp className='w-4 h-4 text-green-700' /></span>
                <span className='text-green-700'>100%</span>
              </span> : <span className="text-sm text-gray-400 flex items-center bg-red-700 bg-opacity-20 px-2 py-1 rounded-full gap-1">
                <span><ArrowDown className='w-4 h-4 text-red-700' /></span>
                <span className='text-red-700'>50%</span>
              </span>
            }
          </div>
          <p className="text-sm text-gray-500">$0</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="space-x-2 flex items-center">
          <div className="text-lg font-semibold">Filtered jobs</div>
        </div>
      </div>

      <div className="w-[97%] space-y-4">
        <div className="w-full flex gap-2 items-center justify-between">
          <div className="space-x-2 flex text-tprimary">
            <div className="flex items-center gap-2 bg-primary hover:bg-primary-dark cursor-pointer px-4 py-2 rounded-[40px] text-sm">
              <span>Status</span>
              <span>|</span>
              <span>Unscheduled</span>
            </div>
            <div className="flex items-center gap-2 bg-primary hover:bg-primary-dark cursor-pointer px-4 py-2 rounded-[40px] text-sm">
              <span>Job Type</span>
              <span>|</span>
              <span>All</span>
            </div>
          </div>

          {/* Search Input */}
          <div
            className={`border-2 cursor-pointer px-4 py-2 rounded-lg flex items-center transition-all w-[250px]`}>
            <Search className="mr-2 text-gray-500 w-[25px]" />
            <input
              type="text"
              placeholder="Search filtered jobs..."
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
              router.push(`/jobs/view/${row?.id}`)
            }}
            rows={jobs?.map(job => {
              return {
                id: job?.id,
                client: job?.name,
                jobno: job?.jobno,
                property: job?.address,
                schedule: job?.created,
                status: job?.status,
                total: `$${job?.totalprice}`,
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
