"use client"
import { Clock, FileText, DollarSign, CheckCircle, XCircle, Wallet, Info, ArrowRight, ChevronDown, ChevronRight, Calendar, Search, MoreHorizontal } from 'lucide-react';

import Greeting from "@/components/Greeting";
import Workflow from "@/components/Workflow";
import { Box, Button, Divider } from '@mui/material';
import PageHeading from '@/components/PageHeading';
import CustomTable from '@/components/CustomTable';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchQuotes } from '@/store/slices/client';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { formatUserDate } from '@/utils';
import CustomButton from '@/components/CustomButton';

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
            <PageHeading title={"Requests"}>
                <div className="flex items-center gap-2">
                    <CustomButton variant={"primary"} onClick={() => router.push(`/requests/new`)} title={"New Request"} />
                    <CustomButton title={"More Actions"} frontIcon={<MoreHorizontal />} />
                </div>
            </PageHeading>

            <div className="w-[97%] space-y-4">


                <div className="w-full flex items-start gap-3">
                    <div className="border rounded-lg h-screen border-gray-300 w-3/4 p-4 bg-white dark:bg-dark-secondary">
                        <div className="top-filters grid grid-cols-3 gap-3">
                            <div>
                                <input type="text"
                                    placeholder='Search requests...'
                                    className="w-full focus:outline-none border dark:bg-dark-secondary px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg" />
                            </div>
                            <div>
                                <div className="relative">
                                    <div className="absolute top-0 left-5 bg-white dark:bg-dark-secondary dark:text-white  px-1 transform -translate-y-[50%] font-semibold text-xs text-tprimary text-opacity-60">Date</div>
                                    <select
                                        placeholder='Material'
                                        className="w-full dark:bg-dark-secondary dark:text-white focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                                    >
                                        <option value="">All</option>
                                        <option value="">This Month</option>
                                        <option value="">Last 30 Days</option>
                                        <option value="">Last Month</option>
                                        <option value="">This year</option>
                                        <option value="">Custom</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <div className="absolute top-0 left-5 bg-white dark:bg-dark-secondary dark:text-white  px-1 transform -translate-y-[50%] font-semibold text-xs text-tprimary text-opacity-60">Status</div>
                                    <select
                                        placeholder='Material'
                                        className="w-full dark:bg-dark-secondary dark:text-white focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                                    >
                                        <option value="">New</option>
                                        <option value="">Assessment completed</option>
                                        <option value="">Overdue</option>
                                        <option value="">Today</option>
                                        <option value="">Upcoming</option>
                                        <option value="">Unscheduled</option>
                                        <option value="">Converted</option>
                                        <option value="">Archived</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-[200px] flex flex-col items-center justify-center gap-3">
                            <p className='text-tprimary dark:text-dark-text text-lg'>Let's create a request and track incoming work</p>
                            <CustomButton variant={"primary"} onClick={() => router.push(`/requests/new`)} title={"Create a Request"} />
                        </div>
                    </div>
                    <div className="w-1/4">
                        <div className="font-semibold mb-3">Overview</div>
                        <div className="space-y-3">
                            <div className="flex gap-2 items-center">
                                <div className="text-yellow-500 bg-yellow-500 bg-opacity-30 w-[50px] rounded-[40px] flex items-center justify-center gap-3">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <span className='text-tprimary dark:text-dark-text'>0</span>
                                </div>
                                <div className="text-sm">
                                    New
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="text-orange-500 bg-orange-500 bg-opacity-30 w-[50px] rounded-[40px] flex items-center justify-center gap-3">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    <span className='text-tprimary dark:text-dark-text'>0</span>
                                </div>
                                <div className="text-sm">
                                    Assessment completed
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="text-red-500 bg-red-500 bg-opacity-30 w-[50px] rounded-[40px] flex items-center justify-center gap-3">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span className='text-tprimary dark:text-dark-text'>0</span>
                                </div>
                                <div className="text-sm">
                                    Overdue
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="text-green-300 bg-green-300 bg-opacity-30 w-[50px] rounded-[40px] flex items-center justify-center gap-3">
                                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                                    <span className='text-tprimary dark:text-dark-text'>0</span>
                                </div>
                                <div className="text-sm">
                                    Today
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="text-green-500 bg-green-500 bg-opacity-30 w-[50px] rounded-[40px] flex items-center justify-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className='text-tprimary dark:text-dark-text'>0</span>
                                </div>
                                <div className="text-sm">
                                    Upcoming
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="text-orange-500 bg-orange-500 bg-opacity-30 w-[50px] rounded-[40px] flex items-center justify-center gap-3">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    <span className='text-tprimary dark:text-dark-text'>0</span>
                                </div>
                                <div className="text-sm">
                                    Unscheduled
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="text-green-400 bg-green-400 bg-opacity-30 w-[50px] rounded-[40px] flex items-center justify-center gap-3">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className='text-tprimary dark:text-dark-text'>0</span>
                                </div>
                                <div className="text-sm">
                                    Converted
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="text-gray-500 bg-gray-500 bg-opacity-30 w-[50px] rounded-[40px] flex items-center justify-center gap-3">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                                    <span className='text-tprimary dark:text-dark-text'>0</span>
                                </div>
                                <div className="text-sm">
                                    Archived
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
}









