import { PrismaClient } from "@prisma/client";
import SignUpEndPoint from "./endpoint";

export default  async function SignUp() {
    const data = await getData();
    return(
        <SignUpEndPoint userCount = {data}/>
    )
}


async function getData() {
    const prisma = new PrismaClient();
    const countUser = await prisma.user.count()

    const addUser = await fetch(process.env.NEXT_PUBLIC_URL+'/api/user/', {
        method: 'GET' ,
    headers: {
    'Content-Type': 'application/json',
    }
    })
    const data = await addUser.json();

    return countUser
}