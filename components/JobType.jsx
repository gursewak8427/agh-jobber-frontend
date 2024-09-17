"use client"
import React, { useState } from 'react';
import CustomButton from './CustomButton';
import { PlusIcon } from 'lucide-react';

const JobType = () => {
  const [jobType, setJobType] = useState('oneOff');

  return (
    <div className="w-full bg-white shadow-md rounded-md">
      <div className="flex justify-between border-b mb-4">
        <button
          className={`w-1/2 py-2 rounded-l-lg text-center ${jobType === 'oneOff' ? 'bg-green-700 text-white border border-black' : 'bg-gray-200'}`}
          onClick={() => setJobType('oneOff')}
        >
          One-off Job
        </button>
        <button
          className={`w-1/2 py-2 rounded-r-lg text-center ${jobType === 'recurring' ? 'bg-green-700 text-white border border-black' : 'bg-gray-200'}`}
          onClick={() => setJobType('recurring')}
        >
          Recurring Job
        </button>
      </div>

      {jobType === 'oneOff' ? (
        <div className="space-y-4">
          <div className='border border-gray-400 rounded-xl p-4 space-y-4'>
            {/* One-off Job Schedule */}
            <h2 className="text-xl font-semibold mb-2">Schedule</h2>
            <div className="flex">
              <div className="w-1/2">
                <label className="block mb-1 font-semibold text-sm">Start date</label>
                <input type="date" className="focus:outline-gray-500 w-full border p-2 rounded-md rounded-r-none" />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 font-semibold text-sm">End date</label>
                <input type="date" className="focus:outline-gray-500 w-full border p-2 rounded-md rounded-l-none" placeholder="Optional" />
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2">
                <label className="block mb-1 font-semibold text-sm">Start time</label>
                <input type="time" className="focus:outline-gray-500 w-full border p-2 rounded-md rounded-r-none" />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 font-semibold text-sm">End time</label>
                <input type="time" className="focus:outline-gray-500 w-full border p-2 rounded-md rounded-l-none" placeholder="Optional" />
              </div>
            </div>
            <div className="flex items-center mb-4">
              <input type="checkbox" className="mr-2 w-4 h-4" id='1123213' />
              <label className='text-sm font-semibold cursor-pointer' htmlFor='1123213'>Schedule later</label>
            </div>

          </div>
          <div className='border border-gray-400 rounded-xl p-4 space-y-4'>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2">Team</h2>
              <CustomButton title={"Assign"} frontIcon={<PlusIcon className='w-4 h-4' />} />
            </div>
            <p className="text-sm mt-2 text-gray-700 italic">No users are currently assigned</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className='border border-gray-400 rounded-xl p-4 space-y-4'>
            {/* One-off Job Schedule */}
            <h2 className="text-xl font-semibold mb-2">Schedule</h2>
            <div className="flex">
              <div className="w-full">
                <label className="block mb-1 font-semibold text-sm">Start date</label>
                <input type="date" className="focus:outline-gray-500 w-full border p-2 rounded-md rounded-r-none" />
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2">
                <label className="block mb-1 font-semibold text-sm">Start time</label>
                <input type="time" className="focus:outline-gray-500 w-full border p-2 rounded-md rounded-r-none" />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 font-semibold text-sm">End time</label>
                <input type="time" className="focus:outline-gray-500 w-full border p-2 rounded-md rounded-l-none" placeholder="Optional" />
              </div>
            </div>
            <div className="mb-4 flex flex-col">
              <label className='text-sm font-semibold cursor-pointer' htmlFor='1123213'>Repeats</label>
              <select name="" id="" className='w-full focus:outline-gray-500 border p-2 rounded-md h-11'>
                <option value="">As we needed - we won't promote you</option>
                <option value="">Weekly on tuesday</option>
                <option value="">Every two weeks on tuesday</option>
                <option value="">Monthly on the 17th of the month</option>
                <option value="">Custom Schedule</option>
              </select>
            </div>

            <div className="mb-4">
              <div className="flex flex-row">
                <input type="text" value={6} name="" id="" className='w-[50px] focus:outline-gray-500 border p-2 rounded-md rounded-r-none h-11' />
                <select name="" id="" className='w-full focus:outline-gray-500 border p-2 rounded-md rounded-l-none h-11'>
                  <option value="">day(s)</option>
                  <option value="">week(s)</option>
                  <option value="">month(s)</option>
                  <option value="">year(s)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <h2 className="text-sm font-semibold mb-2">Visits</h2>
              <table>
                <tbody>
                  <tr>
                    <td className='border-r border-gray-400'> <span className='text-sm'>Total</span> <br /> Sep 17, 2024</td>
                    <td className='border-r border-gray-400 pl-4'> <span className='text-sm'>Last</span> <br /> Mar 11, 2025</td>
                    <td className='pl-4'> <span className='text-sm'>Total</span> <br /> 26</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
          <div className='border border-gray-400 rounded-xl p-4 space-y-4'>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2">Team</h2>
              <CustomButton title={"Assign"} frontIcon={<PlusIcon className='w-4 h-4' />} />
            </div>
            <p className="text-sm mt-2 text-gray-700 italic">No users are currently assigned</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobType