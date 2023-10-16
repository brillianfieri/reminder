"use client";
import DisplayUser from "./user/displayuser";
import { useEffect, useState } from "react";
import DisplayLog from "./log/displaylog";
import Account from "../user/account/page";

export default  function AdminEndpoint(props: any ) {
    const [menu, setMenu] = useState("account")
    const [userData, setUserData] = useState();
    const [logData, setLogData] = useState();

    useEffect(()=>{
        if(menu == "user"){
            fetchUserData()
        }else if(menu == "log"){
            fetchLogData()
        }
       
    }, [menu]);

    const fetchUserData = async () => {
        const fetchUserData = await fetch('/api/user')
        const fetchUserDataRes = await fetchUserData.json()
        setUserData(fetchUserDataRes)
    }

    const fetchLogData = async () => {
        const fetchLogData = await fetch('/api/log')
        const fetchLogDataRes = await fetchLogData.json()
        setLogData(fetchLogDataRes)
    }

    const menuClicked = async (menu:string) => {
        setMenu(menu)
    }

    // const logClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault()
    //     setAdminMenu("log");
    // }
    
    
    if((!userData && menu == "user") || (!logData && menu=="log")){return <></>}
    else{
        return(
            <>
                <div className="px-5 pt-5 flex">
                    <button onClick={()=>menuClicked("account")}> <h1 className={menu == "account" ? "text-2xl font-bold text-black text-opacity-100 dark:text-white mr-3" : "text-2xl font-bold text-black text-opacity-30 dark:text-opacity-30 dark:text-white mr-3"}>Account</h1> </button>
                    <button onClick={()=>menuClicked("user")}> <h1 className={menu == "user" ? "text-2xl font-bold text-black text-opacity-100 dark:text-white mr-3" : "text-2xl font-bold text-black text-opacity-30 dark:text-opacity-30 dark:text-white mr-3"}>Users</h1> </button>
                    <button onClick={()=>menuClicked("log")}><h1 className={menu == "log" ? "text-2xl font-bold text-black text-opacity-100 dark:text-white mr-3" : "text-2xl font-bold text-black text-opacity-30 dark:text-opacity-30 dark:text-white mr-3"}>Log</h1></button>
                </div>
                
                {userData && menu == "user" ?  <DisplayUser userData = {userData}  fetchUserData = {fetchUserData}/> : null}
                {logData && menu == "log" ? <DisplayLog logs={logData}/> : null}
                {menu == "account" ? <Account/> : null}
                
            </>
        )
    }
}
