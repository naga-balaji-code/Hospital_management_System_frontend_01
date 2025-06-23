import React, { useState } from 'react'
import { MdAlternateEmail } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import empServices from '../../service/empServices'
import toast from 'react-hot-toast'

const Login = () => {
    const navigate=useNavigate()
  const [formData,setFormData]=useState({

    password:"",

    email:""
  })


  const handelChange=e=>{
    let {name,value}=e.target
    
    setFormData((preVal)=>({...preVal,[name]:value}))
  }

  const handelSubmit=e=>{
    e.preventDefault()
    let {password,email}=formData
    if(!password||!email){
      toast.error("All feilds are mandatory")
      return
    }
    
    // console.log(formData);
    
(async()=>{
let data=await empServices.loginUser(formData)
try {
  if(data.status==200){
  toast.success("Login successfully")
  navigate("/home")
}else{
  toast.error(`${data.response.data.message}`)
}
} catch (error) {
  toast.error("Something went wrong")
}
})()
   
  }
  return (
    <div className='bg-[#efefef] size-full flex justify-center items-center'>
         <form action="" className='w-1/2 h-[70%]  rounded-3xl bg-white shadow-2xl flex  items-center flex-col gap-8 px-[80px] py-20 max-sm:w-[90%] overflow-scroll' onSubmit={handelSubmit}>
           <div className='font-bold w-full flex justify-center items-center'>
             <h1 className='text-3xl max-lg:text-sm'>Login Form</h1>
           </div>
   
   
           <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm'>
             <input type="email" name="email" placeholder='Enter Email' className='w-full outline-none px-4 h-10' onChange={handelChange}/>
               <span><MdAlternateEmail /></span>
           </div>
   
   
           <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm'>
             <input type="password" name="password" placeholder='Enter password' className='w-full outline-none px-4 h-10' onChange={handelChange}/>
               <span><RiLockPasswordLine /></span>
           </div>
  

           
           <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm bg-black hover:bg-[#555] active:bg-lime-500 active:scale-[0.9]'>
            <button className='h-10 text-white font-bold text-md tracking-widest w-full outline-0'>Click</button>
           </div>
         <div className='hover:underline'><Link to="register">Click Here to Register</Link></div>

         </form>
       </div>
  )
}

export default Login