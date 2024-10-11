"use client"
import React, { useEffect, useState } from 'react'
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'next/navigation';
import { nFormatter } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTemplate, fetchTemplate } from '@/store/slices/client';
import { Delete, Edit, Trash2 } from 'lucide-react';
import { Button, IconButton } from '@mui/material';

function page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedtempletes, setSelectedtempletes] = useState([])
  const { templates } = useSelector(state => state.clients);


  const isSelectedCheck = id => selectedtempletes.some(item => item.id === id);

  const handleselected = (template) => {
    const isSelected = isSelectedCheck(template.id);

    if (isSelected) {
      // If the card is already selected, deselect it
      setSelectedtempletes(selectedtempletes.filter(item => item.id !== template.id));
    } else {
      // If the card is not selected, select it
      setSelectedtempletes([...selectedtempletes, { id: template.id }]);
    }
  }

  const handleDelete = (id) =>{
    dispatch(deleteTemplate(id));
  }

  useEffect(() => {
    dispatch(fetchTemplate())
  }, [])

  const handleQuoteCreate = () => {
    const templateIds = selectedtempletes.map(template => template.id);
    const queryString = templateIds.join(',');
    router.push(`/quotes/new?template=${queryString}`);
  }

  return (
    <>
      <div className='flex-1 min-h-[85vh] max-h-[85vh] overflow-auto'>
        <div className="flex items-center justify-between">
          <h1 className='text-2xl font-semibold mt-2 mb-5 text-tprimary dark:text-white'>Choose a template to start your quote</h1>
          <div className="flex items-center gap-3">
            <CustomButton onClick={() => {
              handleQuoteCreate()
            }} title={"Confirm & Create a quote"} />
            <CustomButton onClick={() => {
              router.push(`/quotes/templates/new`)
            }} title={"Create New Template"} />
          </div>
        </div>
        <div className='flex flex-wrap gap-4 text-tprimary'>
          {templates.map((template, index) => (
            <div
              key={index}
              className={`group hover:bg-gray-200 hover:dark:bg-gray-800 dark:text-white text-gray-600 flex flex-col md:flex-row basis-full md:basis-[calc(50%-1rem)] p-4 rounded-lg shadow-lg cursor-pointer ${isSelectedCheck(template.id) ? 'bg-gray-300 border-black border-2 dark:border-white dark:bg-gray-700' : 'border border-gray-600'} relative`}
              onClick={() => handleselected(template)}
            >
              <div className="absolute top-2 right-2 flex items-center justify-center gap-2">
                <h1 className="font-bold px-2 py-1 rounded-lg">${nFormatter(template.subtotal, 1)}</h1>
                <h1 className="text-lg font-semibold">{
                  !template.default ? <div className="gap-3 flex items-center justify-center">
                    <IconButton onClick={() => {
                      router.push(`/quotes/templates/edit?id=${template?.id}`)
                    }}>
                      <Edit className='w-5 h-5' />
                    </IconButton>
                    <IconButton onClick={() => {
                      handleDelete(template.id)
                    }}>
                      <Trash2 className='text-red-600 w-5 h-5' />
                    </IconButton>
                  </div> : <p className='tracking-wider text-xs text-blue-400 italic'>PROSBRO STORE</p>
                }</h1>
              </div>
              <img
                src={`${template.file ?? 'https://prosbrobucketv3.s3.ca-west-1.amazonaws.com/media/quotetemplatefile/home.jpg'}`}
                alt={template.title}
                className="w-full md:w-1/6 h-auto rounded-lg object-cover"
              />
              <div className="flex flex-col justify-between ml-4 w-full">
                <div className='flex flex-col justify-center h-full'>
                  <h1 className="text-lg font-semibold">{template.title}</h1>
                  <p className="text-sm mt-2">{template.description}</p>
                </div>
                <div className="flex justify-end mt-4 md:mt-0 text-sm">
                  <p><span>{template.total_products}</span> Categories <span>{template.total_items}</span> Tasks</p>
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