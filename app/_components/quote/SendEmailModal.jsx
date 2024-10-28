import CustomModal from '@/components/CustomModal'
import React, { useEffect, useState } from 'react'
import ModalHeading from '../ModalHeading'
import CustomButton from '@/components/CustomButton'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { sentQuoteEmail } from '@/store/slices/client'
import { formatUserDate, formatUserDateOther, getAddress, getClientName, primaryEmail } from '@/utils'

const SendEmailModal = ({ open, onClose, client, quote }) => {
    const dispatch = useDispatch()
    const { loadingObj, profile } = useSelector(state => state.clients);
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
            quote: quote.id
        }
        dispatch(sentQuoteEmail(jsonData)).then(() => onClose());
        console.log({ jsonData })
    }

    useEffect(() => {
        setValue(`email`, primaryEmail(quote))
        setValue(`subject`, `Quote from ${profile.company_name} - ${new Date().toDateString()}`)
        setValue(`message`, `Hi ${getClientName(client)},\n\nThank you for asking us to quote on your project.${getAddress(quote?.property)}.\n\nThe quote total is $${quote.costs} as of ${formatUserDateOther(quote?.createdAt)}.\n\nIf you have any questions or concerns regarding this quote, please don't hesitate to get in touch with us at ${profile.email}.\n\nSincerely,\n\n${profile.company_name}`
        )
        console.log(quote?.createdAt);
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
                <ModalHeading onClose={onClose}>Email quote #{quote?.quoteno} to {client?.fname ? client.fname + ' ' + client.lname : client?.companyname}</ModalHeading>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="content mt-6 space-y-5">
                    <div className="flex items-center">
                        <span className="w-12 focus:outline-none border px-3  py-2 border-gray-300 focus:border-gray-400 rounded-l-lg">To</span>
                        <input type="text" {...register("email")} name='email' placeholder='Email' className="w-full dark:bg-dark-secondary bg-gray-200 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-r-lg" />
                    </div>
                    <div className="flex gap-4">
                        <div className="w-full">
                            <input {...register("subject")} name='subject' type="text" className="w-full dark:bg-dark-secondary focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-t-lg" placeholder="Subject" />
                            <textarea
                                {...register("message")}
                                type="text"
                                name='message'
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
                        <CustomButton loading={loadingObj.quoteemail} type={"submit"} variant={"primary"} title="Send"></CustomButton>
                    </div>
                </div>
            </form>
        </CustomModal>
    )
}

export default SendEmailModal