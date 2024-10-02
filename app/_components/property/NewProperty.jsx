"use client"
import React, { useState } from 'react'
import CustomModal from "@/components/CustomModal"
import ModalHeading from '../ModalHeading'
import { inputClass, SectionBox } from '..'
import CustomButton from '@/components/CustomButton'
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { ImageIcon, UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getAddress, getClientName } from '@/utils'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '@/store/hooks'
import { createProperty, fetchProperty } from '@/store/slices/client'


const NewProperty = ({ open, onClose, onCreate, client }) => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        setValue
    } = useForm();

    const router = useRouter();
    const dispatch = useAppDispatch();

    const onSubmit = async (data) => {
        try {
            const jsonData = {
                address1: data.address1,
                address2: data.address2,
                city: data.city,
                province: data.province,
                postalcode: data.postalcode,
                country: data.country,

                client: client?.id,
            }

            dispatch(createProperty(jsonData)).then(res => {
                console.log({ res })
                dispatch(fetchProperty(res?.payload?.property_id)).then(response => {
                    onCreate(response?.payload)
                })
            });
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };


    const SectionBox = ({ children, padding, onClose }) => {
        return <div className={`border flex flex-col gap-4 items-start justify-start border-gray-200 rounded-lg text-tprimary text-sm ${padding || 'p-4'}`}>
            {children}
        </div>
    }

    return (
        <CustomModal show={Boolean(open)} onClose={onClose}>
            <div className="space-y-6">
                <ModalHeading onClose={onClose}>New Property for {getClientName(client)}</ModalHeading>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col text-sm space-y-4">
                        <div>
                            <div>
                                <input {...register("address1")}
                                    type="text"
                                    placeholder='Street 1'
                                    className="w-full h-11 focus:outline-none border px-3 py-2 dark:bg-dark-secondary border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                                />
                            </div>
                            <div>
                                <input {...register("address2")}
                                    type="text"
                                    placeholder='Street 2'
                                    className="w-full h-11 focus:outline-none border px-3 py-2 dark:bg-dark-secondary border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none rounded-b-none"
                                />
                            </div>
                            <div className="flex flex-row">
                                <input {...register("city")}
                                    type="text"
                                    placeholder='City'
                                    className="w-full h-11 focus:outline-none border px-3 py-2 dark:bg-dark-secondary border-gray-300 focus:border-gray-400"
                                />
                                <input {...register("province")}
                                    type="text"
                                    placeholder='Province'
                                    className="w-full h-11 focus:outline-none border px-3 py-2 dark:bg-dark-secondary border-gray-300 focus:border-gray-400"
                                />
                            </div>

                            <div className="flex flex-row">
                                <input {...register("postalcode")}
                                    placeholder='Postal Code'
                                    className="w-full h-11 focus:outline-none border px-3 py-2 dark:bg-dark-secondary border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none rounded-r-none"
                                />
                                <select {...register("country")}
                                    className="w-full h-11 focus:outline-none border px-3 py-2 dark:bg-dark-secondary border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none rounded-l-none"
                                >
                                    <option className='text-tprimary dark:text-dark-text' value="">Select Country</option>
                                    <option className='text-tprimary dark:text-dark-text' value="India">India</option>
                                    <option className='text-tprimary dark:text-dark-text' value="Canada">Canada</option>
                                </select>
                            </div>
                        </div>


                        <p>Taxes <span className='text-green-700 underline ml-2 font-semibold dark:text-dark-second-text'>GST (5.0%) (Default)</span></p>

                    </div>
                    <div className="mt-4 space-y-2 flex justify-between items-center w-full">
                        <CustomButton title="Cancel" onClick={() => {
                            onClose()
                        }}></CustomButton>
                        <CustomButton type={'submit'} variant="primary" title="Create Property"></CustomButton>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}

export default NewProperty