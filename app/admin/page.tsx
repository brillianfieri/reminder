import { PrismaClient } from "@prisma/client";
// import { InferGetServerSidePropsType } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import AdminEndpoint from "./endpoint";

export default  async function SignIn() {
    const data = await getData();
    console.log("data"+data)
    return(
        <AdminEndpoint users = {data}/>
    )
}


async function getData() {
    const prisma = new PrismaClient();
    // const usersRes = await fetch('http://localhost:3000/api/user', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },next: { revalidate: 0 }
    //     ,cache: 'no-store'
    //   })

    const users = await prisma.user.findMany({
        where:{
            delete_user: 0
        },select:{
            id:true,
            name:true,
            username:true,
            email:true,
            role:true,
        }
        ,orderBy:{
            name: "asc"
        }
    });

    return(users)
}