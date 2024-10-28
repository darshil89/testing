"use client";
import React, { use, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Friend } from '@/types/friend';
import { getUser } from '@/helpers/dbConnect';
import Image from 'next/image';

const page = () => {
    const pathname = usePathname()
    const id = pathname.split('/').pop()
    const [user, setUser] = useState<Friend>({
        id: "",
        name: "",
        email: "",
        photo: "",
        number: "",
        createdAt: new Date(),
        updatedAt: new Date()
    })

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getUser(id)
            setUser(response)
        }

        fetchUser()
    }, [id])
    return (
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto my-10">
            {/* Profile Picture */}
            <Image
                src={user?.photo ?? '/avatar.png'}
                alt={`${user.name}'s Profile`}
                width={200}
                height={200}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md mb-6"
            />

            {/* Profile Info */}
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-semibold text-gray-700">{user.name}</h1>
                <p className="text-sm text-gray-500">{id}</p>
                <p className="text-gray-600">
                    <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-600">
                    <strong>Phone:</strong> {user.number}
                </p>

                {/* Created and Updated timestamps */}
                <div className="text-gray-500 mt-4 text-sm">
                    <p>
                        <strong>Created At:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                    <p>
                        <strong>Updated At:</strong> {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default page