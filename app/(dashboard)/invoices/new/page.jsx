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
import { useFieldArray, useForm } from 'react-hook-form';
import AddCustomFields from '@/app/_components/CustomFields';
import { createQuote, fetchallClients, fetchClient, fetchJobcount, fetchJobCustomFields, fetchQuotecount, fetchQuoteCustomFields, fetchTeam } from '@/store/slices/client';
import { useAppDispatch } from '@/store/hooks';
import CustomSingleField from '@/app/_components/CustomSingleField';
import { getAddress, getClientName, getPrimary } from '@/utils';
import SelectProperty from '@/app/_components/property/SelectProperty';
import NewProperty from '@/app/_components/property/NewProperty';
import CustomMenu from '@/components/CustomMenu';

const defaultProductLineItem = { type: "default", name: "", description: "", quantity: 1, material: 0, markuppercentage: 0, markupamount: 0, labour: 0, total: 0 }

export default function Page() {
  const searchParams = useSearchParams();
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

  const { clientslist, client, team, jobcount, jobcustomfields } = useSelector(state => state.clients);

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
      requireddeposite: 0,
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
    setValue(`discountAmount`, _discount)
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
    if (!client_id) {
      router.push(`/invoices`)
      return;
    };


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

    // #TODO -- change job fields into invoice fields
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
      // #TODO.. verify fields about client view
      ...(clientView && {
        clientview_quantities: data?.clientview_quantities,
        clientview_unitprices: data?.clientview_unitprices,
        clientview_line_item_total: data?.clientview_line_item_total,
        clientview_account_balance: data?.clientview_account_balance,
        clientview_late_stamp: data?.clientview_late_stamp,
      }),
      "service": data?.products?.map(product => ({
        ...product,
      })),
      "subject": data?.title,
      "issueddate": issueDateStatus ? data?.issueddate : new Date()?.toLocaleString(),
      "paymentdue": data?.paymentdue,
      "paymentduedate": data?.paymentduedate,
      "salesperson": selectedSalesPerson?.id,
      "custom_field": changeAdditionaljobdetails,
      "subtotal": subtotal,
      "discount": data?.discountAmount,
      "discounttype": data?.discounttype,
      "tax": gst,
      "costs": totalcost,

      "repeats": data?.repeats,
      "duration": data?.duration,
      "durationtype": data?.durationtype,
      "firstvisit": data?.firstvisit,
      "lastvisit": data?.lastvisit,
      "totalvisit": data?.totalvisit,
      "totalcost": data?.totalcost,
      "totalprice": data?.totalcost,
      "internalnote": data?.internalnote,
      "isrelatedjobs": data?.isrelatedjobs,
      "property": selectedProperty?.id,
      "client": client_id,
    }

    console.log({ jsonData });
  };

  return (
    <div className='max-w-[1200px] mx-auto space-y-4'>
      <div className='text-sm text-tprimary'>
        Back to : <Link href={"/invoices"} className='text-green-700'>Invoices</Link>
      </div>
      <div className="p-8 border border-gray-200 rounded-xl border-t-8 border-t-green-700 space-y-4">
        {/* Header */}
        <div className="flex justify-between w-full items-center mb-6 gap-2">
          <div className="text-4xl font-semibold text-tprimary">Invoice for {getClientName(client)}</div>
          <div className='font-bold'>Quote #8</div>
        </div>

        {/* Job Title */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-start justify-start gap-4 border-b-4 border-b-gray-300 pb-4">
            <div className="w-1/2 flex flex-col space-y-4">
              <div className="flex flex-col">
                <input
                  {...register("subject")}
                  placeholder='Subject'
                  className="focus:outline-gray-500 border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                />
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
            <div className="px-4 rounded-lg w-1/2">
              <h1 className='font-bold mb-2'>Invoice details</h1>
              <div className="mb-4 flex items-center space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium min-w-[200px] text-sm">Issued date</div>
                {
                  issueDateStatus ? <div className="flex gap-2 items-center">
                    <input type="date" {...register("issueddate")} defaultValue={jobcount}
                      className="h-8 text-right focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg" />
                    <CustomButton onClick={() => { setIssueDateStatus(false) }} title={"Cancel"} />
                  </div> :
                    <Button onClick={() => setIssueDateStatus(true)} className='px-0 text-green-700 underline font-semibold capitalize'>Date sent</Button>
                }
              </div>

              <div className="mb-4 flex items-center space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium min-w-[200px] text-sm">Payment due</div>
                {
                  paymentDueStatus ? <div className="flex gap-2 items-center">
                    <select {...register("paymentdue")} onBlur={onBlur} name="paymentdue" id="paymentdue" className='w-auto border-gray-400 focus:outline-gray-500 border p-2 rounded-md h-11 text-sm'>
                      <option value="upon_receipt">Upon receipt</option>
                      <option value="net_15">Net 15</option>
                      <option value="net_30">Net 30</option>
                      <option value="net_45">Net 45</option>
                      <option value="custom">Custom</option>
                    </select>
                    <CustomButton onClick={() => { setPaymentDueStatus(false) }} title={"Cancel"} />
                  </div> :
                    <Button onClick={() => setPaymentDueStatus(true)} className='px-0 text-green-700 underline font-semibold capitalize'>Net 30</Button>
                }
              </div>

              {
                paymentdue == "custom" &&

                <div className="mb-4 flex items-center space-x-3 border-b border-b-gray-400 pb-2">
                  <div className="font-medium min-w-[200px] text-sm">Due date</div>
                  <input type="date" {...register("paymentduedate")} onBlur={onBlur} defaultValue={jobcount}
                    className="h-8 text-right focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg" />
                </div>
              }

              <div className="mb-4 flex items-center space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium min-w-[200px] text-sm">Salesperson</div>
                {
                  selectedSalesPerson ? <div className="flex items-center bg-primary p-2 rounded-full">
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
              <div className="space-y-2">
                {
                  jobcustomfields?.map((field, index) => <CustomSingleField register={register} prefix="JobCustomFields" field={field} index={index} customfields={jobcustomfields} />)
                }
              </div>
              <div className="my-4">
                {/* #TODO -- just to inform -- i set this to invoice */}
                <CustomButton title="Add Custom Field" onClick={() => setOpen("invoice")} />
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="lg:col-span-3 py-4 text-tprimary space-y-4">
            <table className='w-full'>
              <thead>
                <tr>
                  <th style={{ width: "20px" }}><p className="mb-4 text-md font-semibold text-left">Product / Service</p></th>
                  <th><p className="mb-4 text-md font-semibold text-left">Qty.</p></th>
                  <th><p className="mb-4 text-md font-semibold text-left">Material & Labour</p></th>
                  <th><p className="mb-4 text-md font-semibold text-left">Markup</p></th>
                  <th><p className="mb-4 text-md font-semibold text-left">Total</p></th>
                </tr>
              </thead>
              <tbody>
                {
                  productsList?.map((product, index) => {

                    let servicedate = watch(`products[${index}].servicedate`)

                    if (product?.type == "text") {
                      return <tr>
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
                            <div className="w-full h-full flex-1 border px-3 py-2 border-gray-300 border-dotted focus:border-gray-400 rounded-lg grid place-items-center cursor-pointer">
                              <CameraIcon className='text-green-800' />
                            </div>
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    }
                    return <tr>
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
                        <div className="flex flex-col h-full items-start justify-start">
                          <input
                            {...register(`products.${index}.total`)}
                            readOnly
                            placeholder='Total'
                            className="focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                          />
                          <div className='flex gap-2 items-center py-2'>
                            {
                              servicedate == null ? <p className='text-sm text-green-700 text-right w-full underline' onClick={() => {
                                setValue(`products.${index}.servicedate`, new Date())
                              }}>Set Service Date</p> :
                                <div className="flex items-center gap-2">
                                  <input type="date" {...register(`products.${index}.servicedate`)} name="servicedate" id="servicedate" className='text-sm border p-1 rounded-full' />
                                  <IconButton>
                                    <X className='w-4 h-4 hover:text-black text-gray-400' />
                                  </IconButton>
                                </div>
                            }
                          </div>
                        </div>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>


            {/* Add Line Items Buttons */}
            <div className="flex space-x-4 mb-4">
              <CustomButton
                onClick={() => appendProduct(defaultProductLineItem)}
                variant="primary" title="Add Line Item" frontIcon={<PlusIcon className='text-white' />} >
              </CustomButton>
            </div>

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
                      <p className='text-sm text-gray-600'>Adjust what your client will see on this invoice. To change the default for ​all future invoices, visit the <Link href={"#"} className='text-green-700 hover:text-green-800'>PDF Style.</Link></p>
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
                            {...register("clientview_unitprices")}
                            type="checkbox"
                            className="w-5 h-5"
                            id="clientview_unitprices"
                          />
                          <label className="cursor-pointer text-sm" htmlFor="clientview_unitprices">
                            Unit prices
                          </label>
                        </div>

                        <div className="flex gap-2 items-center select-none pr-2 py-2 mr-7">
                          <input
                            {...register("clientview_line_item_total")}
                            type="checkbox"
                            className="w-5 h-5"
                            id="clientview_line_item_total"
                          />
                          <label className="cursor-pointer text-sm" htmlFor="clientview_line_item_total">
                            Line item totals
                          </label>
                        </div>

                        <div className="flex gap-2 items-center select-none pr-2 py-2 mr-7">
                          <input
                            {...register("clientview_account_balance")}
                            type="checkbox"
                            className="w-5 h-5"
                            id="clientview_account_balance"
                          />
                          <label className="cursor-pointer text-sm" htmlFor="clientview_account_balance">
                            Account balance
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
                      </div>
                    </div>
                  }
                </div>
              </div>
              <div className="p-4 rounded-lg w-1/2">
                <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                  <div className="font-medium min-w-[200px]">Subtotal</div>
                  <p className='text-gray-700'>${subtotal || `0.00`}</p>
                </div>

                <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                  <div className="font-medium min-w-[200px]">Discount</div>
                  {
                    isDiscount ?
                      <div className="flex items-center gap-2 justify-between w-full">
                        <div className="flex items-center">
                          <input type="text" {...register("discount")} onBlur={onBlur}
                            className="w-16 h-10 text-right focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-r-none" />
                          <select name="discounttype" id="discounttype" {...register("discounttype")} onBlur={onBlur} className="w-16 h-10 text-right focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-l-none" >
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
                    <p className='text-gray-700'>${gst || `0.00`}</p>
                    <Trash2 className='w-5 h-5 text-red-500 cursor-pointer hover:text-red-700' />
                  </div>
                </div>

                <div className="mb-2 flex items-center justify-between space-x-3 border-b-gray-300 pb-2 border-b-[5px]">
                  <div className="font-semibold min-w-[200px]">Total</div>
                  <p className='text-gray-700 font-semibold'>${totalcost || `0.00`}</p>
                </div>

                <div className="mb-4 flex items-center justify-between space-x-3 pb-2">
                  <div className="font-medium min-w-[200px]">Required Deposit</div>

                  {
                    isRequiredDeposit ? <div className="flex items-center gap-2 justify-between w-full">
                      <div className="flex items-center">
                        <input type="text" {...register("requireddeposite")} onBlur={onBlur}
                          className="w-16 h-10 text-right focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-r-none" />
                        <select name="requiredtype" id="requiredtype" {...register("requiredtype")} onBlur={onBlur} className="w-16 h-10 text-right focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-l-none" >
                          <option value="amount">$</option>
                          <option value="percentage">%</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-normal flex items-center">${requiredAmount || 0}</span>
                        <Trash2 onClick={() => setRequiredDeposit(false)} className='w-5 h-5 text-red-500 cursor-pointer hover:text-red-700' />
                      </div>
                    </div> :
                      <p onClick={() => setRequiredDeposit(true)} className='text-green-700 underline font-semibold cursor-pointer'>Add required deposit</p>
                  }
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h1 className='font-bold mb-2'>Client message</h1>
              <textarea name="" id="" rows={3}  {...register("clientmessage")} className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"></textarea>
            </div>

            <div className="border border-gray-300 p-4 rounded-lg">
              <h1 className='font-bold mb-2'>Internal notes & attachments</h1>
              <div className="mt-4">
                <textarea {...register("internalnote")} placeholder='Note details' name="" id="" rows={3} className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"></textarea>
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
                    <CustomButton type={"submit"} title="Save Invoice"></CustomButton>
                    <CustomMenu open={true} icon={<CustomButton backIcon={<ChevronDown className='w-5 h-5 text-white' />} type={"submit"} variant="primary" title="Save and"></CustomButton>}>
                      {/* Menu Items */}
                      <Typography variant="subtitle1" style={{ padding: '8px 16px', fontWeight: 'bold' }}>
                        Save and...
                      </Typography>

                      <MenuItem className="text-tprimary text-sm">
                        <ListItemIcon>
                          <MessageSquareText className="text-gray-700" size={16} />
                        </ListItemIcon>
                        Send as text mesage
                      </MenuItem>

                      <MenuItem className="text-tprimary text-sm">
                        <ListItemIcon>
                          <Mail className="text-gray-700" size={16} />
                        </ListItemIcon>
                        Send as email
                      </MenuItem>

                      <MenuItem className="text-tprimary text-sm">
                        <ListItemIcon>
                          <CreditCard className="text-blue-700" size={16} />
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
      </div >

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
    </div >
  );
}
