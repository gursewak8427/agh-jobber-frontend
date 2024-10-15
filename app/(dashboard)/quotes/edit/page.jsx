"use client"
import React, { useEffect } from 'react';
import { Button, TextField, IconButton, Avatar, Rating, Divider, Typography, MenuItem, ListItemIcon } from '@mui/material';
import { useState } from 'react';
import { BoxSelect, BoxSelectIcon, CameraIcon, ChevronDown, Delete, Divide, Eye, Hammer, Mail, MessageCircle, MessageSquare, MessageSquareText, Minus, Plus, PlusIcon, Trash2, X } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';
import SelectClient from '@/app/_components/client/SelectClient';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import AddCustomFields from '@/app/_components/CustomFields';
import { createQuote, fetchallClients, fetchClient, fetchQuote, fetchQuotecount, fetchQuoteCustomFields, fetchTeam, fetchTemplateProductForQuote, removeLoading, setLoading, updateQuote } from '@/store/slices/client';
import { useAppDispatch } from '@/store/hooks';
import CustomSingleField from '@/app/_components/CustomSingleField';
import { getAddress, getClientName, getPrimary, templateProductsToQuote } from '@/utils';
import SelectProperty from '@/app/_components/property/SelectProperty';
import NewProperty from '@/app/_components/property/NewProperty';
import CustomMenu from '@/components/CustomMenu';
import ProductsList, { defaultProductLineItem, updateProductsFn } from '@/app/_components/products/ProductsList';

const defaultFormValues = {
  products: [defaultProductLineItem],
  discount: 0,
  requireddeposite: 0,
  clientview_quantities: true,
  clientview_total: true
}

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const client_id = searchParams.get("client_id");
  const property_id = searchParams.get("property_id");
  const template_ids = searchParams.get("template");

  const [open, setOpen] = useState(false);

  const [rating, setRating] = useState(0);
  const [isQuoteNo, setQuoteNo] = useState(false);
  const [isDiscount, setDiscount] = useState(false);
  const [isRequiredDeposit, setRequiredDeposit] = useState(false);
  const [selectClientModal, setSelectClientModal] = useState(false);
  const [selectPropertyModal, setPropertyModal] = useState(false);

  const [menu, setMenu] = useState("")
  const [selectedSalesPerson, setSalesPerson] = useState(null)

  const [clientView, setClientView] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Custom fields, change with quote custom fields
  const { clientslist, client, team, quotecount, quotecustomfields, loadingObj, quoteproducts, quote } = useSelector(state => state.clients);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const methods = useForm();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset
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
  useEffect(() => {
    onBlur()
  }, [JSON.stringify(watchProducts)]);

  const onBlur = () => {
    let newSubtotal = updateProductsFn({ watchProducts, setValue });

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

    _totatcost -= parseFloat(_discount)?.toFixed(2);

    let gst = 5;
    let gstAmount = parseFloat(_totatcost * (gst / 100)).toFixed(2)
    _totatcost += parseFloat(gstAmount)

    setValue(`subtotal`, parseFloat(newSubtotal)?.toFixed(2));
    setValue(`gst`, gstAmount);
    setValue(`totalcost`, parseFloat(_totatcost)?.toFixed(2));

    console.log({ _discount, discounttype })
    setValue(`discountAmount`, parseFloat(_discount)?.toFixed(2))
  }


  useEffect(() => {
    dispatch(fetchallClients());
    dispatch(fetchQuoteCustomFields());
    dispatch(fetchTeam());
    if (id) {
      dispatch(fetchQuote(id));
    }
  }, [id])

  useEffect(() => {
    if (id && quote) {
      reset({
        ...quote,
        products: quote?.product,
        clientview_quantities: quote?.clientquotestyle?.quantities || false,
        clientview_materials: quote?.clientquotestyle?.materials || false,
        clientview_markuppercentage: quote?.clientquotestyle?.markuppercentage || false,
        clientview_markupamount: quote?.clientquotestyle?.markupamount || false,
        clientview_labour: quote?.clientquotestyle?.labour || false,
        clientview_total: quote?.clientquotestyle?.total || false,
        discount: quote?.discount,
        discounttype: quote?.discounttype,
        requireddeposite: quote?.requireddeposite,
        requiredtype: quote?.depositetype,
        requiredAmount: quote?.depositetype == "amount" ? quote?.requireddeposite : parseFloat(quote?.costs * quote?.requireddeposite / 100)?.toFixed(2),
        discountAmount: quote?.discounttype == "amount" ? quote?.discount : parseFloat(quote?.subtotal * quote?.discount / 100)?.toFixed(2),
      })

      setRating(quote?.rateopportunity)

      if (Boolean(quote?.discount)) {
        setDiscount(true)
      }
      if (Boolean(quote?.requireddeposite)) {
        setRequiredDeposit(true)
      }

      setSelectedProperty(quote?.property)
      setSalesPerson(quote?.salesperson)
    }
  }, [id, quote])

  console.log(quote, "=--=quote")


  useEffect(() => {
    if (!client_id) return;

    dispatch(fetchClient(client_id));
  }, [client_id])

  const closeMenu = () => setMenu("")

  const onSubmit = async (data) => {

    let jsonData = {
      "id": quote.id,
      // client_id: client_id,
      // property_id: selectedProperty?.id,
      "clientquotestyle": {
        ...(clientView && {
          id: quote?.clientquotestyle?.id,
          quantities: data?.clientview_quantities,
          materials: data?.clientview_materials,
          markuppercentage: data?.clientview_markuppercentage,
          markupamount: data?.clientview_markupamount,
          labour: data?.clientview_labour,
          total: data?.clientview_total,
        })
      },
      "product": data?.products?.map(product => ({
        ...product,
      })),
      "title": data?.title,
      "rateopportunity": rating,
      "subtotal": subtotal,
      "discount": data?.discount, // need to calculate discount amount each time.
      "discounttype": data?.discounttype,
      "tax": gst,
      "costs": totalcost,
      // "estimatemargin": 0.0,
      "requireddeposite": data?.requireddeposite,
      "depositetype": data?.requiredtype,
      "clientmessage": data?.clientmessage,

      "disclaimer": data?.disclaimer,
      "internalnote": data?.internalnote,
      "isrelatedjobs": data?.isrelatedjobs,
      "isrelatedinvoices": data?.isrelatedinvoices,
      "salesperson_id": selectedSalesPerson?.id,
    }

    console.log({ jsonData });
    dispatch(updateQuote(jsonData)).then(({ payload }) => {
      if (payload?.id) {
        router.push(`/quotes/view/${payload?.id}`)
      }
    });
  };



  return (
    <div className='dark:text-white max-w-[1200px] mx-auto space-y-4'>
      <div className='text-sm text-tprimary dark:text-dark-text'>
        Back to : <Link href={"/quotes"} className='text-green-700 dark:text-dark-second-text'>Quotes</Link>
      </div>
      <div className="p-8 border border-gray-200 rounded-xl border-t-8 border-t-pink-950">
        {/* Header */}
        <div className="flex justify-start items-center mb-6">
          <div className="text-4xl font-semibold text-tprimary dark:text-dark-text">Quote for</div>
          <div className='ml-2 capitalize flex items-center gap-2 border-b border-dashed'>
            {
              !client_id ? <>
                <div className="text-4xl font-semibold text-tprimary dark:text-dark-second-text">Client Name</div>
                <div className="bg-green-700 px-4 py-1 rounded">
                  <PlusIcon className='text-white' />
                </div>
              </> : <div className="text-4xl font-semibold text-tprimary dark:text-dark-second-text">{getClientName(client)}</div>
            }

          </div>
        </div>

        {/* Job Title */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-start justify-start gap-4 border-b-4 border-b-gray-300 pb-4">
              <div className="w-1/2 flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="" className='text-tprimary dark:text-dark-text font-bold'>Job Title</label>
                  <input
                    {...register("title")}
                    label="Title"
                    placeholder='Title'
                    className="focus:outline-none border dark:bg-dark-secondary px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
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
                  <div className="font-medium min-w-[200px]">Quote number</div>
                  <div>#{quote?.quoteno}</div>
                </div>

                <div className="mb-4 flex items-center space-x-3 border-b border-b-gray-400 pb-2">
                  <div className="font-medium min-w-[200px]">Rate opportunity</div>
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                  />
                </div>

                <div className="mb-4 flex items-center space-x-3 border-b-0 border-b-gray-400 pb-2">
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


                {/* #HOLD */}
                {/* <div className="space-y-2">
                {
                  quotecustomfields?.map((field, index) => <CustomSingleField register={register} prefix="QuoteCustomFields" field={field} index={index} customfields={quotecustomfields} />)
                }
              </div>
              <div className="my-4">
                <CustomButton title="Add Custom Field" onClick={() => setOpen("quote")} />
              </div> */}
              </div>
            </div>

            <div className="bg-white dark:bg-dark-secondary p-3 lg:col-span-3 py-4 text-tprimary space-y-4">

              <ProductsList />

              <div className="flex mt-4 text-gray-600 dark:text-white">
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
                        <p className='text-sm text-gray-600 dark:text-dark-text'>Adjust what your client will see on this invoice. To change the default for ​all future invoices, visit the <Link href={"#"} className='text-green-700 hover:text-green-800 dark:text-dark-second-text'>PDF Style.</Link></p>
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
                              Material
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
                              Markup
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
                    <div className="dark:text-white font-medium min-w-[200px]">Subtotal</div>
                    <p className='dark:text-white text-gray-700'>${subtotal || `0.00`}</p>
                  </div>

                  <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                    <div className="dark:text-white font-medium min-w-[200px]">Discount</div>
                    {
                      isDiscount ?
                        <div className="dark:text-white flex items-center gap-2 justify-between w-full">
                          <div className="flex items-center">
                            <input type="text" {...register("discount")} onBlur={onBlur}
                              className="w-16 h-10 text-right focus:outline-none border px-3 py-2 border-gray-300 dark:bg-dark-secondary focus:border-gray-400 rounded-lg rounded-r-none" />
                            <select name="discounttype" id="discounttype" {...register("discounttype")} onBlur={onBlur} className="w-16 h-10 text-right focus:outline-none border px-3 py-2 border-gray-300 dark:bg-dark-secondary focus:border-gray-400 rounded-lg rounded-l-none" >
                              <option value="amount">$</option>
                              <option value="percentage">%</option>
                            </select>
                          </div>
                          <div className="flex items-center gap-1 ">
                            <span className="font-normal flex items-center"><Minus className='' /> ${discountAmount || 0}</span>
                            <Trash2 onClick={() => setDiscount(false)} className='w-5 h-5 text-red-500 cursor-pointer hover:text-red-700' />
                          </div>
                        </div> :
                        <p onClick={() => setDiscount(true)} className='text-green-700 underline font-semibold cursor-pointer'>Add discount</p>
                    }
                  </div>

                  <div className="mb-4 flex items-center justify-between space-x-3 border-b border-b-gray-400 pb-2">
                    <div className="dark:text-white font-medium min-w-[200px]">GST (5.0)%</div>
                    <div className="flex items-center gap-2">
                      <p className='text-gray-700 dark:text-white'>${gst || `0.00`}</p>
                      <Trash2 className='w-5 h-5 text-red-500 cursor-pointer hover:text-red-700' />
                    </div>
                  </div>

                  <div className="mb-2 flex items-center justify-between space-x-3 border-b-gray-300 pb-2 border-b-[5px]">
                    <div className="dark:text-white font-semibold min-w-[200px]">Total</div>
                    <p className='text-gray-700 font-semibold dark:text-white '>${totalcost || `0.00`}</p>
                  </div>

                  <div className="mb-4 flex items-center justify-between space-x-3 pb-2">
                    <div className="dark:text-white font-medium min-w-[200px]">Required Deposit</div>

                    {
                      isRequiredDeposit ? <div className="dark:text-white flex items-center gap-2 justify-between w-full">
                        <div className="flex items-center">
                          <input type="text" {...register("requireddeposite")} onBlur={onBlur}
                            className="dark:bg-dark-secondary w-16 h-10 text-right focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-r-none" />
                          <select name="requiredtype" id="requiredtype" {...register("requiredtype")} onBlur={onBlur} className="dark:bg-dark-secondary w-16 h-10 text-right focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400  rounded-lg rounded-l-none" >
                            <option value="amount">$</option>
                            <option value="percentage">%</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-normal flex items-center"><Minus />${requiredAmount || 0}</span>
                          <Trash2 onClick={() => setRequiredDeposit(false)} className='w-5 h-5 text-red-500 cursor-pointer hover:text-red-700' />
                        </div>
                      </div> :
                        <p onClick={() => setRequiredDeposit(true)} className='text-green-700 underline font-semibold cursor-pointer'>Add required deposit</p>
                    }
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h1 className='font-bold mb-2 dark:text-white'>Client message</h1>
                <textarea name="" id="" rows={3}  {...register("clientmessage")} className="dark:bg-dark-secondary   dark:text-white w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"></textarea>
              </div>

              <div className="mt-4">
                <h1 className='font-bold mb-2 dark:text-white'>Contract / Disclaimer</h1>
                <textarea {...register("disclaimer")} name="" id="" rows={3} className="dark:bg-dark-secondary   dark:text-white w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg">
                  This quote is valid for the next 15 days, after which values may be subject to change.
                </textarea>
              </div>

              <div className="mt-4 space-y-2 flex justify-between">
                <CustomButton title="Cancel" onClick={() => { router.back() }}></CustomButton>
                <CustomButton type={"submit"} loading={loadingObj.updatequote} title="Update Quote"></CustomButton>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
      <AddCustomFields open={open} onClose={() => setOpen(false)} />
      <SelectClient
        open={selectClientModal}
        onClose={() => setSelectClientModal(false)}
        onSelect={id => {
          if (template_ids) {
            router.push(`/quotes/new?client_id=${id}&template=${template_ids}`);
          } else {
            router.push(`/quotes/new?client_id=${id}`);
          }
          setSelectClientModal(false)
        }}
        clients={clientslist}
      />

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
