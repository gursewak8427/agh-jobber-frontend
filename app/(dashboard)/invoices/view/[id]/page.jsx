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
import TextMessageModal from '@/app/_components/invoice/TextMessageModal';
import SendEmailModal from '@/app/_components/invoice/SendEmailModal';
import ShowCustomFields from '@/app/_components/ShowCustomFields';
import ProductsView from '@/app/_components/products/ProductsView';



export default function Page() {
  const router = useRouter();
  const [sendtextmsg, setsendtextmsg] = useState(false)
  const [sendemail, setsendemail] = useState(false)
  const [menu, setmenu] = useState(false)
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { invoice, profile } = useAppSelector(store => store.clients)

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
        setsendtextmsg(true)
        setmenu(false)
      }} className="text-tprimary dark:text-dark-text text-sm">
        <ListItemIcon>
          <MessageSquare className="text-gray-700 dark:text-gray-400" size={16} />
        </ListItemIcon>
        Text Message
      </MenuItem>



      <MenuItem onClick={() => {
        setsendemail(true)
        setmenu(false)
      }} className="text-tprimary dark:text-dark-text text-sm">
        <ListItemIcon>
          <Mail className="text-gray-700 dark:text-gray-400" size={16} />
        </ListItemIcon>
        Email
      </MenuItem>

      <Divider />


      <MenuItem onClick={() => {
        // setsendemail(true)
        // setmenu(false)
      }} className="text-tprimary dark:text-dark-text text-sm">
        <ListItemIcon>
          <Eye className="text-gray-700 dark:text-gray-400" size={16} />
        </ListItemIcon>
        Preview as client
      </MenuItem>

      <Divider />

      <MenuItem onClick={() => {
        // setsendemail(true)
        // setmenu(false)
      }} className="text-tprimary dark:text-dark-text text-sm">
        <ListItemIcon>
          <FileSignatureIcon className="text-gray-700 dark:text-gray-400" size={16} />
        </ListItemIcon>
        Collect Signature
      </MenuItem>


      <MenuItem className="text-tprimary dark:text-dark-text text-sm">
        <ListItemIcon>
          <FileText className="text-red-700" size={16} />
        </ListItemIcon>
        Download PDF
      </MenuItem>


      <MenuItem className="text-tprimary dark:text-dark-text text-sm">
        <ListItemIcon>
          <Printer className="text-gray-700 dark:text-gray-400" size={16} />
        </ListItemIcon>
        Print
      </MenuItem>

      <Divider />

      <MenuItem className="text-tprimary dark:text-dark-text text-sm">
        <ListItemIcon>
          <DollarSign className="text-blue-700 dark:text-blue-500" size={16} />
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
    <div className='max-w-[1200px] mx-auto space-y-4 text-tprimary dark:text-dark-text'>
      <PageHeading>
        <div className='text-sm text-tprimary dark:text-dark-text'>
          Back to : <Link href={"/invoices"} className='text-green-700 dark:text-dark-second-text'>invoices</Link>
        </div>
        <div className="flex items-center gap-2">
          <CustomButton frontIcon={<CreditCard className='text-white' />} title={"Collect Payments"} variant={"primary"} />
          <CustomButton onClick={() => router.push(`/invoices/edit?id=${invoice?.id}&client_id=${invoice?.client?.id}`)} title={"Edit"} frontIcon={<PencilIcon className='w-4 h-4' />} />
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
                <p className='max-w-[150px] font-extralight text-gray-500 text-sm dark:text-dark-text'>
                  {getAddress(invoice?.property)}
                </p>
                {/* <Button className='text-green-700 p-0' onClick={() => {
                  setPropertyModal("SELECT")
                }}>change</Button> */}
              </div>
              <div className="w-1/3">
                <h1 className='font-bold mb-2'>Service address</h1>
                <p className='max-w-[150px] font-extralight text-gray-500 text-sm dark:text-dark-text'>
                  (Same as billing address)
                </p>
                {/* <Button className='text-green-700 p-0' onClick={() => {
                  setPropertyModal("SELECT")
                }}>change</Button> */}
              </div>
              <div className="w-1/3 font-extralight text-gray-500 text-sm dark:text-gray-300">
                <h1 className='font-bold mb-2 text-black dark:text-dark-text'>Contact details</h1>
                <p className='max-w-[140px]'>{getPrimary(invoice?.client?.mobile)?.number}</p>
                <p className='max-w-[140px]'>{getPrimary(invoice?.client?.email)?.email}</p>
              </div>
            </div>
          </div>
          {/* Quote Details */}
          <div className="p-4 w-1/3 border-l-4 border-gray-300">
            <h1 className='font-bold mb-2 text-black dark:text-dark-text'>Invoice details</h1>
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

        <div className="lg:col-span-3 py-4 text-tprimary dark:text-dark-text space-y-4 bg-white p-4 rounded-lg dark:bg-dark-primary">
          <ProductsView product={invoice?.service} />

          <div className="flex mt-4">
            <div className="p-4 pl-0 rounded-lg w-1/2">
              <p className='text-sm text-gray-400'>{invoice?.clientmessage || "---"}</p>
            </div>
            <div className="p-4 rounded-lg w-1/2">
              <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium text-sm min-w-[200px]">Subtotal</div>
                <p className='text-sm text-gray-700 dark:text-dark-text'>${invoice?.subtotal}</p>
              </div>

              {
                invoice?.discount > 0 && <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                  <div className="font-medium text-sm min-w-[200px]">Discount</div>
                  <span className='text-sm '>-(${parseFloat(invoice?.discount * invoice?.subtotal / 100 || 0)?.toFixed(1)})<small className='ml-1 text-gray-700 dark:text-dark-text'><i>({invoice?.discount}{invoice?.discounttype == "percentage" ? "%" : "$"})</i></small></span>
                </div>
              }

              <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium text-sm min-w-[200px]">GST (5.0)%</div>
                <p className='text-sm text-gray-700 dark:text-dark-text'>${invoice?.tax}</p>
              </div>

              <div className="mb-2 flex items-center justify-between space-x-3 border-b-gray-300 pb-2 border-b-[5px]">
                <div className="font-semibold min-w-[200px]">Total</div>
                <p className='text-gray-700 font-semibold dark:text-dark-text'>${invoice?.costs}</p>
              </div>

              <div className="mb-4 flex items-center justify-between space-x-3 pb-2">
                <div className="font-medium text-sm min-w-[200px]">Account balance <div className="text-red-500">Pending</div></div>
                <span className='text-sm '>$25<small className='ml-1 text-gray-700 dark:text-dark-text'><i>(10%)</i></small></span>
              </div>
            </div>
          </div>

        </div>

      </div>


      <div className="bg-primary bg-opacity-40 border border-gray-300 p-4 rounded-lg dark:bg-dark-secondary">
        <h1 className='font-bold mb-2'>Internal notes & attachments</h1>
        <div className="mt-4">
          <textarea placeholder='Note details' name="" id="" rows={3} className="w-full dark:bg-dark-primary focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg">
            {invoice?.internalnote}
          </textarea>
        </div>

        <div className="mt-4 border-2 border-gray-300 text-sm border-dashed p-2 py-4 rounded-xl flex justify-center items-center">
          <label htmlFor="" className='text-gray-500'>Drag your files here or <span className='ml-2 text-green-700 font-semibold border-2 rounded-xl p-2'>Select a file</span></label>
          <input hidden type="file" name="" id="" />
        </div>

        <div className="gap-2 items-center justify-end hidden">
          <CustomButton title="Cancel"></CustomButton>
          <CustomButton variant={"primary"} title="Save"></CustomButton>
        </div>
      </div>


      <TextMessageModal open={sendtextmsg} onClose={() => setsendtextmsg(false)} client={invoice.client} profile={profile} invoice={invoice} />
      <SendEmailModal open={sendemail} onClose={() => setsendemail(false)} invoice={invoice} profile={profile} />
    </div>
  );
}
