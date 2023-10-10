
// import { InferGetServerSidePropsType } from "next";
// import { signIn } from "next-auth/react";
// import { useRouter } from 'next/navigation'
import { useState } from "react";
import { useSession } from "next-auth/react";
import DeleteUser from "./deleteuser";
import EditUser from "./edituser";

export default  function DisplayUser(props: any) {
    const [searchUser, setSearchUser] = useState('');
    const [isVisible, setIsVisible] = useState(Array(props.users.length).fill(false))
    
    const { data: session } = useSession()

    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchUser(event.target.value)
        
    }

    const toggleDetail = async (index:number) => {
        const newIsInvisible = isVisible.map((val, idx) => {
            if (idx === index) {
                return (val === true)? false : true;
            //         return false
            //     }else{
            //         return true
            //     }
            //   return true;
            } else {
              // The rest haven't changed
              return val;
            }
          });
          setIsVisible(newIsInvisible);
     }

    return(
        <>
            <div className="pt-5 px-5 pb-5">
                <form>   
                    <label htmlFor="userSearch" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="userSearch" onChange={onChangeSearch} value={searchUser} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Item..." required />
                    </div>
                </form>
            </div>

            {props.users.length ? 
                <div className={"px-5 pb-5 "}>
                    <div className="relative max-h-[65vh] overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="z-1 top-0 sticky text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="top-0 sticky">
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Username
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                                {props.users.filter((user: any) => {
                                    if(searchUser.toLowerCase() === ''){
                                        return user;
                                    }else if(user.name.toLowerCase().includes(searchUser) || user.username.toLowerCase().includes(searchUser) || user.role.toLowerCase().includes(searchUser)){
                                        return user;
                                    }
                                }).map((user: any, index: any) =>(
                                    <tbody key={user.id}>
                                    <tr onClick={(e:any) => toggleDetail(index)} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {user.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.username}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.role}
                                        </td>
                                        
                                        <td className="px-6 py-4 md:flex">
                                            <EditUser user = {user}/>
                                            {user.username == session?.user?.username ? 
                                                null
                                            : <DeleteUser user = {user} />}
                                        </td>
                                    </tr>
                                    {isVisible[index] ? 
                                        <>
                                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                            <td colSpan={4} className="px-6 py-4">
                                                {user.username}
                                            </td>
                                        </tr> 
                                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                            <td colSpan={4} className="px-6 py-4">
                                                {user.username}
                                            </td>
                                        </tr> 
                                        </>
                                        :
                                        null
                                    }
                                    
                                    </ tbody>
                                ))}
                        </table>
                    </div>
                </div>  
            :
                <div className='flex items-center justify-center h-full pt-5'>
                    <p className="text-xl text-gray-700 dark:text-gray-400">No Item</p>
                </div>
            }
            
        </>
    )
}
