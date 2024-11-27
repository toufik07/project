import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

export default function Register() {

    const [uname , setuname] = useState("")
    const [email,setemail] = useState("")
    const [upass,setpassword] = useState("")
    const [signupas , setsignup] = useState("")
    const navigate = useNavigate()

    const data = {
        uname,
        email,
        upass,
        signupas
    }

    function handlesubmit(e){
        e.preventDefault();

        axios.post("http://127.0.0.1:5000/register",data)
        .then((res) =>{
            console.log("added")
            alert(res.data.msg)
            setuname("")
            setemail("")
            setpassword("")
            setsignup("")
            navigate('/login')
        })
        .catch((rej) =>{
            console.log('error msg :')
            console.log(rej)
        })
    }
    
    return (
        <div id="authentication-modal" className=' flex justify-center mt-24'>
            <div class="relative p-4 md:w-1/2 w-full max-h-full">

                <div class="relative bg-white rounded-lg shadow-xl">

                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h3 class="text-xl font-semibold text-gray-90">
                            Sign up to our platform
                        </h3>
                        <Link to={'/'}>
                            <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" >
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </Link>

                    </div>

                    <div class="p-4 md:p-5">
                        <form class="space-y-4" onSubmit={handlesubmit}>
                            <div className="">
                                <label for="uname" class="block mb-2 text-sm font-medium text-gray-900">Your Username</label>
                                <input type="text" name="uname" id="uname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="abc123"  
                                    onChange={(e) => setuname(e.target.value)} 
                                    value={uname} 
                                    required />
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="name@gmail.com"  
                                    onChange={(e) => setemail(e.target.value)} 
                                    value={email} 
                                    required />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"  
                                    onChange={(e) => setpassword(e.target.value)} 
                                    value={upass} 
                                    required/>
                            </div>
                            <div className='flex justify-between'>
                                <select name="signupas" id="signupas" className='border-gray-300 border p-2 text-sm rounded-lg'  
                                    onChange={(e) => setsignup(e.target.value)} 
                                    value={signupas} 
                                    required>
                                    <option value="" disabled>Sign up as</option>
                                    <option value="ServiceProvider">ServiceProvider</option>
                                    <option value="Farmer">Farmer</option>
                                    <option value="User">User</option>
                                </select>
                            </div>
                            <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Create your account
                            </button>
                            <div class="text-sm font-medium text-gray-500">
                                Already have an Account? <Link to={'/login'} class="text-blue-700 hover:underline">Sign in</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
