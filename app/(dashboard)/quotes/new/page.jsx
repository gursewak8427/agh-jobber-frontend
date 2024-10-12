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
import { useFieldArray, useForm } from 'react-hook-form';
import AddCustomFields from '@/app/_components/CustomFields';
import { createQuote, fetchallClients, fetchClient, fetchQuotecount, fetchQuoteCustomFields, fetchTeam, fetchTemplateProductForQuote, removeLoading, setLoading } from '@/store/slices/client';
import { useAppDispatch } from '@/store/hooks';
import CustomSingleField from '@/app/_components/CustomSingleField';
import { getAddress, getClientName, getPrimary, templateProductsToQuote } from '@/utils';
import SelectProperty from '@/app/_components/property/SelectProperty';
import NewProperty from '@/app/_components/property/NewProperty';
import CustomMenu from '@/components/CustomMenu';

const lineItem = { name: "", description: "", quantity: 1, material: 0, markuppercentage: 0, markupamount: 0, labour: 0, total: 0 }
const txtItem = { name: "", description: "", }

const defaultProductLineItem = {
  type: "default",
  name: "",
  markuppercentage: 0,
  total: 0,
  items: [lineItem]
}


const defaultProductOptional = {
  type: "optional",
  name: "",
  markuppercentage: 0,
  total: 0,
  items: [lineItem]
}


const defaultProductTextItem = {
  type: "text",
  name: "",
  items: [txtItem]
}

const defaultFormValues = {
  products: [defaultProductLineItem],
  discount: 0,
  requireddeposite: 0,
  clientview_quantities: true,
  clientview_total: true
}

export default function Page() {
  const searchParams = useSearchParams();
  const client_id = searchParams.get("client_id");
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
  const { clientslist, client, team, quotecount, quotecustomfields, loadingObj, quoteproducts } = useSelector(state => state.clients);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset
  } = useForm();

  const { fields: productsList, append: appendProduct, remove: removeProduct } = useFieldArray({
    control,
    name: "products",
  });

  // Function to append a new product
  const addProduct = (type) => {
    switch (type) {
      case "optional":
        appendProduct(defaultProductOptional);
        break;
      case "default":
        appendProduct(defaultProductLineItem);
        break;
      case "text":
        appendProduct(defaultProductTextItem);
        break;

      default:
        break;
    }

  };



  // Function to append a new item to a specific product
  const addItemToProduct = (productIndex) => {
    let newItem;
    let type = getValues(`products.${productIndex}.type`)
    if (type == "default") newItem = lineItem;
    if (type == "optional") newItem = lineItem;
    if (type == "text") newItem = txtItem;

    setValue(`products.${productIndex}.items`, [...getValues(`products.${productIndex}.items`), newItem]);
  };

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
    let newSubtotal = 0;

    watchProducts?.forEach((product, index) => {
      console.log({ product });
      let totalcost = 0;
      product?.items?.forEach((item, itemIndex) => {

        if (product.type !== "text") {
          const material = parseFloat(item.material) || 0;
          const labour = parseFloat(item.labour) || 0;
          const markupPercentage = parseFloat(item.markuppercentage) || 0;

          const totalWithoutMarkup = (material + labour) * (item?.quantity || 1)
          const markupAmount = totalWithoutMarkup * (markupPercentage / 100);
          const totalAmount = (totalWithoutMarkup + markupAmount);

          setValue(`products.${index}.items.${itemIndex}.markupamount`, markupAmount.toFixed(2));
          setValue(`products.${index}.items.${itemIndex}.total`, totalAmount.toFixed(2));

          newSubtotal += totalAmount;
          totalcost += totalAmount;
        }
      })

      setValue(`products.${index}.total`, totalcost.toFixed(2));
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

    _totatcost -= parseFloat(_discount)?.toFixed(2);

    let gst = 5;
    let gstAmount = parseFloat(_totatcost * (gst / 100)).toFixed(2)
    _totatcost += parseFloat(gstAmount)

    setValue(`subtotal`, parseFloat(newSubtotal)?.toFixed(2));
    setValue(`gst`, gstAmount);
    setValue(`totalcost`, parseFloat(_totatcost)?.toFixed(2));

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
    dispatch(fetchTemplateProductForQuote(template_ids));
  }, [template_ids])

  // Set Template Products as default values.
  useEffect(() => {
    // console.log(templateProductsToQuote(quoteproducts), "templateProductsToQuote");

    if (quoteproducts && quoteproducts.length > 0) {
      reset({
        ...defaultFormValues,
        products: templateProductsToQuote(quoteproducts) || [defaultProductLineItem],
      });
    } else {
      reset({ ...defaultFormValues })
    }
  }, [quoteproducts, setValue]);

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

  const closeMenu = () => setMenu("")


  const onSubmit = async (data) => {

    const changeAdditionalquotedetails = quotecustomfields
      ?.map((item, index) => {

        const change = data?.QuoteCustomFields?.[`${item.id}key`] || null;
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
      "clientquotestyle": {
        ...(clientView && {
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
      "quoteno": isQuoteNo ? data?.quoteno : quotecount,
      "rateopportunity": rating,
      "subtotal": subtotal,
      "discount": data?.discountAmount,
      "discounttype": data?.discounttype,
      "tax": gst,
      "costs": totalcost,
      // "estimatemargin": 0.0,
      "requireddeposite": data?.requireddeposite,
      "depositetype": "amount",
      "clientmessage": data?.clientmessage,

      "disclaimer": data?.disclaimer,
      "internalnote": data?.internalnote,
      "isrelatedjobs": data?.isrelatedjobs,
      "isrelatedinvoices": data?.isrelatedinvoices,
      "salesperson_id": selectedSalesPerson?.id,
      // ==============

      // "status": "Draft",
      // "contractor": 2,//aa tusi nhi bhejna ok remove krdo
      "property_id": selectedProperty?.id,
      "client_id": client_id,

      // "clientpdfstyle": null,  
      "custom_field": changeAdditionalquotedetails,
      "isrelatedjobs": data?.isrelatedjobs,
      "isrelatedinvoices": data?.isrelatedinvoices,
      "internalnote": data?.internalnote,
    }

    dispatch(createQuote(jsonData)).then(({ payload }) => {
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
          <Button onClick={() => setSelectClientModal(true)} className='ml-2 capitalize flex items-center gap-2 border-b border-dashed'>
            {
              !client_id ? <>
                <div className="text-4xl font-semibold text-tprimary dark:text-dark-second-text">Client Name</div>
                <div className="bg-green-700 px-4 py-1 rounded">
                  <PlusIcon className='text-white' />
                </div>
              </> : <div className="text-4xl font-semibold text-tprimary dark:text-dark-second-text">{getClientName(client)}</div>
            }

          </Button>
        </div>

        {/* Job Title */}
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
                        <Button className='text-green-700 p-0 dark:text-dark-second-text' onClick={() => {
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
                      className="w-16 h-8 text-right focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg dark:bg-dark-secondary" />
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
                  quotecustomfields?.map((field, index) => <CustomSingleField register={register} prefix="QuoteCustomFields" field={field} index={index} customfields={quotecustomfields} />)
                }
              </div>
              <div className="my-4">
                <CustomButton title="Add Custom Field" onClick={() => setOpen("quote")} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 py-4 text-tprimary space-y-4 bg-white dark:bg-dark-secondary p-3">

            <div className="font-black text-lg dark:text-white">Products</div>

            {
              productsList.map((product, index) => {

                const _items = watch(`products.${index}.items`);

                return <div className='space-y-7 p-4 py-4 border rounded-lg relative'>
                  <div className="flex justify-between gap-2 items-center">
                    <input
                      hidden
                      {...register(`products.${index}.type`)}
                      value={product.type}
                    />
                    <div className="sticky top-[150px] w-full">
                      <div className="relative">
                        <div className="absolute top-0 left-5 bg-white dark:bg-dark-secondary dark:text-white  px-1 transform -translate-y-[50%] font-semibold text-sm text-tprimary text-opacity-60 flex gap-1 items-center" >
                          Title
                          <span className='text-gray-500 italic'>{product.type != "default" && `(${product.type})`}
                          </span>
                          {errors?.title && <p className="text-red-500 italic">It is required</p>}
                        </div>
                        <input
                          {...register(`products.${index}.name`, { required: true })}
                          placeholder='Enter Product Title'
                          className={`w-full dark:text-white dark:bg-dark-secondary focus:outline-none border px-3 py-2  pt-4 border-gray-300 focus:border-gray-400 rounded-lg ${errors?.products?.[index]?.name && "dark:border-red-500"}`}
                        />
                      </div>
                    </div>
                    {
                      product?.type != "text" && <div className="flex items-center gap-2">
                        <div className="flex flex-col w-full relative">
                          <label htmlFor="" className='text-sm font-bold absolute left-2 dark:bg-dark-secondary bg-white dark:text-white px-1 transform -translate-y-1/2'>Total</label>
                          <input
                            {...register(`products.${index}.total`)}
                            placeholder='Total'
                            className="w-full dark:bg-dark-secondary focus:outline-none border rounded-lg px-3 py-2 pt-4 border-gray-300 focus:border-gray-400 dark:text-white"
                            readOnly
                          />
                        </div>
                      </div>
                    }
                    <IconButton className='text-red-500 underline' onClick={() => removeProduct(index)}>
                      <Trash2 />
                    </IconButton>
                  </div>
                  <table className='w-full'>
                    {/* <thead>
                      <tr>
                        <th>
                          <div className="mb-4 flex items-center w-full justify-between">
                            <p className="text-md font-semibold text-left dark:text-white">Product / Service</p>
                            {
                              product?.type == "text" && <IconButton className='text-blue-500 underline' onClick={() => addItemToProduct(index)}>
                                <Plus />
                              </IconButton>
                            }
                          </div>
                        </th>
                        {
                          product?.type != "text" &&
                          <>
                            <th><p className="mb-4 text-md font-semibold text-left dark:text-white">Qty.</p></th>
                            <th><p className="mb-4 text-md font-semibold text-left dark:text-white">Material & Labour</p></th>
                            <th><p className="mb-4 text-md font-semibold text-left dark:text-white">Markup</p></th>
                            <th><div className="flex items-center w-full justify-between">
                              <p className="text-md font-semibold text-left dark:text-white">Total</p>
                              {
                                product?.type != "text" && <IconButton className='text-blue-500 underline' onClick={() => addItemToProduct(index)}>
                                  <Plus />
                                </IconButton>
                              }
                            </div></th>
                          </>
                        }
                      </tr>
                    </thead> */}
                    <tbody>
                      <React.Fragment key={index}>
                        {
                          _items.map((item, itemIndex) => (
                            <tr key={`${index}-${itemIndex}`}>
                              <td className='pr-2 pb-4 w-[700px] h-[100px]'>
                                <div className="flex flex-col h-full items-start justify-start">
                                  <div className="relative">
                                    <div className="absolute top-0 left-5 bg-white dark:bg-dark-secondary dark:text-white  px-1 transform -translate-y-[50%] font-semibold text-xs text-tprimary text-opacity-60">Name</div>
                                    <input
                                      {...register(`products.${index}.items.${itemIndex}.name`)}
                                      className="w-full  dark:text-white dark:bg-dark-secondary focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                                    />
                                  </div>
                                  <div className="relative">
                                    <div className="absolute top-0 left-5 bg-white dark:bg-dark-secondary dark:text-white  px-1 transform -translate-y-[50%] font-semibold text-xs text-tprimary text-opacity-60">Description</div>
                                    <textarea
                                      {...register(`products.${index}.items.${itemIndex}.description`)}
                                      className="w-full  dark:text-white dark:bg-dark-secondary border-t-0 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none h-[70px] focus:h-[100px] transition-all"
                                    ></textarea>
                                  </div>
                                </div>
                              </td>
                              {
                                product?.type != "text" && <>
                                  <td className='pr-2 pb-4 h-[100px]'>
                                    <div className="flex flex-col h-full items-start justify-start">
                                      <div className="flex w-full items-center">
                                        <div className="relative">
                                          <div className="absolute top-0 left-5 bg-white dark:bg-dark-secondary dark:text-white  px-1 transform -translate-y-[50%] font-semibold text-xs text-tprimary text-opacity-60">Qty</div>
                                          <input
                                            {...register(`products.${index}.items.${itemIndex}.quantity`)}
                                            placeholder='Quantity'
                                            className="w-20 h-11 dark:bg-dark-secondary dark:text-white focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg mb-2 border-r-0 rounded-r-none"
                                          />

                                        </div>
                                        <select
                                          {...register(`products.${index}.items.${itemIndex}.quantitytype`)}
                                          defaultValue={"ft"}
                                          placeholder='Quantity'
                                          className="w-20 h-11 dark:bg-dark-secondary dark:text-white focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg mb-2 rounded-l-none"
                                        >
                                          <option value="ft">ft</option>
                                          <option value="sqrt">sqrt</option>
                                        </select>
                                      </div>
                                      {/* <div className="w-full h-full flex-1 border px-3 py-2 border-gray-300 border-dotted focus:border-gray-400 rounded-lg grid place-items-center cursor-pointer">
                                        <CameraIcon className='text-green-800' />
                                      </div> */}
                                    </div>
                                  </td>
                                  <td className='pr-2 pb-4 h-[100px]'>
                                    <div className="flex flex-col h-full items-start justify-start">
                                      <div className="relative">
                                        <div className="absolute top-0 left-5 bg-white dark:bg-dark-secondary dark:text-white  px-1 transform -translate-y-[50%] font-semibold text-xs text-tprimary text-opacity-60">Material</div>
                                        <input
                                          {...register(`products.${index}.items.${itemIndex}.material`)}
                                          placeholder='Material'
                                          className="dark:bg-dark-secondary dark:text-white focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                                        />
                                      </div>
                                      <div className="relative">
                                        <div className="absolute top-0 left-5 bg-white dark:bg-dark-secondary dark:text-white  px-1 transform -translate-y-[50%] font-semibold text-xs text-tprimary text-opacity-60">Labour</div>
                                        <input
                                          {...register(`products.${index}.items.${itemIndex}.labour`)}
                                          placeholder='Labour'
                                          className="dark:bg-dark-secondary dark:text-white focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none border-t-0"
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td className='pr-2 pb-4 h-[100px]'>
                                    <div className="flex flex-col h-full items-start justify-start">
                                      <div className="relative">
                                        <div className="absolute top-0 left-5 bg-white dark:bg-dark-secondary dark:text-white  px-1 transform -translate-y-[50%] font-semibold text-xs text-tprimary text-opacity-60">Markup</div>
                                        <input
                                          {...register(`products.${index}.items.${itemIndex}.markuppercentage`)}
                                          placeholder='Markup (%)'
                                          className="dark:bg-dark-secondary dark:text-white focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                                        />
                                        <div className="absolute right-5 top-[55%] transform -translate-y-1/2 text-sm text-white bg-dark-primary px-2 py-1 rounded-lg bg-opacity-40">
                                          ${item?.markupamount}
                                        </div>
                                      </div>
                                      {/* <input
                                        readOnly
                                        {...register(`products.${index}.items.${itemIndex}.markupamount`)}
                                        placeholder='Amount'
                                        className="dark:bg-dark-secondary dark:text-white focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none border-t-0"
                                      /> */}
                                    </div>
                                  </td>
                                  <td className='pr-2 pb-4 h-[100px]'>
                                    <div className="flex flex-col h-full items-start justify-start">
                                      <div className="relative">
                                        <div className="absolute top-0 left-5 bg-white dark:bg-dark-secondary dark:text-white  px-1 transform -translate-y-[50%] font-semibold text-xs text-tprimary text-opacity-60">Total</div>
                                        <input
                                          readOnly
                                          {...register(`products.${index}.items.${itemIndex}.total`)}
                                          placeholder='Total'
                                          className="dark:bg-dark-secondary dark:text-white focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                                        />
                                      </div>
                                      <div className="flex justify-end items-center w-full mt-2">
                                        {
                                          _items?.length > 1 && <IconButton className='text-red-500 underline' onClick={() => {
                                            const updatedItems = watch(`products.${index}.items`).filter((_, i) => i !== itemIndex);
                                            setValue(`products.${index}.items`, updatedItems);
                                          }}><Trash2 /></IconButton>
                                        }
                                      </div>
                                    </div>
                                  </td>
                                </>
                              }
                            </tr>
                          ))
                        }

                      </React.Fragment>
                    </tbody>
                  </table>
                  <div className="flex justify-end w-full">
                    <CustomButton
                      onClick={() => addItemToProduct(index)}
                      variant="primary" title="Add Sub Item" frontIcon={<PlusIcon className='text-white' />} >
                    </CustomButton>
                  </div>
                </div>
              })
            }

            {/* Add Line Items Buttons */}
            <div className="flex space-x-4 mb-4">
              <CustomButton
                onClick={() => addProduct("default")}
                variant="primary" title="Add Line Item" frontIcon={<PlusIcon className='text-white' />} >
              </CustomButton>
              <CustomButton
                onClick={() => addProduct("optional")}
                title="Add Optional Line Item"
                frontIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-testid="checkbox" className='w-6 h-6 inline-block fill-green-800'><path d="M8.72 11.211a1 1 0 1 0-1.415 1.414l2.68 3.086a1 1 0 0 0 1.414 0l5.274-4.992a1 1 0 1 0-1.414-1.414l-4.567 4.285-1.973-2.379Z"></path><path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm14 2v14H5V5h14Z"></path></svg>}
              >
              </CustomButton>
              <CustomButton
                onClick={() => addProduct("text")}
                title="Add Text">
              </CustomButton>
            </div>

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
                          <span className="font-normal flex items-center"><Minus className='font-normal w-4 h-5' /> ${discountAmount || 0}</span>
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
              <h1 className='font-bold mb-2 dark:text-white'>Client message</h1>
              <textarea name="" id="" rows={3}  {...register("clientmessage")} className="dark:bg-dark-secondary   dark:text-white w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"></textarea>
            </div>

            <div className="mt-4">
              <h1 className='font-bold mb-2 dark:text-white'>Contract / Disclaimer</h1>
              <textarea {...register("disclaimer")} name="" id="" rows={3} className="dark:bg-dark-secondary   dark:text-white w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg">
                This quote is valid for the next 15 days, after which values may be subject to change.
              </textarea>
            </div>

            <div className="border border-gray-300 p-4 rounded-lg">
              <h1 className='font-bold mb-2 dark:text-white'>Internal notes & attachments</h1>
              <div className="mt-4">
                <textarea {...register("internalnote")} placeholder='Note details' name="internalnote" id="internalnote" rows={3} className="dark:bg-dark-secondary   dark:text-white w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"></textarea>
              </div>

              <div className="mt-4 border-2 border-gray-300 text-sm border-dashed p-2 py-4 rounded-xl flex justify-center items-center">
                <label htmlFor="" className='text-gray-500'>Drag your files here or <span className='ml-2 text-green-700 font-semibold border-2 rounded-xl p-2'>Select a file</span></label>
                <input hidden type="file" name="" id="" />
              </div>

              <Divider className='my-2' />

              <div className="mt-4 space-y-2">
                <p className='font-normal text-sm text-tprimary dark:text-white'>Link not to related</p>
                <div className="flex gap-2 text-sm items-center capitalize">
                  <div className="flex gap-2 items-center dark:text-white">
                    <input {...register("isrelatedjobs")} type="checkbox" className='w-5 h-5' name="" id="jobs" />
                    <label htmlFor="jobs">jobs</label>
                  </div>
                  <div className="flex gap-2 items-center dark:text-white">
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
                    <CustomButton type={"submit"} loading={loadingObj.draftquote} title="Save Quote"></CustomButton>
                    <CustomMenu open={true} icon={<CustomButton backIcon={<ChevronDown className='w-5 h-5 text-white' />} type={"button"} variant="primary" title="Save and"></CustomButton>}>
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
    </div >
  );
}
