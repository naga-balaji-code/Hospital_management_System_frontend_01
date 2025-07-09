import React, { useContext, useState } from 'react'
import empServices from '../../../../service/empServices'
import { contextApi } from '../../../context/Context'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import BillItems from '../../../bill/BillItems'


const UpdateBills = () => {
    const navigate=useNavigate()
    let {state}=useLocation()
    console.log(state);
    
  const [bill,setBill]=useState({
    companyName:state.companyName,
    PoNo:state.PoNo,
    invoiceDate:new Date().toISOString().split("T")[0],
    workCompletionDate:state.workCompletionDate.split("T")[0],
    address:state.address,
    PAN:state.PAN,
    GSTNo:state.GSTNo,
    clientBankName:state.clientBankName
  })
  const {globalState}=useContext(contextApi)
  const [items,setItems]=useState(state.items)
  const handelChange=(e)=>{
    let {name,value}=e.target
    setBill((preVal)=>({...preVal,[name]:value}))
  }
  const  handelClick=e=>{
    let newObj={
      id:Date.now(),
      description:"",
      quantity:"",
      rate:"",
      cgstPercent:"",
      sgstPercent:""
    }
   setItems((preVal)=>([...preVal,newObj])) 
  }
  const handelSubmit=(e)=>{
    e.preventDefault()
    // console.log(bill);
    // console.log(items);
    let {companyName,workCompletionDate,PoNo,address,PAN,GSTNo,clientBankName}=bill
    let totalAmount=items.reduce((acc,val)=>{
      const base=parseInt(val.amount)
      const cgst=base*parseInt(val.cgstPercent)/100
      const sgst=base*parseInt(val.sgstPercent)/100

      // console.log(base,cgst,sgst,acc);
      
      return acc+base+cgst+sgst
    },0)
    let payload={
      companyName,
      workCompletionDate,
      PoNo,
      address,
      PAN,
      GSTNo,
      clientBankName,
      items,
      invoiceDate:new Date().toISOString().split("T")[0],
      totalAmount
    }
    console.log(payload);

    (async()=>{
try {
        let data=await empServices.updateBills(payload,globalState.token,state._id)
      if(data.status==200){
        toast.success("Bill Updated successfully")
        navigate("/home")
      }else{
        toast.error("Something went wrong")
      }
} catch (error) {
  toast.error("Something went wrong")
}
    })();
    

  }

  // console.log(new Date().toISOString().split("T")[0]);
  
  const removeElement=(id)=>{
setItems(items.filter((val)=>val.id!=id))
  }

  const updateElements=(id,name,value)=>{
    // console.log(id,name,value);
    
    setItems((preVal)=>{
     return preVal.map((val)=>{
        if(val.id==id){
      
          
          const updateItems={
            ...val,[name]:value
          }
          updateItems.amount=val.rate*val.quantity
          return updateItems
        }

        return val
      })

    })
  }
  let {PAN,companyName,GSTNo,workCompletionDate,clientBankName,address,PoNo} =bill
  return (
     <div className='bg-[#efefef] size-full flex justify-center items-center'>
          <form action="" className='w-1/2 h-[90%]  rounded-3xl bg-white shadow-2xl flex  items-center flex-col gap-8 px-[80px] py-20 max-sm:w-[90%] overflow-scroll' onSubmit={handelSubmit}>
            <div className='font-bold w-full flex justify-center items-center'>
              <h1 className='text-3xl max-lg:text-sm'>Update Bills</h1>
            </div>
    
            {/* <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm'>
              <input type="text" name="name" placeholder='Enter Name' className='w-full outline-none px-4 h-10'  onChange={handelChange} value={companyName}/>
            
            </div> */}
    
             <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm'>
              <input type="text" name="companyName" placeholder='Enter Company Name' className='w-full outline-none px-4 h-10' onChange={handelChange} value={companyName}/>
                        </div>
    
    
            <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm'>
              <input type="text" name="PoNo" placeholder='Enter PoNo' className='w-full outline-none px-4 h-10' onChange={handelChange} value={PoNo}/>
       
            </div>
    
    


               
            <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm'>
              <input type="date" name="workCompletionDate" placeholder='Enter Work Completion Date' className='w-full outline-none px-4 h-10' onChange={handelChange} value={workCompletionDate}
              max={new Date().toISOString().split("T")[0]}
              />
        
            </div>


                           
            <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm'>
              <input type="text" name="address" placeholder='Enter Address' className='w-full outline-none px-4 h-10' onChange={handelChange} value={address}/>
        
            </div>


                                     
            <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm'>
              <input type="text" name="PAN" placeholder='Enter PAN' className='w-full outline-none px-4 h-10' onChange={handelChange} value={PAN}/>
        
            </div>


                                     
            <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm'>
              <input type="text" name="GSTNo" placeholder='Enter GST No' className='w-full outline-none px-4 h-10' onChange={handelChange} value={GSTNo}/>
        
            </div>


                                     
            <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm'>
              <input type="text" name="clientBankName" placeholder='Enter Client Bank Name' className='w-full outline-none px-4 h-10' onChange={handelChange} value={clientBankName}/>
        
            </div>
    
          {
            items.map((val)=><BillItems 
            key={val.id}
            removeElement={removeElement}
            val={val}
            updateElements={updateElements}
            ></BillItems>)
          }          
            <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm bg-black hover:bg-[#555] active:bg-lime-500 active:scale-[0.9]'>
             <button className='h-10 text-white font-bold text-md tracking-widest w-full outline-0' type='button' onClick={handelClick}>Click to Add Items</button>
            </div>

            <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm bg-black hover:bg-[#555] active:bg-lime-500 active:scale-[0.9]'>
             <button className='h-10 text-white font-bold text-md tracking-widest w-full outline-0'>Click</button>
            </div>
          </form>
        </div>
  )
}

export default UpdateBills