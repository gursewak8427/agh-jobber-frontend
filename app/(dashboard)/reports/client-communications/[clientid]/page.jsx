"use client"
import ModalHeading from '@/app/_components/ModalHeading'
import CustomButton from '@/components/CustomButton'
import CustomModal from '@/components/CustomModal'
import PageHeading from '@/components/PageHeading'
import { fetchCommunication, fetchCommunications } from '@/store/slices/client'
import { Divider, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { FileIcon, MessageCircleIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
    const [view, setView] = useState(true)
    const dispatch = useDispatch();
    const { loadingObj, communications, communication } = useSelector(state => state.clients)

    const columns = [
        {
            field: "name",
            headerName: "Client Name",
            flex: 1, // Allow the column to take available space
            minWidth: 150,
            renderCell: (params) => <>{params?.row?.client?.fname ? params?.row?.client?.fname + ' ' + params?.row?.client?.lname : params?.row?.client?.companyname}</>,
        },
        {
            field: "sentDate",
            headerName: "Sent Date",
            flex: 1,
            minWidth: 200,
            renderCell: (params) => new Date(params?.row?.sentDate)?.toLocaleDateString() || "--",
        },
        {
            field: "to",
            headerName: "To",
            flex: 1,
            minWidth: 150,
        },
        {
            field: "subject",
            headerName: "Subject",
            flex: 1,
            minWidth: 150,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            minWidth: 150,
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1,
            minWidth: 150,
        },
        {
            field: "openedDate",
            headerName: "Opened date",
            flex: 1,
            minWidth: 150,
            renderCell: (params) => new Date(params?.row?.sentDate)?.toLocaleDateString() || "--",
        },
        {
            field: "actions",
            headerName: "Open",
            flex: 1,
            minWidth: 150,
            renderCell: (params) => <div>
                <IconButton onClick={() => {
                    setView(params?.row?.id)
                }}>
                    <MessageCircleIcon />
                </IconButton>
            </div>,
        },
    ];

    useEffect(() => {
        if (view) {
            dispatch(fetchCommunication(view))
        }
    }, [view])

    useEffect(() => {
        dispatch(fetchCommunications())
    }, [])

    return (
        <div className="flex flex-col gap-8 px-4 py-6">
            <PageHeading title={"Client Communications"}></PageHeading>

            <div className="flex flex-wrap gap-4 bg-gray-50 text-sm text-tprimary dark:bg-dark-secondary dark:text-dark-text">
                {/* Overview */}
                <div className="p-4 rounded-md border-2">
                    <h3 className="font-semibold mb-4">Overview</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-2 mr-6 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
                            <span className="flex items-center justify-center text-black w-[20px] h-[20px] min-w-[20px] min-h-[20px] mt-[1px] rounded-full bg-gray-200">7</span>
                            <div className='flex flex-col'>
                                <span><b>Sent</b></span>
                                <span>emails to client</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 mr-6 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
                            <span className="flex items-center justify-center text-black w-[20px] h-[20px] min-w-[20px] min-h-[20px] mt-[1px] rounded-full bg-gray-200">7</span>
                            <div className='flex flex-col'>
                                <span><b>Delivered</b></span>
                                <span>emails to client</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
                            <span className="flex items-center justify-center text-black w-[20px] h-[20px] min-w-[20px] min-h-[20px] mt-[1px] rounded-full bg-gray-200">7</span>
                            <div className='flex flex-col'>
                                <span><b>Opened</b></span>
                                <span>emails to client</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 hover:bg-primary cursor-pointer dark:hover:bg-dark-hover">
                            <span className="flex items-center justify-center text-black w-[20px] h-[20px] min-w-[20px] min-h-[20px] mt-[1px] rounded-full bg-gray-200">7</span>
                            <div className='flex flex-col'>
                                <span><b>Sent</b></span>
                                <span>
                                    Text messages to client<br />
                                    <small>Open rates are not tracked on text messages</small>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-md border-2">
                    <h3 className="font-semibold mb-4">Options</h3>
                    <div className="flex flex-col items-start justify-start gap-3">
                        <div className='flex flex-col w-[300px]'>
                            <small><b>Sent within</b></small>
                            <select name="requiredtype" id="requiredtype" className="dark:bg-dark-secondary h-10 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400  rounded-lg" >
                                <option value="thisweek">This week</option>
                                <option value="thismonth">This month</option>
                                <option value="last12months">Last 12 Months</option>
                            </select>
                        </div>
                        <div className="self-end">
                            <CustomButton variant={"primary"} title={"Apply Options"} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Data */}
            <div className="border w-[98%] rounded-lg overflow-hidden">
                {/* Top Bar */}
                <div className="w-full p-2 border dark:bg-dark-secondary bg-gray-200 h-11"></div>

                {/* Table */}
                <DataGrid
                    loading={loadingObj["fetchcommunications"]}
                    slotProps={{
                        loadingOverlay: {
                            variant: 'skeleton',
                            noRowsVariant: 'skeleton',
                        },
                    }}
                    autoHeight
                    onRowClick={({ row }) => {
                        // router.push(`/quotes/view/${row?.id}`)
                    }}
                    rows={communications}
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
            </div>


            <CustomModal show={view} onClose={() => setView(false)}>
                {/* {JSON.stringify(communication)} */}
                <ModalHeading onClose={() => setView(false)}>Email Communication</ModalHeading>
                <br />
                <div className="text-sm dark:text-white text-gray-600">
                    <div className="grid grid-cols-2">
                        <div className="text-left mb-4">
                            <p className="">Sent on</p>
                            <p className="">{new Date(communication?.sentDate)?.toLocaleDateString()}</p>
                        </div>

                        <div className="text-sm text-left mb-4 border-l-2 pl-4">
                            <p className="">Type</p>
                            <p className="">{communication?.type}</p>
                        </div>
                    </div>

                    <br />

                    <div className="">
                        <p className=""><b>To</b>: {communication?.to}</p>
                    </div>
                    <Divider className='my-2' />

                    <div className="">
                        <p className=""><b>Cc</b>: {communication?.cc || "None"}</p>
                    </div>
                    <Divider className='my-2' />

                    <div className="">
                        <p className=""><b>Bcc</b>: {communication?.bcc || "None"}</p>
                    </div>
                    <Divider className='my-2' />

                    <div className="">
                        <p className=""><b>Subject</b>: {communication?.Subject || "None"}</p>
                    </div>
                    <Divider className='my-2' />

                    <div className="">
                        {communication?.message || "None"}
                    </div>

                    <Divider className='my-2' />

                    <div className="">
                        <p className=" font-bold mb-2">Attachments</p>
                        <div className="flex flex-wrap items-start justify-start">
                            <div className="flex items-center border-2 border-gray-300 cursor-pointer rounded-lg p-2">
                                <span className="inline-block p-2 border border-red-500 rounded">
                                    <FileIcon className='text-red-400' />
                                </span>
                                <span className="ml-2 ">quote_74.pdf</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CustomModal>
        </div>
    )
}

export default page