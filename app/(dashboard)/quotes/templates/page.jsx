"use client"
import React, { useEffect, useState } from 'react'
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'next/navigation';
import { nFormatter } from '@/utils';

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


  const handleselected = (template) => {
    const isSelected = selectedtempletes.some(item => item.id === template.id);

    if (isSelected) {
      // If the card is already selected, deselect it
      setSelectedtempletes(selectedtempletes.filter(item => item.id !== template.id));
    } else {
      // If the card is not selected, select it
      setSelectedtempletes([...selectedtempletes, { id: template.id, name: template.name }]);
    }
  }



  return (
    <>
      <div className='flex-1 min-h-[85vh] max-h-[85vh] overflow-auto'>
        <div className="flex items-center justify-between">
          <h1 className='text-2xl font-semibold mt-2 mb-5 text-tprimary dark:text-white'>Choose a template to start your quote</h1>
          <div className="flex items-center gap-3">
            <CustomButton onClick={() => {
              router.push(`/quotes/new`)
            }} title={"Confirm & Create a quote"} />
            <CustomButton onClick={() => {
              router.push(`/quotes/templates/new`)
            }} title={"Create New Template"} />
          </div>
        </div>
        <div className='flex flex-wrap gap-4 text-tprimary'>
          {data.map((template, index) => (
            <div
              key={index}
              className={`dark:text-white text-gray-600 flex flex-col md:flex-row basis-full md:basis-[calc(50%-1rem)] p-4 rounded-lg shadow-lg border-2 cursor-pointer ${selectedtempletes.some(item => item.id === template.id) ? 'bg-primary-soft border-primary' : 'border border-gray-300'} relative`}
              onClick={() => handleselected(template)}
            >
              <h1 className="font-bold absolute top-2 right-2 text-sm px-2 py-1 rounded-lg">${nFormatter(template.totalbill, 1)}</h1>
              <img
                src={`${template.photo}`}
                alt={template.title}
                className="w-full md:w-1/6 h-auto rounded-lg object-cover"
              />
              <div className="flex flex-col justify-between ml-4 w-full">
                <div className='flex flex-col justify-center h-full'>
                  <h1 className="text-lg font-semibold">{template.name}</h1>
                  <p className="text-sm mt-2">{template.description}</p>
                </div>
                <div className="flex justify-end mt-4 md:mt-0 text-sm">
                  <p><span>{template.categories}</span> Categories <span>{template.tasks}</span> Tasks</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>

  )
}

export default page;