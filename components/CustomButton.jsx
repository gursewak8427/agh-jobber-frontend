import { CircularProgress } from '@mui/material'
import clsx from 'clsx'
import React from 'react'

const CustomButton = ({ variant, title, frontIcon, backIcon, type, loading, className, ...props }) => {
    return (
        <button disabled={loading} type={type || "button"} {...props} className={clsx(`text-sm font-semibold  border border-green-800/50 dark:border-0 space-x-2 flex items-center px-3 rounded-xl cursor-pointer gap-2 ${variant == "primary" ? 'bg-green-700 hover:bg-green-800 text-white py-[7px] ' : variant === 'destructive' ? 'py-[5px] hover:bg-primary text-red-600 dark:hover:bg-dark-hover border-red-600/50' : 'py-[5px] hover:bg-primary text-green-700 dark:hover:bg-dark-hover dark:text-dark-second-text'}`, className)}>
            {
                loading ? <><CircularProgress size={15} color={variant == "primary" ? "white" : "black"} /> Please Wait...</> : <>
                    {frontIcon}
                    {title}
                    {backIcon}
                </>
            }
        </button>
    )
}

export default CustomButton