import React, { useContext, useEffect, useState } from 'react'
import empServices from '../../../../service/empServices'
import { contextApi } from '../../../context/Context'

const Home = () => {
  const { globalState } = useContext(contextApi)
  const [allBills, setAllBills] = useState([])

  useEffect(() => {
    (async () => {
      let data = await empServices.allBills(globalState.token)
      if (data.status === 200) {
        setAllBills((prevVal) => [...prevVal, ...data.data.bills])
      }
    })()
  }, [])

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 flex flex-wrap gap-6 justify-center">
      {allBills.map((bill, index) => (
        <div
          key={index}
          className="w-80 h-60 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 p-6 max-md:w-full"
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-3">{bill.companyName}</h2>
          <div className="text-sm text-gray-700 space-y-1">
            <p><span className="font-semibold">GST No:</span> {bill.GSTNo}</p>
            <p><span className="font-semibold">PAN:</span> {bill.PAN}</p>
            <p><span className="font-semibold">PO No:</span> {bill.PoNo}</p>
            <p><span className="font-semibold">Total Amount:</span> ₹{bill.totalAmount}</p>
            <p><span className="font-semibold">Invoice Date:</span> {new Date(bill.invoiceDate).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
