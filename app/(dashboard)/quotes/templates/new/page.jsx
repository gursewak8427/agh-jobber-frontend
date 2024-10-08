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
import { createQuote, fetchallClients, fetchClient, fetchQuotecount, fetchQuoteCustomFields, fetchTeam, removeLoading, setLoading } from '@/store/slices/client';
import { useAppDispatch } from '@/store/hooks';
import CustomSingleField from '@/app/_components/CustomSingleField';
import { getAddress, getClientName, getPrimary } from '@/utils';
import SelectProperty from '@/app/_components/property/SelectProperty';
import NewProperty from '@/app/_components/property/NewProperty';
import CustomMenu from '@/components/CustomMenu';

const defaultProductLineItem = {
  title: "",
  markuppercentage: 0,
  total: 0,
  items: [{ type: "default", name: "", description: "", quantity: 1, material: 0, markuppercentage: 0, markupamount: 0, labour: 0, total: 0 }]
}

const defaultProductOptional = { type: "optional", name: "", description: "", quantity: 1, material: 0, markuppercentage: 0, markupamount: 0, labour: 0, total: 0 }
const defaultProductTextItem = { type: "text", name: "", description: "", quantity: 1, material: 0, markuppercentage: 0, markupamount: 0, labour: 0, total: 0 }

export default function Page() {
  const searchParams = useSearchParams();
  const client_id = searchParams.get("client_id");

  const [selectedProperty, setSelectedProperty] = useState(null);

  // Custom fields, change with quote custom fields
  const { clientslist, client, team, quotecount, quotecustomfields, loadingObj } = useSelector(state => state.clients);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
    getValues
  } = useForm({
    defaultValues: {
      products: [defaultProductLineItem],
      discount: 0,
      requireddeposite: 0,
      clientview_quantities: true,
      clientview_total: true
    },
  });

  const { fields: productsList, append: appendProduct, remove: removeProduct } = useFieldArray({
    control,
    name: "products",
  });



  // Function to append a new product
  const addProduct = () => {
    appendProduct({
      title: "",
      markuppercentage: 0,
      total: 0,
      items: [{ type: "default", name: "", description: "", quantity: 1, material: 0, markuppercentage: 0, markupamount: 0, labour: 0, total: 0 }]
    });
  };

  // Function to append a new item to a specific product
  const addItemToProduct = (productIndex) => {
    const newItem = { type: "default", name: "", description: "", quantity: 1, material: 0, markuppercentage: 0, markupamount: 0, labour: 0, total: 0 };
    setValue(`products.${productIndex}.items`, [...getValues(`products.${productIndex}.items`), newItem]);
  };

  const watchProducts = watch("products");
  const subtotal = watch("subtotal");

  // Calculation logic for each product line
  useEffect(() => {
    onBlur()
  }, [JSON.stringify(watchProducts)]);

  const onBlur = () => {
    let newSubtotal = 0;

    watchProducts.forEach((product, index) => {
      console.log({ product });
      let totalcost = 0;
      product?.items?.forEach((item, itemIndex) => {

        if (product.type !== "text") {
          const material = parseFloat(item.material) || 0;
          const labour = parseFloat(item.labour) || 0;
          const markupPercentage = parseFloat(item.markuppercentage) || 0;

          const markupAmount = (material + labour) * (markupPercentage / 100);
          const totalAmount = (material + labour + markupAmount) * (item?.quantity || 1);

          setValue(`products.${index}.items.${itemIndex}.markupamount`, markupAmount.toFixed(2));
          setValue(`products.${index}.items.${itemIndex}.total`, totalAmount.toFixed(2));

          newSubtotal += totalAmount;
          totalcost += totalAmount;
        }
      })

      setValue(`products.${index}.total`, totalcost.toFixed(2));
    });

    setValue(`subtotal`, parseFloat(newSubtotal)?.toFixed());
  }


  useEffect(() => {
    dispatch(fetchallClients());
    dispatch(fetchQuotecount());
    dispatch(fetchQuoteCustomFields());
    dispatch(fetchTeam());
  }, [])

  const onSubmit = async (data) => {

    let jsonData = {
      "product": data?.products?.map(product => ({
        ...product,
      })),
      "title": data?.title,
      "subtotal": subtotal,
    }

    // // console.log({ jsonData });
    // dispatch(createQuote(jsonData)).then(({ payload }) => {
    //   if (payload?.id) {
    //     router.push(`/quotes/view/${payload?.id}`)
    //   }
    // });
  };



  return (
    <div className='dark:text-white max-w-[1200px] mx-auto space-y-4'>
      <div className='text-sm text-tprimary dark:text-dark-text'>
        Back to : <Link href={"/quotes/templates"} className='text-green-700 dark:text-dark-second-text'>Templates</Link>
      </div>
      <div className="">
        {/* Template Title */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-1/2 flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="" className='text-tprimary dark:text-dark-text font-bold'>Title</label>
              <input
                {...register("title")}
                label="Title"
                placeholder='Title'
                className="focus:outline-none border dark:bg-dark-secondary px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
              />
            </div>
          </div>

          <div className="lg:col-span-3 py-4 text-tprimary space-y-4">

            <div className="font-black text-lg dark:text-white">Products</div>

            {
              productsList.map((product, index) => {

                const _items = watch(`products.${index}.items`);

                return <div className='space-y-7 p-4 py-4 border rounded-lg'>
                  <div className="flex justify-between gap-2 items-center">
                    <div className="flex flex-col w-full relative">
                      <label htmlFor="" className='text-sm font-bold absolute left-2 dark:bg-dark-secondary bg-white dark:text-white px-2 transform -translate-y-1/2'>Title</label>
                      <input
                        {...register(`products.${index}.title`)}
                        placeholder='Enter Product Title'
                        className="w-full dark:text-white dark:bg-dark-secondary focus:outline-none border px-3 py-2  pt-4 border-gray-300 focus:border-gray-400"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col w-full relative">
                        <label htmlFor="" className='text-sm font-bold absolute left-2 dark:bg-dark-secondary bg-white dark:text-white px-2 transform -translate-y-1/2'>Total</label>
                        <input
                          {...register(`products.${index}.total`)}
                          placeholder='Total'
                          className="w-full dark:bg-dark-secondary focus:outline-none border rounded px-3 py-2 pt-4 border-gray-300 focus:border-gray-400 dark:text-white"
                          readOnly
                        />
                      </div>
                    </div>
                    {
                      watchProducts?.length > 1 && <IconButton className='text-red-500 underline' onClick={() => removeProduct(index)}>
                        <Trash2 />
                      </IconButton>
                    }
                  </div>
                  <table className='w-full'>
                    <thead>
                      <tr>
                        <th><p className="mb-4 text-md font-semibold text-left dark:text-white">Product / Service</p></th>
                        <th><p className="mb-4 text-md font-semibold text-left dark:text-white">Qty.</p></th>
                        <th><p className="mb-4 text-md font-semibold text-left dark:text-white">Material & Labour</p></th>
                        <th><p className="mb-4 text-md font-semibold text-left dark:text-white">Markup</p></th>
                        <th><p className="mb-4 text-md font-semibold text-left dark:text-white">Total</p></th>
                      </tr>
                    </thead>
                    <tbody>
                      <React.Fragment key={index}>
                        {
                          _items.map((item, itemIndex) => (
                            <tr key={`${index}-${itemIndex}`}>
                              <td className='pr-2 pb-4 w-[700px] h-[100px]'>
                                <div className="flex flex-col h-full items-start justify-start">
                                  <input
                                    hidden
                                    {...register(`products.${index}.items.${itemIndex}.type`)}
                                    value={item.type}
                                  />
                                  <input
                                    {...register(`products.${index}.items.${itemIndex}.name`)}
                                    placeholder='Name'
                                    className="w-full  dark:text-white dark:bg-dark-secondary focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                                  />
                                  <textarea
                                    {...register(`products.${index}.items.${itemIndex}.description`)}
                                    placeholder='Description'
                                    className="w-full  dark:text-white dark:bg-dark-secondary border-t-0 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none h-[70px] focus:h-[100px] transition-all"
                                  ></textarea>
                                </div>
                              </td>
                              <td className='pr-2 pb-4 h-[100px]'>
                                <div className="flex flex-col h-full items-start justify-start">
                                  <input
                                    {...register(`products.${index}.items.${itemIndex}.quantity`)}
                                    placeholder='Quantity'
                                    className="dark:bg-dark-secondary dark:text-white focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg mb-2"
                                  />
                                  <div className="w-full h-full flex-1 border px-3 py-2 border-gray-300 border-dotted focus:border-gray-400 rounded-lg grid place-items-center cursor-pointer">
                                    <CameraIcon className='text-green-800' />
                                  </div>
                                </div>
                              </td>
                              <td className='pr-2 pb-4 h-[100px]'>
                                <div className="flex flex-col h-full items-start justify-start">
                                  <input
                                    {...register(`products.${index}.items.${itemIndex}.material`)}
                                    placeholder='Material'
                                    className="dark:bg-dark-secondary dark:text-white focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                                  />
                                  <input
                                    {...register(`products.${index}.items.${itemIndex}.labour`)}
                                    placeholder='Labour'
                                    className="dark:bg-dark-secondary dark:text-white focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none border-t-0"
                                  />
                                </div>
                              </td>
                              <td className='pr-2 pb-4 h-[100px]'>
                                <div className="flex flex-col h-full items-start justify-start">
                                  <input
                                    {...register(`products.${index}.items.${itemIndex}.markuppercentage`)}
                                    placeholder='Markup (%)'
                                    className="dark:bg-dark-secondary dark:text-white focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                                  />
                                  <input
                                    readOnly
                                    {...register(`products.${index}.items.${itemIndex}.markupamount`)}
                                    placeholder='Amount'
                                    className="dark:bg-dark-secondary dark:text-white focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none border-t-0"
                                  />
                                </div>
                              </td>
                              <td className='pr-2 pb-4 h-[100px]'>
                                <div className="flex flex-col h-full items-start justify-start">
                                  <input
                                    readOnly
                                    {...register(`products.${index}.items.${itemIndex}.total`)}
                                    placeholder='Total'
                                    className="dark:bg-dark-secondary dark:text-white focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                                  />
                                  <div className="flex justify-end items-center w-full mt-2">
                                    {
                                      _items?.length > 1 && <IconButton className='text-red-500 underline' onClick={() => {
                                        const updatedItems = watch(`products.${index}.items`).filter((_, i) => i !== itemIndex);
                                        setValue(`products.${index}.items`, updatedItems);
                                      }}><Trash2 /></IconButton>
                                    }
                                    <IconButton className='text-blue-500 underline' onClick={() => addItemToProduct(index)}>
                                      <Plus />
                                    </IconButton>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        }
                      </React.Fragment>
                    </tbody>
                  </table>
                </div>
              })
            }

            {/* Add Line Items Buttons */}
            <div className="flex space-x-4 mb-4">
              <CustomButton
                onClick={addProduct}
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

            <div className="flex mt-4 text-gray-600 dark:text-white min-h-[220px]">
              <div className="w-1/2"></div>
              <div className="p-4 rounded-lg w-1/2">
                <div className="mb-4 flex items-center justify-between space-x-3 pb-2 text-2xl">
                  <div className="dark:text-white font-medium w-full text-right pr-4">Subtotal</div>
                  <p className='dark:text-primary text-gray-700'>${subtotal || `0.00`}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 flex justify-between">
              <CustomButton title="Cancel"></CustomButton>
              {
                <>
                  <div className="flex gap-2 items-center">
                    <CustomButton type={"submit"} title="Save Template"></CustomButton>
                    <CustomMenu open={true} icon={<CustomButton backIcon={<ChevronDown className='w-5 h-5 text-white' />} type={"submit"} variant="primary" title="Save and"></CustomButton>}>
                      {/* Menu Items */}
                      <Typography variant="subtitle1" style={{ padding: '8px 16px', fontWeight: 'bold' }}>
                        Save and...
                      </Typography>

                      <MenuItem className="text-tprimary dark:text-white text-sm">
                        <ListItemIcon>
                          <MessageSquareText className="text-orange-700 dark:text-orange-500" size={16} />
                        </ListItemIcon>
                        Create Another
                      </MenuItem>

                      <MenuItem className="text-tprimary dark:text-white text-sm">
                        <ListItemIcon>
                          <Hammer className="text-green-700 dark:text-green-400" size={16} />
                        </ListItemIcon>
                        Create Quote
                      </MenuItem>
                    </CustomMenu>
                  </div>
                </>
              }

            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
