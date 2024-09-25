"use client"
import SelectClient from '@/app/_components/client/SelectClient';
import CustomButton from '@/components/CustomButton';
import PageHeading from '@/components/PageHeading';
import { useAppDispatch } from '@/store/hooks';
import { fetchallClients } from '@/store/slices/client';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const InvoiceDashboard = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { clientslist } = useSelector(state => state.clients);
  const [open, setOpen] = useState(null)


  useEffect(() => {
    dispatch(fetchallClients());
  }, [])



  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col gap-8 px-4 py-6">
        <PageHeading title={"Invoices"}>
          <div className="flex items-center gap-2">
            <CustomButton onClick={() => {
              setOpen("select_client")
            }} title={"New Invoice"} variant={"primary"} />
            <CustomButton title={"More Actions"} frontIcon={<MoreHorizontal />} />
          </div>
        </PageHeading>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Overview</h2>
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
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Issued</h2>
          <div className="flex justify-between items-center">
            <span className="text-gray-800">0</span>
            <span className="text-gray-800">$0</span>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Average Invoice</h2>
          <div className="flex justify-between items-center">
            <span className="text-gray-800">$0</span>
            <span className="text-gray-800">0%</span>
          </div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
              Status | All
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
              Date | All
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search all invoices"
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-md text-gray-800 focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 absolute top-2.5 left-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 11h8m-4 4v-4m0-4v1m4 5a5 5 0 100-10 5 5 0 000 10z"
              />
            </svg>
          </div>
        </div>

        <table className="w-full table-auto text-left text-gray-700">
          <thead>
            <tr className="border-b">
              <th className="pb-2">Client</th>
              <th className="pb-2">Invoice number</th>
              <th className="pb-2">Due date</th>
              <th className="pb-2">Subject</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Total</th>
              <th className="pb-2">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7" className="text-center py-4">
                No invoices found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <SelectClient open={open == "select_client"} onClose={() => setOpen(null)} onSelect={id => {
        router.push(`/invoices/new?client_id=${id}`)
      }} clients={clientslist} />

    </>
  );
};

export default InvoiceDashboard;
