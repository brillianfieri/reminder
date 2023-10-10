import { PrismaClient } from "@prisma/client";
// import { InferGetServerSidePropsType } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import AccountEndPoint from "./endpoint";

export default  async function Account() {
    // const data = await getData();
    // console.log("data"+data)
    return(
        <AccountEndPoint/>
    )
}


// async function getData() {
//     const prisma = new PrismaClient();
//     const countUser = await prisma.user.count()
//     console.log(countUser)
//     // The return value is *not* serialized
//     // You can return Date, Map, Set, etc.

//     return countUser
// }