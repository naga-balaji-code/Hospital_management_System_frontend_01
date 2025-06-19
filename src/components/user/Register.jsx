import React, { useState } from 'react'
import { CgNametag } from "react-icons/cg";
import { CgRename } from "react-icons/cg";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEventRepeat } from "react-icons/md";


const Register = () => {
  let [formData,setFormData]=useState({
    userName:"",
    password:"",
    name:"",
    email:""
  })

  let handelChange=e=>{
    let {name,value}=e.target
    setFormData((preVal)=>({...preVal,[name]:value}))
  }

  let handelSubmit=e=>{
    e.preventDefault()
    console.log(formData);
    
  }
  return (
    <div className='bg-[#efefef] size-full flex justify-center items-center'>
      <form action="" className='w-1/2 h-[90%]  rounded-3xl bg-white shadow-2xl flex  items-center flex-col gap-8 px-[80px] py-20 max-sm:w-[90%]' onSubmit={handelSubmit}>
        <div className='font-bold w-full flex justify-center items-center'>
          <h1 className='text-3xl max-lg:text-sm'>Registration Form</h1>
        </div>

        <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm'>
          <input type="text" name="name" placeholder='Enter Name' className='w-full outline-none px-4 h-10'  onChange={handelChange}/>
          <span><CgNametag /></span>
        </div>

         <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm'>
          <input type="text" name="userName" placeholder='Enter Username' className='w-full outline-none px-4 h-10' onChange={handelChange}/>
            <span><CgRename /></span>
        </div>


        <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm'>
          <input type="email" name="email" placeholder='Enter Email' className='w-full outline-none px-4 h-10' onChange={handelChange}/>
            <span><MdAlternateEmail /></span>
        </div>


        <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm'>
          <input type="password" name="password" placeholder='Enter password' className='w-full outline-none px-4 h-10' onChange={handelChange}/>
            <span><RiLockPasswordLine /></span>
        </div>

        
        <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm'>
          <input type="password" name="" placeholder='Re-type passoword' className='w-full outline-none px-4 h-10'/>
            <span><MdEventRepeat /></span>
        </div>

        
        <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm bg-black'>
         <button className='h-10 text-white font-bold text-md tracking-widest'>Click</button>
        </div>
      </form>
    </div>
  )
}

export default Register