"use client"
import React from 'react';
import { Button, TextField, IconButton, Avatar, Rating, Divider } from '@mui/material';
import { useState } from 'react';
import { BoxSelect, BoxSelectIcon, CameraIcon, Delete, Divide, Plus, PlusIcon, Trash2 } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';

export default function Page() {
  const [rating, setRating] = useState(0);

  return (
    <div className='max-w-[1200px] mx-auto space-y-4'>
      <div className='text-sm text-tprimary'>
        Back to : <Link href={"/quotes"} className='text-green-700'>Quotes</Link>
      </div>
      <div className="p-8 border border-gray-200 rounded-xl border-t-8 border-t-pink-950">
        {/* Header */}
        <div className="flex justify-start items-center mb-6">
          <div className="text-4xl font-semibold text-tprimary">Quote for</div>
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
            <div className="flex flex-col space-y-2">
              <label htmlFor="" className='text-tprimary font-bold'>Job Title</label>
              <input
                label="Title"
                placeholder='Title'
                className="focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
              />
            </div>
            <div className="flex text-sm">
              <div className="w-1/2">
                <h1 className='font-bold mb-2'>Property address</h1>
                <p className='max-w-[150px]'>10130 103 Street NW
                  Edmonton, AB T5J 3N9</p>
                <button className='text-green-700'>change</button>
              </div>
              <div className="w-1/2">
                <h1 className='font-bold mb-2'>Property address</h1>
                <p className='max-w-[140px]'>(587) 899-3252</p>
                <button className='text-green-700'>Aghreno@gmail.com</button>
              </div>
            </div>
          </div>
          {/* Quote Details */}
          <div className="p-4 rounded-lg w-1/2">
            <h1 className='font-bold mb-2'>Quote details</h1>
            <div className="mb-4 flex items-center space-x-3 border-b border-b-gray-400 pb-2">
              <div className="font-medium min-w-[200px]">Quote number #1</div>
              <button className='text-green-700 underline font-semibold'>change</button>
            </div>

            <div className="mb-4 flex items-center space-x-3 border-b border-b-gray-400 pb-2">
              <div className="font-medium min-w-[200px]">Rate opportunity</div>
              <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
              />
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

        {/* Line Item Details */}
        <div className="lg:col-span-3 py-4 text-tprimary space-y-4">
          <table className='w-full'>
            <thead>
              <tr>
                <th style={{ width: "20px" }}><p className="mb-4 text-md font-semibold text-left">Product / Service</p></th>
                <th><p className="mb-4 text-md font-semibold text-left">Qty.</p></th>
                <th><p className="mb-4 text-md font-semibold text-left">Unit Price</p></th>
                <th><p className="mb-4 text-md font-semibold text-left">Total</p></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='pr-2 pb-4 w-[700px] h-[100px]'>
                  <div className="flex flex-col h-full items-start justify-start">
                    <input
                      placeholder='Name'
                      className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                    />
                    <textarea
                      placeholder='Description'
                      className="w-full border-t-0 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none h-[70px] focus:h-[100px] transition-all"
                    ></textarea>
                  </div>
                </td>
                <td className='pr-2 pb-4 h-[100px]'>
                  <div className="flex flex-col h-full items-start justify-start">
                    <input
                      placeholder='Qty'
                      className="focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg mb-2"
                    />
                    <div className="w-full h-full flex-1 border px-3 py-2 border-gray-300 border-dotted focus:border-gray-400 rounded-lg grid place-items-center cursor-pointer">
                      <CameraIcon className='text-green-800' />
                    </div>
                  </div>
                </td>
                <td className='pr-2 pb-4 h-[100px]'>
                  <div className="flex h-full items-start justify-start">
                    <input
                      placeholder='Unit Price'
                      className="focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                    />
                  </div>
                </td>
                <td className='pr-2 pb-4 h-[100px]'>
                  <div className="flex h-full items-start justify-start">
                    <input
                      placeholder='Total'
                      className="focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className='pr-2 pb-4 w-[700px] h-[100px]'>
                  <div className="flex flex-col h-full items-start justify-start">
                    <input
                      placeholder='Name'
                      className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                    />
                    <textarea
                      placeholder='Description'
                      className="w-full border-t-0 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none h-[70px] focus:h-[100px] transition-all"
                    ></textarea>
                  </div>
                </td>
                <td className='pr-2 pb-4 h-[100px]'>
                  <div className="flex flex-col h-full items-start justify-start">
                    <input
                      placeholder='Qty'
                      className="focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg mb-2"
                    />
                    <div className="w-full h-full flex-1 border px-3 py-2 border-gray-300 border-dotted focus:border-gray-400 rounded-lg grid place-items-center cursor-pointer">
                      <CameraIcon className='text-green-800' />
                    </div>
                  </div>
                </td>
                <td className='pr-2 pb-4 h-[100px]'>
                  <div className="flex h-full items-start justify-start">
                    <input
                      placeholder='Unit Price'
                      className="focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                    />
                  </div>
                </td>
                <td className='pr-2 pb-4 h-[100px]'>
                  <div className="flex h-full items-start justify-start">
                    <input
                      placeholder='Total'
                      className="focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>



          {/* Add Line Items Buttons */}
          <div className="flex space-x-4 mb-4">
            <CustomButton variant="primary" title="Add Line Item" frontIcon={<PlusIcon className='text-white' />} className="bg-primary">

            </CustomButton>
            <CustomButton title="Add Optional Line Item"
              frontIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-testid="checkbox" className='w-6 h-6 inline-block fill-green-800'><path d="M8.72 11.211a1 1 0 1 0-1.415 1.414l2.68 3.086a1 1 0 0 0 1.414 0l5.274-4.992a1 1 0 1 0-1.414-1.414l-4.567 4.285-1.973-2.379Z"></path><path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm14 2v14H5V5h14Z"></path></svg>}
            >

            </CustomButton>
            <CustomButton title="Add Text" >

            </CustomButton>
          </div>

          <div className="flex mt-4">
            <div className="p-4 rounded-lg w-1/2"></div>
            <div className="p-4 rounded-lg w-1/2">
              <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium min-w-[200px]">Subtotal</div>
                <p className='text-gray-700'>$0.00</p>
              </div>

              <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium min-w-[200px]">Discount</div>
                <p className='text-green-700 underline font-semibold'>Add discount</p>
              </div>

              <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium min-w-[200px]">GST (5.0)%</div>
                <div className="flex items-center gap-2">
                  <p className='text-gray-700'>$0.00</p>
                  <Trash2 className='w-5 h-5' color='red' />
                </div>
              </div>

              <div className="mb-2 flex items-center justify-between space-x-3 border-b-gray-300 pb-2 border-b-[5px]">
                <div className="font-semibold min-w-[200px]">Total</div>
                <p className='text-gray-700 font-semibold'>$0.00</p>
              </div>

              <div className="mb-4 flex items-center justify-between space-x-3 pb-2">
                <div className="font-medium min-w-[200px]">Required Deposit</div>
                <p className='text-green-700 underline font-semibold'>Add required deposit</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h1 className='font-bold mb-2'>Client message</h1>
            <textarea name="" id="" rows={3} className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"></textarea>
          </div>

          <div className="mt-4">
            <h1 className='font-bold mb-2'>Contract / Disclaimer</h1>
            <textarea name="" id="" rows={3} className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg">
              This quote is valid for the next 15 days, after which values may be subject to change.
            </textarea>
          </div>

          <div className="border border-gray-300 p-4 rounded-lg">
            <h1 className='font-bold mb-2'>Internal notes & attachments</h1>
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
                  <input type="checkbox" className='w-5 h-5' name="" id="jobs" />
                  <label htmlFor="jobs">jobs</label>
                </div>
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
    </div>
  );
}
