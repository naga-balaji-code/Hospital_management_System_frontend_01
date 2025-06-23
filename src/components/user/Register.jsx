import React, { useState } from 'react'
import { CgNametag } from "react-icons/cg";
import { CgRename } from "react-icons/cg";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEventRepeat } from "react-icons/md";
import {validatePassword} from "val-pass"
import toast from 'react-hot-toast';
import axios from 'axios';
import empServices from '../../service/empServices';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    userName:"",
    password:"",
    name:"",
    email:""
  })

  const [matched,setMatched]=useState(true)
  const[errorMessage,setErrorMessage]=useState("")

  const handelChange=e=>{
    let {name,value}=e.target
    if(name=="password"){
      let {validateAll,getAllValidationErrorMessage}=validatePassword(value,8)
      // console.log(getAllValidationErrorMessage());
      validateAll()?setErrorMessage(""):setErrorMessage(getAllValidationErrorMessage())
      value==""&&setErrorMessage("")
    }
    setFormData((preVal)=>({...preVal,[name]:value}))
  }

  const handelSubmit=e=>{
    e.preventDefault()
    let {name,userName,password,email}=formData
    if(!name||!userName||!password||!email){
      toast.error("All feilds are mandatory")
      return
    }
    let {validateAll,getAllValidationErrorMessage}=validatePassword(password)
    if(!validateAll()){
      toast.error(`${getAllValidationErrorMessage()}`)
    }
    if(!matched){
      toast.error("passsword and confirm password did not match")
  return
    };
(async()=>{
let data=await empServices.regiUser(formData)
try {
  if(data.status==201){
  toast.success("Registerd successfully")
  navigate("/")
}else{
  toast.error("Something went wrong")
}
} catch (error) {
  toast.error("Something went wrong")
}
})()
   
  }

  const handelCheckPassword=(e)=>{
    let {value} =e.target
    formData.password!=value?setMatched(false):setMatched(true)
   value==""&&setMatched(true)
  }

  
  return (
    <div className='bg-[#efefef] size-full flex justify-center items-center'>
      <form action="" className='w-1/2 h-[90%]  rounded-3xl bg-white shadow-2xl flex  items-center flex-col gap-8 px-[80px] py-20 max-sm:w-[90%] overflow-scroll' onSubmit={handelSubmit}>
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

        <div className={errorMessage?'w-full flex justify-center items-center px-3 rounded-sm':'hidden'}>
          <span className='text-red-700'>*{errorMessage}</span>
        </div>
        
        <div className={`border-2  w-full flex justify-center items-center px-3 rounded-sm ${matched?'border-black':'border-red-700'}`} >
          <input type="password"  placeholder='Re-type passoword' className='w-full outline-none px-4 h-10'  onChange={handelCheckPassword}/>
            <span><MdEventRepeat /></span>
        </div>

        
        <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm bg-black hover:bg-[#555] active:bg-lime-500 active:scale-[0.9]'>
         <button className='h-10 text-white font-bold text-md tracking-widest w-full outline-0'>Click</button>
        </div>
      </form>
    </div>
  )
}

export default Register