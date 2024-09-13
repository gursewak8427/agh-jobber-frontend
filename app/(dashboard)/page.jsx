import { Clock, FileText, DollarSign, CheckCircle, XCircle, Wallet } from 'lucide-react';

import Greeting from "@/components/Greeting";
import Workflow from "@/components/Workflow";
import { Button, Divider } from '@mui/material';

export default function Home() {
  return (
    <div className="flex flex-col gap-8 px-4 py-6">
      <Greeting />
      <Workflow />

      {/* Content */}
      <div className="min-h-screen flex items-start justify-start gap-4 text-tprimary w-full">
        <div className="flex flex-grow flex-col gap-8">
          {/* To Do Section */}
          <div className="w-full p-2 space-y-4">
            <p className="font-semibold text-lg">To do</p>

            <ul className="space-y-4 border rounded-xl shadow-md">
              <li className="flex items-center justify-between border-b p-4">
                <div className="flex items-center space-x-4">
                  <FileText className="text-black bg-black bg-opacity-15 p-2 rounded-lg w-10 h-10" />
                  <div>
                    <h3 className="font-semibold text-md">Explore your personalized online client portal</h3>
                    <p className="text-sm text-gray-500">Clients can approve quotes, review jobs, and pay all online</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">5 minutes</span>
              </li>
              <li className="flex items-center justify-between border-b p-4">
                <div className="flex items-center space-x-4">
                  <DollarSign className="text-black bg-black bg-opacity-15 p-2 rounded-lg w-10 h-10" />
                  <div>
                    <h3 className="font-semibold text-md">Get paid with fast invoicing</h3>
                    <p className="text-sm text-gray-500">Create and send invoices your clients can pay online</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">2 minutes</span>
              </li>
              <li className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <FileText className="text-black bg-black bg-opacity-15 p-2 rounded-lg w-10 h-10" />
                  <div>
                    <h3 className="font-semibold text-md">Create a winning quote</h3>
                    <p className="text-sm text-gray-500">Boost your revenue with custom quotes</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">2 minutes</span>
              </li>
            </ul>
          </div>

          {/* Today's Appointments Section */}
          <div className="w-full p-2 space-y-4">
            <p className="font-semibold text-lg">Today's appointments</p>
            <div className="flex justify-between mb-4">
              <div className='px-3'>
                <p className="text-xs font-medium">TOTAL</p>
                <p className="text-2xl font-semibold">$0</p>
              </div>
              <div className='px-3'>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-800"></div>
                  <p className="text-xs font-medium">ACTIVE</p>
                </div>
                <p className="text-2xl font-semibold">$0</p>
              </div>
              <div className='px-3'>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                  <p className="text-xs font-medium">COMPLETED</p>
                </div>
                <p className="text-2xl font-semibold">$0</p>
              </div>
              <div className='px-3'>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-800"></div>
                  <p className="text-xs font-medium">OVERDUE</p>
                </div>
                <p className="text-2xl font-semibold">$0</p>
              </div>
              <div className='px-3'>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-800"></div>
                  <p className="text-xs font-medium">REMAINING</p>
                </div>
                <p className="text-2xl font-semibold">$0</p>
              </div>
            </div>

            <div className="pt-4 space-y-7">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-800"></div>
                <span className='text-xs font-semibold uppercase'>0 Overdue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-800"></div>
                <span className='text-xs font-semibold uppercase'>0 Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-800"></div>
                <span className='text-xs font-semibold uppercase'>0 Remaining</span>
              </div>
              <div className="flex items-center justify-between mb-2 px-5 shadow-lg w-full p-2">
                <div className="flex items-center space-x-4 border-l-8 rounded-l border-green-800 p-2">
                  <div>
                    <p className="text-sm font-semibold">Mahmuda Mahmuda - Visit for Mahmuda Mahmuda</p>
                    <p className="text-sm text-gray-500">9:00 AM - 7:00 PM</p>
                  </div>
                </div>
                <XCircle className="text-red-600 w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                <span className='text-xs font-semibold uppercase'>0 COMPLETED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payments & Revenue Section */}
        <div className="w-[400px] space-y-10 pt-4 sticky top-[100px]">
          {/* Payments */}
          <div className="">
            <div className="flex gap-2 text-sm">
              <Wallet />
              <h2 className="font-semibold mb-4">Payments</h2>
            </div>
            <div className="flex flex-col items-start justify-normal space-y-4">
              <p className="font-semibold text-lg">Get paid 4x faster with Jobber Payments</p>
              <p className="text-sm text-gray-400">Stop chasing payments and offer your clients the convenience of online payments.</p>
              <Button variant='outlined' className="text-sm border-green-800 text-green-800 py-2 px-2 rounded-lg hover:bg-green-800 hover:bg-opacity-20">Enable Jobber Payments</Button>
            </div>
          </div>

          <Divider className='my-2' />

          {/* Revenue */}
          <div className="">
            <div className="flex gap-2 text-sm">
              <Wallet />
              <h2 className="font-semibold mb-4">Business Performance</h2>
            </div>


            <div className="space-y-4">
              <div className="flex flex-col items-start justify-normal space-y-4">
                <p className="font-semibold text-lg">Revenue</p>
              </div>
              <div className='space-y-2'>
                <p className="text-xs font-normal">Projected value of work next 7 days</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-semibold">$0</p>
                    <p className="text-xs bg-red-600 bg-opacity-20 px-4 py-[7px] rounded-full cursor-pointer text-red-600">↓ 100%</p>
                  </div>
                  <p className="text-xs font-semibold underline">View jobs</p>
                </div>
              </div>
              <div className='space-y-2'>
                <p className="text-xs font-normal">Received payments past 7 days</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-semibold">$0</p>
                    <p className="text-xs bg-gray-600 bg-opacity-20 px-4 py-[7px] rounded-full cursor-pointer text-gray-600">0%</p>
                  </div>
                  <p className="text-xs font-semibold underline">View reports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
