"use client"
import React, { Fragment, useEffect } from 'react';
import { Button, TextField, IconButton, Avatar, Rating, Divider, Typography, MenuItem, ListItemIcon, Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react';
import { Archive, Bell, BoxSelect, BoxSelectIcon, CameraIcon, Check, ChevronDown, Copy, Delete, Divide, DollarSign, Download, Eye, FileIcon, FileSignature, FileSignatureIcon, FileText, Hammer, Mail, MessageCircle, MessageSquare, MessageSquareText, Minus, MoreHorizontal, PencilIcon, PencilLine, Plus, PlusIcon, Printer, SignatureIcon, Star, Trash2 } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';
import SelectClient from '@/app/_components/client/SelectClient';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useFieldArray, useForm } from 'react-hook-form';
import AddCustomFields from '@/app/_components/CustomFields';
import { createJobService, createQuote, fetchallClients, fetchClient, fetchJob, fetchQuote, fetchQuotecount, fetchQuoteCustomFields, fetchTeam } from '@/store/slices/client';
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
import NewTimeEntry from '@/app/_components/job/NewTimeEntry';
import NewExpense from '@/app/_components/job/NewExpense';
import NewVisit from '@/app/_components/job/NewVisit';
import NewInvoiceReminder from '@/app/_components/job/NewInvoiceReminder';


const defaultProductLineItem = { type: "default", name: "", description: "", quantity: 1, material: 0, markuppercentage: 0, markupamount: 0, labour: 0, total: 0 }

export default function Page() {
  const [sendtextmsg, setsendtextmsg] = useState(false)
  const [sendemail, setsendemail] = useState(false)

  const [newtimeentry, setnewtimeentry] = useState(false)
  const [newexpense, setnewexpense] = useState(false)
  const [newvisit, setnewvisit] = useState(false)
  const [invoicereminder, setinvoicereminder] = useState(false)

  const [menu, setmenu] = useState(false)
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { job } = useAppSelector(store => store.clients)

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      products: [],
    },
  });

  const { fields: productsList, append: appendProduct, remove: removeProduct } = useFieldArray({
    control,
    name: "products",
  });

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

  const TabBox = () => {
    const [value, setValue] = React.useState(0);


    function a11yProps(index) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }

    function CustomTabPanel(props) {
      const { children, value, index, ...other } = props;

      return (
        <div
          className="w-full"
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
      );
    }

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (<div className="w-full text-sm">
      <Tabs className='border-b' value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Billing" {...a11yProps(0)} />
        <Tab label="Invoicing reminders" {...a11yProps(1)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <div className="w-full flex items-start justify-start gap-6">
          <div className="w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center">
            <DollarSign />
          </div>
          <div className="">
            <p className="font-semibold">No invoices</p>
            <p>There are no current invoices for this client yet</p>
            <div className="my-1">
              <CustomButton title={"New Invoice"} />
            </div>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="w-full flex items-start justify-start gap-6">
          <div className="w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center">
            <Bell />
          </div>
          <div className="">
            <p className="font-semibold">No Reminders</p>
            <p>Fewer invoices slip through the cracks when you set up reminders</p>
            <div className="my-1">
              <CustomButton onClick={() => setinvoicereminder(true)} title={"New Invoice Reminder"} />
            </div>
          </div>
        </div>
      </CustomTabPanel>
    </div>)
  }

  const watchProducts = watch("products");


  const onBlur = () => {
    let newSubtotal = 0;

    watchProducts.forEach((product, index) => {
      if (product.type !== "text") {
        const material = parseFloat(product.material) || 0;
        const labour = parseFloat(product.labour) || 0;
        const markupPercentage = parseFloat(product.markuppercentage) || 0;

        const markupAmount = (material + labour) * (markupPercentage / 100);
        const totalAmount = (material + labour + markupAmount) * (product?.quantity || 1);

        setValue(`products.${index}.markupamount`, markupAmount.toFixed(2));
        setValue(`products.${index}.total`, totalAmount.toFixed(2));

        newSubtotal += totalAmount;
      }
    });
  }


  const MoreActionsMenuItems = () => {
    return (<Fragment>
      <MenuItem className="text-tprimary text-sm">
        <ListItemIcon>
          <Hammer className="text-green-700" size={16} />
        </ListItemIcon>
        Close Job
      </MenuItem>

      <MenuItem className="text-tprimary text-sm">
        <ListItemIcon>
          <Copy className="text-gray-700" size={16} />
        </ListItemIcon>
        Create Similar Job
      </MenuItem>

      <MenuItem onClick={() => {
        // setsendemail(true)
        // setmenu(false)
      }} className="text-tprimary text-sm">
        <ListItemIcon>
          <Mail className="text-gray-700" size={16} />
        </ListItemIcon>
        Send job follow-up email
      </MenuItem>

      <MenuItem onClick={() => {
        // setsendemail(true)
        // setmenu(false)
      }} className="text-tprimary text-sm">
        <ListItemIcon>
          <MessageSquare className="text-gray-700" size={16} />
        </ListItemIcon>
        Text Booking Confirmation
      </MenuItem>



      <MenuItem onClick={() => {
        // setsendemail(true)
        // setmenu(false)
      }} className="text-tprimary text-sm">
        <ListItemIcon>
          <Mail className="text-gray-700" size={16} />
        </ListItemIcon>
        Email Booking Confirmation
      </MenuItem>

      <Divider />


      <MenuItem onClick={() => {
        // setsendemail(true)
        // setmenu(false)
      }} className="text-tprimary text-sm">
        <ListItemIcon>
          <DollarSign className="text-blue-700" size={16} />
        </ListItemIcon>
        Generate Invoice
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

      <MenuItem onClick={() => {
        // setsendemail(true)
        // setmenu(false)
      }} className="text-tprimary text-sm">
        <ListItemIcon>
          <FileIcon className="text-green-700" size={16} />
        </ListItemIcon>
        Email job costs CSV
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

  useEffect(() => {
    dispatch(fetchJob(id))
  }, [])

  console.log({ job });

  const [addNewLineItem, setAddNewLineItem] = useState(false)

  const saveService = () => {
    console.log({ watchProducts })

    let product = watchProducts?.[0]
    if (!product) return;

    let jsonData = {
      "name": product?.name,
      "description": product?.description,
      "type": "default",
      "quantity": product?.quantity,
      "material": product?.material,
      "markuppercentage": product?.markuppercentage,
      "markupamount": product?.markupamount,
      "labour": product?.labour,
      "total": product?.total,
      "job": job?.id
    }

    dispatch(createJobService(jsonData))

    setAddNewLineItem(false)
  }


  return (
    <div className='max-w-[1200px] mx-auto space-y-4 text-tprimary'>
      <PageHeading>
        <div className='text-sm text-tprimary '>
          Back to : <Link href={"/jobs"} className='text-green-700'>Jobs</Link>
        </div>
        <div className="flex items-center gap-2">
          <CustomButton onClick={() => setsendtextmsg(true)} title={"Show late visit"} variant={"primary"} />
          <CustomButton title={"Edit"} frontIcon={<PencilIcon className='w-4 h-4' />} />
          <CustomMenu open={menu == "more_actions"} icon={<CustomButton onClick={() => setmenu("more_actions")} title={"More Actions"} frontIcon={<MoreHorizontal className='w-5 h-5' />} />}>
            <MoreActionsMenuItems />
          </CustomMenu>
        </div>
      </PageHeading>
      <div className="p-8 border border-gray-200 rounded-xl border-t-8 border-t-pink-950 space-y-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className='flex items-center gap-4'>
            <Hammer className='w-8 h-8 text-green-700' />
            {getStatusBox("Draft")}
          </div>
          <div className='font-bold'>Job #{job?.jobno}</div>
        </div>
        <div className="flex justify-start items-center mb-6 w-full gap-3">
          <div className="text-4xl font-semibold ">{getClientName(job?.client)}</div>
          {/* <span>{getStatusBox("Lead")}</span> */}
        </div>

        <p className="font-bold">
          {job?.title}
        </p>

        <div className="flex items-start justify-start gap-4 border-b-4 border-b-gray-300">
          <div className="w-1/2 flex flex-col space-y-4">
            <div className="flex">
              <div className="w-1/2">
                <h1 className='font-bold mb-2'>Property address</h1>
                <p className='max-w-[150px] font-extralight text-gray-500 text-sm'>
                  {getAddress(job?.property)}
                </p>
                {/* <Button className='text-green-700 p-0' onClick={() => {
                  setPropertyModal("SELECT")
                }}>change</Button> */}
              </div>
              <div className="w-1/2 font-extralight text-gray-500 text-sm">
                <h1 className='font-bold mb-2 text-black'>Contact details</h1>
                <p className='max-w-[140px]'>{getPrimary(job?.client?.mobile)?.number}</p>
                <p className='max-w-[140px]'>{getPrimary(job?.client?.email)?.email}</p>              </div>
            </div>
          </div>
          {/* Quote Details */}
          <div className="p-4 w-1/2 border-l-4 border-gray-300">
            <h1 className='font-bold mb-2 text-black'>Job details</h1>
            <table className='w-full'>
              <tbody>
                <tr className='border-b'>
                  <td className='py-2'>
                    Job type
                  </td>
                  <td className='py-2'>
                    {job?.type}
                  </td>
                </tr>
                <tr className='border-b'>
                  <td className='py-2'>
                    Started on
                  </td>
                  <td className='py-2'>
                    {job?.startdate}
                  </td>
                </tr>
                <tr className='border-b'>
                  <td className='py-2'>
                    Ends on
                  </td>
                  <td className='py-2'>
                    {job?.enddate}
                  </td>
                </tr>
                <tr className='border-b'>
                  <td className='py-2'>
                    Billing frequency
                  </td>
                  <td className='py-2'>
                    {job?.repeats}
                  </td>
                </tr>
                <tr className=''>
                  <td className='py-2'>
                    Salesperson
                  </td>
                  <td className='py-2'>
                    {job?.salesperson?.name}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-primary p-2 rounded space-y-4">

          <CustomButton title={"Show Profitability"} backIcon={<ChevronDown />} />
          {/* Line Item Details */}

          {/* Profitabilty */}
          <div className="flex items-center justify-between p-4">
            {/* Left Side: Profit margin percentage */}
            <div className="flex flex-col items-start">
              <p className="text-lg font-semibold text-gray-700">100%</p>
              <p className="text-sm text-gray-500">Profit margin</p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Middle: Price breakdown */}
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Total price</p>
                  <p className="text-sm font-semibold text-gray-700">${job?.totalprice}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-blue-500">Line Item Cost</p>
                  <p className="text-sm font-semibold text-gray-700">$0.00</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-blue-500">Labour</p>
                  <p className="text-sm font-semibold text-gray-700">${job?.service?.reduce((total, job) => total + parseFloat(job?.labour), 0)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-blue-500">Material</p>
                  <p className="text-sm font-semibold text-gray-700">${job?.service?.reduce((total, job) => total + parseFloat(job?.material), 0)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-blue-500">Expenses</p>
                  <p className="text-sm font-semibold text-gray-700">$0.00</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-green-500">Profit</p>
                  <p className="text-sm font-semibold text-gray-700">$0.00</p>
                </div>
              </div>

              {/* Right Side: Circular Graph */}
              {/* <div className="w-12 h-12 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-semibold text-green-500">100%</span>
                </div>
              </div> */}
            </div>
          </div>


          <div className="lg:col-span-3 py-4 text-tprimary space-y-4 bg-white p-4 rounded-lg">
            <div className="pb-3 flex gap-4 items-center justify-between w-full">
              <h1 className='text-2xl font-bold text-tprimary'>Line Items</h1>
              <CustomButton title={"New Line Item"} onClick={() => setAddNewLineItem(true)} />
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
                  job?.service?.map((service, index) => {
                    return <tr className='border-b' key={index}>
                      <td className='pr-2 py-4 w-[700px]'>
                        <div className="flex flex-col h-full items-start justify-start">
                          <div className="text-sm">{service?.name}</div>
                          <div className="text-sm text-gray-400">{service?.description}</div>
                        </div>
                      </td>
                      <td className='pr-2 py-4 text-center'>{service?.quantity || 0}</td>
                      <td className='pr-2 py-4 text-center'>${service?.material || 0}</td>
                      <td className='pr-2 py-4 text-center'>${service?.labour || 0}</td>
                      <td className='pr-2 py-4 text-center'>
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className=''>${service?.markupamount}<small className='ml-1 text-gray-700'><i>(${service?.markuppercentage}%)</i></small></span>
                        </div>
                      </td>
                      <td className='pr-2 py-4 text-right'>${service?.total}</td>
                    </tr>
                  })
                }
                {
                  addNewLineItem && <>


                    <tr>
                      <td className='pr-2 pt-2 pb-4 w-[700px] h-[100px]'>
                        <div className="flex flex-col h-full items-start justify-start">
                          <input
                            {...register(`products[0].name`)}
                            placeholder='Name'
                            className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                          />
                          <textarea
                            {...register(`products[0].description`)}
                            placeholder='Description'
                            className="w-full border-t-0 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none h-[70px] focus:h-[100px] transition-all"
                          ></textarea>
                        </div>
                      </td>
                      <td className='pr-2 pt-2 pb-4 h-[100px]'>
                        <div className="flex w-[100px] flex-col h-full items-start justify-start">
                          <input
                            {...register(`products[0].quantity`)}
                            onBlur={onBlur}
                            placeholder='Quantity'
                            className="focus:outline-none w-full border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg mb-2"
                          />
                          <div className="w-full h-full flex-1 border px-3 py-2 border-gray-300 border-dotted focus:border-gray-400 rounded-lg grid place-items-center cursor-pointer">
                            <CameraIcon className='text-green-800' />
                          </div>
                        </div>
                      </td>
                      <td className='pr-2 pt-2 pb-4 h-[100px]'>
                        <div className="flex w-[100px] flex-col h-full items-start justify-start">
                          <input
                            {...register(`products[0].material`)}
                            onBlur={onBlur}
                            placeholder='Material'
                            className="focus:outline-none w-full border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                          />
                        </div>
                      </td>
                      <td className='pr-2 pt-2 pb-4 h-[100px]'>
                        <div className="flex w-[100px] flex-col h-full items-start justify-start">
                          <input
                            {...register(`products[0].labour`)}
                            onBlur={onBlur}
                            placeholder='Labour'
                            className="focus:outline-none w-full border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                          />
                        </div>
                      </td>
                      <td className='pr-2 pt-2 pb-4 h-[100px]'>
                        <div className="flex flex-col  w-[100px]  h-full items-start justify-start">
                          <input
                            {...register(`products[0].markuppercentage`)}
                            onBlur={onBlur}
                            placeholder='Markup (%)'
                            className="focus:outline-none w-full border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                          />
                          <input
                            readOnly
                            {...register(`products[0].markupamount`)}
                            placeholder='Amount'
                            className="focus:outline-none  w-full border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none border-t-0"
                          />
                        </div>
                      </td>
                      <td className='pr-2 pt-2 pb-4 h-[100px]'>
                        <div className="flex flex-col h-full items-start justify-start">
                          <input
                            {...register(`products[0].total`)}
                            readOnly
                            placeholder='Total'
                            className="focus:outline-none  w-full  border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <div className="flex gap-2 items-center">
                          <Button onClick={() => saveService()} type='submit' className="text-green-700 border-green-700" variant='outlined'>Save</Button>
                          <Button onClick={() => setAddNewLineItem(false)} type='button' className="text-red-400 border-red-400" variant='outlined'>Cancel</Button>
                        </div>
                      </td>
                    </tr>
                  </>
                }

                {/* <tr className='border-b'>
                  <td className='pr-2 py-4 w-[700px]'>
                    <div className="flex flex-col h-full items-start justify-start">
                      <div className="text-sm">Free Assessment</div>
                      <div className="text-sm text-gray-400">Our experts will come to assess your needs and discuss solutions</div>
                    </div>
                  </td>
                  <td className='pr-2 py-4 text-center'>1</td>
                  <td className='pr-2 py-4 text-center'>$0</td>
                  <td className='pr-2 py-4 text-center'>$0</td>
                  <td className='pr-2 py-4 text-center'>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className=''>$25<small className='ml-1 text-gray-700'><i>(10%)</i></small></span>
                    </div>
                  </td>
                  <td className='pr-2 py-4 text-right'>$0</td>
                </tr> */}
                <tr>
                  <td colSpan={2} className='p-4 pl-0'>
                  </td>
                  <td className='pr-2 py-4 text-center'>
                    ${job?.service?.reduce((total, job) => total + parseFloat(job?.material), 0)}
                  </td>
                  <td className='pr-2 py-4 text-center'>
                    ${job?.service?.reduce((total, job) => total + parseFloat(job?.labour), 0)}
                  </td>
                  <td className='pr-2 py-4 text-center'></td>
                  <td className='pr-2 py-4 text-right'>${job?.totalprice}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-3 py-4 text-tprimary space-y-4 bg-white p-4 rounded-lg">
            <div className="pb-3 flex gap-4 items-center justify-between w-full">
              <h1 className='text-2xl font-bold text-tprimary'>Labour</h1>
              <CustomButton title={"New Time Entry"} onClick={() => setnewtimeentry(true)} />
            </div>

            {
              job?.labour?.length == 0 || !job?.labour ?
                <p className='text-gray-500'>
                  Time tracked to this job by you or your team will show here
                </p> :

                <table className='w-full'>
                  <thead>
                    <tr className='border-b'>
                      <th><p className="mb-4 text-md font-semibold text-left px-4">Date</p></th>
                      <th><p className="px-2 mb-4 text-md font-semibold text-left">Start Time</p></th>
                      <th><p className="mb-4 text-md font-semibold text-center">End Time</p></th>
                      <th><p className="mb-4 text-md font-semibold text-center">Hours</p></th>
                      <th><p className="mb-4 text-md font-semibold text-right">Employee Cost</p></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      job?.labour?.map((labour, index) => {
                        return <tr className='border-b hover:bg-gray-200 cursor-pointer' onClick={() => {
                          setnewtimeentry(labour)
                        }} key={index}>
                          <td className='pr-2 py-4 text-left'>{labour?.date}</td>
                          <td className='pr-2 py-4 text-left'>{labour?.starttime}</td>
                          <td className='pr-2 py-4 text-center'>{labour?.endtime}</td>
                          <td className='pr-2 py-4 text-center'>{labour?.hour}:{labour?.minutes}</td>
                          <td className='pr-2 py-4 text-right'>${labour?.employeecost}</td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
            }

          </div>

          <div className="lg:col-span-3 py-4 text-tprimary space-y-4 bg-white p-4 rounded-lg">
            <div className="pb-3 flex gap-4 items-center justify-between w-full">
              <h1 className='text-2xl font-bold text-tprimary'>Expenses</h1>
              <CustomButton title={"New Expense"} onClick={() => setnewexpense(true)} />
            </div>

            {
              job?.expense?.length == 0 || !job?.expense ?
                <p className='text-gray-500'>
                  Get an accurate picture of various job costs by recording expenses
                </p> :

                <table className='w-full'>
                  <thead>
                    <tr className='border-b'>
                      <th style={{ width: "20px" }}><p className="px-2 mb-4 text-md font-semibold text-left">Item</p></th>
                      <th><p className="mb-4 text-md font-semibold text-center">Date</p></th>
                      <th><p className="mb-4 text-md font-semibold text-right px-4">Total</p></th>
                      <th><p className="mb-4 text-md font-semibold">Actions</p></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      job?.expense?.map((expense, index) => {
                        return <tr className='border-b hover:bg-gray-200 cursor-pointer' onClick={() => {
                          setnewexpense(expense)
                        }} key={index}>
                          <td className='pr-2 py-4 w-[700px] px-2'>
                            <div className="text-sm">{expense?.itemname}</div>
                          </td>
                          <td className='pr-2 py-4 text-center'>{expense?.date}</td>
                          <td className='pr-2 py-4 text-right'>${expense?.total}</td>
                          <td className='py-4 text-right'>
                            <div className="flex w-full items-center justify-center">
                              {
                                expense?.receipt && <Link onClick={e => e?.stopPropagation()} href={process?.env?.NEXT_PUBLIC_IMAGE_URL + expense?.receipt} target='blank'><CustomButton frontIcon={<Download className='w-4 h-4' />} title={"Recipt"} /></Link>
                              }
                            </div>
                          </td>
                        </tr>
                      })
                    }
                    <tr>
                      <td colSpan={2} className='p-4 pl-0'>
                      </td>
                      <td className='pr-2 py-4 text-right font-semibold'>
                        ${job?.expense?.reduce((total, expense) => total + parseFloat(expense?.total), 0)}
                      </td>
                      <td className='pr-2 py-4 text-center'>
                      </td>
                    </tr>
                  </tbody>
                </table>
            }


          </div>
        </div>

        <div className="lg:col-span-3 py-4 text-tprimary space-y-4 bg-white p-4 rounded-lg border text-sm">
          <div className="pb-3 flex gap-4 items-center justify-between w-full">
            <h1 className='text-2xl font-bold text-tprimary'>Visits</h1>
            <CustomButton title={"New Visit"} onClick={() => setnewvisit(true)} />
          </div>

          <div className="font-semibold text-sm border-b text-green-700">
            Scheduled
          </div>

          <table className='w-full'>
            <tbody>
              {
                job?.visit?.map((visit, index) => {
                  return <tr onClick={() => setnewvisit(visit)} key={`visit-${index}`} className={`${index + 1 != job?.visit?.length && 'border-b'} hover:bg-gray-100 cursor-pointer`}>
                    <td className='px-2 py-2 flex-1 w-[80%] text-tprimary text-sm font-semibold'>{(new Date(visit?.startdate)?.toLocaleDateString())}</td>
                    <td className='px-2 py-2'>
                      {(visit?.team && visit?.team?.length > 0 ? <>
                        <div className="flex gap-2 items-center space-y-2">
                          {
                            visit?.team?.map(t => {
                              return <div className='bg-gray-200 rounded px-3'>{t?.name}</div>
                            })
                          }
                        </div>
                      </> : <>Not assigned yet</>)}
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>


          {/* <div className="font-semibold text-sm border-b text-orange-600">
            Unscheduled
          </div> */}

          {/* <table className='w-full'>
            <tbody>
              <tr>
                <td className='flex-1 w-[80%] text-orange-600 text-sm font-semibold'>Sep 26, 2024 7:56PM</td>
                <td className=''>Not assigned yet</td>
              </tr>
            </tbody>
          </table> */}
          {/* 
          <div className="font-semibold text-sm border-b text-red-600">
            Overdue
          </div> */}

          {/* <table className='w-full'>
            <tbody>
              <tr>
                <td className='flex-1 w-[80%] text-red-600 text-sm font-semibold'>Sep 26, 2024 7:56PM</td>
                <td className=''>Assigned to Adarshpal singh</td>
              </tr>
            </tbody>
          </table> */}
        </div>

        <div className="lg:col-span-3 text-tprimary space-y-4 bg-white rounded-lg border text-sm">
          <div className="pb-3 flex gap-4 items-center justify-between w-full p-4">
            <h1 className='text-2xl font-bold text-tprimary'>Billing</h1>
            <CustomMenu open={menu == "invoicereminder"} icon={<CustomButton title={"New"} backIcon={<ChevronDown className='w-4 h-4' />} onClick={() => setmenu("invoicereminder")} />}>
              <MenuItem className="text-tprimary text-sm">
                <ListItemIcon>
                  <Hammer className="text-green-700" size={16} />
                </ListItemIcon>
                Invoice
              </MenuItem>
              <MenuItem onClick={() => {
                setinvoicereminder(true)
                setmenu(null)
              }} className="text-tprimary text-sm">
                <ListItemIcon>
                  <DollarSign className="text-blue-700" size={16} />
                </ListItemIcon>
                Invoice Reminder
              </MenuItem>
            </CustomMenu>
          </div>
          <TabBox />
        </div>
      </div>


      <div className="bg-primary bg-opacity-40 border border-gray-300 p-4 rounded-lg">
        <h1 className='font-bold mb-2'>Internal notes & attachments</h1>
        <div className="mt-4">
          <textarea placeholder='Note details' name="" id="" rows={3} className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg">
            {job?.internalnote || ""}
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

      <NewTimeEntry job={job} open={newtimeentry} onClose={() => setnewtimeentry(false)} />
      <NewExpense job={job} open={newexpense} onClose={() => setnewexpense(false)} />
      <NewVisit job={job} open={newvisit} onClose={() => setnewvisit(false)} />
      <NewInvoiceReminder open={invoicereminder} onClose={() => setinvoicereminder(false)} />
    </div >
  );
}