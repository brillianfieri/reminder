"use client";
import { PrismaClient } from "@prisma/client";
// import { InferGetServerSidePropsType } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import SignUp from "../signup/page";
import SignUpEndPoint from "../signup/endpoint";

export default  function SignInEndPoint(props: any) {

    console.log("counta" + props.userCount)
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [submitOnProgress, setSubmitOnProgress] = useState(false);

    const login = async () => {
        setSubmitOnProgress(true)
        const signin = await signIn("credentials", {
            username: username,
            password: password,
            redirect: false,
        });

        if (!signin?.error) {
            setSubmitOnProgress(false)
            setUsername("")
            setPassword("")

            router.push('/');
          } else {
            setSubmitOnProgress(false)
            alert("Invalid credentials.");
        }
    }

    const handleLogin = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        login()
    }

    return(
        <>
            {(props.userCount == 0) ?
                <SignUpEndPoint userCount = {props.userCount}/>
            : 
                <div className="px-[10vw] md:px-[20vw] pt-[10vh]">
                    <div className='flex items-center justify-center h-full pb-2'>
                        <h1 className="text-2xl font-bold dark:text-white">Login</h1>
                    </div>
                    <div>
                        <form onSubmit={handleLogin} className="p-5 rounded-xl bg-white dark:bg-gray-900" >
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" onChange={(e) => setUsername(e.target.value)} name="username" id="username"  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                            </div>

                            <div className="relative z-0 w-full mb-6 group">
                                <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password"  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>

                            <div className='flex flex-direction-row content-center justify-center'>
                                <button type="submit" disabled={submitOnProgress} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                
            }
        </>
    )
}
