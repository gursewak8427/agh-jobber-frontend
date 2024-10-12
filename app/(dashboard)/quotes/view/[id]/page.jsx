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
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { quote, profile } = useAppSelector(store => store.clients)

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
      <MenuItem className="text-tprimary text-sm dark:text-dark-text">
        <ListItemIcon>
          <Hammer className="text-green-700 dark:text-dark-second-text" size={16} />
        </ListItemIcon>
        Convert to Job
      </MenuItem>

      <MenuItem className="text-tprimary text-sm dark:text-dark-text">
        <ListItemIcon>
          <Copy className="text-gray-700 dark:text-gray-400" size={16} />
        </ListItemIcon>
        Create Similar Quote
      </MenuItem>

      <Divider />

      <MenuItem>
        <Typography className='text-sm text-gray-500 dark:text-dark-text'>Send as...</Typography>
      </MenuItem>

      <MenuItem onClick={() => {
        setsendemail(true)
        setmenu(false)
      }} className="text-tprimary text-sm dark:text-dark-text">
        <ListItemIcon>
          <Mail className="text-gray-700 dark:text-gray-400" size={16} />
        </ListItemIcon>
        Email
      </MenuItem>

      <Divider />

      <MenuItem>
        <Typography className='text-sm text-gray-500 dark:text-dark-text'>Mark as...</Typography>
      </MenuItem>

      <MenuItem className="text-tprimary text-sm dark:text-dark-text">
        <ListItemIcon>
          <Check className="text-green-700 dark:text-dark-second-text" size={16} />
        </ListItemIcon>
        Approved
      </MenuItem>

      <MenuItem className="text-tprimary text-sm dark:text-dark-text">
        <ListItemIcon>
          <Archive className="text-gray-700 dark:text-gray-400" size={16} />
        </ListItemIcon>
        Archived
      </MenuItem>

      <Divider />

      <MenuItem className="text-tprimary text-sm dark:text-dark-text">
        <ListItemIcon>
          <Eye className="text-gray-700 dark:text-gray-400" size={16} />
        </ListItemIcon>
        Preview as Client
      </MenuItem>


      <MenuItem className="text-tprimary text-sm dark:text-dark-text">
        <ListItemIcon>
          <FileSignature className="text-gray-700 dark:text-gray-400" size={16} />
        </ListItemIcon>
        Collect Signature
      </MenuItem>


      <MenuItem
        className="text-tprimary text-sm dark:text-dark-text"
        onClick={() => {
          if (quote.pdffile) {
            window.open(quote.pdffile, '_blank');
          }
        }}
      >
        <ListItemIcon>
          <FileText className="text-red-700 dark:text-red-500" size={16} />
        </ListItemIcon>
        Download PDF
      </MenuItem>



      <MenuItem
        className="text-tprimary text-sm dark:text-dark-text"
        onClick={() => {
          if (quote.pdffile) {
            window.open(quote.pdffile, '_blank');
          }
        }}
      >
        <ListItemIcon>
          <Printer className="text-gray-700 dark:text-gray-400" size={16} />
        </ListItemIcon>
        Print
      </MenuItem>

    </Fragment>)
  }
  useEffect(() => {
    dispatch(fetchQuote(id))
  }, [])

  console.log({ quote })

  return (
    <div className='max-w-[1200px] mx-auto space-y-4 text-tprimary dark:text-dark-text'>
      <PageHeading>
        <div className='text-sm text-tprimary dark:text-dark-text'>
          Back to : <Link href={"/quotes"} className='text-green-700 dark:text-dark-second-text'>Quotes</Link>
        </div>
        <div className="flex items-center gap-2">
          <CustomButton onClick={() => setsendtextmsg(true)} title={"Send text message"} variant={"primary"} />
          <CustomButton onClick={() => router.push(`/quotes/edit?id=${quote?.id}&client_id=${quote?.client?.id}`)} title={"Edit"} frontIcon={<PencilIcon className='w-4 h-4' />} />
          <CustomMenu open={menu} icon={<CustomButton onClick={() => setmenu(true)} title={"More Actions"} frontIcon={<MoreHorizontal className='w-5 h-5' />} />}>
            <MoreActionsMenuItems />
          </CustomMenu>
        </div>
      </PageHeading>
      <div className="p-8 border border-gray-200 rounded-xl border-t-8 border-t-pink-950 space-y-5">
        {/* Header */}
        <p className="font-bold">
          {quote?.title}
        </p>

        <div className="flex justify-between items-center">
          <div>
            {getStatusBox(quote?.status)}
          </div>
          <div className='font-bold'>Quote #{quote.quoteno}</div>
        </div>
        <div className="flex justify-start items-center mb-6 w-full gap-3">
          <div className="text-4xl font-semibold ">{getClientName(quote?.client)}</div>
        </div>

        <div className="flex items-start justify-start gap-4 border-b-4 border-b-gray-300 pb-4">
          <div className="w-1/2 flex flex-col space-y-4">
            <div className="flex">
              <div className="w-1/2">
                <h1 className='font-bold mb-2'>Property address</h1>
                <p className='max-w-[150px] text-sm'>
                  {getAddress(quote?.property)}
                </p>
                {/* <Button className='text-green-700 p-0' onClick={() => {
                  setPropertyModal("SELECT")
                }}>change</Button> */}
              </div>
              <div className="w-1/2">
                <h1 className='font-bold mb-2'>Contact details</h1>
                <p className='max-w-[140px]'>{getPrimary(quote?.client?.mobile)?.number}</p>
                <p className='max-w-[140px]'>{getPrimary(quote?.client?.email)?.email}</p>
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
                      value={quote?.rateopportunity}
                    />
                  </td>
                </tr>
                <tr>
                  <td className='py-2'>
                    Created
                  </td>
                  <td className='py-2'>
                    {new Date(quote?.createdAt)?.toLocaleDateString()}
                  </td>
                </tr>
                <tr>
                  <td className='py-2'>
                    Salesperson
                  </td>
                  <td className='py-2'>
                    {
                      quote?.salesperson &&
                      <div className="flex gap-2 items-center">
                        <Avatar className='w-10 h-10 text-sm bg-primary-dark text-tprimary'>{quote?.salesperson?.name?.[0]}</Avatar>
                        <span>{quote?.salesperson?.name}</span>
                      </div>
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Line Item Details */}
        <div className="lg:col-span-3 py-4 text-tprimary space-y-4 dark:text-dark-text">
          <h3 className="text-2xl">Product / Service</h3>
          {
            quote?.product?.map((product, indexProduct) => {
              return <div className="border border-gray-300 rounded-lg p-2">
                <div className="flex items-center justify-between pb-5">
                  <h1 className='font-black text-lg'>{product?.name}</h1>
                  <div className="flex items-center gap-3 text-right">
                    <div className='flex items-end gap-2'>
                      <small className="italic">Total</small>
                      <div>${product?.total}</div>
                    </div>
                  </div>
                </div>
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
                      product?.items?.map((service, index) => {
                        return <tr className={`${index + 1 != product?.items?.length && "border-b"}`} key={index}>
                          <td className='pr-2 py-4 w-[700px]'>
                            <div className="flex flex-col h-full items-start justify-start">
                              <div className="text-sm">{service?.name}</div>
                              <div className="text-sm text-gray-400">{service?.description}</div>
                            </div>
                          </td>
                          <td className='pr-2 py-4 text-center'>{service?.quantity || 0} {service?.quantitytype}</td>
                          <td className='pr-2 py-4 text-center'>${service?.material || 0}</td>
                          <td className='pr-2 py-4 text-center'>${service?.labour || 0}</td>
                          <td className='pr-2 py-4 text-center'>
                            <div className="flex flex-col items-center justify-center gap-2">
                              <span className=''>${service?.markupamount}<small className='ml-1 text-gray-700 dark:text-gray-400'><i>(${service?.markuppercentage}%)</i></small></span>
                            </div>
                          </td>
                          <td className='pr-2 py-4 text-right'>${service?.total}</td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>
            })
          }

          <div className="flex mt-4">
            <div className="p-4 rounded-lg w-1/2"></div>
            <div className="p-4 rounded-lg w-1/2">
              <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium text-sm min-w-[200px]">Subtotal</div>
                <p className='text-sm text-gray-700 dark:text-dark-text'>${quote?.subtotal}</p>
              </div>

              {
                quote?.discount > 0 &&
                <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                  <div className="font-medium text-sm min-w-[200px]">Discount</div>
                  <span className='text-sm '>-(${parseFloat(quote?.discount || 0)?.toFixed(1)})<small className='ml-1 text-gray-700 dark:text-dark-text'><i>({quote?.discounttype == "percentage" ? "%" : "$"})</i></small></span>
                </div>
              }

              <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium text-sm min-w-[200px]">GST (5.0)%</div>
                <p className='text-sm text-gray-700 dark:text-dark-text'>${quote?.tax}</p>
              </div>

              <div className="mb-2 flex items-center justify-between space-x-3 border-b-gray-300 pb-2 border-b-[5px]">
                <div className="font-semibold min-w-[200px]">Total</div>
                <p className='text-gray-700 font-semibold dark:text-dark-text'>${quote?.costs}</p>
              </div>

              {
                quote?.requireddeposit > 0 &&
                <div className="mb-4 flex items-center justify-between space-x-3 pb-2">
                  <div className="font-medium text-sm min-w-[200px]">Required Deposit</div>
                  <span className='text-sm '>-(${parseFloat(quote?.requireddeposite || 0)?.toFixed(1)})<small className='ml-1 text-gray-700'><i>({quote?.depositetype == "percentage" ? "%" : "$"})</i></small></span>
                </div>
              }
            </div>
          </div>

          <div className="space-y-8">
            <div className="">
              <h1 className='font-bold mb-2'>Client message</h1>
              <p className="text-sm">{quote?.clientmessage || "--"}</p>
            </div>

            <div className="">
              <h1 className='font-bold mb-2'>Contract / Disclaimer</h1>
              <p className="text-sm">{quote?.disclaimer}</p>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-primary bg-opacity-40 border border-gray-300 p-4 rounded-lg dark:bg-dark-secondary">
        <h1 className='font-bold mb-2'>Internal notes & attachments</h1>
        <div className="mt-4">
          <textarea placeholder='Note details' name="" id="" rows={3} className="w-full dark:bg-dark-primary focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg">{quote?.internalnote || "--"}</textarea>
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
              <input readOnly checked={quote?.isrelatedinvoices} type="checkbox" className='w-5 h-5' name="" id="jobs" />
              <label htmlFor="jobs">jobs</label>
            </div>
            <div className="flex gap-2 items-center">
              <input readOnly checked={quote?.isrelatedjobs} type="checkbox" className='w-5 h-5' name="" id="invoices" />
              <label htmlFor="invoices">invoices</label>
            </div>
          </div>
        </div>

        {/* <div className="flex gap-2 items-center justify-end">
          <CustomButton title="Cancel"></CustomButton>
          <CustomButton variant={"primary"} title="Save"></CustomButton>
        </div> */}
      </div>


      <TextMessageModal open={sendtextmsg} onClose={() => setsendtextmsg(false)} client={quote?.client} quote={quote} profile={profile} />
      <SendEmailModal open={sendemail} onClose={() => setsendemail(false)} client={quote?.client} quote={quote} />
    </div>
  );
}
