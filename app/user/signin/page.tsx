import { PrismaClient } from "@prisma/client";
import SignInEndPoint from "./endpoint";

export default  async function SignIn() {
    const data = await getData();
    return(
        <SignInEndPoint userCount = {data}/>
    )
}


async function getData() {
    const prisma = new PrismaClient();
    const countUser = await prisma.user.count()

    return countUser
}