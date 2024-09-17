"use client"
import React from 'react';
import { Button, TextField, IconButton, Avatar, Rating, Divider } from '@mui/material';
import { useState } from 'react';
import { BoxSelect, BoxSelectIcon, CameraIcon, Delete, Divide, Plus, PlusIcon, Trash2 } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';
import JobType from '@/components/JobType';

export default function Page() {
  const [rating, setRating] = useState(0);

  return (
    <div className='max-w-[1200px] mx-auto space-y-4'>
      <div className='text-sm text-tprimary'>
        Back to : <Link href={"/jobs"} className='text-green-700'>Jobs</Link>
      </div>
      <div className="p-8 border border-gray-200 rounded-xl border-t-8 border-t-green-700 space-y-4">
        {/* Header */}
        <div className="flex justify-start items-center mb-6">
          <div className="text-4xl font-semibold text-tprimary">Job for</div>
          <Button className='ml-2 capitalize flex items-center gap-2 border-b border-dashed'>
            <div className="text-4xl font-semibold text-tprimary">Client Name</div>
            <div className="bg-green-700 px-4 py-1 rounded">
              <PlusIcon className='text-white' />
            </div>
          </Button>
        </div>

        {/* Job Title */}

        <div className="flex items-start justify-start gap-4 border-b-4 border-b-gray-300 pb-4">
          <div className="w-1/2 flex flex-col space-y-4">
            <div className="flex flex-col">
              <input
                label="Title"
                placeholder='Title'
                className="focus:outline-gray-500 border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
              />
              <textarea
                label="Title"
                placeholder='Instructions'
                className="focus:outline-gray-500 outline-offset-2 border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none border-t-0"
              ></textarea>
            </div>
            <div className="flex text-sm">
              <div className="w-1/2">
                <h1 className='font-bold mb-2'>Property address</h1>
                <p className='max-w-[150px]'>10130 103 Street NW
                  Edmonton, AB T5J 3N9</p>
                <button className='text-green-700'>change</button>
              </div>
              <div className="w-1/2">
                <h1 className='font-bold mb-2'>Contact details</h1>
                <p className='max-w-[140px]'>(587) 899-3252</p>
                <button className='text-green-700'>Aghreno@gmail.com</button>
              </div>
            </div>
          </div>
          {/* Job details */}
          <div className="p-4 rounded-lg w-1/2">
            <h1 className='font-bold mb-2'>Job details</h1>
            <div className="mb-4 flex items-center space-x-3 border-b border-b-gray-400 pb-2">
              <div className="font-medium min-w-[200px]">Job number #1</div>
              <button className='text-green-700 underline font-semibold'>change</button>
            </div>

            <div className="mb-4 flex items-center space-x-3 border-b border-b-gray-400 pb-2">
              <div className="font-medium min-w-[200px]">Salesperson</div>
              {
                false ? <div className="flex items-center">
                  <Avatar className="mr-2">GS</Avatar>
                  <span>Gurvinder Singh</span>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </div> :
                  <div className="flex items-center">
                    <div className='text-tprimary border border-gray-500 space-x-2 flex items-center px-3 py-[5px] rounded-full hover:bg-primary cursor-pointer'>
                      <span>Add</span>
                      <PlusIcon />
                    </div>
                  </div>
              }
            </div>

            <CustomButton title={"Add Custom Field"} />
          </div>
        </div>

        <div className="py-2">
          <h2 className="text-2xl font-semibold mb-2">Type</h2>
          <div className="lg:col-span-3 py-4 text-tprimary space-y-4 flex flex-row items-start justify-start gap-2">
            <div className="w-2/5">
              <JobType />
            </div>
            <div className="calender flex flex-grow flex-1">

            </div>
          </div>
        </div>

        <div className='border border-gray-400 rounded-xl p-4 space-y-4'>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-2">Invoicing</h2>
          </div>
          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2 w-5 h-5" id='1123213' />
            <label className='text-sm font-semibold cursor-pointer' htmlFor='1123213'>Remind me to invoice when I close the job</label>
          </div>
        </div>

        {/* Line Items */}
        <div className='border border-gray-400 rounded-xl p-4 space-y-4'>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-2">Line Items</h2>
            <CustomButton title="New Line item" />
          </div>
          <div className="flex flex-col items-center mb-4">
            {/* data products loop */}
            <table className='w-full'>
              <tbody>
                {
                  [1, 2, 3].map((_, index) => {
                    return <>
                      <tr>
                        <td className='py-4'>
                          <div className="w-full pr-2">
                            <input
                              placeholder='Name'
                              className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                            />
                          </div>
                        </td>
                        <td className='py-4'>
                          <div className="w-full pr-2">
                            <input
                              placeholder='Qty'
                              className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                            />
                          </div>
                        </td>
                        <td className='py-4'>
                          <div className="w-full pr-2">
                            <input
                              placeholder='Unit Cost'
                              className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                            />
                          </div>
                        </td>
                        <td className='py-4'>
                          <div className="w-full pr-2">
                            <input
                              placeholder='Unit Price'
                              className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                            />
                          </div>
                        </td>
                        <td className='py-4'>
                          <div className="w-full">
                            <input
                              placeholder='Total'
                              className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={5} className='py-4'>
                          <textarea
                            placeholder='Description'
                            className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg h-[70px] focus:h-[100px] transition-all"
                          ></textarea>
                        </td>
                      </tr>
                      <tr className={`${index + 1 != 3 ? 'border-b border-b-gray-400' : ''}`}>
                        <td colSpan={5} className=''>
                          <div className="w-full flex justify-end">
                            <Button className='text-red-500 underline text-right'>Delete</Button>
                          </div>
                        </td>
                      </tr>
                    </>
                  })
                }
              </tbody>
            </table>
            <div className='flex gap-4 justify-end w-full capitalize border-t-2 border-gray-300 pt-4 mt-4'>
              <div className='space-y-2'>
                <div className='text-sm'>total cost</div>
                <div className='font-semibold'>total price</div>
              </div>
              <div className='space-y-2'>
                <div className='text-sm'>$0.00</div>
                <div className='font-semibold'>$0.00</div>
              </div>
            </div>

          </div>
        </div>


        <div className="border border-gray-300 p-4 rounded-lg">
          <h1 className='text-2xl font-bold mb-2'>Internal notes & attachments</h1>
          <div className="mt-4">
            <textarea placeholder='Note details' name="" id="" rows={3} className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"></textarea>
          </div>

          <div className="mt-4 border-2 border-gray-300 text-sm border-dashed p-2 py-4 rounded-xl flex justify-center items-center">
            <label htmlFor="" className='text-gray-500'>Drag your files here or <span className='ml-2 text-green-700 font-semibold border-2 rounded-xl p-2'>Select a file</span></label>
            <input hidden type="file" name="" id="" />
          </div>

          <Divider className='my-2' />

          <div className="mt-4 space-y-2">
            <p className='font-normal text-sm text-tprimary'>Link not to related</p>
            <div className="flex gap-2 text-sm items-center capitalize">
              <div className="flex gap-2 items-center">
                <input type="checkbox" className='w-5 h-5' name="" id="invoices" />
                <label htmlFor="invoices">invoices</label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2 flex justify-between">
          <CustomButton title="Cancel"></CustomButton>
          <CustomButton variant="primary" title="Select Client"></CustomButton>
        </div>

      </div>
    </div>
  );
}
