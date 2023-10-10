import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../../auth/authOptions"

export async function POST(request: Request) {
    const prisma = new PrismaClient();
    const data = await request.json()
    const session = await getServerSession(authOptions)
    if(session && session?.user.role == 'admin'){
        const newUser = await prisma.user.update({
            where:{
                id: data.id
                
            },
            data: {
                delete_user: 1
            },
        })
        return Response.json(newUser)

    }else{
        return new Response('Unauthorized', { status: 401 })
    }
}