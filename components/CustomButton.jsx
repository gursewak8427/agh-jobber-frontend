import React from 'react'

const CustomButton = ({ variant, title, frontIcon }) => {
    return (
        <button className={`text-sm font-semibold  border border-green-700 space-x-2 flex items-center px-3 py-[5px] rounded-xl ${variant == "primary" ? 'bg-green-700 hover:bg-green-800 text-white' : 'hover:bg-primary text-green-700'} cursor-pointer gap-2`}>
            {frontIcon}
            {title}
        </button>
    )
}

export default CustomButton