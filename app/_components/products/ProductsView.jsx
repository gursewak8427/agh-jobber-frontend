import CustomButton from '@/components/CustomButton'
import { IconButton } from '@mui/material'
import { Newspaper, PlusIcon, Trash2 } from 'lucide-react'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'



const ProductsView = ({ product }) => {

    return (
        <>
            {
                product?.map((product, indexProduct) => {
                    return <div className="border border-gray-300 rounded-lg p-2">
                        <div className="flex items-center justify-between pb-5">
                            <h1 className='font-black text-lg'>{product?.name}</h1>
                            <div className="flex items-center gap-3 text-right">
                                <div className='flex items-end gap-2'>
                                    <small className="italic">Total</small>
                                    <div>${product?.total}</div>
                                </div>
                            </div>
                        </div>
                        <table className='w-full'>
                            <thead>
                                <tr className='border-b'>
                                    <th style={{ width: "20px" }}><p className="mb-4 text-md font-semibold text-left">Product / Service</p></th>
                                    <th><p className="mb-4 text-md font-semibold text-left">Qty.</p></th>
                                    <th><p className="mb-4 text-md font-semibold text-left px-4">Material</p></th>
                                    <th><p className="mb-4 text-md font-semibold text-left px-4">Labour</p></th>
                                    <th><p className="mb-4 text-md font-semibold text-left px-4">Markup</p></th>
                                    <th><p className="mb-4 text-md font-semibold text-right">Total</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    product?.items?.map((service, index) => {
                                        return <tr className={`${index + 1 != product?.items?.length && "border-b"}`} key={index}>
                                            <td className='pr-2 py-4 w-[700px]'>
                                                <div className="flex flex-col h-full items-start justify-start">
                                                    <div className="text-sm">{service?.name}</div>
                                                    <div className="text-sm text-gray-400">{service?.description}</div>
                                                </div>
                                            </td>
                                            <td className='pr-2 py-4 text-center'>{service?.quantity || 0} {service?.quantitytype}</td>
                                            <td className='pr-2 py-4 text-center'>${service?.material || 0}</td>
                                            <td className='pr-2 py-4 text-center'>${service?.labour || 0}</td>
                                            <td className='pr-2 py-4 text-center'>
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <span className=''>${service?.markupamount}<small className='ml-1 text-gray-700 dark:text-gray-400'><i>(${service?.markuppercentage}%)</i></small></span>
                                                </div>
                                            </td>
                                            <td className='pr-2 py-4 text-right'>${service?.total}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                })
            }

        </>
    )
}

export default ProductsView