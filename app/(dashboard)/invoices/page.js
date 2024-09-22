import React from 'react';

const InvoiceDashboard = () => {
  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
        <div>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
            New Invoice
          </button>
          <button className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
            More Actions
          </button>
        </div>
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
    </>
  );
};

export default InvoiceDashboard;
