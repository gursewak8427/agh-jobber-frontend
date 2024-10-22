"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const { tab } = useParams();

    return (
        <div>page {tab}</div>
    )
}

export default page