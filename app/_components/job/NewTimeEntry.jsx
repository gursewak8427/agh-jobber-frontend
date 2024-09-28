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
import { createJobEmployeeSheet, createProperty, fetchProperty, fetchTeam, putJobEmployeeSheet } from '@/store/slices/client'
import { useSelector } from 'react-redux'


const NewTimeEntry = ({ open, onClose, job }) => {
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
    const [totalcost, settotalcost] = useState(0)

    const { team } = useSelector(state => state.clients);
    const hour = watch("hour")
    const minutes = watch("minutes")
    const employeecost = watch("employeecost") // per hour cost

    useEffect(() => {

        if (!hour || !minutes || !employeecost) return;

        settotalcost(parseFloat(employeecost) * parseFloat(hour))
    }, [hour, minutes, employeecost])

    useEffect(() => {
        if (!open) return;

        dispatch(fetchTeam())


        if (Boolean(open) && open != true) {
            reset({ ...open, receipt: null })
        } else {
            reset({
                "starttime": "",
                "endtime": "",
                "hour": "",
                "minutes": "",
                "notes": "",
                "date": "",
                "employee": "",
                "employeecost": ""
            })
        }
    }, [open])

    const onSubmit = async (data) => {
        try {

            let jsonData = {
                "job": job?.id,
                "starttime": data?.starttime,
                "endtime": data?.endtime,
                "hour": data?.hour,
                "minutes": data?.minutes,
                "notes": data?.notes,
                "date": data?.date,
                "employee": data?.employee,
                "employeecost": data?.employeecost
            }

            if (Boolean(open) && open != true) {
                jsonData["id"] = open?.id;
                dispatch(putJobEmployeeSheet(jsonData))
            } else {
                dispatch(createJobEmployeeSheet(jsonData))
            }
            onClose()
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
                                <input {...register("hour")}
                                    type="text"
                                    placeholder='Hour'
                                    className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-r-none"
                                />
                                <input {...register("minutes")}
                                    type="text"
                                    placeholder='Minutes'
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

                            <select {...register("employee", { required: true })}
                                className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                            >
                                <option className='text-tprimary' value="">Select Employee</option>
                                {
                                    team?.map(t => <option key={t?.id} className='text-tprimary' value={t?.id}>{t?.name}</option>)
                                }
                            </select>

                            <div>
                                <input
                                    {...register("employeecost")}
                                    placeholder='Employee cost per hour'
                                    className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                                />
                                <p className='text-xs text-gray-400'>Total cost: ${totalcost}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2 items-center w-full">
                        <CustomButton title="Cancel" onClick={() => {
                            onClose()
                        }}></CustomButton>
                        <CustomButton type={'submit'} variant="primary" title={Boolean(open) && open != true ? "Update" : "Create Time Entry"}></CustomButton>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}

export default NewTimeEntry