"use client";
import React from 'react'
import { usePathname } from 'next/navigation'

const page = () => {
    const pathname = usePathname()
    const id = pathname.split('/').pop()
    return (
        <div>page- {id}</div>
    )
}

export default page