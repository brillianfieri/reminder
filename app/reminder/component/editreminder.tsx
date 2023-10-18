import React, { useState } from 'react'
import Modal from 'react-modal'
import {customStyles} from '../../modal.css.js'
import Log from '../../log/log'
import { FetchReminderData, ReminderData, ReminderParams } from '@/app/type'

const EditReminder = ({reminder, reminderParams, fetchReminderData, localeDate}: {reminder:ReminderData, reminderParams:ReminderParams, fetchReminderData:FetchReminderData, localeDate:Date|null }) => {
   const [isOpen, setIsOpen] = useState(false)
   const [reminderTitle, setReminderTitle] = useState(reminder.reminder_title)
   const [reminderDesc, setReminderDesc] = useState(reminder.reminder_desc)
   const [selectDate, setSelectDate] = useState(reminder.reminder_date ? true: false)
   const [reminderDate, setReminderDate] = useState<string>(localeDate ? localeDate.toLocaleDateString("fr-CA") : new Date().toLocaleDateString("fr-CA"))
   const [reminderTime, setReminderTime] = useState<string>(localeDate ? localeDate.toLocaleTimeString("en-GB",{hour: '2-digit', minute:'2-digit'}) : new Date().toLocaleTimeString("en-GB",{hour: '2-digit', minute:'2-digit'}))

   interface editReminderInter {
        category_id: number,
        id:number,
        reminder_title: string,
        reminder_desc: string
        reminder_date : Date | null 
        reminderType : number
    }

   const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        // data without date
        let bodyData:editReminderInter = {
            category_id: reminder.category_id,
            reminderType: reminderParams.reminderType,
            id:reminder.id,
            reminder_title: reminderTitle,
            reminder_desc: reminderDesc,
            reminder_date: null
        }
        if(selectDate){
            const date = new Date(reminderDate + " " + reminderTime);
            bodyData.reminder_date = date
        }

        // push modified data to api
        const response = await fetch('/api/reminder/edit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
        })

         // log
        Log(`modified ${reminder.reminder_category.name}-${reminderTitle}'s data.`)

        
        setIsOpen(false)
        fetchReminderData(true, false,reminderParams.reminderType, reminderParams.categoryId)
        
  }
  if((reminder.reminder_date && !reminderDate) && (reminder.reminder_date && !reminderTime)){
    return <></>
  }
   return (
      <>
         <div>
            <button onClick={() => setIsOpen(true)} type="button" className="text-black bg-slate-300 hover:bg-slate-400 focus:outline-none focus:ring-4 font-medium rounded-full text-sm p-3 text-center mr-2 mb-2 dark:bg-slate-700 dark:hover:bg-slate-800 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                </svg>
            </button>
        </div>

         <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>

            <form onSubmit={handleSubmit} className="p-5 rounded-xl bg-white dark:bg-zinc-900" >
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="rtitle" id="rtitle" value={reminderTitle} onChange={(e)=>setReminderTitle(e.target.value)}  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="rtitle" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <textarea name="description" cols={40} rows={5}  value={reminderDesc} onChange={(e)=>setReminderDesc(e.target.value)} id="description"  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                </div>

                {selectDate ? 
                    <div className='flex items-center justify-center mb-6'>
                        <div className="relative z-0 w-full group pr-1">
                            <input type="date" name="date" id="date" value={reminderDate} onChange={(e)=>setReminderDate(e.target.value)}  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                            <label htmlFor="date" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date</label>
                        </div>
                        <div className="relative z-0 w-full group">
                            <input type="time"  value={reminderTime} onChange={(e)=>setReminderTime(e.target.value)} name="time" id="time"  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                            <label htmlFor="time"  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Time</label>
                        </div>
                        <div>
                            <button type="button" onClick={()=>{setSelectDate(false);}}  className="text-black dark:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div> :  null
                }

                <div className='flex mb-5'>
                    {selectDate ? null: <div><button onClick={()=>setSelectDate(true)}  className="text-black bg-slate-300 hover:bg-slate-400 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2 text-center mr-2 mb-2 dark:bg-slate-700 dark:hover:bg-slate-800 dark:text-white">Add Date</button></div>}
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            
            
         </Modal>
      </>
   )
}
export default EditReminder
