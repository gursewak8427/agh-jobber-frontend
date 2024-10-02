import { IconButton } from '@mui/material'
import React from 'react'
import { X } from 'lucide-react'

const ModalHeading = ({ children, onClose }) => {
    return (
        <div className="flex w-full justify-between items-center dark:text-dark-text dark:bg-dark-secondary">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-dark-text">{children}</h2>
            <IconButton onClick={onClose}>
                <X className='text-tprimary w-5 h-5 dark:text-dark-text' />
            </IconButton>
        </div>
    )
}

export default ModalHeading