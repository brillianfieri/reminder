"use client";
import Link from "next/link"

import { useState } from "react";
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()
  const [menu, setMenu] = useState(false)

  function menuClicked(){
    const menuTarget = (document.getElementById('navBarList') as HTMLFormElement)
    if(menuTarget != null){
      if(menu == false){
        menuTarget.style.display = "block";
        setMenu(true);
      }else{
        menuTarget.style.display = "none";
        setMenu(false);
      }
      
    }

  }
  return (
    <>
        <nav className=" sticky top-0 bg-zinc-50 border-gray-300 dark:bg-zinc-900">
          <div className="flex flex-wrap items-center justify-between mx-auto px-6 py-4">
            <Link href="/" className="flex items-center">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Reminder</span>
            </Link>
            <button data-collapse-toggle="navbar-default" type="button" onClick={()=>{menuClicked()}} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-zinc-800 dark:focus:ring-gray-600" >
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div id="navBarList" className="hidden w-full md:block md:w-auto">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
                {session ?
                  <>
                    {session?.user?.role === "admin" ?
                        <li>
                            <Link href="/admin" className="block py-2 pl-2 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-zinc-800 dark:hover:text-white md:dark:hover:bg-transparent">Admin</Link>
                        </li> 
                        :<li>
                            <Link href="/user/account" className="block py-2 pl-2 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-zinc-800 dark:hover:text-white md:dark:hover:bg-transparent">Account</Link>
                        </li> 
                    }
                    <li>
                        <Link href={""} onClick={() => signOut()} className="block py-2 pl-2 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-zinc-800 dark:hover:text-white md:dark:hover:bg-transparent" >Sign Out</Link>
                    </li> 
                  </>
                  :<>
                    <li>
                        <Link href={"/user/signin"} className="block py-2 pl-2 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-zinc-800 dark:hover:text-white md:dark:hover:bg-transparent" >Sign In</Link>
                    </li> 
                    <li>
                        <Link href={"/user/signup"} className="block py-2 pl-2 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-zinc-800 dark:hover:text-white md:dark:hover:bg-transparent" >Sign Up</Link>
                    </li> 
                  </>
                }
                <li>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </>
  );
}