import { CircularProgress } from '@mui/material'
import React from 'react'

const CustomButton = ({ variant, title, frontIcon, backIcon, type, loading, ...props }) => {
    return (
        <button disabled={loading} type={type || "button"} {...props} className={`text-sm font-semibold  border border-green-800/20 space-x-2 flex items-center px-3 rounded-xl cursor-pointer gap-2 ${variant == "primary" ? 'bg-green-700 hover:bg-green-800 text-white py-[7px] ' : 'py-[5px] hover:bg-primary text-green-700 dark:hover:bg-dark-hover dark:text-dark-second-text'}`}>
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