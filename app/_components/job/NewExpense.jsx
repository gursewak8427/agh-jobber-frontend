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


const NewExpense = ({ open, onClose, onCreate, client }) => {
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
                <ModalHeading onClose={onClose}>New Expense</ModalHeading>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col text-sm space-y-4">
                        <div className='space-y-4'>
                            <input
                                {...register("itemname")}
                                type='text'
                                placeholder='Item name'
                                className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                            />

                            <select {...register("accountingcode")}
                                className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                            >
                                <option className='text-tprimary' value="">Accounting code</option>
                            </select>

                            <textarea  {...register("description")}
                                placeholder='Description'
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

                            <input
                                {...register("total")}
                                placeholder='Total'
                                className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                            />

                            <select {...register("reimburseto")}
                                className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                            >
                                <option className='text-tprimary' value="">Not reimburseto</option>
                                <option className='text-tprimary' value="1">Gurwinder</option>
                                <option className='text-tprimary' value="2">Gurjeet</option>
                            </select>

                            <div className="mt-4 border-2 border-gray-300 text-sm border-dashed p-2 py-4 rounded-xl flex flex-col space-y-3 justify-center items-center">
                                <CustomButton title={"Add receipt"} />
                                <label htmlFor="" className='text-gray-500'>Select or Drag your file here to upload</label>
                                <input hidden type="file" name="" id="" />
                            </div>

                        </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2 items-center w-full">
                        <CustomButton title="Cancel" onClick={() => {
                            onClose()
                        }}></CustomButton>
                        <CustomButton type={'submit'} variant="primary" title="Save Expense"></CustomButton>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}

export default NewExpense