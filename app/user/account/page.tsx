"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import EditAccount from "./component/editaccount";
import { User } from "@/app/type";

export default  function Account() {
    const { data: session } = useSession()
    const [account, setAccount] = useState<User>()
    const [createdAt, setCreatedAt]= useState<string>()

    useEffect(()=>{
        if(session){
            fetchAccountData()
            if(!createdAt){
                const newDate = new Date(session?.user.created_at as Date)
                const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                setCreatedAt(month[newDate.getMonth()]+" "+newDate.getFullYear())
            }
        }
    }, [session]);


    const fetchAccountData = async () => {
        const fetchAccountData = await fetch(`/api/user/${session?.user.user_id}`)
        const fetchAccountDataRes = await fetchAccountData.json()
        setAccount(fetchAccountDataRes)
    }
    
    if(!account){
        return <></>
    }else{
        return(
            <>
                <div className="px-[5vw] md:px-[20vw] py-[10vh] border-transparent">
                    <div className="px-5 pt-5">
                        <div className="flex justify-center pb-5">
                            <h1 className="text-4xl font-bold dark:text-white">Hi {account?.name}!</h1>
                        </div>

                        <div className="flex justify-center relative max-h-[65vh] overflow-y-auto overflow-x-auto">
                            <table className="text-left text-gray-500 dark:text-gray-400">
                                <tbody>
                                <tr className="text-base md:text-lg bg-white dark:bg-zinc-900 dark:border-gray-700">
                                    <th scope="row" className="py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Name
                                    </th>
                                    <td className="py-2">
                                        : {account?.name}
                                    </td>
                                </tr>
                                <tr className="text-base md:text-lg bg-white dark:bg-zinc-900 dark:border-gray-700">
                                    <th scope="row" className="py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Member since
                                    </th>
                                    <td className="py-2">
                                        : {createdAt}
                                    </td>
                                </tr>
                                <tr className="text-base md:text-lg bg-white dark:bg-zinc-900 dark:border-gray-700">
                                    <th scope="row" className="py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Username
                                    </th>
                                    <td className="py-2">
                                        : {account?.username}
                                    </td>
                                </tr>
                                <tr className="text-base md:text-lg bg-white dark:bg-zinc-900 dark:border-gray-700">
                                    <th scope="row" className="py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Email
                                    </th>
                                    <td className="py-2">
                                        : {account?.email}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-center pt-5">
                            <EditAccount account={account} fetchAccountData={fetchAccountData}/>
                        </div>
    
                    </div>
                </div>
            </>
        )
    }
    
}
