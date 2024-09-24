"use client"
import React, { Fragment, useEffect } from 'react';
import { Button, TextField, IconButton, Avatar, Rating, Divider, Typography, MenuItem, ListItemIcon } from '@mui/material';
import { useState } from 'react';
import { Archive, BoxSelect, BoxSelectIcon, CameraIcon, Check, ChevronDown, Copy, Delete, Divide, Eye, FileSignature, FileText, Hammer, Mail, MessageCircle, MessageSquare, MessageSquareText, Minus, MoreHorizontal, PencilIcon, PencilLine, Plus, PlusIcon, Printer, Trash2 } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';
import SelectClient from '@/app/_components/client/SelectClient';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useFieldArray, useForm } from 'react-hook-form';
import AddCustomFields from '@/app/_components/CustomFields';
import { createQuote, fetchallClients, fetchClient, fetchQuote, fetchQuotecount, fetchQuoteCustomFields, fetchTeam } from '@/store/slices/client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import CustomSingleField from '@/app/_components/CustomSingleField';
import { getAddress, getClientName, getPrimary } from '@/utils';
import SelectProperty from '@/app/_components/property/SelectProperty';
import NewProperty from '@/app/_components/property/NewProperty';
import CustomMenu from '@/components/CustomMenu';
import Heading from '@/components/Heading';
import PageHeading from '@/components/PageHeading';
import TextMessageModal from '@/app/_components/quote/TextMessageModal';
import SendEmailModal from '@/app/_components/quote/SendEmailModal';


export default function Page() {
  const [sendtextmsg, setsendtextmsg] = useState(false)
  const [sendemail, setsendemail] = useState(false)
  const [menu, setmenu] = useState(false)
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { quote } = useAppSelector(store => store.clients)

  const getStatusBox = status => {
    switch (status) {
      case "Draft": return <div className="w-full h-full flex items-center justify-start capitalize">
        <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
        {status}
      </div>
      case "Lead": return <div className="w-full h-full flex items-center justify-start capitalize">
        <div className="w-3 h-3 bg-green-800 rounded-full mr-2"></div>
        {status}
      </div>
      case "Awaiting Response": return <div className="w-full h-full flex items-center justify-start capitalize">
        <div className="w-3 h-3 bg-green-800 rounded-full mr-2"></div>
        {status}
      </div>

      default:
        break;
    }
  }

  const MoreActionsMenuItems = () => {
    return (<Fragment>
      <MenuItem className="text-tprimary text-sm">
        <ListItemIcon>
          <Hammer className="text-green-700" size={16} />
        </ListItemIcon>
        Convert to Job
      </MenuItem>

      <MenuItem className="text-tprimary text-sm">
        <ListItemIcon>
          <Copy className="text-gray-700" size={16} />
        </ListItemIcon>
        Create Similar Quote
      </MenuItem>

      <Divider />

      <MenuItem>
        <Typography className='text-sm text-gray-500'>Send as...</Typography>
      </MenuItem>

      <MenuItem onClick={() => {
        setsendemail(true)
        setmenu(false)
      }} className="text-tprimary text-sm">
        <ListItemIcon>
          <Mail className="text-gray-700" size={16} />
        </ListItemIcon>
        Email
      </MenuItem>

      <Divider />

      <MenuItem>
        <Typography className='text-sm text-gray-500'>Mark as...</Typography>
      </MenuItem>

      <MenuItem className="text-tprimary text-sm">
        <ListItemIcon>
          <Check className="text-green-700" size={16} />
        </ListItemIcon>
        Approved
      </MenuItem>

      <MenuItem className="text-tprimary text-sm">
        <ListItemIcon>
          <Archive className="text-gray-700" size={16} />
        </ListItemIcon>
        Archived
      </MenuItem>

      <Divider />

      <MenuItem className="text-tprimary text-sm">
        <ListItemIcon>
          <Eye className="text-gray-700" size={16} />
        </ListItemIcon>
        Preview as Client
      </MenuItem>


      <MenuItem className="text-tprimary text-sm">
        <ListItemIcon>
          <FileSignature className="text-gray-700" size={16} />
        </ListItemIcon>
        Collect Signature
      </MenuItem>


      <MenuItem className="text-tprimary text-sm">
        <ListItemIcon>
          <FileText className="text-red-700" size={16} />
        </ListItemIcon>
        Download PDF
      </MenuItem>


      <MenuItem className="text-tprimary text-sm">
        <ListItemIcon>
          <Printer className="text-gray-700" size={16} />
        </ListItemIcon>
        Print
      </MenuItem>

    </Fragment>)
  }
  useEffect(()=>{
    dispatch(fetchQuote(id))
  },[])

  return (
    <div className='max-w-[1200px] mx-auto space-y-4 text-tprimary'>
      <PageHeading>
        <div className='text-sm text-tprimary '>
          Back to : <Link href={"/quotes"} className='text-green-700'>Quotes</Link>
        </div>
        <div className="flex items-center gap-2">
          <CustomButton onClick={() => setsendtextmsg(true)} title={"Send text message"} variant={"primary"} />
          <CustomButton title={"Edit"} frontIcon={<PencilIcon className='w-4 h-4' />} />
          <CustomMenu open={menu} icon={<CustomButton onClick={() => setmenu(true)} title={"More Actions"} frontIcon={<MoreHorizontal className='w-5 h-5' />} />}>
            <MoreActionsMenuItems />
          </CustomMenu>
        </div>
      </PageHeading>
      <div className="p-8 border border-gray-200 rounded-xl border-t-8 border-t-pink-950 space-y-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            {getStatusBox("Draft")}
          </div>
          <div className='font-bold'>Quote #8</div>
        </div>
        <div className="flex justify-start items-center mb-6 w-full gap-3">
          <div className="text-4xl font-semibold ">Client name</div>
          <span>{getStatusBox("Lead")}</span>
        </div>

        <div className="flex items-start justify-start gap-4 border-b-4 border-b-gray-300 pb-4">
          <div className="w-1/2 flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="font-bold">job title</div>
            </div>
            <div className="flex">
              <div className="w-1/2">
                <h1 className='font-bold mb-2'>Property address</h1>
                <p className='max-w-[150px] text-sm'>
                  2016 Avenida Visconde de Guarapuava Centro, Cochabamba, Paraná 80060-060
                </p>
                <Button className='text-green-700 p-0' onClick={() => {
                  setPropertyModal("SELECT")
                }}>change</Button>
              </div>
              <div className="w-1/2">
                <h1 className='font-bold mb-2'>Contact details</h1>
                <p className='max-w-[140px] text-sm'>123-456-7890</p>
                <p className='max-w-[140px] text-sm text-green-600'>garry94556@gmail.com</p>
              </div>
            </div>
          </div>
          {/* Quote Details */}
          <div className="p-4 rounded-lg w-1/2">
            <table className='w-full'>
              <tbody>
                <tr>
                  <td className='py-2'>
                    Rating
                  </td>
                  <td className='py-2'>
                    <Rating
                      readOnly
                      name="rating"
                      value={3}
                    />
                  </td>
                </tr>
                <tr>
                  <td className='py-2'>
                    Created At
                  </td>
                  <td className='py-2'>
                    Sep 22, 2024
                  </td>
                </tr>
                <tr>
                  <td className='py-2'>
                    Salesperson
                  </td>
                  <td className='py-2'>
                    <div className="flex gap-2 items-center">
                      <Avatar className='w-10 h-10 text-sm bg-primary-dark text-tprimary'>GS</Avatar>
                      <span>Gurvinder Singh</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Line Item Details */}
        <div className="lg:col-span-3 py-4 text-tprimary space-y-4">
          <table className='w-full'>
            <thead>
              <tr>
                <th style={{ width: "20px" }}><p className="mb-4 text-md font-semibold text-left">Product / Service</p></th>
                <th><p className="mb-4 text-md font-semibold text-left">Qty.</p></th>
                <th><p className="mb-4 text-md font-semibold text-left px-4">Material</p></th>
                <th><p className="mb-4 text-md font-semibold text-left px-4">Labour</p></th>
                <th><p className="mb-4 text-md font-semibold text-left px-4">Markup</p></th>
                <th><p className="mb-4 text-md font-semibold text-right">Total</p></th>
              </tr>
            </thead>
            <tbody>
              {/* For Text Fields */}
              {/* <tr>
                <td className='pr-2 pb-4 w-[700px] h-[100px]'>
                  <div className="flex flex-col h-full items-start justify-start">
                    <div className="text-sm">Free Assessment</div>
                    <div className="text-sm text-gray-400">Our experts will come to assess your needs and discuss solutions</div>
                  </div>
                </td>
                <td className='pr-2 pb-4 h-[100px]'>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr> */}
              <tr>
                <td className='pr-2 pb-4 w-[700px] h-[100px]'>
                  <div className="flex flex-col h-full items-start justify-start">
                    <div className="text-sm">Free Assessment</div>
                    <div className="text-sm text-gray-400">Our experts will come to assess your needs and discuss solutions</div>
                  </div>
                </td>
                <td className='pr-2 pb-4 h-[100px] text-center'>1</td>
                <td className='pr-2 pb-4 h-[100px] text-center'>$0</td>
                <td className='pr-2 pb-4 h-[100px] text-center'>$0</td>
                <td className='pr-2 pb-4 h-[100px] text-center'>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className=''>$25<small className='ml-1 text-gray-700'><i>(10%)</i></small></span>
                  </div>
                </td>
                <td className='pr-2 pb-4 h-[100px] text-right'>$0</td>
              </tr>
            </tbody>
          </table>

          <div className="flex mt-4">
            <div className="p-4 rounded-lg w-1/2"></div>
            <div className="p-4 rounded-lg w-1/2">
              <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium text-sm min-w-[200px]">Subtotal</div>
                <p className='text-sm text-gray-700'>$100</p>
              </div>

              <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium text-sm min-w-[200px]">Discount</div>
                <span className='text-sm '>-$10<small className='ml-1 text-gray-700'><i>(10%)</i></small></span>
              </div>

              <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium text-sm min-w-[200px]">GST (5.0)%</div>
                <p className='text-sm text-gray-700'>$2.51</p>
              </div>

              <div className="mb-2 flex items-center justify-between space-x-3 border-b-gray-300 pb-2 border-b-[5px]">
                <div className="font-semibold min-w-[200px]">Total</div>
                <p className='text-gray-700 font-semibold'>$92.51</p>
              </div>

              <div className="mb-4 flex items-center justify-between space-x-3 pb-2">
                <div className="font-medium text-sm min-w-[200px]">Required Deposit</div>
                <span className='text-sm '>$25<small className='ml-1 text-gray-700'><i>(10%)</i></small></span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="">
              <h1 className='font-bold mb-2'>Client message</h1>
              <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum, excepturi.</p>
            </div>

            <div className="">
              <h1 className='font-bold mb-2'>Contract / Disclaimer</h1>
              <p className="text-sm">This quote is valid for the next 15 days, after which values may be subject to change.</p>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-primary bg-opacity-40 border border-gray-300 p-4 rounded-lg">
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

        <div className="flex gap-2 items-center justify-end">
          <CustomButton title="Cancel"></CustomButton>
          <CustomButton variant={"primary"} title="Save"></CustomButton>
        </div>
      </div>


      <TextMessageModal open={sendtextmsg} onClose={() => setsendtextmsg(false)} />
      <SendEmailModal open={sendemail} onClose={() => setsendemail(false)} />
    </div >
  );
}