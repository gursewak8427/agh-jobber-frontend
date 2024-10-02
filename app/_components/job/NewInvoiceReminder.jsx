"use client"
import React, { useEffect, useState } from 'react'
import CustomModal from "@/components/CustomModal"
import ModalHeading from '../ModalHeading'
import { inputClass, SectionBox } from '..'
import CustomButton from '@/components/CustomButton'
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, MenuItem } from '@mui/material'
import { ImageIcon, PlusIcon, UserIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getAddress, getClientName } from '@/utils'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '@/store/hooks'
import { createInvoiceReminder, createJobVisit, createProperty, fetchProperty, fetchTeam, putInvoiceReminder } from '@/store/slices/client'
import CustomMenu from '@/components/CustomMenu'
import { useSelector } from 'react-redux'


const NewInvoiceReminder = ({ open, onClose, job }) => {
    const [menu, setmenu] = useState(null)
    const [teamList, setTeamList] = useState([])

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        setValue,
        reset,
    } = useForm();

    const router = useRouter();
    const dispatch = useAppDispatch();

    const { team, loadingObj } = useSelector(state => state.clients);

    useEffect(() => {
        if (!open) return;

        dispatch(fetchTeam());

        if (Boolean(open) && open != true) {
            reset({ ...open, })
            setTeamList(open?.team)
        } else {
            reset({
                "title": "",
                "startdate": "",
                "enddate": "",
                "schedulelater": false,
                "anytime": false,
            })
            setTeamList([])
        }
    }, [open])

    const onSubmit = async (data) => {
        try {
            let jsonData = {
                "job": job?.id,
                "title": data?.title,
                "startdate": data?.startdate,
                "enddate": data?.enddate,
                "schedulelater": data?.schedulelater,
                "anytime": data?.anytime,
                team: teamList?.map(t => t?.id),
            }

            if (Boolean(data?.schedulelater)) {
                delete jsonData?.startdate;
                delete jsonData?.enddate;
            }

            if (Boolean(data?.anytime)) {
                delete jsonData?.starttime;
                delete jsonData?.endtime;
            }
            console.log({ jsonData })

            if (Boolean(open) && open != true) {
                dispatch(putInvoiceReminder({ id: open?.id, ...jsonData })).then(()=>onClose())
            } else {
                dispatch(createInvoiceReminder(jsonData)).then(()=>onClose())
            }
            onClose()
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    return (
        <CustomModal wide={true} show={Boolean(open)} onClose={onClose}>
            <div className="space-y-6">
                <ModalHeading onClose={onClose}>New invoice reminder</ModalHeading>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex space-x-4">
                        <div className="w-2/3 flex flex-col">
                            <textarea
                                {...register("details")}
                                placeholder='Details'
                                className="focus:outline-gray-500 outline-offset-2 border px-3 py-2 dark:bg-dark-secondary border-gray-300 focus:border-gray-400 rounded-lg"
                            ></textarea>
                        </div>
                        <div className="w-1/3 flex flex-col text-xs">
                            <div className="font-semibold">Job details</div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='py-1 pr-2'>
                                            <div>
                                                Job #
                                            </div>
                                        </td>
                                        <td className='py-1 pr-2 text-green-600 cursor-pointer'>
                                            <div>
                                                {job?.jobno}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-1 pr-2'>
                                            <div>
                                                Client
                                            </div>
                                        </td>
                                        <td className='py-1 pr-2 text-green-600 cursor-pointer'>
                                            <div>
                                                {getClientName(job?.client)}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-1 pr-2 h-[50px]'>
                                            <div className='h-full flex items-start justify-start'>
                                                Address
                                            </div>
                                        </td>
                                        <td className='py-1 pr-2 h-[50px] text-green-600 cursor-pointer'>
                                            <div className='h-full flex items-start justify-start'>
                                                {getAddress(job?.property)}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-2/3">
                            <h2 className="text-xl font-semibold mb-2">Schedule</h2>

                            <div className="w-full flex">
                                <div className="w-1/2 p-3">
                                    <div className="flex">
                                        <div className="w-1/2">
                                            <label className="block mb-1 font-semibold text-sm">Start date</label>
                                            <input {...register('startdate')} type="date" className="focus:outline-gray-500 w-full border p-2 dark:bg-dark-secondary rounded-md rounded-r-none" />
                                        </div>
                                        <div className="w-1/2">
                                            <label className="block mb-1 font-semibold text-sm">End date</label>
                                            <input {...register('enddate')} type="date" className="focus:outline-gray-500 w-full border p-2 dark:bg-dark-secondary rounded-md rounded-l-none" placeholder="Optional" />
                                        </div>
                                    </div>

                                    <div className="flex items-center mb-4 pt-2">
                                        <input  {...register('schedulelater')} type="checkbox" className="mr-2 w-4 h-4" id='1123213' />
                                        <label className='text-sm font-semibold cursor-pointer' htmlFor='1123213'>Schedule later</label>
                                    </div>
                                </div>
                                <div className="w-1/2 p-3">
                                    <div className="flex">
                                        <div className="w-1/2">
                                            <label className="block mb-1 font-semibold text-sm">Start time</label>
                                            <input {...register('starttime')} type="time" className="focus:outline-gray-500 w-full border p-2 dark:bg-dark-secondary rounded-md rounded-r-none" />
                                        </div>
                                        <div className="w-1/2">
                                            <label className="block mb-1 font-semibold text-sm">End time</label>
                                            <input {...register('endtime')} type="time" className="focus:outline-gray-500 w-full border p-2 dark:bg-dark-secondary rounded-md rounded-l-none" placeholder="Optional" />
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-4 pt-2">
                                        <input  {...register('allday')} type="checkbox" className="mr-2 w-4 h-4" id='allday' />
                                        <label className='text-sm font-semibold cursor-pointer' htmlFor='allday'>All day</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="w-1/3">
                            <div className='p-4 space-y-4'>
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold mb-2">Team</h2>
                                    <CustomMenu open={menu == "team"} icon={<CustomButton onClick={() => setmenu("team")} title={"Assign"} frontIcon={<PlusIcon className='w-4 h-4' />} />}>
                                        {
                                            team?.map((t, i) => {
                                                return <MenuItem key={`team-${i}`}>
                                                    <div className="flex items-center gap-2">
                                                        <input type="checkbox" id={`teamCheckbox-${t?.id}`} checked={teamList?.some(_t => _t?.id == t?.id)} onChange={(e) => {
                                                            if (!e?.target?.checked) {
                                                                setTeamList(teamList?.filter(teamId => teamId?.id != t?.id))
                                                            } else {
                                                                setTeamList([...teamList, t])
                                                            }
                                                        }} />
                                                        <label className='cursor-pointer' htmlFor={`teamCheckbox-${t?.id}`}>{t?.name}</label>
                                                    </div>
                                                </MenuItem>
                                            })
                                        }
                                        <div className="p-2 px-3">
                                            <CustomButton onClick={() => {
                                                router?.push(`/clients/new`)
                                            }} frontIcon={<PlusIcon className='w-4 h-4' />} title={"Create User"} />
                                        </div>
                                    </CustomMenu>
                                </div>
                                {
                                    teamList?.length == 0 ?
                                        <p className="text-sm mt-2 text-gray-700 italic dark:text-gray-400">No users are currently assigned</p> :
                                        <div className="flex items-start justify-start gap-4 flex-wrap">
                                            {
                                                teamList?.map(t => {
                                                    return <div className='px-3 py-1 bg-gray-400 rounded-full dark:bg-dark-primary'>
                                                        <span className='text-xs'>{t?.name}</span>
                                                        <IconButton onClick={() => {
                                                            setTeamList(teamList?.filter(teamId => teamId?.id != t?.id))
                                                        }}>
                                                            <X className='w-5 h-5 text-red-700' />
                                                        </IconButton>
                                                    </div>
                                                })
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                    </div>

                    <Divider />

                    <div className="mt-4 flex justify-between gap-2 items-center w-full">
                        <CustomButton title="Cancel" onClick={() => {
                            onClose()
                        }}></CustomButton>
                        <CustomButton type={'submit'} loading={loadingObj.invoicereminder} variant="primary" title="Save"></CustomButton>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}

export default NewInvoiceReminder