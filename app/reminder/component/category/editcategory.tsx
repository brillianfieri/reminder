import React, { useState } from 'react'
import Modal from 'react-modal'
import {customStyles} from '../../../modal.css.js'
import Log from '../../../log/log'
import { ReminderParams, SetReminderParams } from '@/app/type'

const EditCategory = ({reminderParams, setReminderParams}:{reminderParams:ReminderParams, setReminderParams:SetReminderParams}) => {
   const [isOpen, setIsOpen] = useState(false)
   const [categoryName, setCategoryName] = useState(reminderParams.categoryName)
   

   const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Rename reminder category's name
        const response = await fetch('/api/reminder/category/edit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: reminderParams.categoryId,
            name: categoryName,
        }),
        })

         // Change log
        Log(`renamed category ${reminderParams.categoryName} to ${categoryName}.`)

        // Close modal and refetch new data
        setIsOpen(false)
        setReminderParams({categoryName:categoryName,reminderType:0, categoryId:reminderParams.categoryId, sharedOwner:reminderParams.sharedOwner})
        
  }

   return (
      <>
         <div>
            <button onClick={() => setIsOpen(true)} className="pl-2 text-slate-700 dark:text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                </svg>
            </button>
        </div>

         <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>

            <form onSubmit={handleSubmit} className="p-5 rounded-xl bg-white dark:bg-zinc-900" >
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={categoryName}  onChange={(e) => setCategoryName(e.target.value)} name="category_name" id="category_name" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                    <label htmlFor="category_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category Name</label>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            
            
         </Modal>
      </>
   )
}
export default EditCategory
