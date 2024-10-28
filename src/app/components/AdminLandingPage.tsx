"use client"
import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react";

const AdminLandingPage: React.FC = () => {

  const handleSignin = async () => {
    await signIn("google",
      {
        callbackUrl: "/dashboard",
      }
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg animate__animated animate__fadeInDown animate-pulse text-white">
        Admin Dashboard
      </h1>
      <p className="text-lg mb-8 max-w-md text-center animate__animated animate__fadeIn animate__delay-1s">
        Welcome to the admin panel. Please sign in to continue and manage your
        application effectively.
      </p>
      <button onClick={() => handleSignin()} className="flex items-center justify-center bg-white text-gray-800 border border-transparent rounded-lg shadow-lg px-6 py-3 hover:bg-gray-100 transition duration-200 transform hover:scale-105 animate__animated animate__bounceIn animate__delay-2s">
        <Image src={"/icons/google.svg"} alt="google" width={40} height={40} />
        <span className="font-semibold">Sign in with Google</span>
      </button>
      <footer className="absolute bottom-4 text-sm animate__animated animate__fadeIn animate__delay-3s">
        <p>© 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminLandingPage;
