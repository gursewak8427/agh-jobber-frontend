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


const NewTimeEntry = ({ open, onClose, onCreate, client }) => {
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
            console.log({ data })
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    return (
        <CustomModal show={Boolean(open)} onClose={onClose}>
            <div className="space-y-6">
                <ModalHeading onClose={onClose}>New time entry</ModalHeading>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col text-sm space-y-4">
                        <div className='space-y-4'>
                            <div className="flex">
                                <input {...register("starttime")}
                                    type="time"
                                    placeholder='Street 1'
                                    className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-r-none"
                                />
                                <input {...register("endtime")}
                                    type="time"
                                    placeholder='Street 2'
                                    className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-l-none"
                                />
                            </div>
                            <div className="flex">
                                <input {...register("hours")}
                                    type="time"
                                    placeholder='Street 1'
                                    className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-r-none"
                                />
                                <input {...register("minutes")}
                                    type="time"
                                    placeholder='Street 2'
                                    className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-l-none"
                                />
                            </div>
                            <textarea  {...register("notes")}
                                placeholder='Notes'
                                className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                                rows={4}
                            ></textarea>
                            <input
                                {...register("date")}
                                type='date'
                                placeholder='Notes'
                                className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                                rows={4}
                            />

                            <select {...register("employee")}
                                className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                            >
                                <option className='text-tprimary' value="">Select Employee</option>
                                <option className='text-tprimary' value="1">Gurwinder</option>
                                <option className='text-tprimary' value="2">Gurjeet</option>
                            </select>

                            <div>
                                <input
                                    {...register("employeecost")}
                                    placeholder='Employee cost per hour'
                                    className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                                />
                                <p className='text-xs text-gray-400'>Total cost: $0.00</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2 items-center w-full">
                        <CustomButton title="Cancel" onClick={() => {
                            onClose()
                        }}></CustomButton>
                        <CustomButton type={'submit'} variant="primary" title="Create Time Entry"></CustomButton>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}

export default NewTimeEntry