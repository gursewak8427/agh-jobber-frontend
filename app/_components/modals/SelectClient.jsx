"use client"
import React, { useState } from 'react'
import CustomModal from "@/components/CustomModal"
import ModalHeading from '../ModalHeading'
import { inputClass, SectionBox } from '..'
import CustomButton from '@/components/CustomButton'
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { ImageIcon, UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'


const SelectClient = ({ open, onClose, onSelect, clients }) => {
    const router = useRouter();

    return (
        <CustomModal show={Boolean(open)} onClose={onClose}>
            <div className="space-y-6">
                <ModalHeading onClose={onClose}>Select or create a client</ModalHeading>
                <p className='text-sm text-gray-600'>Which client would you like to create this for?</p>
                <SectionBox padding={"p-0"}>
                    <div className="p-4 pb-0 space-y-3 w-full">
                        <div className="flex items-center justify-evenly gap-2 w-full">
                            <div className="w-1/2">
                                <input type="text" placeholder='Search clients...' className={`${inputClass}`} />
                            </div>
                            <span className='grid place-content-center'>or</span>
                            <CustomButton onClick={() => router.push(`/clients/new`)}
                                variant={"primary"} title="Create New Client" />
                        </div>
                        <div className="text-blue-500">Leads</div>
                    </div>
                    <Divider />
                    <List className='w-full max-h-[40vh] overflow-y-auto'>
                        {
                            clients.map((client, index) => {
                                return <ListItem onClick={onSelect} className='border-b border-gray-500 relative h-24 hover:bg-primary cursor-pointer'>
                                    <ListItemAvatar>
                                        <Avatar className='text-tprimary'>
                                            <UserIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={client?.fname ? client?.fname + ' ' + client?.lname : client?.companyname} secondary="" />
                                    <div className="text-sm absolute top-5 right-5">{client.updatedAt}</div>
                                </ListItem>
                            })
                        }
                    </List>
                </SectionBox>
            </div>
        </CustomModal>
    )
}

export default SelectClient