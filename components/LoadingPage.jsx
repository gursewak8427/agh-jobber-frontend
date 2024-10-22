import { CircularProgress } from "@mui/material"

export const ServerLoading = () => {

    return <div className="fixed w-full h-screen top-0 left-0 bg-black bg-opacity-10 z-50 flex items-center justify-center dark:text-dark-text">
        <CircularProgress className="text-black dark:text-dark-text" />
    </div>
}