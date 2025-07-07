import React, { useContext, useEffect, useState } from 'react'
import empServices from '../../../../service/empServices';
import { contextApi } from '../../../context/Context';

const Home = () => {
  const {globalState}=useContext(contextApi)
  // console.log(globalState);
  const [allBills,setAllBills]=useState([])
  
  useEffect(()=>{
    (async ()=>{
     let data=await empServices.allBills(globalState.token)
     if(data.status==200){
      setAllBills((preVal)=>([...preVal,...data.data.bills]))
     }
    })();
  },[])

  console.log(allBills);
  
  return (
    <div>Home</div>
  )
}

export default Home