import React from 'react'

const CustomButton = ({ variant, title, frontIcon, type, ...props }) => {
    return (
        <button type={type || "button"} className={`text-sm font-semibold  border border-green-800/20 space-x-2 flex items-center px-3 rounded-xl cursor-pointer gap-2 ${variant == "primary" ? 'bg-green-700 hover:bg-green-800 text-white py-[7px] ' : 'py-[5px] hover:bg-primary text-green-700'}`} {...props}>
            {frontIcon}
            {title}
        </button>
    )
}

export default CustomButton