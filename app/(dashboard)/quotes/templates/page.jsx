"use client"
import React, { useEffect, useState } from 'react'
import Cards from './Cards';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();
  const [selectedtempletes, setSelectedtempletes] = useState([])
  const [data, setData] = useState([{
    photo: "https://media.istockphoto.com/id/943910360/photo/posters-in-cozy-apartment-interior.jpg?s=612x612&w=0&k=20&c=QzNjsxCNMcFNxpn4E2ocPvSU8Ud2S3B_mHyo5L-HOLo=",
    title: "Test Template",
    name: "Test Template",
    description: "This is test test test test template.",
    categories: "10",
    tasks: "14",
    totalbill: 15000,
  }])


  return (
    <>
      <div className='flex-1 min-h-[85vh] max-h-[85vh] overflow-auto'>
        <div className="flex items-center justify-between">
          <h1 className='text-2xl font-semibold mt-2 mb-5 text-tprimary'>Choose a template to start your quote</h1>
          <CustomButton onClick={() => {
            router.push(`/quotes/new`)
          }} title={"Confirm & Create a quote"} />
        </div>
        <Cards data={data} setSelectedtempletes={setSelectedtempletes} selectedtempletes={selectedtempletes} />;
      </div>
      <div className='flex justify-center items-center py-5 bg-gray-100 fixed w-full bottom-0'>
      </div>
    </>

  )
}

export default page;