"use client";
import { PrismaClient, User } from "@prisma/client";
import DisplayUser from "./user/displayuser";
// import { InferGetServerSidePropsType } from "next";
// import { signIn } from "next-auth/react";
// import { useRouter } from 'next/navigation'
// import { cache, use, useEffect, useState } from "react";

export default  function AdminEndpoint(props: any ) {

    // const getUsers = cache(() =>
    //     fetch("/api/user").then((res) => res.json())
    // );
    // let users = use<User[]>(getUsers());

    // console.log(users)

    return(
        <>
            <DisplayUser users = {props.users} />
        </>
    )
}
