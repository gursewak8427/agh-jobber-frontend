export const SectionBox = ({ children, padding }) => {
    return <div className={`border flex flex-col gap-4 items-start justify-start border-gray-200 rounded-lg text-tprimary text-sm ${padding || 'p-4'}`}>
        {children}
    </div>
}

export const HeadingBox = ({ children }) => {
    return <div className="w-full flex items-center justify-between gap-2">
        {children}
    </div>
}

export const inputClass = "w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg dark:text-dark-text dark:bg-dark-secondary"