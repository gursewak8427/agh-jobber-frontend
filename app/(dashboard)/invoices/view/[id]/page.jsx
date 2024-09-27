"use client"
import React, { Fragment, useEffect } from 'react';
import { Button, TextField, IconButton, Avatar, Rating, Divider, Typography, MenuItem, ListItemIcon, Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react';
import { Archive, Bell, BoxSelect, BoxSelectIcon, CameraIcon, Check, ChevronDown, Copy, CreditCard, Delete, Divide, DollarSign, Eye, FileIcon, FileSignature, FileSignatureIcon, FileText, Hammer, Mail, MessageCircle, MessageSquare, MessageSquareText, Minus, MoreHorizontal, PencilIcon, PencilLine, Plus, PlusIcon, Printer, SignatureIcon, Star, Trash2 } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';
import SelectClient from '@/app/_components/client/SelectClient';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useFieldArray, useForm } from 'react-hook-form';
import AddCustomFields from '@/app/_components/CustomFields';
import { createQuote, fetchallClients, fetchClient, fetchInvoice, fetchQuote, fetchQuotecount, fetchQuoteCustomFields, fetchTeam } from '@/store/slices/client';
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
import ShowCustomFields from '@/app/_components/ShowCustomFields';



export default function Page() {
  const [sendtextmsg, setsendtextmsg] = useState(false)
  const [sendemail, setsendemail] = useState(false)
  const [menu, setmenu] = useState(false)
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { invoice } = useAppSelector(store => store.clients)

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
      <MenuItem onClick={() => {
        // setsendemail(true)
        // setmenu(false)
      }} className="text-tprimary text-sm">
        <ListItemIcon>
          <MessageSquare className="text-gray-700" size={16} />
        </ListItemIcon>
        Text Message
      </MenuItem>



      <MenuItem onClick={() => {
        // setsendemail(true)
        // setmenu(false)
      }} className="text-tprimary text-sm">
        <ListItemIcon>
          <Mail className="text-gray-700" size={16} />
        </ListItemIcon>
        Email
      </MenuItem>

      <Divider />


      <MenuItem onClick={() => {
        // setsendemail(true)
        // setmenu(false)
      }} className="text-tprimary text-sm">
        <ListItemIcon>
          <Eye className="text-gray-700" size={16} />
        </ListItemIcon>
        Preview as client
      </MenuItem>

      <Divider />

      <MenuItem onClick={() => {
        // setsendemail(true)
        // setmenu(false)
      }} className="text-tprimary text-sm">
        <ListItemIcon>
          <FileSignatureIcon className="text-gray-700" size={16} />
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

      <Divider />

      <MenuItem className="text-tprimary text-sm">
        <ListItemIcon>
          <DollarSign className="text-blue-700" size={16} />
        </ListItemIcon>
        Close Invoice
      </MenuItem>

    </Fragment>)
  }
  useEffect(() => {
    dispatch(fetchInvoice(id))
  }, [])



  console.log({ invoice }, '===invoice')

  return (
    <div className='max-w-[1200px] mx-auto space-y-4 text-tprimary'>
      <PageHeading>
        <div className='text-sm text-tprimary '>
          Back to : <Link href={"/invoices"} className='text-green-700'>invoices</Link>
        </div>
        <div className="flex items-center gap-2">
          <CustomButton onClick={() => setsendtextmsg(true)} frontIcon={<CreditCard className='text-white' />} title={"Collect Payments"} variant={"primary"} />
          <CustomButton title={"Edit"} frontIcon={<PencilIcon className='w-4 h-4' />} />
          <CustomMenu open={menu} icon={<CustomButton onClick={() => setmenu(true)} title={"More Actions"} frontIcon={<MoreHorizontal className='w-5 h-5' />} />}>
            <MoreActionsMenuItems />
          </CustomMenu>
        </div>
      </PageHeading>
      <div className="p-8 border border-gray-200 rounded-xl border-t-8 border-t-pink-950 space-y-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className='flex items-center gap-4'>
            <Hammer className='w-8 h-8 text-green-700' />
            {getStatusBox(invoice?.status)}
          </div>
          <div className='font-bold'>Invoices #{invoice?.invoiceno}</div>
        </div>
        <div className="flex justify-start items-center mb-6 w-full gap-3">
          <div className="text-4xl font-semibold ">{getClientName(invoice?.client)}</div>
          {/* <span>{getStatusBox("Lead")}</span> */}
        </div>

        <p className="font-bold capitalize">
          {invoice?.subject}
        </p>

        <div className="flex items-start justify-start gap-4 border-b-4 border-b-gray-300">
          <div className="w-2/3 flex flex-col space-y-4">
            <div className="flex">
              <div className="w-1/3">
                <h1 className='font-bold mb-2'>Billing address</h1>
                <p className='max-w-[150px] font-extralight text-gray-500 text-sm'>
                  {getAddress(invoice?.property)}
                </p>
                {/* <Button className='text-green-700 p-0' onClick={() => {
                  setPropertyModal("SELECT")
                }}>change</Button> */}
              </div>
              <div className="w-1/3">
                <h1 className='font-bold mb-2'>Service address</h1>
                <p className='max-w-[150px] font-extralight text-gray-500 text-sm'>
                  (Same as billing address)
                </p>
                {/* <Button className='text-green-700 p-0' onClick={() => {
                  setPropertyModal("SELECT")
                }}>change</Button> */}
              </div>
              <div className="w-1/3 font-extralight text-gray-500 text-sm">
                <h1 className='font-bold mb-2 text-black'>Contact details</h1>
                <p className='max-w-[140px]'>{getPrimary(invoice?.client?.mobile)?.number}</p>
                <p className='max-w-[140px]'>{getPrimary(invoice?.client?.email)?.email}</p>
              </div>
            </div>
          </div>
          {/* Quote Details */}
          <div className="p-4 w-1/3 border-l-4 border-gray-300">
            <h1 className='font-bold mb-2 text-black'>Invoice details</h1>
            <table className='w-full'>
              <tbody>
                <tr className='border-b'>
                  <td className='py-2'>
                    Issued
                  </td>
                  <td className='py-2'>
                    {invoice?.issueddate}
                  </td>
                </tr>
                <tr className='border-b'>
                  <td className='py-2'>
                    Due
                  </td>
                  <td className='py-2'>
                    {invoice?.paymentduedate}
                  </td>
                </tr>
                <tr className=''>
                  <td className='py-2'>
                    Salesperson
                  </td>
                  <td className='py-2'>
                    {invoice?.salesperson?.name}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="space-y-2 w-full">
              {
                invoice?.custom_field?.map((field, index) => <ShowCustomFields field={field} index={index} customfields={invoice?.custom_field} />)
              }
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 py-4 text-tprimary space-y-4 bg-white p-4 rounded-lg">
          <table className='w-full'>
            <thead>
              <tr className='border-b'>
                <th style={{ width: "20px" }}><p className="mb-4 text-md font-semibold text-left">Product / Service</p></th>
                <th><p className="mb-4 text-md font-semibold text-left">Qty.</p></th>
                <th><p className="mb-4 text-md font-semibold text-left px-4">Material</p></th>
                <th><p className="mb-4 text-md font-semibold text-left px-4">Labour</p></th>
                <th><p className="mb-4 text-md font-semibold text-left px-4">Markup</p></th>
                <th><p className="mb-4 text-md font-semibold text-right">Total</p></th>
              </tr>
            </thead>
            <tbody>
              {
                invoice?.service?.map((service, index) => {
                  return <tr className='border-b' key={index}>
                    <td className='pr-2 py-4 w-[700px]'>
                      <div className="flex flex-col h-full items-start justify-start">
                        <div className="text-sm">{service?.name}</div>
                        <div className="text-sm text-gray-400">{service?.description}</div>
                      </div>
                    </td>
                    <td className='pr-2 py-4 text-center'>{service?.quantity}</td>
                    <td className='pr-2 py-4 text-center'>${service?.material}</td>
                    <td className='pr-2 py-4 text-center'>${service?.labour}</td>
                    <td className='pr-2 py-4 text-center'>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className=''>${service?.markupamount}<small className='ml-1 text-gray-700'><i>(${service?.markuppercentage}%)</i></small></span>
                      </div>
                    </td>
                    <td className='pr-2 py-4 text-right'>${service?.total}</td>
                  </tr>
                })
              }

            </tbody>
          </table>


          <div className="flex mt-4">
            <div className="p-4 pl-0 rounded-lg w-1/2">
              <p className='text-sm text-gray-400'>{invoice?.clientmessage || "---"}</p>
            </div>
            <div className="p-4 rounded-lg w-1/2">
              <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium text-sm min-w-[200px]">Subtotal</div>
                <p className='text-sm text-gray-700'>${invoice?.subtotal}</p>
              </div>

              <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium text-sm min-w-[200px]">Discount</div>
                <span className='text-sm '>-(${parseFloat(invoice?.discount || 0)?.toFixed(1)})<small className='ml-1 text-gray-700'><i>({invoice?.discounttype == "percentage" ? "%" : "$"})</i></small></span>
              </div>

              <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium text-sm min-w-[200px]">GST (5.0)%</div>
                <p className='text-sm text-gray-700'>${invoice?.tax}</p>
              </div>

              <div className="mb-2 flex items-center justify-between space-x-3 border-b-gray-300 pb-2 border-b-[5px]">
                <div className="font-semibold min-w-[200px]">Total</div>
                <p className='text-gray-700 font-semibold'>${invoice?.costs}</p>
              </div>

              <div className="mb-4 flex items-center justify-between space-x-3 pb-2">
                <div className="font-medium text-sm min-w-[200px]">Account balance <div className="text-red-500">Pending</div></div>
                <span className='text-sm '>$25<small className='ml-1 text-gray-700'><i>(10%)</i></small></span>
              </div>
            </div>
          </div>

        </div>

      </div>


      <div className="bg-primary bg-opacity-40 border border-gray-300 p-4 rounded-lg">
        <h1 className='font-bold mb-2'>Internal notes & attachments</h1>
        <div className="mt-4">
          <textarea placeholder='Note details' name="" id="" rows={3} className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg">
            {invoice?.internalnote}
          </textarea>
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
              <input readOnly type="checkbox" className='w-5 h-5' name="" id="jobs" />
              <label htmlFor="jobs">jobs</label>
            </div>
            <div className="flex gap-2 items-center">
              <input readOnly type="checkbox" className='w-5 h-5' name="" id="invoices" />
              <label htmlFor="invoices">invoices</label>
            </div>
          </div>
          <div className="text-red-500">Pending</div>
        </div>

        <div className="gap-2 items-center justify-end hidden">
          <CustomButton title="Cancel"></CustomButton>
          <CustomButton variant={"primary"} title="Save"></CustomButton>
        </div>
      </div>


      <TextMessageModal open={sendtextmsg} onClose={() => setsendtextmsg(false)} />
      <SendEmailModal open={sendemail} onClose={() => setsendemail(false)} />
    </div >
  );
}
