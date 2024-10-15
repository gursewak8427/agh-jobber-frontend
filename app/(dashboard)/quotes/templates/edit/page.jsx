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
import { createQuote, createTemplate, deleteTemplateProduct, deleteTemplateProductItem, fetchallClients, fetchClient, fetchQuotecount, fetchQuoteCustomFields, fetchSingleTemplate, fetchTeam, fetchTemplateProductForQuote, removeLoading, setLoading, updateTemplate } from '@/store/slices/client';
import { useAppDispatch } from '@/store/hooks';
import CustomSingleField from '@/app/_components/CustomSingleField';
import { getAddress, getClientName, getPrimary } from '@/utils';
import SelectProperty from '@/app/_components/property/SelectProperty';
import NewProperty from '@/app/_components/property/NewProperty';
import CustomMenu from '@/components/CustomMenu';
import ProductsList, { defaultProductLineItem, updateProductsFn } from '@/app/_components/products/ProductsList';

export default function Page() {
  const [menu, setMenu] = useState(null)
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Custom fields, change with quote custom fields
  const { loadingObj, quoteproducts } = useSelector(state => state.clients);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      products: [defaultProductLineItem],
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

  const { fields: productsList, append: appendProduct, remove: removeProduct } = useFieldArray({
    control,
    name: "products",
  });



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

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleTemplate(id));
    }
  }, [id])

  useEffect(() => {
    console.log(quoteproducts, "=-=quoteproducts");

    if (quoteproducts && quoteproducts?.length != 0) {
      reset({
        products: quoteproducts?.products,
      });
      setValue(`title`, quoteproducts?.title)
      setValue(`description`, quoteproducts?.description)
    }
  }, [quoteproducts])


  const onSubmit = async (data) => {

    let jsonData = {
      "product": data?.products?.map(product => ({
        ...product,
      })),
      "title": data?.title,
      "description": data?.description,
      "subtotal": subtotal,
      'id': quoteproducts.id
    }

    console.log({ jsonData });

    dispatch(updateTemplate(jsonData)).then(({ payload }) => {
      console.log({ payload })
      if (payload?.id) {
        // router.push(`/quotes/templates`)
      }
    });
  };

  const handleproductdelete = (id) => {
    const data = watchProducts[id]
    if (data && 'id' in data) {
      dispatch(deleteTemplateProduct(data.id))
    }

  }

  const handleproductitemdelete = (id) => {
    if (id)
      dispatch(deleteTemplateProductItem(id))
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
                <CustomButton title="Back" onClick={() => { router.back() }}></CustomButton>
                <CustomButton type={"submit"} loading={loadingObj.updatetemplate} title="Update Template"></CustomButton>
              </div>

            </div>

          </form>
        </FormProvider>
      </div>
    </div>
  );
}
