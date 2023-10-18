"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import ReminderDetail from "./component/reminder-detail";
import { ReminderCategory, ReminderData, SharedReminderCategory } from "../type";


export default function Reminder() {
    const [isVisible, setIsVisible] = useState(false)
    const [name, setName] = useState("")
    const [reminderCategory, setReminderCategory] = useState<ReminderCategory[]>()
    const [sharedReminderCategory, setSharedReminderCategory] = useState<SharedReminderCategory[]>()
    // ReminderParams-ReminderType: 0:regular reminder category, 1: shared reminder category, 2: scheduled
    const [reminderParams, setReminderParams] = useState({categoryName:"Scheduled",reminderType:2, categoryId:0, sharedOwner:""})
    const [reminderData, setReminderData] = useState<ReminderData[]>()

    useEffect(()=>{
        fetchReminderData(true, true,reminderParams.reminderType, reminderParams.categoryId)
    }, [reminderParams]);

    const fetchReminderData = async (refreshReminder:boolean, refreshCategory:boolean, reminderType: number|null, categoryId: number|null) => {
        if(refreshReminder){
            const fetchReminderData = await fetch(`/api/reminder/${reminderType}/${categoryId}`)
            const fetchReminderDataRes = await fetchReminderData.json()
            setReminderData(fetchReminderDataRes)
        }
        if(refreshCategory){
            const fetchCategoryData = await fetch(`/api/reminder/category/`)
            const fetchCategoryDataRes = await fetchCategoryData.json()
            console.log(fetchCategoryDataRes)
            setReminderCategory(fetchCategoryDataRes.reminderCategory)
            setSharedReminderCategory(fetchCategoryDataRes.sharedReminderCategory)
        }
    }

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        const addCategory = await fetch('/api/reminder/category/add', {
                method: 'POST' ,
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name
            }),
        })

        if(addCategory.status === 400){
            const addCategoryRes = await addCategory.json()
            alert(addCategoryRes.error)
        }else{
            setName("")
            setIsVisible(false)
            fetchReminderData(false, true,reminderParams.reminderType, reminderParams.categoryId)

        }

    }

    function sideBarButtonClicked(sideBarStatus:boolean){
        if(window.matchMedia("(max-width: 640px)").matches){
            if(sideBarStatus){
                (document.getElementById('default-sidebar') as HTMLFormElement).style.transform = "translateX(-100%)"
            }else{
                (document.getElementById('default-sidebar') as HTMLFormElement).style.transform = "translateX(0)"
                setIsVisible(false)
            }
        }
    }
    const listCss ="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 group"

    if(!reminderData || !reminderCategory || !sharedReminderCategory){
        return <></>
    }else{
        return(
            <>
                <button onClick={()=>sideBarButtonClicked(false)} type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-zinc-800 dark:focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                    <span className="ml-3">{reminderParams.categoryName}</span>
                    
                </button>
    
                <aside id="default-sidebar" className="fixed left-0 top-0 z-1 w-64 h-screen transition-transform sm:top-auto -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-zinc-50 dark:bg-zinc-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a onClick={()=>{setReminderParams({categoryName: "Scheduled" ,reminderType:2, categoryId:0, sharedOwner:""}); sideBarButtonClicked(true);}} className={`${(reminderParams.categoryId == 0 && reminderParams.reminderType == 2) ? "bg-gray-200 dark:bg-zinc-900": ""} ${listCss}`}>
                                <span className="ml-3">Scheduled</span>
                            </a>
                        </li>
                        <h2 className="pt-5 px-4 pb-3 text-xl font-bold dark:text-white">Your List</h2>

                        <li>
                            {isVisible ? 
                                <div>
                                    <span className="flex-1 ml-3 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 font-bold whitespace-nowrap">Add List</span>
                                    <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">
                                        <form onSubmit={handleSubmit} className="flex-1 ml-3 whitespace-nowrap">
                                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="cartQty" id="cartQty" className="block px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <button type="submit" className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                                        </form>
                                    </div>
                                </div>
                                :<a onClick={()=>setIsVisible(true)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 group">
                                <span className="flex-1 ml-3 font-bold whitespace-nowrap">Add List</span>
                                </a>
                            }
                        </li>

                        {reminderCategory.length ? 
                            <>{reminderCategory.map((category:ReminderCategory) => {
                                return(
                                    <li key={category.id}>
                                        <a onClick={()=>{setReminderParams({categoryName: category.name ,reminderType:0, categoryId:category.id, sharedOwner:""}); sideBarButtonClicked(true);}} className={`${(reminderParams.categoryId == category.id && reminderParams.reminderType == 0) ? "bg-gray-200 dark:bg-zinc-900": ""} ${listCss}`}>
                                            <span className="ml-3">{category.name}</span>
                                        </a>
                                    </li>
                                )
                                
                            })}</>
                        :null}

                        {sharedReminderCategory.length ? 
                            <><h2 className="pt-5 px-4 pb-3 text-xl font-bold dark:text-white">Shared with you</h2>
                            
                            {sharedReminderCategory.map((category:SharedReminderCategory) => {
                                return(
                                    <li key={category.category_id}>
                                        <a onClick={()=>{setReminderParams({categoryName:category.reminder_category.name ,reminderType:1, categoryId:category.category_id, sharedOwner:category.reminder_category.user.username}); sideBarButtonClicked(true); }} className={`${(reminderParams.categoryId == category.category_id && reminderParams.reminderType == 1) ? "bg-gray-200 dark:bg-zinc-900": ""} ${listCss}`}>
                                            <span className="ml-3">{category.reminder_category.name}</span>
                                        </a>
                                    </li>
                                )
                                
                            })}
                            </>
                        :null}

                    </ul>
    
                    
    
                </div>
                </aside>
    
                <ReminderDetail reminderData = {reminderData} reminderParams = {reminderParams} setReminderParams = {setReminderParams} fetchReminderData={fetchReminderData}/>
            </>
        )
    }
    
}
