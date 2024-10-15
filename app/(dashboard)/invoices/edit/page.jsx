"use client"
import React, { Fragment, useEffect } from 'react';
import { Button, TextField, IconButton, Avatar, Rating, Divider, Typography, MenuItem, ListItemIcon } from '@mui/material';
import { useState } from 'react';
import { BoxSelect, BoxSelectIcon, CameraIcon, ChevronDown, CreditCard, Delete, Divide, Eye, Hammer, Mail, MessageCircle, MessageSquare, MessageSquareText, Minus, Plus, PlusIcon, Trash2, X } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';
import SelectClient from '@/app/_components/client/SelectClient';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import AddCustomFields from '@/app/_components/CustomFields';
import { createInvoice, createQuote, fetchallClients, fetchClient, fetchInvoice, fetchInvoicecount, fetchInvoiceCustomFields, fetchTeam, updateInvoice } from '@/store/slices/client';
import { useAppDispatch } from '@/store/hooks';
import CustomSingleField from '@/app/_components/CustomSingleField';
import { getAddress, getClientName, getPrimary } from '@/utils';
import SelectProperty from '@/app/_components/property/SelectProperty';
import NewProperty from '@/app/_components/property/NewProperty';
import CustomMenu from '@/components/CustomMenu';
import ProductsList, { defaultProductLineItem, updateProductsFn } from '@/app/_components/products/ProductsList';


export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const client_id = searchParams.get("client_id");

  const [menu, setMenu] = useState("")
  const [selectedSalesPerson, setSalesPerson] = useState(null)
  const [teamList, setTeamList] = useState([])

  const [open, setOpen] = useState(false);

  const [clientView, setClientView] = useState(false);
  const [issueDateStatus, setIssueDateStatus] = useState(false);
  const [paymentDueStatus, setPaymentDueStatus] = useState(false);
  const [isDiscount, setDiscount] = useState(false);
  const [isRequiredDeposit, setRequiredDeposit] = useState(false);
  const [selectClientModal, setSelectClientModal] = useState(false);
  const [selectPropertyModal, setPropertyModal] = useState(false);

  const [selectedProperty, setSelectedProperty] = useState(null);

  const { loadingObj, client, invoice, team, invoicecount, invoicecustomfields } = useSelector(state => state.clients);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      products: [defaultProductLineItem],
      discount: 0,
      requireddeposite: 0,
      clientview_quantities: true,
      clientview_total: true
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
    reset,
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
  const paymentdue = watch("paymentdue");


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

  useEffect(() => {
    onBlur()
  }, [JSON.stringify(watchProducts)]);

  const onBlur = () => {
    let newSubtotal = updateProductsFn({ watchProducts, setValue })

    let _totatcost = parseFloat(newSubtotal);

    let _discount = 0
    if (isDiscount) {
      if (discounttype == "percentage") {
        _discount = _totatcost * (discount / 100)
      }

      if (discounttype == "amount") {
        _discount = discount
      }
    }

    _totatcost -= parseFloat(_discount);

    let gst = 5;
    let gstAmount = parseFloat(_totatcost * (gst / 100)).toFixed()
    _totatcost += parseFloat(gstAmount)

    setValue(`subtotal`, parseFloat(newSubtotal)?.toFixed());
    setValue(`gst`, gstAmount);
    setValue(`totalcost`, parseFloat(_totatcost)?.toFixed());

    console.log({ _discount, discounttype })
    setValue(`discountAmount`, parseFloat(_discount)?.toFixed(2))
  }



  useEffect(() => {
    dispatch(fetchInvoicecount());
    dispatch(fetchallClients());
    dispatch(fetchTeam());
    dispatch(fetchInvoiceCustomFields());
  }, [])


  useEffect(() => {
    if (!client_id) return;

    dispatch(fetchClient(client_id));
  }, [client_id])


  useEffect(() => {
    if (!id) return;

    dispatch(fetchInvoice(id));
  }, [id])

  useEffect(() => {
    console.log({ invoice })
    if (invoice) {
      reset({
        ...invoice,
        products: invoice?.service,
        clientview_quantities: invoice?.clientquotestyle?.quantities || false,
        clientview_materials: invoice?.clientquotestyle?.materials || false,
        clientview_markuppercentage: invoice?.clientquotestyle?.markuppercentage || false,
        clientview_markupamount: invoice?.clientquotestyle?.markupamount || false,
        clientview_labour: invoice?.clientquotestyle?.labour || false,
        clientview_total: invoice?.clientquotestyle?.total || false,

        discount: invoice?.discount,
        discounttype: invoice?.discounttype,
        discountAmount: invoice?.discounttype == "amount" ? invoice?.discount : parseFloat(invoice?.subtotal * invoice?.discount / 100)?.toFixed(2),
      })

      if (Boolean(invoice?.discount)) {
        setDiscount(true)
      }
      if (Boolean(invoice?.requireddeposite)) {
        setRequiredDeposit(true)
      }

      setSelectedProperty(invoice?.property)
      setSalesPerson(invoice?.salesperson)

      setIssueDateStatus(true)

      if (invoice?.paymentdue != "net_30") {
        setPaymentDueStatus(true)
      }
    }
  }, [invoice])

  function addDays(date, days) {
    console.log({ date, days })

    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const calculateDueDate = (issuedate, type) => {
    console.log({ issuedate, type })

    let days;

    if (type == "net_15") days = 15;
    if (type == "net_30") days = 30;
    if (type == "net_45") days = 45;

    return addDays(issuedate, days)?.toISOString().slice(0, 10);
  }


  const onSubmit = async (data) => {

    let issueDate = issueDateStatus ? data?.issueddate : new Date()?.toISOString().slice(0, 10);

    let jsonData = {
      "id": invoice?.id,
      "clientinvoicestyle": {
        ...(clientView && {
          id: invoice?.clientquotestyle?.id,
          quantities: data?.clientview_quantities,
          materials: data?.clientview_materials,
          markuppercentage: data?.clientview_markuppercentage,
          markupamount: data?.clientview_markupamount,
          labour: data?.clientview_labour,
          total: data?.clientview_total,
          late_stamp: data?.clientview_late_stamp,
        }),
      },
      "service": data?.products?.map(product => ({
        ...product,
      })),
      "subject": data?.subject,
      "issueddate": issueDateStatus ? data?.issueddate : new Date()?.toLocaleString(),
      paymentdue: "net_30",
      "paymentduedate": data?.paymentdue == "custom" ? data?.paymentduedate : data?.paymentdue == "upon_receipt" ? "upon_receipt" : calculateDueDate(issueDate, paymentDueStatus ? data?.paymentdue : "net_30"),//duedate set based on paymentdue like net15 means issue date + 15 days if custom date then it will automatic work      "salesperson_id": selectedSalesPerson?.id,
      "subtotal": subtotal,
      "discount": data?.discount,
      "discounttype": data?.discounttype,
      "tax": gst,
      "costs": totalcost,

      "internalnote": data?.internalnote,
      "clientmessage": data?.clientmessage,

      "property_id": invoice?.property?.id,
      "client_id": client_id,
    }

    console.log({ jsonData });
    dispatch(updateInvoice(jsonData)).then(({ payload }) => {
      if (payload?.id) {
        router.push(`/invoices/view/${payload?.id}`)
      }
    });
  };

  return (
    <div className='max-w-[1200px] mx-auto space-y-4'>
      <div className='text-sm text-tprimary dark:text-dark-text'>
        Back to : <Link href={"/invoices"} className='text-green-700 dark:text-dark-second-text'>Invoices</Link>
      </div>
      <div className="p-8 border border-gray-200 rounded-xl border-t-8 border-t-green-700 space-y-4">
        {/* Header */}
        <div className="flex justify-between w-full items-center mb-6 gap-2">
          <div className="text-4xl font-semibold text-tprimary dark:text-dark-text">Invoice for {getClientName(client)}</div>
          <div className='font-bold'>Invoice #{invoicecount}</div>
        </div>

        {/* Job Title */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-start justify-start gap-4 border-b-4 border-b-gray-300 pb-4">
              <div className="w-1/2 flex flex-col space-y-4">
                <div className="flex flex-col">
                  <input
                    {...register("subject")}
                    placeholder='Subject'
                    name='subject'
                    className="focus:outline-gray-500 dark:bg-dark-secondary border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                  />
                </div>
                {
                  client_id && <div className="flex text-sm">
                    <div className="w-1/2">
                      <h1 className='font-bold mb-2'>Property address</h1>
                      <p className='max-w-[150px]'>{getAddress(invoice?.property)}</p>
                    </div>
                    <div className="w-1/2">
                      <h1 className='font-bold mb-2'>Contact details</h1>
                      <p className='max-w-[140px]'>{getPrimary(invoice?.client?.mobile)?.number}</p>
                      <p className='max-w-[140px]'>{getPrimary(invoice?.client?.email)?.email}</p>
                    </div>
                  </div>
                }
              </div>
              {/* Job details */}
              <div className="px-4 rounded-lg w-1/2">
                <h1 className='font-bold mb-2'>Invoice details</h1>
                <div className="mb-4 flex items-center space-x-3 border-b border-b-gray-400 pb-2">
                  <div className="font-medium min-w-[200px] text-sm">Issued date</div>
                  {
                    issueDateStatus ? <div className="flex gap-2 items-center">
                      <input type="date" {...register("issueddate")} defaultValue={invoicecount}
                        className="h-8 text-right dark:bg-dark-secondary focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg" />
                      <CustomButton onClick={() => { setIssueDateStatus(false) }} title={"Cancel"} />
                    </div> :
                      <Button onClick={() => setIssueDateStatus(true)} className='px-0 text-green-700 underline font-semibold capitalize dark:text-dark-second-text'>Date sent</Button>
                  }
                </div>

                <div className="mb-4 flex items-center space-x-3 border-b border-b-gray-400 pb-2">
                  <div className="font-medium min-w-[200px] text-sm">Payment due</div>
                  {
                    paymentDueStatus ? <div className="flex gap-2 items-center">
                      <select {...register("paymentdue")} onBlur={onBlur} name="paymentdue" id="paymentdue" className='w-auto dark:text-dark-second-text dark:bg-dark-secondary border-gray-400 focus:outline-gray-500 border p-2 rounded-md h-11 text-sm'>
                        <option value="upon_receipt">Upon receipt</option>
                        <option value="net_15">Net 15</option>
                        <option value="net_30">Net 30</option>
                        <option value="net_45">Net 45</option>
                        <option value="custom">Custom</option>
                      </select>
                      <CustomButton onClick={() => { setPaymentDueStatus(false) }} title={"Cancel"} />
                    </div> :
                      <Button onClick={() => setPaymentDueStatus(true)} className='px-0 text-green-700 underline font-semibold capitalize dark:text-dark-second-text'>Net 30</Button>
                  }
                </div>

                {
                  paymentdue == "custom" &&

                  <div className="mb-4 flex items-center space-x-3 border-b border-b-gray-400 pb-2">
                    <div className="font-medium min-w-[200px] text-sm">Due date</div>
                    <input type="date" {...register("paymentduedate")} onBlur={onBlur}
                      className="h-8 text-right focus:outline-none border px-3 py-2 dark:bg-dark-secondary border-gray-300 focus:border-gray-400 rounded-lg" />
                  </div>
                }

                <div className="mb-4 flex items-center space-x-3 border-b border-b-gray-400 pb-2">
                  <div className="font-medium min-w-[200px] text-sm">Salesperson</div>
                  {
                    selectedSalesPerson ? <div className="flex items-center bg-gray-200 p-2 rounded-full dark:bg-dark-primary">
                      <Avatar className="mr-2 bg-slate-600 text-sm">{selectedSalesPerson?.name[0]}</Avatar>
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
              </div>
            </div>

            {/* Line Items */}
            <div className="lg:col-span-3 py-4 bg-white p-3 dark:bg-dark-secondary text-tprimary space-y-4 dark:text-dark-text">
              <ProductsList />

              <div className="flex mt-4">
                <div className="p-4 rounded-lg w-1/2">
                  <div className="flex flex-col gap-2 items-center">
                    <div className="flex gap-2 items-center w-full">
                      <Eye />
                      <span>Client view</span>
                      {
                        !clientView ?
                          <Button onClick={() => setClientView(true)} className='text-green-600'>Change</Button> :
                          <Button onClick={() => setClientView(false)} className='text-red-600'>Cancel Changes</Button>
                      }
                    </div>

                    {
                      clientView && <div>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Adjust what your client will see on this invoice. To change the default for ​all future invoices, visit the <Link href={"#"} className='text-green-700 hover:text-green-800'>PDF Style.</Link></p>
                        <div className="flex items-center flex-wrap">
                          <div className="flex gap-2 items-center select-none pr-2 py-2 mr-7">
                            <input
                              {...register("clientview_quantities")}
                              type="checkbox"
                              className="w-5 h-5"
                              id="clientview_quantities"
                            />
                            <label className="cursor-pointer text-sm" htmlFor="clientview_quantities">
                              Quantities
                            </label>
                          </div>

                          <div className="flex gap-2 items-center select-none pr-2 py-2 mr-7">
                            <input
                              {...register("clientview_materials")}
                              type="checkbox"
                              className="w-5 h-5"
                              id="clientview_materials"
                            />
                            <label className="cursor-pointer text-sm" htmlFor="clientview_materials">
                              Material Price
                            </label>
                          </div>

                          <div className="flex gap-2 items-center select-none pr-2 py-2 mr-7">
                            <input
                              {...register("clientview_markuppercentage")}
                              type="checkbox"
                              className="w-5 h-5"
                              id="clientview_markuppercentage"
                            />
                            <label className="cursor-pointer text-sm" htmlFor="clientview_markuppercentage">
                              Markup Percentage
                            </label>
                          </div>

                          <div className="flex gap-2 items-center select-none pr-2 py-2 mr-7">
                            <input
                              {...register("clientview_markupamount")}
                              type="checkbox"
                              className="w-5 h-5"
                              id="clientview_markupamount"
                            />
                            <label className="cursor-pointer text-sm" htmlFor="clientview_markupamount">
                              Markup Amount
                            </label>
                          </div>

                          <div className="flex gap-2 items-center select-none pr-2 py-2 mr-7">
                            <input
                              {...register("clientview_labour")}
                              type="checkbox"
                              className="w-5 h-5"
                              id="clientview_labour"
                            />
                            <label className="cursor-pointer text-sm" htmlFor="clientview_labour">
                              Labour
                            </label>
                          </div>

                          <div className="flex gap-2 items-center select-none pr-2 py-2 mr-7">
                            <input
                              {...register("clientview_late_stamp")}
                              type="checkbox"
                              className="w-5 h-5"
                              id="clientview_late_stamp"
                            />
                            <label className="cursor-pointer text-sm" htmlFor="clientview_late_stamp">
                              Late stamp (if overdue)
                            </label>
                          </div>

                          <div className="flex gap-2 items-center select-none pr-2 py-2 mr-7">
                            <input
                              {...register("clientview_total")}
                              type="checkbox"
                              className="w-5 h-5"
                              id="clientview_total"
                            />
                            <label className="cursor-pointer text-sm" htmlFor="clientview_total">
                              Total
                            </label>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
                <div className="p-4 rounded-lg w-1/2">
                  <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                    <div className="font-medium min-w-[200px]">Subtotal</div>
                    <p className='text-gray-700 dark:text-dark-text'>${subtotal || `0.00`}</p>
                  </div>

                  <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                    <div className="font-medium min-w-[200px]">Discount</div>
                    {
                      isDiscount ?
                        <div className="flex items-center gap-2 justify-between w-full">
                          <div className="flex items-center">
                            <input type="text" {...register("discount")} onBlur={onBlur}
                              className="dark:bg-dark-secondary w-16 h-10 text-right focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-r-none" />
                            <select name="discounttype" id="discounttype" {...register("discounttype")} onBlur={onBlur} className="dark:bg-dark-secondary h-10 text-right focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-l-none" >
                              <option value="amount">$</option>
                              <option value="percentage">%</option>
                            </select>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-normal flex items-center"><Minus className='font-normal w-4 h-5' /> ${discountAmount || 0}</span>
                            <Trash2 onClick={() => setDiscount(false)} className='w-5 h-5 text-red-500 cursor-pointer hover:text-red-700' />
                          </div>
                        </div> :
                        <p onClick={() => setDiscount(true)} className='text-green-700 underline font-semibold cursor-pointer'>Add discount</p>
                    }
                  </div>

                  <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                    <div className="font-medium min-w-[200px]">GST (5.0)%</div>
                    <div className="flex items-center gap-2">
                      <p className='text-gray-700 dark:text-dark-text'>${gst || `0.00`}</p>
                      <Trash2 className='w-5 h-5 text-red-500 cursor-pointer hover:text-red-700' />
                    </div>
                  </div>

                  <div className="mb-2 flex items-center justify-between space-x-3 border-b-gray-300 pb-2 border-b-[5px]">
                    <div className="font-semibold min-w-[200px]">Total</div>
                    <p className='text-gray-700 font-semibold dark:text-dark-text'>${totalcost || `0.00`}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h1 className='font-bold mb-2'>Client message</h1>
                <textarea name="clientmessage" id="clientmessage" rows={3}  {...register("clientmessage")} className="w-full dark:bg-dark-secondary focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"></textarea>
              </div>

              <div className="border border-gray-300 p-4 rounded-lg">
                <h1 className='font-bold mb-2'>Internal notes & attachments</h1>
                <div className="mt-4">
                  <textarea {...register("internalnote")} name="internalnote" id="internalnote" placeholder='Note details' rows={3} className="w-full dark:bg-dark-secondary focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"></textarea>
                </div>

                <div className="mt-4 border-2 border-gray-300 text-sm border-dashed p-2 py-4 rounded-xl flex justify-center items-center">
                  <label htmlFor="" className='text-gray-500'>Drag your files here or <span className='ml-2 text-green-700 font-semibold border-2 rounded-xl p-2'>Select a file</span></label>
                  <input hidden type="file" name="" id="" />
                </div>

              </div>

              <div className="mt-4 space-y-2 flex justify-between">
                <CustomButton title="Cancel"></CustomButton>
                {
                  !client_id ? <CustomButton onClick={() => { setSelectClientModal(true) }} variant="primary" title="Select Client"></CustomButton> : <>
                    <div className="flex gap-2 items-center">
                      <CustomButton loading={loadingObj.updateinvoice} type={"submit"} title="Save Invoice"></CustomButton>
                      <CustomMenu open={true} icon={<CustomButton backIcon={<ChevronDown className='w-5 h-5 text-white' />} type={"button"} variant="primary" title="Save and"></CustomButton>}>
                        {/* Menu Items */}
                        <Typography variant="subtitle1" style={{ padding: '8px 16px', fontWeight: 'bold' }}>
                          Save and...
                        </Typography>

                        <MenuItem className="text-tprimary text-sm dark:text-dark-text">
                          <ListItemIcon>
                            <MessageSquareText className="text-gray-700 dark:text-gray-400" size={16} />
                          </ListItemIcon>
                          Send as text mesage
                        </MenuItem>

                        <MenuItem className="text-tprimary text-sm dark:text-dark-text">
                          <ListItemIcon>
                            <Mail className="text-gray-700 dark:text-gray-400" size={16} />
                          </ListItemIcon>
                          Send as email
                        </MenuItem>

                        <MenuItem className="text-tprimary text-sm dark:text-dark-text">
                          <ListItemIcon>
                            <CreditCard className="text-blue-700 dark:text-blue-500" size={16} />
                          </ListItemIcon>
                          Collect Payment
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
