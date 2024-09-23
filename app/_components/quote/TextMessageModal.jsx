import CustomModal from '@/components/CustomModal'
import React from 'react'
import ModalHeading from '../ModalHeading'
import CustomButton from '@/components/CustomButton'
import Link from 'next/link'

const TextMessageModal = ({ open, onClose }) => {

    return (
        <CustomModal wide={true} show={Boolean(open)} onClose={onClose}>
            <div className="space-y-6">
                <ModalHeading onClose={onClose}>Send quote #8 to Gursewak as text message</ModalHeading>
            </div>
            <div className="content mt-6 space-y-5">
                <div className="flex items-center">
                    <span className="w-12 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-l-lg">To</span>
                    <input type="text" placeholder='Type or select multiple numbers' className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-r-lg" />
                </div>
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <textarea
                            type="text"
                            className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg h-[10    0px] focus:h-[130px] transition-all text-sm">
                            Hi test test, here's your quote from AGH RENOVATION LIMITED.
                        </textarea>
                        <div className="flex items-center justify-between">
                            <Link href={"#"} className="text-green-700">Customize your default templates</Link>
                            <span>116</span>
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <div className='rounded-xl rounded-bl-none bg-primary-dark p-4 text-sm'>
                            Hi test test, here's your quote from AGH RENOVATION LIMITED.

                            <div className="mt-4">View your quote here https://jbbr.io/6Z0XZcoNrhH4kvEr9</div>
                        </div>
                        <p className="text-gray-500 italic">Your client can view the quote in their client hub.</p>
                    </div>
                </div>
                <div className="flex gap-2 items-center justify-end">
                    <CustomButton title="Cancel"></CustomButton>
                    <CustomButton variant={"primary"} title="Send"></CustomButton>
                </div>
            </div>
        </CustomModal>
    )
}

export default TextMessageModal