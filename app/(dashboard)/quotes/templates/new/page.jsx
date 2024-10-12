"use client"
import React, { useEffect } from 'react';
import { IconButton, Typography, MenuItem, ListItemIcon } from '@mui/material';
import { useState } from 'react';
import { CameraIcon, ChevronDown, Hammer, MessageSquareText, Plus, PlusIcon, Trash2, } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { createTemplate, createTemplateWith } from '@/store/slices/client';
import { useAppDispatch } from '@/store/hooks';
import CustomMenu from '@/components/CustomMenu';
import ProductsList, { defaultProductLineItem, updateProductsFn } from '@/app/_components/products/ProductsList';
export default function Page() {
  const [menu, setMenu] = useState(null)
  const { loadingObj } = useSelector(state => state.clients);

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
    getValues,
    reset,
  } = methods;



  const watchProducts = watch("products");
  const subtotal = watch("subtotal");

  // Calculation logic for each product line
  useEffect(() => {
    onBlur()
  }, [JSON.stringify(watchProducts)]);

  const onBlur = () => {
    let newSubtotal = updateProductsFn({ watchProducts, setValue });

    setValue(`subtotal`, parseFloat(newSubtotal)?.toFixed(2));
  }


  const onSubmit = async (data) => {

    let jsonData = {
      "product": data?.products?.map(product => ({
        ...product,
      })),
      "title": data?.title,
      "description": data?.description,
      "subtotal": subtotal,
    }

    console.log({ jsonData });

    dispatch(createTemplate(jsonData)).then(({ payload }) => {
      if (payload?.id) {
        router.push(`/quotes/templates`)
      }
    });
  };



  const createAnother = async (data) => {
    setMenu(null)
    let jsonData = {
      "product": data?.products?.map(product => ({
        ...product,
      })),
      "title": data?.title,
      "description": data?.description,
      "subtotal": subtotal,
    }

    console.log({ jsonData });

    dispatch(createTemplateWith(jsonData)).then(({ payload }) => {
      if (payload?.id) {
        reset();
      }
    });
  }

  const createQuote = async (data) => {
    setMenu(null)
    let jsonData = {
      "product": data?.products?.map(product => ({
        ...product,
      })),
      "title": data?.title,
      "description": data?.description,
      "subtotal": subtotal,
    }

    console.log({ jsonData });

    dispatch(createTemplateWith(jsonData)).then(({ payload }) => {
      if (payload?.id) {
        router.push(`/quotes/new?template=${payload.id}`)
      }
    });
  }

  return (
    <div className='dark:text-white max-w-[1200px] mx-auto space-y-4'>
      <div className='text-sm text-tprimary dark:text-dark-text'>
        Back to : <Link href={"/quotes/templates"} className='text-green-700 dark:text-dark-second-text'>Templates</Link>
      </div>
      <div className="">
        {/* Template Title */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="w-1/2 flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="" className='flex gap-2 items-center text-tprimary dark:text-dark-text font-bold'>Title
                  {errors?.title && <p className="text-red-500 italic">It is required</p>}
                </label>
                <input
                  {...register("title", { required: true })}
                  label="Title"
                  placeholder='Title'
                  className={`focus:outline-none border dark:bg-dark-secondary px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg ${errors?.title && "dark:border-red-500"}`}
                />
                <textarea
                  {...register("description")}
                  label="Description"
                  placeholder='Description'
                  className={`w-full  dark:text-white dark:bg-dark-secondary  focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg h-[70px] focus:h-[100px] transition-all`}
                ></textarea>

              </div>
            </div>

            <div className="bg-white dark:bg-dark-secondary p-3 lg:col-span-3 py-4 text-tprimary space-y-4">

              <ProductsList />

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
                <CustomButton title="Cancel" onClick={() => { router.back() }}></CustomButton>
                {
                  <>
                    <div className="flex gap-2 items-center">
                      <CustomButton type={"submit"} loading={loadingObj.savetemplate} title="Save Template"></CustomButton>
                      <CustomMenu open={menu == "save-and"} icon={<CustomButton loading={loadingObj.savetemplatewith} onClick={() => setMenu("save-and")} backIcon={<ChevronDown className='w-5 h-5 text-white' />} type={"button"} variant="primary" title="Save and"></CustomButton>}>
                        {/* Menu Items */}
                        <Typography variant="subtitle1" style={{ padding: '8px 16px', fontWeight: 'bold' }}>
                          Save and...
                        </Typography>

                        <MenuItem onClick={handleSubmit(createAnother)} className="text-tprimary dark:text-white text-sm">
                          <ListItemIcon>
                            <MessageSquareText className="text-orange-700 dark:text-orange-500" size={16} />
                          </ListItemIcon>
                          Create Another
                        </MenuItem>

                        <MenuItem onClick={handleSubmit(createQuote)} className="text-tprimary dark:text-white text-sm">
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
        </FormProvider>
      </div>
    </div>
  );
}
