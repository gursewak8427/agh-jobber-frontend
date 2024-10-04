import CustomModal from '@/components/CustomModal'
import React, { useEffect } from 'react'
import ModalHeading from '../ModalHeading'
import CustomButton from '@/components/CustomButton'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { sentClientCustommail, sentJobEmail } from '@/store/slices/client'
import { formatTime, formatUserDate, getAddress, getClientName, primaryEmail } from '@/utils'

const SendEmailModal = ({ open, onClose, job, profile }) => {
    const dispatch = useDispatch()
    const { loadingObj } = useSelector(state => state.clients);
    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        formState: { errors },
        setValue
    } = useForm();

    const onSubmit = async (data) => {
        const jsonData = {
            ...data,
            job: job.id,
            subjectline:`Your booking confirmation with ${profile.company_name}`,
            client:job.client.id
        }
        dispatch(sentJobEmail(jsonData)).then(() => handleClose());
        console.log({ jsonData })
    }

    useEffect(() => {
        setValue(`email`, primaryEmail(job))
        setValue(`subject`, `Booking confirmation from ${profile.company_name}`)
        setValue(`message`, `Hi ${getClientName(job.client)},\n\nThank you for booking with us.\n\nLocation: ${getAddress(job.property)}\nDate: ${formatUserDate(job.startdate)}\nEstimated Arrival Time: ${formatTime(job.starttime)} – ${formatTime(job.endtime)}\n\nSincerely,\n\n${profile.company_name}`)
    }, [open])

    const handleClose = () => {
        reset({
            email: "",
            subject: "",
            sendmecopy: false,
            message: ""
        })
        onClose();
    }

    return (
        <CustomModal wide={true} show={Boolean(open)} onClose={handleClose}>
            <div className="space-y-6">
                <ModalHeading onClose={onClose}>Email booking confirmation to {getClientName(job.client)}</ModalHeading>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="content mt-6 space-y-5">
                    <div className="flex items-center">
                        <span className="w-12 focus:outline-none border px-3  py-2 border-gray-300 focus:border-gray-400 rounded-l-lg">To</span>
                        <input name='email' type="text" {...register("email")} placeholder='Email' className="w-full dark:bg-dark-secondary bg-gray-200 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-r-lg" />
                    </div>
                    <div className="flex gap-4">
                        <div className="w-full">
                            <input {...register("subject")} type="text" className="w-full dark:bg-dark-secondary focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-t-lg" placeholder="Subject" />
                            <textarea
                                {...register("message")}
                                type="text"
                                className="w-full dark:bg-dark-secondary focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-b-lg h-[250px] focus:h-[280px] transition-all text-sm">
                            </textarea>
                            <div className={`flex gap-2 items-center select-none`}>
                                <input
                                    {...register("sendmecopy")}
                                    type="checkbox"
                                    className="w-5 h-5"
                                    id={`copy`}
                                />
                                <label className="cursor-pointer" htmlFor={`copy`}>
                                    Send me a copy
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center justify-end">
                        <CustomButton onClick={handleClose} title="Cancel"></CustomButton>
                        <CustomButton loading={loadingObj.jobemail} type={"submit"} variant={"primary"} title="Send"></CustomButton>
                    </div>
                </div>
            </form>
        </CustomModal>
    )
}

export default SendEmailModal