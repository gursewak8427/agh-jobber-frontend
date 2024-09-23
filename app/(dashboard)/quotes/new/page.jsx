"use client"
import React, { useEffect } from 'react';
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
import { createQuote, fetchallClients, fetchClient, fetchQuotecount, fetchQuoteCustomFields, fetchTeam } from '@/store/slices/client';
import { useAppDispatch } from '@/store/hooks';
import CustomSingleField from '@/app/_components/CustomSingleField';
import { getAddress, getClientName, getPrimary } from '@/utils';
import SelectProperty from '@/app/_components/property/SelectProperty';
import NewProperty from '@/app/_components/property/NewProperty';
import CustomMenu from '@/components/CustomMenu';

const defaultProductLineItem = { type: "default", name: "", description: "", quantity: 1, material: 0, markuppercentage: 0, markupamount: 0, labour: 0, total: 0 }
const defaultProductOptional = { type: "optional", name: "", description: "", quantity: 1, material: 0, markuppercentage: 0, markupamount: 0, labour: 0, total: 0 }
const defaultProductTextItem = { type: "text", name: "", description: "", quantity: 1, material: 0, markuppercentage: 0, markupamount: 0, labour: 0, total: 0 }

export default function Page() {
  const searchParams = useSearchParams();
  const client_id = searchParams.get("client_id");

  const [open, setOpen] = useState(false);

  const { clientslist } = useSelector(state => state.clients);
  const [rating, setRating] = useState(0);
  const [isQuoteNo, setQuoteNo] = useState(false);
  const [isDiscount, setDiscount] = useState(false);
  const [isRequiredDeposit, setRequiredDeposit] = useState(false);
  const [selectClientModal, setSelectClientModal] = useState(false);
  const [selectPropertyModal, setPropertyModal] = useState(false);

  const [selectedProperty, setSelectedProperty] = useState(null);

  // Custom fields, change with quote custom fields
  const { quotecustomfields } = useSelector(state => state.clients);
  const { quotecount } = useSelector(state => state.clients);
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
    dispatch(fetchallClients());
    dispatch(fetchQuotecount());
    dispatch(fetchQuoteCustomFields());
    dispatch(fetchTeam());
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

    const changeAdditionalquotedetails = quotecustomfields
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
      "product": data?.products?.map(product => ({
        ...product,
      })),
      "title": null,
      "quoteno": isQuoteNo ? data?.quoteno : quotecount,
      "rateopportunity": rating,
      "subtotal": subtotal,
      "discount": data?.discountAmount,
      "discounttype": data?.discounttype,
      "tax": gst,
      "costs": totalcost,
      // "estimatemargin": 0.0,
      // "requireddeposite": 0.0,
      "depositetype": "amount",
      "clientmessage": "",
      // "disclaimer": "",
      // "status": "Draft",
      // "contractor": 2,//aa tusi nhi bhejna ok remove krdo
      "property": selectedProperty?.id,
      "client": client_id,
      "salesperson": 3,//aa tusi sales team wali id bhejni ya
      // "clientpdfstyle": null,
      "custom_field": changeAdditionalquotedetails
    }

    console.log({ jsonData });
    dispatch(createQuote(jsonData))
  };



  return (
    <div className='max-w-[1200px] mx-auto space-y-4'>
      <div className='text-sm text-tprimary'>
        Back to : <Link href={"/quotes"} className='text-green-700'>Quotes</Link>
      </div>
      <div className="p-8 border border-gray-200 rounded-xl border-t-8 border-t-pink-950">
        {/* Header */}
        <div className="flex justify-start items-center mb-6">
          <div className="text-4xl font-semibold text-tprimary">Quote for</div>
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
              <div className="flex flex-col space-y-2">
                <label htmlFor="" className='text-tprimary font-bold'>{selectPropertyModal} Job Title</label>
                <input
                  {...register("title")}
                  label="Title"
                  placeholder='Title'
                  className="focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
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
            {/* Quote Details */}
            <div className="p-4 rounded-lg w-1/2">
              <h1 className='font-bold mb-2'>Quote details</h1>
              <div className="mb-4 flex items-center space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium min-w-[200px]">Quote number {!isQuoteNo && <>#{quotecount}</>}</div>
                {
                  isQuoteNo ? <div className="flex gap-2 items-center">
                    <input type="text" {...register("quoteno")} onBlur={onBlur} defaultValue={quotecount}
                      className="w-16 h-8 text-right focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg" />
                    <CustomButton onClick={() => { setValue("quoteno", quotecount); setQuoteNo(false) }} title={"Cancel"} />
                  </div> :
                    <Button onClick={() => setQuoteNo(true)} className='px-0 text-green-700 underline font-semibold'>change</Button>
                }

              </div>

              <div className="mb-4 flex items-center space-x-3 border-b border-b-gray-400 pb-2">
                <div className="font-medium min-w-[200px]">Rate opportunity</div>
                <Rating
                  name="rating"
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                />
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
                  quotecustomfields?.map((field, index) => <CustomSingleField register={register} prefix="QuoteCustomFields" field={field} index={index} customfields={quotecustomfields} />)
                }
              </div>
              <div className="my-4">
                <CustomButton title="Add Custom Field" onClick={() => setOpen("quote")} />
              </div>
            </div>
          </div>

          {/* Line Item Details */}
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
              <CustomButton
                onClick={() => appendProduct(defaultProductOptional)}
                title="Add Optional Line Item"
                frontIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-testid="checkbox" className='w-6 h-6 inline-block fill-green-800'><path d="M8.72 11.211a1 1 0 1 0-1.415 1.414l2.68 3.086a1 1 0 0 0 1.414 0l5.274-4.992a1 1 0 1 0-1.414-1.414l-4.567 4.285-1.973-2.379Z"></path><path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm14 2v14H5V5h14Z"></path></svg>}
              >
              </CustomButton>
              <CustomButton
                onClick={() => appendProduct(defaultProductTextItem)}
                title="Add Text">
              </CustomButton>
            </div>

            <div className="flex mt-4">
              <div className="p-4 rounded-lg w-1/2"></div>
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

            <div className="mt-4">
              <h1 className='font-bold mb-2'>Contract / Disclaimer</h1>
              <textarea {...register("disclaimer")} name="" id="" rows={3} className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg">
                This quote is valid for the next 15 days, after which values may be subject to change.
              </textarea>
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

              <Divider className='my-2' />

              <div className="mt-4 space-y-2">
                <p className='font-normal text-sm text-tprimary'>Link not to related</p>
                <div className="flex gap-2 text-sm items-center capitalize">
                  <div className="flex gap-2 items-center">
                    <input {...register("isrelatedjobs")} type="checkbox" className='w-5 h-5' name="" id="jobs" />
                    <label htmlFor="jobs">jobs</label>
                  </div>
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
                    <CustomButton type={"submit"} title="Save Quote"></CustomButton>
                    <CustomMenu open={true} icon={<CustomButton backIcon={<ChevronDown className='w-5 h-5 text-white' />} type={"submit"} variant="primary" title="Save and"></CustomButton>}>
                      {/* Menu Items */}
                      <Typography variant="subtitle1" style={{ padding: '8px 16px', fontWeight: 'bold' }}>
                        Save and...
                      </Typography>

                      <MenuItem className="text-tprimary text-sm">
                        <ListItemIcon>
                          <MessageSquareText className="text-orange-700" size={16} />
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
                          <Hammer className="text-green-700" size={16} />
                        </ListItemIcon>
                        Convert to Job
                      </MenuItem>

                      <MenuItem className="text-tprimary text-sm">
                        <ListItemIcon>
                          <MessageCircle className="text-orange-700" size={16} />
                        </ListItemIcon>
                        Mark as awaiting Response
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
      <SelectClient open={selectClientModal} onClose={() => setSelectClientModal(false)} onSelect={id => {
        router.push(`/quotes/new?client_id=${id}`)
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
    </div >
  );
}
