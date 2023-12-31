"use client";
import { useEffect, useState } from "react";
import AddReminder from "./addreminder";
import DeleteCategory from "./category/deletecategory";
import ShareCategory from "./category/sharecategory";
import EditCategory from "./category/editcategory";
import DeleteReminder from "./deletereminder";
import EditReminder from "./editreminder";
import UnlinkCategory from "./category/unlinkcategory";
import { FetchReminderData, ReminderData, ReminderParams, SetReminderParams } from "@/app/type";

export default  function ReminderDetail({reminderData, reminderParams, setReminderParams, fetchReminderData} :{reminderData:ReminderData[], reminderParams:ReminderParams, setReminderParams:SetReminderParams, fetchReminderData:FetchReminderData}) {
    const [editClicked, setEditClicked] = useState(false)
    const [timeOffset, setTimeOffset] = useState<number>()

    useEffect(()=>{
        // Get time difference between server date and client date
        setTimeOffset(new Date().getTimezoneOffset())
    }, []);

    const boxClicked = async (id:number,categoryId:number, isCompleted:number) => {
        let isCompletedUpdate = 0
        if(isCompleted == 0){
            isCompletedUpdate = 1
        }
        const response = await fetch('/api/reminder/click', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                is_completed:isCompletedUpdate,
                category_id: categoryId,
                reminderType: reminderParams.reminderType
            }),
        })
        fetchReminderData(true, false,reminderParams.reminderType, reminderParams.categoryId)
    }
    if(timeOffset == null){
        return <></>
    }else{
        return(
            <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
                    <div className="flex flex-wrap  justify-between mx-auto mb-5">
                        
                        <div className="flex flex-direction-row items-center justify-center">
                            <div className="flex items-center pb-2">
                                {/* reminder category name */}
                                <h1 className="text-3xl font-bold dark:text-white pr-2">{reminderParams.categoryName}</h1>
                                {/* Category owner for shared reminder */}
                                {reminderParams.reminderType == 1 ? <div className="px-1 rounded text-white bg-gray-400 dark:bg-gray-500"><h1 className="text-xl  dark:text-white">{reminderParams.sharedOwner}</h1></div> : null}
                            </div>
                            {/* Edit title */}
                            {(reminderParams.reminderType == 0) ? <EditCategory reminderParams={reminderParams} setReminderParams={setReminderParams}/> :null}
                        </div>
                        
                            {/* Action button */}
                            <div className="flex">
                                <button onClick={()=>setEditClicked(!editClicked)}  type="button" className="text-black bg-slate-300 hover:bg-slate-400 focus:outline-none focus:ring-4 font-medium rounded-full text-sm p-3 text-center mr-2 mb-2 dark:bg-slate-700 dark:hover:bg-slate-800 dark:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                    </svg>
                                </button>
                                {(reminderParams.reminderType == 0) ? 
                                    <><ShareCategory reminderParams={reminderParams}/>
                                    <DeleteCategory reminderParams = {reminderParams} setReminderParams = {setReminderParams}/>
                                    </>
                                : null}
                                {(reminderParams.reminderType == 1) ?
                                    <UnlinkCategory reminderParams = {reminderParams} setReminderParams = {setReminderParams}/>
                                :null
                                }
                            </div>
                            
                    </div>
                    
                    {reminderParams.reminderType != 2 ? <AddReminder reminderParams = {reminderParams} fetchReminderData ={fetchReminderData}/> : null}
                    
                    {/* reminder list */}
                    {reminderData.length ?
                        <div>
                            {reminderData.map((reminder: ReminderData)=>{
                                // Setup reminder color for scheduled 
                                let localeDate = null
                                let mainColor = "text-black dark:text-slate-200"
                                let subColor = "text-black dark:text-slate-300"
                                let categoryBox = "bg-gray-400 dark:bg-gray-500"
                                if(reminder.reminder_date){
                                    localeDate = new Date(reminder.reminder_date)
                                    const currDate = new Date()
                                    
                                    if(localeDate < currDate && reminder.is_completed === 0){
                                        mainColor = "text-red-700"
                                        subColor = "text-red-600"
                                        categoryBox = "bg-red-600"
                                    }
                                    console.log(mainColor)
                                }
                                return(
                                    <div key={reminder.id} className={`${subColor} flex flex-wrap items-center justify-between p-3 mb-3 rounded bg-gray-100 dark:bg-gray-800`}>
                                        <div  className="flex ">
                                            <button onClick={()=>boxClicked(reminder.id, reminder.category_id, reminder.is_completed)} className="pr-2">
                                                {reminder.is_completed == 0 ?
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                                                </svg>
                                                :<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
                                                </svg>}
                                            </button>
    
                                            <div>
                                                <div className="flex flex-wrap items-center">
                                                    <div><h1 className={`${mainColor} text-xl font-bold pr-2`}>{reminder.reminder_title}</h1></div>
                                                    {/* Display category name for scheduled tab */}
                                                    {reminderParams.reminderType == 2 ? 
                                                        <div className={`${categoryBox} px-1 rounded text-white`}>{reminder.reminder_category.name}</div>
                                                        : null
                                                    }

                                                </div>
                                                <div className="flex">
                                                    {localeDate ? <><h2 className="">{localeDate.toLocaleDateString("fr-CA")}&nbsp;&nbsp;</h2> 
                                                        <h2> {localeDate.toLocaleTimeString("en-GB",{hour: '2-digit', minute:'2-digit'})}</h2></>:null}
                                                </div>                                                
                                                <div><pre>{reminder.reminder_desc}</pre></div>
                                                
                                            </div>
                                            
                                        </div>

                                        {/* Edit reminder */}
                                        {editClicked ? 
                                            <div className="flex">
                                                <EditReminder reminder={reminder} reminderParams={reminderParams} fetchReminderData = {fetchReminderData} localeDate={localeDate}/>
                                                <DeleteReminder reminder={reminder} reminderParams={reminderParams} fetchReminderData={fetchReminderData} />
                                            </div>
                                        : null}

                                    </div>
                                )
                            })}
                        </div>
                        :
                        <></>
                    }
                    
                </div>
            </div>
            </>
        )
    }
    
}
