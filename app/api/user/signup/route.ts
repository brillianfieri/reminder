import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../../auth/authOptions"
import { hash } from 'bcrypt';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const prisma = new PrismaClient();
    const data = await request.json()
    const session = await getServerSession(authOptions)

    const countUser = await prisma.user.count()
    const checkUsername = await prisma.user.findUnique({
        where:{
            username: data.username
        }
    })

    const checkEmail = await prisma.user.findUnique({
        where:{
            email: data.email
        }
    })
    console.log("a1")
    
    // Default role = user
    let role = 'user'
    if(!data.role){
        // Make the role of the first account to admin
        if(countUser == 0){
            role = 'admin'
        }
    }else{
        // select role option (admin/user)
        // Check if the user who created the new account is admin
        if(session && session?.user.role == 'admin' ){
            role = data.role
        }
    }

    // Check if the username is already exist.
    if(checkUsername){
        console.log("a2")
        return NextResponse.json({
            error: "The username has already been taken."
        }, {
            status: 400,
        })
    }else if(checkEmail){
        return NextResponse.json({
            error: "The email has already been taken."
        }, {
            status: 400,
        })
    }else{
        // Create user.
        const password = await hash(data.password, 15)
        const newUser = await prisma.user.create({
            data:{
                name: data.name,
                username: data.username,
                email: data.email,
                password: password,
                role: role
            }
        })

        return Response.json(newUser)
    }
  }