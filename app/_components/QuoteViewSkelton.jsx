import React from 'react'

const QuoteViewSkelton = () => {
  return (
    <>

      <div className="flex justify-between items-center">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-16"></div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <div className="mt-6 h-4 bg-gray-200 rounded w-24"></div>

      <div className="mt-6 grid grid-cols-3 gap-4 items-center">
        <div className="h-10 bg-gray-200 rounded-full w-10"></div>
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>

      <div className="mt-6">
        <div className="h-6 bg-gray-200 rounded w-full"></div>
        <div className="space-y-4 mt-4">
          <div className="h-20 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-full"></div>
        <div className="grid grid-cols-5 gap-4">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </>)
}

export default QuoteViewSkelton