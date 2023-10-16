import React, { useState } from 'react'
import Modal from 'react-modal'
import {customStyles} from '../../modal.css.js'
import Log from '../../log/log'
import { FetchReminderData, ReminderData, ReminderParams } from '@/app/type'

const DeleteReminder = ({ reminder,reminderParams, fetchReminderData}: {reminder:ReminderData, reminderParams:ReminderParams, fetchReminderData:FetchReminderData}) => {
   const [isOpen, setIsOpen] = useState(false)
   
    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
  
        // Delete reminder
        const response = await fetch('/api/reminder/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category_id: reminder.category_id,
                reminderType: reminderParams.reminderType,
                id:reminder.id
        })})
  
        const result = await response.json()
  
        // Change log
        Log(`deleted ${reminder.reminder_title} from ${reminder.reminder_category.name}.`)
  
        // Refetch new data
        setIsOpen(false)
        fetchReminderData(true, false,reminderParams.reminderType, reminderParams.categoryId)
    }

   return (
      <>
        <div>
            <button  type="button" onClick={()=>setIsOpen(true)}  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 font-medium rounded-full text-sm p-3 text-center mr-2 mb-2 dark:bg-red-700 dark:hover:bg-red-800 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                </svg>
            </button>
        </div>

         <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>

         <form onSubmit={handleSubmit} className="p-5 rounded-xl bg-white dark:bg-gray-900" >
                <div className='flex flex-direction-row content-center justify-center'>
                    <div>
                        <h2 className='text-xl font-bold dark:text-white pb-5'>
                        Delete {reminder.reminder_title}?
                    </h2>
                    </div>
                </div>
                <div className='pt-5 flex flex-direction-row content-center justify-center'>
                    <button type="submit" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
                </div>
            </form>

         </Modal>
      </>
   )
}
export default DeleteReminder
