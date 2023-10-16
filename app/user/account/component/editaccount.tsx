import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import {customStyles} from '../../../modal.css.js'
import Log from '../../../log/log'
import { FetchAccountData, User } from '@/app/type'

const EditAccount = ({account, fetchAccountData}: {account:User, fetchAccountData:FetchAccountData}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [fname, setFname] = useState<string>(account.name)
    const [username, setUsername] = useState<string>(account.username)
    const [email, setEmail] = useState<string>(account.email)
    const [password, setPassword] = useState<string>("")
    const [verifyPassword, setVerifyPassword] = useState<string>("")


   const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

        if(username.includes(" ")){
            alert("Usernames must be a single word.")
            return false
        }
        if(password != verifyPassword){
            alert("Passwords do not match.")
            return false
        }

      const editUser = await fetch('/api/user/edit', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              id: account.id,
              name: fname,
              oldusername: account.username,
              username: username,
              oldemail: account.email,
              email: email,
              password: password

          }),
      })
      // Error alert when the item has already been taken by another user.
      const editUserRes = await editUser.json()

      if(editUser.status === 400){
          alert(editUserRes.error)
          setEmail(account.email)
          setUsername(account.username)
      }else{

          // Change log
          if(account.username != username){
              Log(`modified their username from ${account.username} to ${username}.`)
          }
          if(account.name != fname){
              Log(`modified their name from ${account.name} to ${fname}.`)
          }
          if(password != ""){
              Log(`modified their password.`)
          }


          alert('Edit success!')
          setIsOpen(false)

          fetchAccountData()
          

          
      }
       
  }

   return (
      <>
         <div>
            <button type="button" onClick={()=>setIsOpen(true)}  className="flex justify-between items-center text-black bg-slate-300 hover:bg-slate-400 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-4 py-2 text-center mr-2 mb-2 dark:bg-slate-700 dark:hover:bg-slate-800 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
                <span className='text-lg'>Edit</span>
            </button>
        </div>

        <Modal className='' isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <form onSubmit={handleSubmit} className="p-5 bg-white dark:bg-zinc-900" >
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={username}  onChange={(e) => setUsername(e.target.value)} name="username" id="username" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                    <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="email" value={email}  onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={fname}  onChange={(e) => setFname(e.target.value)} name="fname" id="fname" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                    <label htmlFor="fname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                </div>
                
                <div className="relative z-0 w-full mb-6 group">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
                </div>


                <div className="relative z-0 w-full mb-6 group">
                    <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} name="verifyPassword" id="verifyPassword" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    <label htmlFor="verifyPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Verify Password</label>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
         </Modal>
      </>
   )
}
export default EditAccount
