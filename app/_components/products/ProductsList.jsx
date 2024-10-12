import CustomButton from '@/components/CustomButton'
import { IconButton } from '@mui/material'
import { Newspaper, PlusIcon, Trash2 } from 'lucide-react'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

export const updateProductsFn = ({ setValue, watchProducts }) => {
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

    return newSubtotal;
}

export const lineItem = { name: "", description: "", quantity: 1, material: 0, markuppercentage: 0, markupamount: 0, labour: 0, total: 0 }
export const txtItem = { name: "", description: "", }

export const defaultProductLineItem = {
    type: "default",
    name: "",
    markuppercentage: 0,
    total: 0,
    items: [lineItem]
}


export const defaultProductOptional = {
    type: "optional",
    name: "",
    markuppercentage: 0,
    total: 0,
    items: [lineItem]
}


export const defaultProductTextItem = {
    type: "text",
    name: "",
    items: [txtItem]
}


const ProductsList = () => {
    const { register,
        watch,
        control,
        formState: { errors },
        setValue,
        getValues } = useFormContext() // retrieve all hook methods


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

    const subtotal = watch("subtotal");




    return (
        <>
            <div className="lg:col-span-3 py-4 text-tprimary space-y-4">

                <div className="font-black text-lg dark:text-white">Products</div>

                {
                    productsList.map((product, index) => {

                        const _items = watch(`products.${index}.items`);

                        console.log({ errors })

                        return <div className='space-y-7 p-4 py-4 border rounded-lg'>
                            <div className="flex justify-between gap-2 items-center">
                                <input
                                    hidden
                                    {...register(`products.${index}.type`)}
                                    value={product.type}
                                />
                                <div className="flex flex-col w-full relative">
                                    <label htmlFor="" className='text-sm font-bold absolute left-2 dark:bg-dark-secondary bg-white dark:text-white px-2 transform -translate-y-1/2'>Title <span className='text-gray-500 italic'>{product.type != "default" ? `(${product?.type})` : ""}</span></label>
                                    <input
                                        {...register(`products.${index}.name`, { required: true })}
                                        placeholder='Enter Product Title'
                                        className={`w-full dark:text-white dark:bg-dark-secondary focus:outline-none border px-3 py-2  pt-4 border-gray-300 focus:border-gray-400 ${errors?.products?.[index]?.name && "dark:border-red-500"}`}
                                    />
                                </div>
                                {
                                    product?.type != "text" && <div className="flex items-center gap-2">
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
                                                        <div className="flex flex-col h-full items-start justify-start w-full">
                                                            <div className="relative w-full">
                                                                <div className="absolute top-0 left-5 bg-white dark:bg-dark-secondary dark:text-white  px-1 transform -translate-y-[50%] font-semibold text-xs text-tprimary text-opacity-60">Name</div>
                                                                <input
                                                                    {...register(`products.${index}.items.${itemIndex}.name`)}
                                                                    className="w-full  dark:text-white dark:bg-dark-secondary focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                                                                />
                                                            </div>
                                                            <div className="relative w-full">
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
            </div>
        </>
    )
}

export default ProductsList