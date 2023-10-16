import React, { useState } from 'react'
import Modal from 'react-modal'
import {customStyles} from '../../../modal.css.js'
import Log from '../../../log/log'
import { ReminderParams, ShareList } from '@/app/type'

const ShareCategory = ({reminderParams}:{reminderParams:ReminderParams}) => {
   const [isOpen, setIsOpen] = useState(false)
   const [shareList, setShareList] = useState<ShareList[]>()
   const [username, setUsername]= useState<string>("")

    // Share button clicked
    const shareClicked = async () => {
        fetchSharedUserData()
        setIsOpen(true)
    }

    // fetch user list
    const fetchSharedUserData = async () =>{
        const shareList = await fetch(`/api/reminder/category/share/find/${reminderParams.categoryId}`, {method: 'GET'})
        const shareListRes = await shareList.json()
        setShareList(shareListRes)
    }


    // Add another user to the reminder category
    const handleShareSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        const shareReminder = await fetch('/api/reminder/category/share/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            category_id: reminderParams.categoryId,
            username: username
        })})

        if(shareReminder.status === 400){
            // No username found
            const shareReminderRes = await shareReminder.json()
            alert(shareReminderRes.error)
        }else{
             // log
            Log(`shared ${reminderParams.categoryName} to ${event.target.username.value}.`)

            // Refetch new data
            setUsername("")
            fetchSharedUserData()

        }
    }

    // Remove user from the reminder category
    const handleDeleteSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        const shareReminder = await fetch('/api/reminder/category/share/delete/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            category_id: reminderParams.categoryId,
            user_id: event.target.user_id.value
        })
        })
        if(shareReminder.status === 400){
            const shareReminderRes = await shareReminder.json()
            alert(shareReminderRes.error)
        }else{
            Log(`removed ${event.target.dataset.name}'s access to ${reminderParams.categoryName}.`)
            // Refetch new data
            fetchSharedUserData()

        }
    }

   return (
      <>
        <div>
            <button  type="button"  onClick={()=>shareClicked()} className="text-black bg-slate-300 hover:bg-slate-400 focus:outline-none focus:ring-4 font-medium rounded-full text-sm p-3 text-center mr-2 mb-2 dark:bg-slate-700 dark:hover:bg-slate-800 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
                </svg>
            </button>
        </div>

         <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>

            <div className="md:w-[30vw] p-5 rounded-xl bg-white dark:bg-gray-900" >

                <div className=' flex flex-direction-row justify-center'>
                        <div>
                            <div className=' justify-center flex'>
                                <h2 className='text-xl font-bold dark:text-white pb-5'>
                                {reminderParams.categoryName}
                                </h2>
                            </div>

                            {/* Add new user */}
                            <form onSubmit={handleShareSubmit} className="py-5 bg-white dark:bg-gray-900">
                                <div className="md:flex">
                                    <div className="relative z-0 w-full group pb-5 md:pb-0 md:pr-2">
                                        <input type="text" name="username" id="username" value={username} onChange={(e)=>setUsername(e.target.value)}  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                                    </div>
                                    <div>
                                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                    </div>
                                </div>
                            </form>


                            {/* Display share list + remove button */}
                            {(!shareList || shareList.length == 0) ? null:
                                <><div className='w-[75vw] md:w-[25vw]'>
                                    <div>
                                        <h2 className='text-xl font-bold dark:text-white pb-5'>
                                            Shared with:
                                        </h2>
                                    </div>
                                    
                                    {shareList.map((share:ShareList)=>{
                                        return(
                                            <div key={share.category_id+"-"+share.user_id} className=" text-black dark:text-white flex flex-wrap items-center justify-between mx-auto">
                                                <div className='text-lg'>
                                                    <div>{share.user.username}</div>
                                                </div>
                                                <div>
                                                    <form data-name={share.user.username}  onSubmit={handleDeleteSubmit}>
                                                        <input type="hidden" id="user_id" name="user_id"  value={share.user_id}  readOnly={true}/>
                                                        <button type="submit">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-6 h-6">
                                                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>)})}
                                </div></>
                            }
                        </div>
                </div>
            </div>

         </Modal>
      </>
   )
}
export default ShareCategory
