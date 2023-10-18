import React, { useState } from 'react'
import Modal from 'react-modal'
import {customStyles} from '../../modal.css.js'
import Log from '../../log/log'
import { FetchReminderData, ReminderParams } from '@/app/type'

const AddReminder = ({reminderParams, fetchReminderData}:{reminderParams:ReminderParams, fetchReminderData:FetchReminderData}) => {
   const [isOpen, setIsOpen] = useState(false)
   const [selectDate, setSelectDate] = useState(false)

    interface reminderInter {
        category_id: number,
        reminder_title: string,
        reminder_desc: string,
        reminder_date : Date | null 
        reminderType : number
    }

   const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        // new data without date and time
        let bodyData:reminderInter = {
            category_id: reminderParams.categoryId,
            reminder_title: event.target.rtitle.value,
            reminder_desc: event.target.description.value,
            reminder_date: null,
            reminderType: reminderParams.reminderType
        }
        if(selectDate){
            let date = new Date(event.target.date.value + " " + event.target.time.value);
            bodyData.reminder_date = date
        }

        // send data to api
        const response = await fetch('/api/reminder/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
        })

        // Refetch new data
        setIsOpen(false)
        fetchReminderData(true, false,reminderParams.reminderType, reminderParams.categoryId)
  }

   return (
      <>
         <div>
            <button onClick={() => setIsOpen(true)} type="button"  className="flex justify-between items-center text-black bg-slate-300 hover:bg-slate-400 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-4 py-2 text-center mr-2 mb-2 dark:bg-slate-700 dark:hover:bg-slate-800 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg> 
                <span className='text-lg'>Add Item</span>
            </button>
        </div>

         <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>

            <form onSubmit={handleSubmit} className="p-5 rounded-xl bg-white dark:bg-zinc-900" >
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="rtitle" id="rtitle"  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="rtitle" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <textarea name="description" cols={40} rows={5} id="description"  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                </div>
                
                {selectDate ? 
                    <div className='flex items-center justify-center mb-6'>
                        <div className="relative z-0 w-full  group pr-1">
                            <input type="date" name="date" id="date" defaultValue={new Date().toLocaleDateString("fr-CA")}  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                            <label htmlFor="date" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date</label>
                        </div>
                        <div className="relative z-0 w-full group">
                            <input type="time"  defaultValue={new Date().toLocaleTimeString("en-GB",{hour: '2-digit', minute:'2-digit'})} name="time" id="time"  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                            <label htmlFor="time"  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Time</label>
                        </div>
                        <div>
                            <button type="button" onClick={()=>{setSelectDate(false);}}  className="text-black dark:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div> : null
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
export default AddReminder
