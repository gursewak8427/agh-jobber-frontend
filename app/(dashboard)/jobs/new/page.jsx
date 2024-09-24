"use client"
import React, { Fragment, useEffect } from 'react';
import { Button, TextField, IconButton, Avatar, Rating, Divider, Typography, MenuItem, ListItemIcon } from '@mui/material';
import { useState } from 'react';
import { BoxSelect, BoxSelectIcon, CameraIcon, ChevronDown, Delete, Divide, Hammer, Mail, MessageCircle, MessageSquare, MessageSquareText, Minus, Plus, PlusIcon, Trash2 } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';
import SelectClient from '@/app/_components/client/SelectClient';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useFieldArray, useForm } from 'react-hook-form';
import AddCustomFields from '@/app/_components/CustomFields';
import { createQuote, fetchallClients, fetchClient, fetchJobcount, fetchJobCustomFields, fetchQuotecount, fetchQuoteCustomFields, fetchTeam } from '@/store/slices/client';
import { useAppDispatch } from '@/store/hooks';
import CustomSingleField from '@/app/_components/CustomSingleField';
import { getAddress, getClientName, getPrimary } from '@/utils';
import SelectProperty from '@/app/_components/property/SelectProperty';
import NewProperty from '@/app/_components/property/NewProperty';
import CustomMenu from '@/components/CustomMenu';
import JobType from '@/components/JobType';

const defaultProductLineItem = { type: "default", name: "", description: "", quantity: 1, material: 0, markuppercentage: 0, markupamount: 0, labour: 0, total: 0 }
const defaultProductOptional = { type: "optional", name: "", description: "", quantity: 1, material: 0, markuppercentage: 0, markupamount: 0, labour: 0, total: 0 }
const defaultProductTextItem = { type: "text", name: "", description: "", quantity: 1, material: 0, markuppercentage: 0, markupamount: 0, labour: 0, total: 0 }

export default function Page() {
  const searchParams = useSearchParams();
  const client_id = searchParams.get("client_id");

  const [open, setOpen] = useState(false);

  const { clientslist } = useSelector(state => state.clients);
  const [rating, setRating] = useState(0);
  const [isJobno, setJobNo] = useState(false);
  const [isDiscount, setDiscount] = useState(false);
  const [isRequiredDeposit, setRequiredDeposit] = useState(false);
  const [selectClientModal, setSelectClientModal] = useState(false);
  const [selectPropertyModal, setPropertyModal] = useState(false);

  const [selectedProperty, setSelectedProperty] = useState(null);

  const { jobcustomfields } = useSelector(state => state.clients);
  const { jobcount } = useSelector(state => state.clients);
  const { client } = useSelector(state => state.clients);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      products: [defaultProductLineItem],
      discount: 0,
      requireddeposite: 0
    },
  });

  const { fields: productsList, append: appendProduct, remove: removeProduct } = useFieldArray({
    control,
    name: "products",
  });

  const watchProducts = watch("products");
  const subtotal = watch("subtotal");
  const discounttype = watch("discounttype");
  const discount = watch("discount");
  const discountAmount = watch("discountAmount");
  const gst = watch("gst");
  const totalcost = watch("totalcost");

  const requiredtype = watch("requiredtype");
  const requireddeposite = watch("requireddeposite");
  const requiredAmount = watch("requiredAmount");


  useEffect(() => {
    let _requireddeposit = 0
    if (isRequiredDeposit) {
      if (requiredtype == "percentage") {
        _requireddeposit = totalcost * (requireddeposite / 100)
      }

      if (requiredtype == "amount") {
        _requireddeposit = requireddeposite
      }
    }
    console.log({ _requireddeposit })
    setValue(`requiredAmount`, parseFloat(_requireddeposit)?.toFixed(2))
  }, [requireddeposite, requiredtype])

  // Calculation logic for each product line
  // useEffect(() => {

  // }, [watchProducts, discount, setValue]);

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


    let _totatcost = parseFloat(newSubtotal);

    setValue(`totalcost`, parseFloat(_totatcost)?.toFixed());
  }


  useEffect(() => {
    dispatch(fetchJobcount());
    dispatch(fetchallClients());
    dispatch(fetchTeam());
    dispatch(fetchJobCustomFields());
  }, [])


  useEffect(() => {
    if (!client_id) return;

    dispatch(fetchClient(client_id));
  }, [client_id])

  useEffect(() => {
    if (!client_id) return;


    console.log({ client }, '===client')

    if (client?.property?.length > 1) {
      setSelectedProperty(null)
      setPropertyModal("SELECT")
    } else {
      if (client?.property?.length == 0) {
        setSelectedProperty(null)
        setPropertyModal("NEW")
      } else {
        setSelectedProperty(client?.property?.[0])
      }
    }
  }, [client])



  const onSubmit = async (data) => {

    const changeAdditionaljobdetails = quotecustomfields
      .map((item, index) => {

        const change = data?.quoteCustomFields?.[`${item.id}key`] || null;
        if (!change) return null;

        const hasChanged = Object.keys(change).some(key => change[key] != item[key]);
        if (hasChanged) {
          return { custom_field_id: item.id, ...change };
        }
        return null;
      })
      .filter(Boolean);

    let _data = { ...data };
    delete _data?.quoteno

    let jsonData = {
      "service": data?.products?.map(product => ({
        ...product,
      })),
      "title": data?.title,
      "instruction": data?.instruction,
      "jobno": isJobno ? data?.jobno : jobcount,
      "type": data?.jobtype,
      "startdate": data?.startdate,
      "enddate": data?.enddate,
      "starttime": data?.starttime,
      "endtime": data?.endtime,
      "arrivalwindow": null,
      "schedulelater": data?.schedulelater,
      "addunscheduledvisit": true,
      "invoiceupdate": data?.invoiceupdate,
      "sendemailtoteam": data?.sendemailtoteam,
      "repeats": data?.repeats,
      "duration": data?.duration,
      "durationtype": data?.durationtype,
      "firstvisit": data?.firstvisit,
      "lastvisit": data?.lastvisit,
      "totalvisit": data?.totalvisit,
      "totalcost": data?.totalcost,
      "totalprice": data?.totalcost,
      "status": "Upcoming",
      // "contractor": 2,
      "property": selectedProperty?.id,
      "client": client_id,
      "salesperson": 3,
      // "quote": 3,
      // "team": 3,
      "custom_field": changeAdditionaljobdetails
    }

    console.log({ jsonData });
  };

  return (
    <div className='max-w-[1200px] mx-auto space-y-4'>
      <div className='text-sm text-tprimary'>
        Back to : <Link href={"/jobs"} className='text-green-700'>Jobs</Link>
      </div>
      <div className="p-8 border border-gray-200 rounded-xl border-t-8 border-t-green-700 space-y-4">
        {/* Header */}
        <div className="flex justify-start items-center mb-6">
          <div className="text-4xl font-semibold text-tprimary">Job for</div>
          <Button onClick={() => setSelectClientModal(true)} className='ml-2 capitalize flex items-center gap-2 border-b border-dashed'>
            {
              !client_id ? <>
                <div className="text-4xl font-semibold text-tprimary">Client Name</div>
                <div className="bg-green-700 px-4 py-1 rounded">
                  <PlusIcon className='text-white' />
                </div>
              </> : <div className="text-4xl font-semibold text-tprimary">{getClientName(client)}</div>
            }

          </Button>
        </div>

        {/* Job Title */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-start justify-start gap-4 border-b-4 border-b-gray-300 pb-4">
            <div className="w-1/2 flex flex-col space-y-4">
              <div className="flex flex-col">
                <input
                  {...register("title")}
                  placeholder='Title'
                  className="focus:outline-gray-500 border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                />
                <textarea
                  {...register("instructions")}
                  placeholder='Instructions'
                  className="focus:outline-gray-500 outline-offset-2 border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none border-t-0"
                ></textarea>
              </div>
              {
                client_id && <div className="flex text-sm">
                  <div className="w-1/2">
                    {
                      selectedProperty &&
                      <>
                        <h1 className='font-bold mb-2'>Property address</h1>
                        <p className='max-w-[150px]'>{getAddress(selectedProperty)}</p>
                        <Button className='text-green-700 p-0' onClick={() => {
                          setPropertyModal("SELECT")
                        }}>change</Button>
                      </>
                    }
                  </div>
                  <div className="w-1/2">
                    <h1 className='font-bold mb-2'>Contact details</h1>
                    <p className='max-w-[140px]'>{getPrimary(client?.mobile)?.number}</p>
                    <p className='max-w-[140px]'>{getPrimary(client?.email)?.email}</p>
                  </div>
                </div>
              }
            </div>
            {/* Job details */}
            <div className="p-4 rounded-lg w-1/2">
              <h1 className='font-bold mb-2'>Job details</h1>
              <div className="mb-4 flex items-center space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium min-w-[200px]">Job number #1</div>
                {
                  isJobno ? <div className="flex gap-2 items-center">
                    <input type="text" {...register("jobno")} onBlur={onBlur} defaultValue={jobcount}
                      className="w-16 h-8 text-right focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg" />
                    <CustomButton onClick={() => { setValue("jobno", jobcount); setJobNo(false) }} title={"Cancel"} />
                  </div> :
                    <Button onClick={() => setJobNo(true)} className='px-0 text-green-700 underline font-semibold'>change</Button>
                }
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
              <div className="space-y-2">
                {
                  jobcustomfields?.map((field, index) => <CustomSingleField register={register} prefix="JobCustomFields" field={field} index={index} customfields={jobcustomfields} />)
                }
              </div>
              <div className="my-4">
                <CustomButton title="Add Custom Field" onClick={() => setOpen("job")} />
              </div>
            </div>
          </div>

          <div className="py-2">
            <h2 className="text-2xl font-semibold mb-2">Type</h2>
            <div className="lg:col-span-3 py-4 text-tprimary space-y-4 flex flex-row items-start justify-start gap-2">
              <div className="w-2/5 space-y-3">
                <JobType register={register} watch={watch} setValue={setValue} />
                <div className='border border-gray-400 rounded-xl p-4 space-y-4'>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold mb-2">Team</h2>
                    <CustomButton title={"Assign"} frontIcon={<PlusIcon className='w-4 h-4' />} />
                  </div>
                  <p className="text-sm mt-2 text-gray-700 italic">No users are currently assigned</p>
                </div>
              </div>

              <div className="calender flex flex-grow flex-1">

              </div>
            </div>
          </div>


          {/* Invoicing */}
          <div className='border mb-4 border-gray-400 rounded-xl p-4 space-y-4'>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2">Invoicing</h2>
            </div>
            <div className="flex items-center mb-4">
              <input  {...register("invoiceupdate")} type="checkbox" className="mr-2 w-5 h-5" id='invoiceupdate' />
              <label className='text-sm font-semibold cursor-pointer' htmlFor='invoiceupdate'>Remind me to invoice when I close the job</label>
            </div>
          </div>

          {/* Line Items */}
          <div className='border border-gray-400 rounded-xl p-4 space-y-4'>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2">Line Items</h2>
              <CustomButton
                onClick={() => appendProduct(defaultProductLineItem)}
                variant="primary" title="New Line Item" frontIcon={<PlusIcon className='text-white' />} >
              </CustomButton>
            </div>
            <div className="flex flex-col items-center mb-4">
              {/* data products loop */}
              <table className='w-full'>
                <tbody>
                  {
                    productsList?.map((product, index) => {

                      return <>
                        {/* <tr>
                          <td colSpan={5}>
                            <Button onClick={() => { removeProduct(index); }} className='text-red-500 hover:underline float-right'>Delete</Button>
                          </td>
                        </tr> */}
                        <tr>
                          <td className='pr-2 pb-4 w-[700px] h-[100px]'>
                            <div className="flex flex-col h-full items-start justify-start">
                              <input
                                hidden
                                {...register(`products.${index}.type`)}
                                placeholder='Name'
                                value={product?.type}
                                className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                              />
                              <input
                                {...register(`products.${index}.name`)}
                                placeholder='Name'
                                className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                              />
                              <textarea
                                {...register(`products.${index}.description`)}
                                placeholder='Description'
                                className="w-full border-t-0 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none h-[70px] focus:h-[100px] transition-all"
                              ></textarea>
                            </div>
                          </td>
                          <td className='pr-2 pb-4 h-[100px]'>
                            <div className="flex flex-col h-full items-start justify-start">
                              <input
                                {...register(`products.${index}.quantity`)}
                                onBlur={onBlur}
                                placeholder='Quantity'
                                className="focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg mb-2"
                              />
                              <div className="w-full h-full flex-1 border px-3 py-2 border-gray-300 border-dotted focus:border-gray-400 rounded-lg grid place-items-center cursor-pointer">
                                <CameraIcon className='text-green-800' />
                              </div>
                            </div>
                          </td>
                          <td className='pr-2 pb-4 h-[100px]'>
                            <div className="flex flex-col h-full items-start justify-start">
                              <input
                                {...register(`products.${index}.material`)}
                                onBlur={onBlur}
                                placeholder='Material'
                                className="focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                              />
                              <input
                                {...register(`products.${index}.labour`)}
                                onBlur={onBlur}
                                placeholder='Labour'
                                className="focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none border-t-0"
                              />
                            </div>
                          </td>
                          <td className='pr-2 pb-4 h-[100px]'>
                            <div className="flex flex-col h-full items-start justify-start">
                              <input
                                {...register(`products.${index}.markuppercentage`)}
                                onBlur={onBlur}
                                placeholder='Markup (%)'
                                className="focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                              />
                              <input
                                readOnly
                                {...register(`products.${index}.markupamount`)}
                                placeholder='Amount'
                                className="focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none border-t-0"
                              />
                            </div>
                          </td>
                          <td className='pr-2 pb-4 h-[100px]'>
                            <div className="flex h-full items-start justify-start">
                              <input
                                {...register(`products.${index}.total`)}
                                readOnly
                                placeholder='Total'
                                className="focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                              />
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
                  <p className='text-gray-700 font-semibold'>${totalcost || `0.00`}</p>
                  <p className='text-gray-700 font-semibold'>${totalcost || `0.00`}</p>
                </div>
              </div>

            </div>
          </div>


          <div className="border border-gray-300 p-4 rounded-lg">
            <h1 className='text-2xl font-bold mb-2'>Internal notes & attachments</h1>
            <div className="mt-4">
              <textarea {...register("internalnote")} placeholder='Note details' name="" id="" rows={3} className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"></textarea>
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
                  <input {...register("isrelatedinvoices")} type="checkbox" className='w-5 h-5' name="" id="invoices" />
                  <label htmlFor="invoices">invoices</label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2 flex justify-between">
            <CustomButton title="Cancel"></CustomButton>
            {
              !client_id ? <CustomButton onClick={() => { setSelectClientModal(true) }} variant="primary" title="Select Client"></CustomButton> : <>
                <div className="flex gap-2 items-center">
                  <CustomButton type={"submit"} title="Save Job"></CustomButton>
                  <CustomMenu open={true} icon={<CustomButton backIcon={<ChevronDown className='w-5 h-5 text-white' />} type={"submit"} variant="primary" title="Save and"></CustomButton>}>
                    {/* Menu Items */}
                    <Typography variant="subtitle1" style={{ padding: '8px 16px', fontWeight: 'bold' }}>
                      Save and...
                    </Typography>

                    <MenuItem className="text-tprimary text-sm">
                      <ListItemIcon>
                        <Hammer className="text-green-700" size={16} />
                      </ListItemIcon>
                      Create Another
                    </MenuItem>

                    <MenuItem className="text-tprimary text-sm">
                      <ListItemIcon>
                        <MessageSquareText className="text-orange-700" size={16} />
                      </ListItemIcon>
                      Text Booking Confirmation
                    </MenuItem>

                    <MenuItem className="text-tprimary text-sm">
                      <ListItemIcon>
                        <Mail className="text-gray-700" size={16} />
                      </ListItemIcon>
                      Email Booking Confirmation
                    </MenuItem>
                  </CustomMenu>
                </div>
              </>
            }
          </div>
        </form>
      </div>

      <AddCustomFields open={open} onClose={() => setOpen(false)} />
      <SelectClient open={selectClientModal} onClose={() => setSelectClientModal(false)} onSelect={id => {
        router.push(`/jobs/new?client_id=${id}`)
        setSelectClientModal(false)
      }} clients={clientslist} />

      <SelectProperty onCreateNew={() => {
        setPropertyModal("NEW")
      }} open={selectPropertyModal == "SELECT"} onClose={() => setPropertyModal(false)} onSelect={property => {
        setSelectedProperty(property)
        setPropertyModal(false)
      }} properties={client?.property} />

      <NewProperty open={selectPropertyModal == "NEW"} onClose={() => setPropertyModal(false)} onCreate={property => {
        setSelectedProperty(property)
        setPropertyModal(false)
      }} client={client} />
    </div>
  );
}
