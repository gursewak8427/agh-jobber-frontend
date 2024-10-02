import CustomModal from '@/components/CustomModal'
import React, { useEffect } from 'react'
import ModalHeading from '../ModalHeading'
import CustomButton from '@/components/CustomButton'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { sentClientCustommail } from '@/store/slices/client'

const SendEmailModal = ({ open, onClose, client, email }) => {
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
            client:client.id
        }
        dispatch(sentClientCustommail(jsonData)).then(() => handleClose());
        // console.log({ jsonData })
    }

    useEffect(() => {
        setValue(`email`, email)
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
                <ModalHeading onClose={onClose}>Custom Mail to {client?.fname ? client.fname + ' ' + client.lname : client?.companyname}</ModalHeading>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="content mt-6 space-y-5 ">
                    <div className="flex items-center">
                        <span className=" w-12 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-l-lg">To</span>
                        <input readOnly type="text" {...register("email")} placeholder='Email' className="w-full bg-gray-200 cursor-not-allowed focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-r-lg dark:text-dark-text dark:bg-dark-secondary" />
                    </div>
                    <div className="flex gap-4">
                        <div className="w-full">
                            <input {...register("subject")} type="text" className="dark:text-dark-text dark:bg-dark-secondary w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-t-lg" placeholder="Subject" />
                            <textarea
                                {...register("message")}
                                type="text"
                                className="dark:text-dark-text dark:bg-dark-secondary w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-b-lg h-[100px] focus:h-[130px] transition-all text-sm">
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
                        <CustomButton loading={loadingObj.custommail} type={"submit"} variant={"primary"} title="Send"></CustomButton>
                    </div>
                </div>
            </form>
        </CustomModal>
    )
}

export default SendEmailModal