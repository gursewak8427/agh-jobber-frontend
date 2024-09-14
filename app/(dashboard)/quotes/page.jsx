import { Clock, FileText, DollarSign, CheckCircle, XCircle, Wallet, Info, ArrowRight, ChevronDown, ChevronRight, Calendar, Search } from 'lucide-react';

import Greeting from "@/components/Greeting";
import Workflow from "@/components/Workflow";
import { Button, Divider } from '@mui/material';
import PageHeading from '@/components/PageHeading';
import CustomTable from '@/components/CustomTable';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col gap-8 px-4 py-6">
      <PageHeading title={"Quotes"}>
        <Link href={"/quotes/new"} className='bg-green-700 px-4 py-2 rounded-md text-white font-semibold'>New Quote</Link>
      </PageHeading>

      <div className="flex flex-wrap gap-4 bg-gray-50 text-sm text-tprimary">
        {/* Overview */}
        <div className="w-[300px] p-4 rounded-md border-2">
          <h3 className="font-semibold mb-4">Overview</h3>
          <ul className="">
            <li className="flex items-center space-x-2 p-1 hover:bg-primary cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-gray-600"></span>
              <span>Draft (0)</span>
            </li>
            <li className="flex items-center space-x-2 p-1 hover:bg-primary cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-yellow-600"></span>
              <span>Awaiting Response (0)</span>
            </li>
            <li className="flex items-center space-x-2 p-1 hover:bg-primary cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>Changes Requested (0)</span>
            </li>
            <li className="flex items-center space-x-2 p-1 hover:bg-primary cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-green-800"></span>
              <span>Approved (0)</span>
            </li>
          </ul>
        </div>

        {/* Conversion rate */}
        <div className="w-[300px] p-4 rounded-md border-2 hover:bg-primary cursor-pointer">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Conversion rate</h3>
            <ChevronRight className='' />
          </div>
          <p className="text-sm text-gray-500">Past 30 days</p>
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-3xl font-semibold">0%</span>
            <span className="text-sm text-gray-400">0%</span>
          </div>
        </div>

        {/* Sent */}
        <div className="w-[300px] p-4 rounded-md border-2 hover:bg-primary cursor-pointer">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Sent</h3>
            <ChevronRight className='' />
          </div>
          <p className="text-sm text-gray-500">Past 30 days</p>
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-3xl font-semibold">0</span>
            <span className="text-sm text-gray-400">0%</span>
          </div>
          <p className="text-sm text-gray-500">$0</p>
        </div>

        {/* Converted */}
        <div className="w-[300px] p-4 rounded-md border-2 hover:bg-primary cursor-pointer">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Converted</h3>
            <ChevronRight className='' />
          </div>
          <p className="text-sm text-gray-500">Past 30 days</p>
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-3xl font-semibold">0</span>
            <span className="text-sm text-gray-400">0%</span>
          </div>
          <p className="text-sm text-gray-500">$0</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="space-x-2 flex items-center">
          <div className="text-lg font-semibold">All quotes</div>
          <div className="text-gray-400">(0 results)</div>
        </div>
      </div>

      <div className="w-[97%] space-y-4">
        <div className="w-full flex gap-2 items-center justify-between">
          <div className="space-x-2 flex text-tprimary">
            <div className="flex items-center gap-2 bg-primary hover:bg-primary-dark cursor-pointer px-4 py-2 rounded-[40px] text-sm">
              <span>Status</span>
              <span>|</span>
              <span>All</span>
            </div>
            <div className="flex items-center gap-2 bg-primary hover:bg-primary-dark cursor-pointer px-4 py-2 rounded-[40px] text-sm">
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
        <CustomTable />
      </div>
    </div>
  );
}
