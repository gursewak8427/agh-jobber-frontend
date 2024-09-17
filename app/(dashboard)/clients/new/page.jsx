"use client"
import React from 'react';
import { Button, TextField, IconButton, Avatar, Rating, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useState } from 'react';
import { BoxSelect, BoxSelectIcon, CameraIcon, ChevronDown, Delete, Divide, Plus, PlusIcon, Trash2 } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

export default function Page() {
  const [rating, setRating] = useState(0);

  return (
    <div className='max-w-[1200px] mx-auto space-y-4'>
      <div className='text-sm text-tprimary'>
        Back to : <Link href={"/clients"} className='text-green-700'>Clients</Link>
      </div>
      {/* Header */}
      <div className="flex justify-start items-center mb-6">
        <div className="text-4xl font-semibold text-tprimary">New Client</div>
      </div>

      <div className="p-8 border flex gap-4 items-start justify-start border-gray-200 rounded-xl text-tprimary">
        <div className="w-1/2 space-y-3">
          <div className="flex items-center gap-3 mb-8">
            <Avatar />
            <div className="font-bold text-2xl">Client details</div>
          </div>
          <div className="flex flex-col text-sm space-y-4">
            <div>
              <div className="flex flex-row">
                <select
                  placeholder='Name'
                  className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none rounded-r-none text-sm"
                >
                  <option className='text-tprimary' value="">No title</option>
                  <option className='text-tprimary' value="">Mr.</option>
                  <option className='text-tprimary' value="">Ms.</option>
                  <option className='text-tprimary' value="">Mrs.</option>
                  <option className='text-tprimary' value="">Miss.</option>
                  <option className='text-tprimary' value="">Dr.</option>
                </select>
                <input
                  placeholder='First Name'
                  className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 border-r-0 border-l-0 focus:border-gray-400"
                />
                <input
                  placeholder='Last Name'
                  className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-l-none rounded-b-none"
                />
              </div>
              <div>
                <input
                  placeholder='Company Name'
                  className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 border-t-0 focus:border-gray-400 rounded-lg rounded-t-none"
                />
              </div>
            </div>
            <div className="flex gap-2 items-center select-none">
              <input type="checkbox" className='w-5 h-5' name="" id="jobs" />
              <label className='cursor-pointer' htmlFor="jobs">Use company name as the primary name</label>
            </div>
            <div className='space-y-2'>
              <div className="font-bold text-md">Contact Details</div>
              <div className='phone space-y-2'>
                <div className="flex flex-row">
                  <select
                    placeholder='Name'
                    className="w-[100px] focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none rounded-r-none text-sm"
                  >
                    <option className='text-tprimary' value="">Main</option>
                    <option className='text-tprimary' value="">Work</option>
                    <option className='text-tprimary' value="">Mobile</option>
                    <option className='text-tprimary' value="">Home</option>
                    <option className='text-tprimary' value="">Fax</option>
                    <option className='text-tprimary' value="">Other</option>
                  </select>
                  <input
                    placeholder='Phone number'
                    className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 border-r-0 border-l-0 focus:border-gray-400"
                  />
                </div>
                <div className="flex gap-2 items-center select-none">
                  <input type="checkbox" className='w-5 h-5' name="" id="textmsg" />
                  <label className='cursor-pointer' htmlFor="textmsg">Receives text messages</label>
                </div>
                <div className="py-2">
                  <CustomButton title="Add Phone Number"></CustomButton>
                </div>
              </div>

              <div className='phone space-y-2'>
                <div className="flex flex-row">
                  <select
                    placeholder='Name'
                    className="w-[100px] focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none rounded-r-none text-sm"
                  >
                    <option className='text-tprimary' value="">Main</option>
                    <option className='text-tprimary' value="">Work</option>
                    <option className='text-tprimary' value="">Mobile</option>
                    <option className='text-tprimary' value="">Home</option>
                    <option className='text-tprimary' value="">Fax</option>
                    <option className='text-tprimary' value="">Other</option>
                  </select>
                  <input
                    placeholder='Email address'
                    className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 border-r-0 border-l-0 focus:border-gray-400"
                  />
                </div>
                <div className="py-2">
                  <CustomButton title="Add Email Address"></CustomButton>
                </div>
              </div>

              <div className="py-3 space-y-2">
                <label className='font-semibold' htmlFor="">Lead source</label>
                <select
                  placeholder='Name'
                  className="w-full h-11 focus:ring-2 ring-offset-2 ring-green-600  focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg text-sm"
                >
                  <option className='text-tprimary' value="">Select a source</option>
                  <option className='text-tprimary' value="">Referral</option>
                  <option className='text-tprimary' value="">Google</option>
                  <option className='text-tprimary' value="">Facebook</option>
                </select>
              </div>

              <Accordion className='shadow-none'>
                <AccordionSummary
                  expandIcon={<ChevronDown />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className='font-bold text-[15px] text-tprimary hover:bg-primary-dark'
                >
                  Automated notifications
                </AccordionSummary>
                <AccordionDetails>
                  <div className="space-y-4">
                    <div className='flex justify-between items-center text-tprimary'>
                      <div className="flex flex-col">
                        <div className='font-semibold'>Quote follow-up</div>
                        <div>Follow up on an outstanding quote. <Link href={"#"} className='text-green-700'>Settings</Link></div>
                      </div>
                      <input type="checkbox" className='w-5 h-5' name="" id="" />
                    </div>

                    <div className='flex justify-between items-center text-tprimary'>
                      <div className="flex flex-col">
                        <div className='font-semibold'>Assessment and visit reminders</div>
                        <div>Remind your client of an upcoming assessment or visit. <Link href={"#"} className='text-green-700'>Settings</Link></div>
                      </div>
                      <input type="checkbox" className='w-5 h-5' name="" id="" />
                    </div>

                    <div className='flex justify-between items-center text-tprimary'>
                      <div className="flex flex-col">
                        <div className='font-semibold'>Job follow-up</div>
                        <div>Follow up when you close a job. <Link href={"#"} className='text-green-700'>Settings</Link></div>
                      </div>
                      <input type="checkbox" className='w-5 h-5' name="" id="" />
                    </div>

                    <div className='flex justify-between items-center text-tprimary'>
                      <div className="flex flex-col">
                        <div className='font-semibold'>Invoice follow-up</div>
                        <div>Follow up on an overdue invoice. <Link href={"#"} className='text-green-700'>Settings</Link></div>
                      </div>
                      <input type="checkbox" className='w-5 h-5' name="" id="" />
                    </div>
                  </div>

                </AccordionDetails>
              </Accordion>
              <Accordion className='shadow-none'>
                <AccordionSummary
                  expandIcon={<ChevronDown />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                  className='font-bold text-[15px] text-tprimary hover:bg-primary-dark'
                >
                  Additional client details
                </AccordionSummary>
                <AccordionDetails>
                  <CustomButton title="Add Custom Field" />
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-1/2">
          <div className="flex items-center gap-3 mb-8">
            <Avatar />
            <div className="font-bold text-2xl">Property details</div>
          </div>
          <div className="flex flex-col text-sm space-y-4">
            <div>
              <div>
                <input
                  placeholder='Street 1'
                  className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                />
              </div>
              <div>
                <input
                  placeholder='Street 2'
                  className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none rounded-b-none"
                />
              </div>
              <div className="flex flex-row">
                <input
                  placeholder='City'
                  className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400"
                />
                <input
                  placeholder='Province'
                  className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400"
                />
              </div>

              <div className="flex flex-row">
                <input
                  placeholder='Postal Code'
                  className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none rounded-r-none"
                />
                <select
                  placeholder='Name'
                  className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none rounded-l-none"
                >
                  <option className='text-tprimary' value="">India</option>
                  <option className='text-tprimary' value="">Canada</option>
                </select>
              </div>
            </div>

            <p>Taxes <span className='text-green-700 underline ml-2 font-semibold'>GST (5.0%) (Default)</span></p>
            <div className="flex gap-2 items-center select-none">
              <input type="checkbox" className='w-5 h-5' name="" id="jobs" />
              <label className='cursor-pointer' htmlFor="jobs">Billing address is the same as property address</label>
            </div>


            <Accordion className='shadow-none'>
              <AccordionSummary
                expandIcon={<ChevronDown />}
                aria-controls="panel2-content"
                id="panel2-header"
                className='font-bold text-[15px] text-tprimary hover:bg-primary-dark'
              >
                Additional property details
              </AccordionSummary>
              <AccordionDetails>
                <CustomButton title="Add Custom Field" />
              </AccordionDetails>
            </Accordion>

          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2 flex justify-between">
        <CustomButton title="Cancel"></CustomButton>
        <div className="flex items-center gap-3">
          <CustomButton title="Save And Create Another"></CustomButton>
          <CustomButton variant="primary" title="Save Client"></CustomButton>
        </div>
      </div>
    </div>
  );
}
