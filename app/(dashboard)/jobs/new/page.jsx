"use client"
import React, { Fragment, useEffect } from 'react';
import { Button, TextField, IconButton, Avatar, Rating, Divider, Typography, MenuItem, ListItemIcon } from '@mui/material';
import { useState } from 'react';
import { BoxSelect, BoxSelectIcon, CameraIcon, ChevronDown, Delete, Divide, Hammer, Mail, MessageCircle, MessageSquare, MessageSquareText, Minus, Plus, PlusIcon, Trash2, X } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';
import SelectClient from '@/app/_components/client/SelectClient';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import AddCustomFields from '@/app/_components/CustomFields';
import { createJob, createJobEmployeeSheet, createJobExepense, createJobService, createJobVisit, createQuote, fetchallClients, fetchClient, fetchJobcount, fetchJobCustomFields, fetchQuotecount, fetchQuoteCustomFields, fetchTeam } from '@/store/slices/client';
import { useAppDispatch } from '@/store/hooks';
import CustomSingleField from '@/app/_components/CustomSingleField';
import { formatDate, generateVisits, generateVisitsFor17th, getAddress, getClientName, getPrimary } from '@/utils';
import SelectProperty from '@/app/_components/property/SelectProperty';
import NewProperty from '@/app/_components/property/NewProperty';
import CustomMenu from '@/components/CustomMenu';
import JobType from '@/components/JobType';
import Heading from '@/components/Heading';
import { toast } from 'react-toastify';
import ProductsList, { defaultProductLineItem, updateProductsFn, updateProductsFnV2 } from '@/app/_components/products/ProductsList';
import { useCustomRouter } from '@/hooks/use-custom-router';


export default function Page() {
  const searchParams = useSearchParams();
  const client_id = searchParams.get("client_id");
  const { customPush } = useCustomRouter();

  const [menu, setMenu] = useState("")
  const [selectedSalesPerson, setSalesPerson] = useState(null)
  const [teamList, setTeamList] = useState([])

  const [open, setOpen] = useState(false);

  const [visits, setVisits] = useState([]);

  const [rating, setRating] = useState(0);
  const [isJobno, setJobNo] = useState(false);
  const [isDiscount, setDiscount] = useState(false);
  const [isRequiredDeposit, setRequiredDeposit] = useState(false);
  const [selectClientModal, setSelectClientModal] = useState(false);
  const [selectPropertyModal, setPropertyModal] = useState(false);

  const [selectedProperty, setSelectedProperty] = useState(null);

  const { clientslist, client, team, jobcount, jobcustomfields, loadingObj } = useSelector(state => state.clients);

  const dispatch = useAppDispatch();
  // const router = useRouter();
  const methods = useForm({
    defaultValues: {
      products: [defaultProductLineItem],
      discount: 0,
      requireddeposite: 0,
      invocieReceiveType: "per_visit"
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
    getValues
  } = methods;

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
  const jobtype = watch("jobtype");
  const repeats = watch("repeats");
  const startDate = watch("startdate");
  const endDate = watch("enddate");
  const starttime = watch("starttime");
  const endtime = watch("endtime");
  const duration = watch("duration");
  const durationtype = watch("durationtype");
  const schedulelater = watch("schedulelater");


  useEffect(() => {
    if (jobtype == "oneoff") {

      const startdate = getValues("startdate"); // Start date in YYYY-MM-DD format (Monday in this case)
      const enddate = getValues("enddate"); // Start date in YYYY-MM-DD format (Monday in this case)
      const starttime = getValues("starttime");
      const endtime = getValues("endtime");

      setVisits([{
        startdate, enddate, starttime, endtime
      }])
    } else {
      const startDate = getValues("startdate"); // Start date in YYYY-MM-DD format (Monday in this case)

      if (!startDate) return;

      const startTime = getValues("starttime");
      const endTime = getValues("endtime");
      const duration = getValues("duration");
      const durationtype = getValues("durationtype");

      const dayOfWeek = 2; // 0 = Sunday, 1 = Monday, 2 = Tuesday, ...

      let _visits = []

      if (repeats == "17th_of_monthly") {
        _visits = generateVisitsFor17th(startDate, startTime, endTime, parseInt(duration), durationtype);
      } else if (repeats == "as_we_need") {
        _visits = []
      } else {
        _visits = generateVisits(startDate, startTime, endTime, repeats, dayOfWeek, parseInt(duration), durationtype);
      }


      setVisits(_visits?.map(v => ({
        ...v,
        startdate: formatDate(v?.startdate),
        ...(v?.enddate && { enddate: formatDate(v?.enddate) })
      })))
    }


  }, [startDate, endDate, starttime, endtime, jobtype, repeats, duration, durationtype])

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

  const closeMenu = () => setMenu("")

  // Calculation logic for each product line
  useEffect(() => {
    onBlur()
  }, [JSON.stringify(watchProducts)]);

  const onBlur = () => {
    let [newSubtotalWihoutMarkup, newSubtotal] = updateProductsFnV2({ watchProducts, setValue });

    setValue(`totalcost`, parseFloat(newSubtotalWihoutMarkup)?.toFixed());
    setValue(`totalprice`, parseFloat(newSubtotal)?.toFixed());
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

    const changeAdditionaljobdetails = jobcustomfields?.map((item, index) => {

      const change = data?.JobCustomFields?.[`${item.id}key`] || null;
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

      ...(!Boolean(data?.schedulelater) && {
        "starttime": data?.starttime,
        ...(data?.jobtype == "oneoff" && {
          "enddate": data?.enddate,
        }),
        "endtime": data?.endtime,
      }),

      ...(data?.jobtype == "recurring" && {
        "duration": data?.duration,
        "durationtype": data?.durationtype,
      }),

      "arrivalwindow": null,
      "schedulelater": data?.schedulelater,
      "addunscheduledvisit": true,
      "sendemailtoteam": data?.sendemailtoteam,
      "repeats": data?.repeats,


      "firstvisit": data?.firstvisit,
      "lastvisit": data?.lastvisit,
      "totalvisit": data?.totalvisit,
      "totalcost": data?.totalcost,
      "totalprice": data?.totalprice,
      "internalnote": data?.internalnote,
      "isrelatedinvoices": data?.isrelatedinvoices,
      "status": "Upcoming",
      "visit": data?.schedulelater ? [] : visits?.map(v => ({
        title: data?.title,
        instruction: data?.instruction,
      })),
      // [{
      //   "startdate": data?.startdate,
      //   ...(data?.jobtype == "oneoff" && {
      //     "enddate": data?.enddate,
      //   }),
      //   "starttime": data?.starttime,
      //   "endtime": data?.endtime,
      // }],

      // startdate
      // enddate
      // starttime
      // endtime
      // schedulelater
      // anytime
      // addunscheduledvisit
      // sendemailtoteam
      // teamreminder

      // "contractor": 2,
      "property_id": selectedProperty?.id,
      "client_id": client_id,
      "salesperson_id": selectedSalesPerson?.id,
      // "quote": 3,
      "custom_field": changeAdditionaljobdetails,
      "invoice": {
        ...(data?.jobtype == "oneoff" ? {
          "invoiceupdate": data?.invoiceupdate,
        } : {
          "invocieReceiveType": data?.invocieReceiveType,
          "invoiceTiming": data?.invoiceTiming,
        }),
      },
      "team": teamList?.map(t => t?.id),
    }


    console.log({ jsonData });

    dispatch(createJob(jsonData)).then(({ payload }) => {
      if (payload?.id) {
        // router.push(`/jobs/view/${payload?.id}`)
        customPush(`/jobs/view/${payload?.id}`)
      }
    });
  };

  //#TODO redux api to hit for creating four services of job must include job_id:job.id in each request
  // dispatch(createJobService())
  // dispatch(createJobVisit())
  // dispatch(createJobExepense())
  // dispatch(createJobEmployeeSheet())
  return (
    <div className='max-w-[1200px] mx-auto space-y-4'>
      <div className='text-sm text-tprimary dark:text-dark-text'>
        Back to : <Link href={"/jobs"} className='text-green-700 dark:text-dark-second-text'>Jobs</Link>
      </div>
      <div className="p-8 border border-gray-200 rounded-xl border-t-8 border-t-green-700 space-y-4">
        {/* Header */}
        <div className="flex justify-start items-center mb-6">
          <div className="text-4xl font-semibold text-tprimary dark:text-dark-text">Job for</div>
          <Button onClick={() => setSelectClientModal(true)} className='ml-2 capitalize flex items-center gap-2 border-b border-dashed'>
            {
              !client_id ? <>
                <div className="text-4xl font-semibold text-tprimary dark:text-dark-text">Client Name</div>
                <div className="bg-green-700 px-4 py-1 rounded">
                  <PlusIcon className='text-white' />
                </div>
              </> : <div className="text-4xl font-semibold text-tprimary dark:text-dark-text">{getClientName(client)}</div>
            }

          </Button>
        </div>

        {/* Job Title */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-start justify-start gap-4 border-b-4 border-b-gray-300 pb-4">
              <div className="w-1/2 flex flex-col space-y-4">
                <div className="flex flex-col">
                  <input
                    {...register("title")}
                    placeholder='Title'
                    className="focus:outline-gray-500 dark:bg-dark-secondary border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                  />
                  <textarea
                    {...register("instructions")}
                    placeholder='Instructions'
                    className="focus:outline-gray-500 dark:bg-dark-secondary outline-offset-2 border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none border-t-0"
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
                  <div className="font-medium min-w-[200px]">Job number #{jobcount}</div>
                  {
                    isJobno ? <div className="flex gap-2 items-center">
                      <input type="text" {...register("jobno")} onBlur={onBlur} defaultValue={jobcount}
                        className="w-16 h-8 dark:bg-dark-secondary text-right focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg" />
                      <CustomButton onClick={() => { setValue("jobno", jobcount); setJobNo(false) }} title={"Cancel"} />
                    </div> :
                      <Button onClick={() => setJobNo(true)} className='px-0 text-green-700 underline font-semibold'>change</Button>
                  }
                </div>

                <div className="mb-4 flex items-center space-x-3 border-b border-b-gray-400 pb-2">
                  <div className="font-medium min-w-[200px]">Salesperson</div>
                  {
                    selectedSalesPerson ? <div className="flex items-center bg-secondary p-2 rounded-full dark:bg-dark-primary">
                      <Avatar className="mr-2 bg-slate-600 text-sm dark:text-dark-text">{selectedSalesPerson?.name[0]}</Avatar>
                      <div className="text-sm">{selectedSalesPerson?.name}</div>
                      <IconButton color="error" onClick={() => setSalesPerson(null)}>
                        <X />
                      </IconButton>
                    </div> :
                      <CustomMenu open={menu == "salesperson"} icon={<CustomButton onClick={() => setMenu("salesperson")} title={"Add"} frontIcon={<PlusIcon className='w-4 h-4' />} />}>
                        {
                          team?.map((t, i) => {
                            return <MenuItem key={`salesperson-${i}`} onClick={() => {
                              closeMenu();
                              setSalesPerson(t)
                            }}>
                              <Typography>{t?.name}</Typography>
                            </MenuItem>
                          })
                        }
                      </CustomMenu>
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
              <div className="lg:col-span-3 py-4 text-tprimary dark:text-dark-text space-y-4 flex flex-row items-start justify-start gap-2">
                <div className="w-2/5 space-y-3">
                  <JobType visits={visits} register={register} watch={watch} setValue={setValue} />

                  {/* Team  */}
                  <div className='border border-gray-400 rounded-xl p-4 space-y-4'>
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold mb-2">Team</h2>
                      <CustomMenu open={menu == "team"} icon={<CustomButton onClick={() => setMenu("team")} title={"Assign"} frontIcon={<PlusIcon className='w-4 h-4' />} />}>
                        {
                          team?.map((t, i) => {
                            return <MenuItem key={`team-${i}`}>
                              <div className="flex items-center gap-2">
                                <input type="checkbox" id={`teamCheckbox-${t?.id}`} checked={teamList?.some(_t => _t?.id == t?.id)} onChange={(e) => {
                                  if (!e?.target?.checked) {
                                    setTeamList(teamList?.filter(teamId => teamId?.id != t?.id))
                                  } else {
                                    setTeamList([...teamList, t])
                                  }
                                }} />
                                <label className='cursor-pointer' htmlFor={`teamCheckbox-${t?.id}`}>{t?.name}</label>
                              </div>
                            </MenuItem>
                          })
                        }
                        <div className="p-2 px-3">
                          <CustomButton onClick={() => {
                            // router?.push(`/clients/new`)
                            customPush(`/clients/new`)
                          }} frontIcon={<PlusIcon className='w-4 h-4' />} title={"Create User"} />
                        </div>
                      </CustomMenu>
                    </div>
                    {
                      teamList?.length == 0 ?
                        <p className="text-sm mt-2 text-gray-700 italic dark:text-dark-text">No users are currently assigned</p> :
                        <div className="flex items-start justify-start gap-4 flex-wrap">
                          {
                            teamList?.map(t => {
                              return <div className='px-3 py-1 bg-primary rounded-full dark:bg-dark-primary'>
                                <span className='text-xs'>{t?.name}</span>
                                <IconButton>
                                  <X className='w-5 h-5 text-red-700' />
                                </IconButton>
                              </div>
                            })
                          }
                        </div>
                    }
                  </div>
                </div>

                <div className="calender flex flex-grow flex-1">

                </div>
              </div>
            </div>


            {/* Invoicing */}
            {
              jobtype == "recurring" ? <div className='border mb-4 border-gray-400 rounded-xl p-4 space-y-4'>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold mb-2">Invoicing</h2>
                </div>
                <div className="flex w-full gap-2">
                  <div className="w-1/2 space-y-4">
                    <div className="space-y-1">
                      <div className='text-sm font-semibold cursor-pointer'>How do you want to invoice?</div>
                      <div className="flex gap-4 items-center">
                        <div className="gap-2 flex">
                          <input type="radio" {...register("invocieReceiveType")} value={"per_visit"} id="per-visit" className='focus:outline-none' />
                          <label className='cursor-pointer text-sm text-gray-500 dark:text-dark-text' htmlFor="per-visit">Per Visit</label>
                        </div>
                        <div className="gap-2 flex">
                          <input type="radio" {...register("invocieReceiveType")} value={"fixed_price"} id="fixed-price" className='focus:outline-none' />
                          <label className='cursor-pointer text-sm text-gray-500 dark:text-dark-text' htmlFor="fixed-price">Fixed price</label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className='text-sm font-semibold cursor-pointer'>When do you want to invoice?</div>
                      <div className="mb-4 flex flex-col">
                        <select {...register('invoiceTiming')} name="invoiceTiming" id="invoiceTiming" className='max-w-full w-[400px] dark:bg-dark-secondary border-gray-400 focus:outline-gray-500 border p-2 rounded-md h-11 text-sm'>
                          <option className='text-sm' value="monthly_last">Monthly on the last of the month</option>
                          <option className='text-sm' value="after_each_vist">After each visit is complete</option>
                          <option className='text-sm' value="as_we_need">As needed -- no reminder</option>
                          <option className='text-sm' value="when_job_close">Once when job is closed</option>
                          <option disabled>or</option>
                          <option disabled className='text-sm' value="custom_schedule">Custom Schedule</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 space-y-3">
                    <span className='font-semibold text-md'>Get paid automatically</span>
                    <p className='text-md text-gray-500 dark:text-dark-text'>Sit back as the money rolls in. Clients are automatically invoiced and charged based on their billing frequency once they save a payment method on file. Learn more in <Link href={"#"} className='text-green-600 dark:text-dark-second-text'>Help Center</Link></p>
                  </div>
                </div>
              </div> : jobtype == "oneoff" && <div className='border mb-4 border-gray-400 rounded-xl p-4 space-y-4'>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold mb-2">Invoicing</h2>
                </div>
                <div className="flex items-center mb-4">
                  <input  {...register("invoiceupdate")} type="checkbox" className="mr-2 w-5 h-5" id='invoiceupdate' />
                  <label className='text-sm font-semibold cursor-pointer' htmlFor='invoiceupdate'>Remind me to invoice when I close the job</label>
                </div>
              </div>
            }

            {/* Line Items */}
            <div className="lg:col-span-3 py-4 bg-white p-3 dark:bg-dark-secondary text-tprimary space-y-4 dark:text-dark-text">
              {/* data products loop */}
              <ProductsList />

              <div className='flex gap-4 justify-end w-full capitalize border-t-2 border-gray-300 pt-4 mt-4'>
                <div className='space-y-2'>
                  <div className='text-sm'>total cost</div>
                  <div className='font-semibold'>total price</div>
                </div>
                <div className='space-y-2'>
                  <p className='text-gray-700 font-semibold dark:text-dark-text'>${totalcost || `0.00`}</p>
                  <p className='text-gray-700 font-semibold dark:text-dark-text'>${totalcost || `0.00`}</p>
                </div>
              </div>


              <div className="border border-gray-300 p-4 rounded-lg">
                <h1 className='text-2xl font-bold mb-2'>Internal notes & attachments</h1>
                <div className="mt-4">
                  <textarea {...register("internalnote")} placeholder='Note details' name="internalnote" id="internalnote" rows={3} className="w-full dark:bg-dark-primary focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"></textarea>
                </div>

                <div className="mt-4 border-2 border-gray-300 text-sm border-dashed p-2 py-4 rounded-xl flex justify-center items-center">
                  <label htmlFor="" className='text-gray-500'>Drag your files here or <span className='ml-2 text-green-700 font-semibold border-2 rounded-xl p-2'>Select a file</span></label>
                  <input hidden type="file" name="" id="" />
                </div>

                <Divider className='my-2' />

                <div className="mt-4 space-y-2">
                  <p className='font-normal text-sm text-tprimary dark:text-dark-text'>Link not to related</p>
                  <div className="flex gap-2 text-sm items-center capitalize">
                    <div className="flex gap-2 items-center">
                      <input {...register("isrelatedinvoices")} type="checkbox" className='w-5 h-5' name="isrelatedinvoices" id="isrelatedinvoices" />
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
                      <CustomButton type={"submit"} loading={loadingObj.jobcreate} title="Save Job"></CustomButton>
                      <CustomMenu open={true} icon={<CustomButton backIcon={<ChevronDown className='w-5 h-5 text-white' />} type={"button"} variant="primary" title="Save and"></CustomButton>}>
                        {/* Menu Items */}
                        <Typography variant="subtitle1" style={{ padding: '8px 16px', fontWeight: 'bold' }}>
                          Save and...
                        </Typography>

                        <MenuItem className="text-tprimary dark:text-dark-text text-sm">
                          <ListItemIcon>
                            <Hammer className="text-green-700" size={16} />
                          </ListItemIcon>
                          Create Another
                        </MenuItem>

                        <MenuItem className="text-tprimary dark:text-dark-text text-sm">
                          <ListItemIcon>
                            <MessageSquareText className="text-orange-700" size={16} />
                          </ListItemIcon>
                          Text Booking Confirmation
                        </MenuItem>

                        <MenuItem className="text-tprimary dark:text-dark-text text-sm">
                          <ListItemIcon>
                            <Mail className="text-gray-700 dark:text-gray-400" size={16} />
                          </ListItemIcon>
                          Email Booking Confirmation
                        </MenuItem>
                      </CustomMenu>
                    </div>
                  </>
                }
              </div>
            </div>
          </form>
        </FormProvider>
      </div>

      <AddCustomFields open={open} onClose={() => setOpen(false)} />
      <SelectClient open={selectClientModal} onClose={() => setSelectClientModal(false)} onSelect={id => {
        // router.push(`/jobs/new?client_id=${id}`)
        customPush(`/jobs/new?client_id=${id}`)
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
