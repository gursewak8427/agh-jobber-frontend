"use client"
import React, { useEffect, useState } from 'react'
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
import { createJobExepense, createProperty, fetchProperty, fetchTeam, putJobExepense } from '@/store/slices/client'
import { useSelector } from 'react-redux'


const NewExpense = ({ open, onClose, job }) => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        setValue,
        reset
    } = useForm();

    const router = useRouter();
    const dispatch = useAppDispatch();

    const { team,loadingObj } = useSelector(state => state.clients);

    useEffect(() => {
        if (!open) return;

        dispatch(fetchTeam())


        if (Boolean(open) && open != true) {
            reset({ ...open, receipt: null })
        } else {
            reset({
                "itemname": "",
                "accountingcode": "",
                "description": "",
                "date": "",
                "total": 0,
                "reimburseto": "",
            })
        }
    }, [open])

    const onSubmit = async (data) => {
        try {
            let fd = new FormData();
            fd?.append("job", job?.id)
            fd?.append("itemname", data?.itemname)
            fd?.append("accountingcode", data?.accountingcode)
            fd?.append("description", data?.description)
            fd?.append("date", data?.date)
            fd?.append("total", data?.total || 0)
            if (Boolean(data?.reimburseto)) {
                fd?.append("reimburseto", data?.reimburseto)
            }
            if (data?.receipt?.[0]) {
                fd?.append("receipt", data?.receipt?.[0])
            }



            if (Boolean(open) && open != true) {
                fd?.append("id", open?.id)
                dispatch(putJobExepense(fd)).then(()=>onClose())
            } else {
                dispatch(createJobExepense(fd)).then(()=>onClose())
            }
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
                                {...register("itemname", { required: true })}
                                type='text'
                                placeholder='Item name'
                                className="w-full focus:outline-none border px-3 py-2 dark:bg-dark-secondary border-gray-300 focus:border-gray-400 rounded-lg"
                            />

                            <select {...register("accountingcode")}
                                className="w-full h-11 focus:outline-none border px-3 py-2 dark:bg-dark-secondary border-gray-300 focus:border-gray-400 rounded-lg"
                            >
                                <option className='text-tprimary' value="">Accounting code</option>
                            </select>

                            <textarea  {...register("description")}
                                placeholder='Description'
                                className="w-full focus:outline-none border px-3 py-2 dark:bg-dark-secondary border-gray-300 focus:border-gray-400 rounded-lg"
                                rows={4}
                            ></textarea>
                            <input
                                {...register("date", { required: true })}
                                type='date'
                                placeholder='Notes'
                                className="w-full focus:outline-none border px-3 py-2 dark:bg-dark-secondary border-gray-300 focus:border-gray-400 rounded-lg"
                                rows={4}
                            />

                            <input
                                {...register("total", { required: true })}
                                placeholder='Total'
                                className="w-full h-11 focus:outline-none border px-3 py-2 dark:bg-dark-secondary border-gray-300 focus:border-gray-400 rounded-lg"
                            />

                            <select {...register("reimburseto")}
                                className="w-full h-11 focus:outline-none border px-3 py-2 dark:bg-dark-secondary border-gray-300 focus:border-gray-400 rounded-lg"
                            >
                                <option className='text-tprimary dark:text-dark-text' value="">Expense reimburseto</option>
                                {
                                    team?.map(t => <option key={t?.id} className='text-tprimary dark:text-dark-text' value={t?.id}>{t?.name}</option>)
                                }
                            </select>

                            <div className="mt-4 border-2 border-gray-300 text-sm border-dashed p-2 py-4 rounded-xl flex flex-col space-y-3 justify-center items-center">
                                <label htmlFor="receipt" className='cursor-pointer text-gray-500 dark:text-gray-300 text-center flex flex-col items-center justify-center gap-2'>
                                    <div className="bg-white dark:bg-green-700 dark:text-dark-text dark:hover:bg-green-900 text-green-700 hover:bg-green-700 hover:bg-opacity-20 cursor-pointer px-4 py-2 rounded-full border-green-700 border-2">Add Recipt</div>
                                    Select your file here to upload
                                </label>
                                <input hidden type="file" name="receipt" id="receipt" {...register("receipt")} />
                            </div>

                        </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2 items-center w-full">
                        <CustomButton title="Cancel" onClick={() => {
                            onClose()
                        }}></CustomButton>
                        <CustomButton type={'submit'} loading={loadingObj.expense} variant="primary" title="Save Expense"></CustomButton>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}

export default NewExpense