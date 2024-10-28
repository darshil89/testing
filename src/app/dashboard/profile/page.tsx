"use client"
import Image from 'next/image'
import React, { FC, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { addNunmberToDB } from '@/helpers/dbConnect'

const Page: FC = () => {
    const { data: session, update } = useSession()
    const [number, setNumber] = useState<string>('')

    const handleSignOut = async () => {
        await signOut()
    }

    const saveNumber = async () => {
        // updating the number in user active session
        await update({
            ...session,
            user: {
                ...session?.user,
                number: number
            }
        })

        // adding the number to the user in the database
        const response = await addNunmberToDB(number, session?.user.id)
        alert('Mobile number saved successfully!')
    }

    console.log(session)
    return (
        <div className="max-w-2xl mx-auto p-4 md:p-6 bg-white rounded-lg">
            <div className='flex flex-col md:flex-row justify-between items-center mb-6'>
                <div className="flex items-center mb-4 md:mb-0">
                    <Image
                        src={session?.user.image || '/icons/user.jpg'}
                        alt="Profile Picture"
                        width={100}
                        height={100}
                        className="rounded-full mr-4"
                    />
                    <div>
                        <h2 className="text-2xl font-semibold">{session?.user.name}</h2>
                        <p className="text-gray-600">{session?.user.email}</p>
                    </div>
                </div>
                <div>
                    <button onClick={() => handleSignOut()} className="w-full md:w-auto mt-4 md:mt-0 shadow-[inset_0_0_0_2px_#616467] flex justify-center space-x-4 items-center text-gray-600 px-6 py-2 rounded-full text-sm tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white transition duration-200">
                        <span>Log Out</span>
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <div className="relative">
                    {session?.user.number ? (
                        <div className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16'>{session?.user.number}</div>
                    ) : (
                        <>
                            <input
                                type="tel"
                                id="mobile"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16"
                                placeholder="Enter your mobile number"
                            />
                            <button onClick={() => saveNumber()}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition duration-200"
                            >
                                Save
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page