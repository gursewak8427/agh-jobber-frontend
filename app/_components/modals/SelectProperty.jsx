"use client"
import React, { useState } from 'react'
import CustomModal from "@/components/CustomModal"
import ModalHeading from '../ModalHeading'
import { inputClass, SectionBox } from '..'
import CustomButton from '@/components/CustomButton'
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { ImageIcon, UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getAddress } from '@/utils'


const SelectProperty = ({ open, onClose, onSelect, properties }) => {
    const router = useRouter();

    return (
        <CustomModal show={Boolean(open)} onClose={onClose}>
            <div className="space-y-6">
                <ModalHeading onClose={onClose}>Select or create property</ModalHeading>
                <p className='text-sm text-gray-600'>Which property would you like to use for this?</p>
                <SectionBox padding={"p-0"}>
                    <div className="p-4 pb-0 space-y-3 w-full">
                        <div className="flex items-center justify-evenly gap-2 w-full">
                            <div className="w-1/2">
                                <input type="text" placeholder='Search properties...' className={`${inputClass}`} />
                            </div>
                            <span className='grid place-content-center'>or</span>
                            <CustomButton onClick={() => router.push(`/properties/new`)}
                                variant={"primary"} title="Create New Property" />
                        </div>
                        <div className="text-blue-500">Leads</div>
                    </div>
                    <Divider />
                    <List className='w-full max-h-[40vh] overflow-y-auto'>
                        {
                            properties?.map((property, index) => {
                                return <ListItem onClick={() => onSelect(property)} className='border-b border-gray-500 relative h-24 hover:bg-primary cursor-pointer'>
                                    <ListItemAvatar>
                                        <Avatar className='text-tprimary'>
                                            <UserIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={getAddress(property)} secondary="" />
                                </ListItem>
                            })
                        }
                    </List>
                </SectionBox>
            </div>
        </CustomModal>
    )
}

export default SelectProperty