import { PrismaClient } from "@prisma/client";
import SignUpEndPoint from "./endpoint";

export default  async function SignUp() {
    const data = await getData();
    console.log("data"+data)
    return(
        <SignUpEndPoint userCount = {data}/>
    )
}


async function getData() {
    const prisma = new PrismaClient();
    const countUser = await prisma.user.count()

    const addUser = await fetch('http://localhost:3000/api/user/', {
        method: 'GET' ,
    headers: {
    'Content-Type': 'application/json',
    }
    })
    const data = await addUser.json();
    // const res = JSON.parse(addUser)
    console.log(data)
    console.log(countUser)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    return countUser
}