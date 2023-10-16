import { PrismaClient } from '@prisma/client';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../../auth/authOptions"
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const prisma = new PrismaClient();
    const data = await request.json()
    const session = await getServerSession(authOptions)

    const countUser = await prisma.user.count()

    let role = "user"

    if(session ){
        if(session?.user.role != 'admin'){
            if(session?.user.user_id != data.id){
                return NextResponse.json({error: "Unauthorized"}, {status: 401})
            }
        }else{
            role = data.role
        }

        const checkUsername = await prisma.user.findMany({
            where:{
                username: {
                    equals: data.username,
                    not:{
                        equals: data.oldusername,
                    } 
                }
            }
        })
    
        const checkEmail = await prisma.user.findMany({
            where:{
                email: {
                    equals: data.email,
                    not:{
                        equals: data.oldemail,
                    } 
                }
            }
        })
        
        
        // Check if the username and email is already exist.
        if(checkUsername.length > 0){
            return NextResponse.json({
                error: "The username has already been taken."
            }, {
                status: 400,
            })
        }else if(checkEmail.length > 0){
            return NextResponse.json({
                error: "The email has already been taken."
            }, {
                status: 400,
            })
        }else{
            // Create user.
            let newData = null
            if(data.password != ""){
                const password = await hash(data.password, 15)
                newData = {
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    role: role,
                    password:password
                }

            }else{
                newData = {
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    role: role,
                }
            }
            const newUser = await prisma.user.update({
                where:{
                    id: data.id
                },
                data: newData
            })

            return NextResponse.json(newUser)
        }

    }else{
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
}