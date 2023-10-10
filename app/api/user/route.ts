import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../auth/authOptions"

export async function GET() {
    const prisma = new PrismaClient();
    const session = await getServerSession(authOptions)
    if(1 == 1){
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
        return Response.json(users)
    }else{
        return new Response('Unauthorized', { status: 401 })
    }
}