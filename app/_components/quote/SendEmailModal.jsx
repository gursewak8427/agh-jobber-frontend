import CustomModal from '@/components/CustomModal'
import React, { useEffect } from 'react'
import ModalHeading from '../ModalHeading'
import CustomButton from '@/components/CustomButton'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

const SendEmailModal = ({ open, onClose, client }) => {
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
        console.log({ data })
    }

    useEffect(() => {
        setValue(`email`, "test@gmail.com")
        setValue(`message`, `Hi test test, here's your quote from AGH RENOVATION LIMITED. \n\nView your quote here https://jbbr.io/6Z0XZcoNrhH4kvEr9`)
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
        <CustomModal wide={true} show={Boolean(open)} onClose={onClose}>
            <div className="space-y-6">
                <ModalHeading onClose={onClose}>Email quote #8 to Gursewak</ModalHeading>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="content mt-6 space-y-5">
                    <div className="flex items-center">
                        <span className="w-12 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-l-lg">To</span>
                        <input readOnly type="text" {...register("email")} placeholder='Email' className="w-full bg-gray-200 cursor-not-allowed focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-r-lg" />
                    </div>
                    <div className="flex gap-4">
                        <div className="w-full">
                            <input {...register("subject")} type="text" className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-t-lg" placeholder="Subject" />
                            <textarea
                                {...register("message")}
                                type="text"
                                className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-b-lg h-[100px] focus:h-[130px] transition-all text-sm">
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
                        <CustomButton type={"submit"} variant={"primary"} title="Send"></CustomButton>
                    </div>
                </div>
            </form>
        </CustomModal>
    )
}

export default SendEmailModal