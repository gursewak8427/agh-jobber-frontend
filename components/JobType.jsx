"use client"
import React, { useEffect, useState } from 'react';
import CustomButton from './CustomButton';
import { PlusIcon } from 'lucide-react';
import { formatDate } from '@/utils';

const JobType = ({ visits, register, watch, setValue }) => {

  let jobtype = watch("jobtype")
  let repeats = watch("repeats")
  let schedulelater = watch("schedulelater")

  useEffect(() => {
    if (schedulelater) {
      setValue(`startdate`, formatDate(new Date()))
      setValue(`enddate`, "")
      setValue(`starttime`, "")
      setValue(`endtime`, "")
    }

    setValue(`jobtype`, 'oneoff')
  }, [schedulelater])


  return (
    <div className="w-full bg-white shadow-md rounded-md dark:bg-dark-secondary">
      <div className="flex justify-between mb-4">
        <button
          type='button'
          className={`w-1/2 py-2 rounded-l-lg text-center ${jobtype === 'oneoff' ? 'bg-green-700 text-white border border-black' : 'bg-gray-200 dark:bg-dark-primary'}`}
          onClick={() => setValue('jobtype', 'oneoff')}
        >
          One-off Job
        </button>
        <button
          type='button'
          className={`w-1/2 py-2 rounded-r-lg text-center ${jobtype === 'recurring' ? 'bg-green-700 text-white border border-black' : 'bg-gray-200 dark:bg-dark-primary'}`}
          onClick={() => setValue('jobtype', 'recurring')}
        >
          Recurring Job
        </button>
      </div>

      {jobtype === 'oneoff' ? (
        <div className="space-y-4">
          <div className='border border-gray-400 rounded-xl p-4 space-y-4'>
            {/* One-off Job Schedule */}
            <h2 className="text-xl font-semibold mb-2">Schedule</h2>
            <div className="flex">
              <div className="w-1/2">
                <label className="block mb-1 font-semibold text-sm">Start date</label>
                <input disabled={schedulelater} {...register('startdate')} type="date" className="focus:outline-gray-500 dark:bg-dark-primary w-full border p-2 rounded-md rounded-r-none" />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 font-semibold text-sm">End date</label>
                <input disabled={schedulelater} {...register('enddate')} type="date" className="focus:outline-gray-500 dark:bg-dark-primary w-full border p-2 rounded-md rounded-l-none" placeholder="Optional" />
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2">
                <label className="block mb-1 font-semibold text-sm">Start time</label>
                <input disabled={schedulelater} {...register('starttime')} type="time" className="focus:outline-gray-500 dark:bg-dark-primary w-full border p-2 rounded-md rounded-r-none" />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 font-semibold text-sm">End time</label>
                <input disabled={schedulelater} {...register('endtime')} type="time" className="focus:outline-gray-500 dark:bg-dark-primary w-full border p-2 rounded-md rounded-l-none" placeholder="Optional" />
              </div>
            </div>
            <div className="flex items-center mb-4">
              <input  {...register('schedulelater')} type="checkbox" className="mr-2 w-4 h-4" id='1123213' />
              <label className='text-sm font-semibold cursor-pointer' htmlFor='1123213'>Schedule later</label>
            </div>

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
                <input {...register('startdate')} type="date" className="focus:outline-gray-500 dark:bg-dark-primary w-full border p-2 rounded-md rounded-r-none" />
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2">
                <label className="block mb-1 font-semibold text-sm">Start time</label>
                <input {...register('starttime')} type="time" className="focus:outline-gray-500 dark:bg-dark-primary w-full border p-2 rounded-md rounded-r-none" />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 font-semibold text-sm">End time</label>
                <input {...register('endtime')} type="time" className="focus:outline-gray-500 dark:bg-dark-primary w-full border p-2 rounded-md rounded-l-none" placeholder="Optional" />
              </div>
            </div>
            <div className="mb-4 flex flex-col">
              <label className='text-sm font-semibold cursor-pointer' htmlFor='1123213'>Repeats</label>
              <select {...register('repeats')} name="repeats" id="repeats" className='w-full dark:bg-dark-primary focus:outline-gray-500 border p-2 rounded-md h-11'>
                <option value="daily">Daily</option>
                <option value="as_we_need">As we needed - we won't promote you</option>
                <option value="tuesday_weekly">Weekly on tuesday</option>
                <option value="tuesday_every_two_week">Every two weeks on tuesday</option>
                <option value="17th_of_monthly">Monthly on the 17th of the month</option>
                <option disabled value="custom_schedule">Custom Schedule</option>
              </select>
            </div>

            <div className="mb-4">
              <div className="flex flex-row">
                <input {...register('duration')} type="text" name="duration" id="duration" className='w-[50px] dark:bg-dark-primary focus:outline-gray-500 border p-2 rounded-md rounded-r-none h-11' />
                <select  {...register('durationtype')} name="durationtype" id="durationtype" className='w-full dark:bg-dark-primary focus:outline-gray-500 border p-2 rounded-md rounded-l-none h-11'>
                  <option value="days">day(s)</option>
                  <option value="weeks">week(s)</option>
                  <option value="months">month(s)</option>
                  <option value="years">year(s)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col mb-4">
              {
                repeats == "custom_schedule" || repeats == "as_we_need" ? <></> :
                  <>
                    <h2 className="text-sm font-semibold mb-2">Visits</h2>
                    <table>
                      <tbody>
                        <tr>
                          <td className='border-r border-gray-400'> <span className='text-sm'>First</span> <br /> {visits?.[0]?.startdate || "--"}</td>
                          <td className='border-r border-gray-400 pl-4'> <span className='text-sm'>Last</span> <br /> {visits?.[visits?.length - 1]?.startdate || "--"}</td>
                          <td className='pl-4'> <span className='text-sm'>Total</span> <br /> {visits?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                  </>
              }
            </div>

          </div>

        </div>
      )}
    </div>
  )
}

export default JobType