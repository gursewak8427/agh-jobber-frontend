"use client";

import * as React from "react";
import { Clock, FileText, DollarSign, CheckCircle, XCircle, Wallet, Info, ArrowRight, ChevronDown, ChevronRight, Calendar, Search, MoreHorizontal, PlusIcon, Archive, Delete, X, Trash2 } from 'lucide-react';
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import Greeting from "@/components/Greeting";
import Workflow from "@/components/Workflow";
import { Button, Divider, IconButton } from '@mui/material';
import PageHeading from '@/components/PageHeading';
import CustomTable from '@/components/CustomTable';
import Link from 'next/link';
import CustomButton from '@/components/CustomButton';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { achivedClient, deleteClient, fetchClients } from "@/store/slices/client";
import { formatUserDate } from "@/utils";
import { useProgressBar } from "@/hooks/use-progress-bar";

// const columns = [
//   {
//     field: "client",
//     headerName: "Name",
//     flex: 1, // Allow the column to take available space
//     minWidth: 150,
//   },
//   {
//     field: "address",
//     headerName: "Address",
//     flex: 1,
//     minWidth: 200,
//   },
//   {
//     field: "tags",
//     headerName: "Tags",
//     flex: 1,
//     minWidth: 150,
//   },
//   {
//     field: "status",
//     headerName: "Status",
//     flex: 1,
//     minWidth: 100,
//     renderCell: (params) => getStatusBox(params.value),
//   },
//   {
//     field: "updatedAt",
//     headerName: "Last Activity",
//     flex: 1,
//     minWidth: 100,
//     renderCell: (params) => formatUserDate(params.value),
//   },
//   {
//     field: "actions",
//     headerName: "Actions",
//     flex: 1,
//     minWidth: 100,
//     renderCell: (params) => {
//       return <>
//         <div className="flex items-center">
//           <IconButton onClick={(e) => {
//             e?.stopPropagation()
//             alert(`Archieve ${params?.row?.id}`)
//           }}><Archive className="text-black" /></IconButton>
//           <IconButton
//             onClick={(e) => {
//               e?.stopPropagation()
//               alert(`Delete ${params?.row?.id}`)
//             }}><Trash2 className="text-red-400" /></IconButton>
//         </div>
//       </>
//     },
//   },
// ];


// // Function to handle status rendering
// const getStatusBox = status => {
//   switch (status) {
//     case "Lead": return <div className="text-sm flex items-center justify-start capitalize bg-blue-400 bg-opacity-20 px-2 py-1 rounded-full w-20 mt-2">
//       <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
//       {status}
//     </div>
//     case "Active": return <div className="text-sm flex items-center justify-start capitalize bg-green-400 bg-opacity-20 px-3 py-1 rounded-full w-20 mt-2">
//       <div className="w-3 h-3 bg-green-800 rounded-full mr-2"></div>
//       {status}
//     </div>
//     case "Archived": return <div className="text-sm flex items-center justify-start capitalize bg-gray-400 bg-opacity-20 px-2 py-1 rounded-full text-yellow-700 w-20 mt-2">
//       <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
//       {status}
//     </div>
//     default:
//       break;
//   }
// }

export default function Page() {
  // Function to handle status rendering
  const getStatusBox = status => {
    switch (status) {
      case "Lead": return <div className="text-sm flex items-center justify-start capitalize bg-blue-400 bg-opacity-20 px-2 py-1 rounded-full w-20 mt-2">
        <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
        {status}
      </div>
      case "Active": return <div className="text-sm flex items-center justify-start capitalize bg-green-400 bg-opacity-20 px-3 py-1 rounded-full w-20 mt-2">
        <div className="w-3 h-3 bg-green-800 rounded-full mr-2"></div>
        {status}
      </div>
      case "Archived": return <div className="text-sm flex items-center justify-start capitalize bg-gray-400 bg-opacity-20 px-2 py-1 rounded-full text-yellow-700 w-20 mt-2">
        <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
        {status}
      </div>
      default:
        break;
    }
  }

  const columns = [
    {
      field: "client",
      headerName: "Name",
      flex: 1, // Allow the column to take available space
      minWidth: 150,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "tags",
      headerName: "Tags",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => getStatusBox(params.value),
    },
    {
      field: "updatedAt",
      headerName: "Last Activity",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => formatUserDate(params.value),
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
              dispatch(achivedClient({ id: params?.row?.id, type: 'archive' }))

            }}><Archive className="text-black" /></IconButton>
            <IconButton
              onClick={(e) => {
                e?.stopPropagation()
                dispatch(deleteClient({ id: params?.row?.id, type: 'delete' }))
              }}><Trash2 className="text-red-400" /></IconButton>
          </div>
        </>
      },
    },
  ];


  const router = useRouter();
  const { clients, loadingList } = useSelector(state => state.clients)
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchClients({ page: 1, page_size: 20 }));
  }, [])
  const progress = useProgressBar();
  React.useEffect(() => {
    console.log({ clients });
  }, [clients])
  return (
    <div className="flex flex-col gap-8 px-4 py-6 dark:text-dark-text dark:bg-dark-secondary">
      <PageHeading title={"Clients"}>
        <div className="flex items-center gap-2">
          <CustomButton onClick={() => {
            progress.start();
            React.startTransition(() => {
              router.push("/clients/new");
              progress.done();
            });
          }}
            title={"New Client"}
            variant={"primary"}
          />
          <CustomButton title={"More Actions"} frontIcon={<MoreHorizontal />} />
        </div>
      </PageHeading>

      <div className="flex flex-wrap gap-4 text-sm text-tprimary dark:text-dark-text">
        {/* Conversion rate */}
        <div className="w-[300px] p-4 rounded-md border-2 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">New leads</h3>
            <ChevronRight className='' />
          </div>
          <p className="text-sm text-gray-500 dark:text-dark-text">Past 30 days</p>
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-3xl font-semibold">45</span>
            <span className="text-sm text-tprimary bg-primary-dark px-2 py-1 rounded-xl">100%</span>
          </div>
        </div>

        {/* Sent */}
        <div className="w-[300px] p-4 rounded-md border-2 hover:bg-primary dark:hover:bg-dark-hover cursor-pointer">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">New clients</h3>
            <ChevronRight className='' />
          </div>
          <p className="text-sm text-gray-500 dark:text-dark-text">Past 30 days</p>
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-3xl font-semibold">8</span>
            <span className="text-sm text-tprimary bg-primary-dark px-2 py-1 rounded-xl">100%</span>
          </div>
        </div>

        {/* Converted */}
        <div className="w-[300px] p-4 rounded-md border-2 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Total new clients</h3>
            <ChevronRight className='' />
          </div>
          <p className="text-sm text-gray-500 dark:text-dark-text">Past 30 days</p>
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-3xl font-semibold">8</span>
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
            <div className="flex items-center gap-2 border-primary dark:bg-dark-secondary border dark:hover:bg-dark-hover bg-primary hover:bg-primary-dark cursor-pointer px-4 py-2 rounded-[40px] text-sm">
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
              progress.start();
              React.startTransition(() => {
                router.push(`/clients/view/${row?.id}`);
                progress.done();
              });
            }}
            rows={clients?.map(client => {
              return {
                id: client?.id,
                client: client?.fname,
                address: client?.property_display ?? '0 Properties',
                tags: client?.tags,
                updatedAt: client?.updatedAt,
                status: client?.status,
                total: 1200.0,
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
    </div>
  );
}
