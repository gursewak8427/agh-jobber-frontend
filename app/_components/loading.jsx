"use client"
import { CircularProgress } from "@mui/material"
import { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"

export const Loading = () => {
    const { loadingFull } = useSelector(state => state.clients)

    if (!loadingFull) return <Fragment></Fragment>;

    return <>
        <div className="absolute w-full h-screen top-0 left-0 bg-black bg-opacity-10 z-50 flex items-center justify-center dark:text-dark-text">
            <CircularProgress className="dark:text-dark-text"/>
        </div>
    </>
}