import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Modal from 'react-modal'
import {customStyles} from '../../modal.css.js'
import Log from '@/app/log/log'
import { FetchUserData, User } from '@/app/type'

const DeleteUser = ({userData, fetchUserData}:{userData:User, fetchUserData:FetchUserData}) => {

   const router = useRouter()

   const [isOpen, setIsOpen] = useState(false)


   const deleteClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      // Display a modal to confirm the action.
      setIsOpen(true)
   }

   const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault()

      // Delete the user from the list.
      const response = await fetch('/api/user/delete', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
          id: userData.id
       }),
       })

      // Change log
      Log(`removed ${userData.username} from the user list.`)

      alert(userData.username + ' has been removed from the list.')
      setIsOpen(false)
      fetchUserData()
  }

   return (
      <div>
         <div>
                <button onClick={deleteClicked} type="button"  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
         </div>


         <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <form onSubmit={handleSubmit} className="p-5 rounded-xl bg-white dark:bg-zinc-900" >
               <div>
                  <h2 className='flex flex-direction-row content-center justify-center text-xl font-bold dark:text-white pb-5'>
                     Delete {userData.username}?
                  </h2>

               </div>
               
               
               
               <div className='pt-5 flex flex-direction-row content-center justify-center'>
                  <button type="submit" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>


               </div>

            </form>
         </Modal>
      </div>
   )
}
export default DeleteUser