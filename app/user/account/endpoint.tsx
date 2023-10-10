"use client";
import { PrismaClient } from "@prisma/client";
// import { InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import SignUp from "../signup/page";
import SignUpEndPoint from "../signup/endpoint";

export default  function AccountEndPoint() {
    const { data: session } = useSession()
    
    return(
        <>
            <div className="mx-[10vw] md:mx-[20vw] my-[10vh] bg-slate-50 border-transparent rounded-t-lg drop-shadow-lg  dark:bg-gray-900">
                <div className="px-5 pt-5">
                    <h1 className="text-4xl font-bold dark:text-white">Hi {session?.user.name}!</h1>
                    <h2 className="text-xl dark:text-white">{session?.user.username} - {session?.user.email}</h2>
                </div>
            </div>
        </>
    )
}
