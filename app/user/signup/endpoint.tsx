"use client";
import Log from "@/app/log/log";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useState } from "react";

export default  function SignUpEndPoint(props: any) {
    const router = useRouter()
    const [fname, setFname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verifyPassword, setVerifyPassword] = useState("")
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
            setVerifyPassword("")

            // Change log
            Log(`New user has been registered: ${username} - ${email}`)

            router.push('/');
          } else {
            setSubmitOnProgress(false)
            alert("Invalid credentials.");
        }
    }

    const handleRegister = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        setSubmitOnProgress(true)

        if(username.includes(" ")){
            alert("Usernames must be a single word.")
            return false
        }
        if(password != verifyPassword){
            alert("Passwords do not match.")
            return false
        }
        const addUser = await fetch('/api/user/signup', {
                method: 'POST' ,
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: fname,
                username: username,
                password: password,
                email: email,
            }),
        })
        const addUserRes = await addUser.json()

        if(addUser.status === 400){
            alert(addUserRes.error)
            setSubmitOnProgress(false)
        }else{
            setFname("")
            login()
        }

        
    }
    return(
        <>
            {(props.userCount > 0) ?
                <div className="px-[10vw] md:px-[20vw] pt-[10vh]">
                    <div className='flex items-center justify-center h-full pb-2'>
                        <h1 className="text-2xl font-bold dark:text-white">Register</h1>
                    </div>
                </div>
            : 
                <div className="px-[10vw] md:px-[20vw] pt-[10vh]">
                    <div className='flex items-center justify-center h-full pb-2'>
                        <h1 className="text-2xl font-bold dark:text-white">Register Admin Account</h1>
                    </div>
                </div>
                
            }

            <div className="px-[10vw] md:px-[20vw] pb-[10vh]">
                    <div>
                        <form onSubmit={handleRegister} className="p-5 rounded-xl bg-white dark:bg-zinc-900" >
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" onChange={(e) => setUsername(e.target.value)} name="username" id="username"  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                            </div>

                            <div className="relative z-0 w-full mb-6 group">
                                <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email"  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                            </div>

                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" onChange={(e) => setFname(e.target.value)} name="fname" id="fname"  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="fname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                            </div>

                            <div className="relative z-0 w-full mb-6 group">
                                <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password"  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>

                            <div className="relative z-0 w-full mb-6 group">
                                <input type="password" onChange={(e) => setVerifyPassword(e.target.value)} name="verifyPassword" id="verifyPassword"  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="verifyPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Verify Password</label>
                            </div>

                            <div className='flex flex-direction-row content-center justify-center'>
                                <button type="submit" disabled={submitOnProgress} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    )
}
