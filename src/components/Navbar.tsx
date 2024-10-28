"use client"
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className="bg-gray-800 h-32 flex justify-evenly items-center text-white p-4">

      <div className="w-7/12 flex justify-between">
        <Link href={'/dashboard'} className="w-full flex  space-x-6 items-center">
          <Image src={session?.user.image ?? ""} alt="img" width={70} height={70} className="rounded-full" />
          <h1 className="text-3xl font-bold">{session?.user.name?.split(" ")[0]}&apos;s Dashboard</h1>
        </Link>
        <div className="flex space-x-6 items-center">
          <Link href='/dashboard/profile' className="bg-gray-700 px-4 py-2 rounded-lg">Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
