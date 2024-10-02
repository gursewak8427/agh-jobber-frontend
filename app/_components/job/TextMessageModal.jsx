import CustomModal from '@/components/CustomModal'
import React, { useEffect } from 'react'
import ModalHeading from '../ModalHeading'
import CustomButton from '@/components/CustomButton'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { getClientName } from '@/utils'
import { useDispatch } from 'react-redux'
import { sendQuoteMessage } from '@/store/slices/client'
import { useAppSelector } from '@/store/hooks'

const TextMessageModal = ({ open, onClose, client, job, profile }) => {
    const dispatch = useDispatch()
    const { loadingObj } = useAppSelector(store => store.clients)
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
        let jsonData = {
            ...data,
            message: data?.message,
            client: client.id,
            job:job.id
        }
        console.log({ jsonData })
        // dispatch(sendQuoteMessage(jsonData)).then(() => onClose());
    }

    const message = watch("message")

    useEffect(() => {
        if (client?.mobile?.length > 0) {
            const validMobile = client.mobile.find(mobile => mobile.valid && mobile.sms);
            if (validMobile) {
                setValue(`mobile`, `+${validMobile.number}`)
                setValue(`message`, `Dear ${getClientName(client)}, We are delighted to share the quotation from ${profile.company_name} with you! Thank you for considering us.`)
            }
        }
    }, [client]);

    return (
        <CustomModal wide={true} show={Boolean(open)} onClose={onClose}>
            <div className="space-y-6">
                <ModalHeading onClose={onClose}>Send Job #{job.jobno} to {getClientName(client)} as text message</ModalHeading>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="content mt-6 space-y-5">
                    <div className="flex items-center">
                        <span className="w-12 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-l-lg">To</span>
                        <input readOnly type="text" {...register("mobile")} className="w-full dark:bg-dark-primary focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-r-lg" />
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <textarea
                                {...register("message")}
                                type="text"
                                className="w-full focus:outline-none border px-3 py-2 border-gray-300 dark:bg-dark-primary focus:border-gray-400 rounded-lg h-[100px] focus:h-[130px] transition-all text-sm"></textarea>
                            <div className="flex items-center justify-between">
                                <Link href={"#"} className="text-green-700 dark:text-dark-second-text">Customize your default templates</Link>
                                <span>{message?.length}</span>
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <div className='rounded-xl rounded-bl-none bg-primary-dark p-4 text-sm dark:bg-dark-primary'>
                                {message}

                                <div className="mt-4">View your Job here https://client.prosbro.com/TfdR00c5tr9</div>
                            </div>
                            <p className="text-gray-500 italic">Your client can view the Job in their client hub.</p>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center justify-end">
                        <CustomButton onClick={onClose} title="Cancel"></CustomButton>
                        <CustomButton type={"submit"} loading={loadingObj.jobmessage} variant={"primary"} title="Send"></CustomButton>
                    </div>
                </div>
            </form>
        </CustomModal>
    )
}

export default TextMessageModal