import CustomButton from '@/components/CustomButton'
import CustomModal from '@/components/CustomModal'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

const AddCustomFields = ({ show, onClose }) => {
    const { control, register, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            transferableField: false,
            customFieldName: '',
            fieldType: 'text', // default field type
            defaultValue: '',
            dropdownOptions: [{ option: "" }, { option: "" }],
        },
    });


    const { fields: dropdownOptions, append: appendDropdownOption, remove: removeDropdownOption } = useFieldArray({
        control,
        name: "dropdownOptions",
    });

    const fieldType = watch("fieldType")

    const onSubmit = (data, event) => {
        // Stop the event from propagating
        event.stopPropagation();
        console.log('Form data:', data);
    };

    return (
        <div>
            <CustomButton title="Add Custom Field" onClick={onClose} />
            <CustomModal show={open} onClose={onClose}>
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800">New Custom Field</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="fieldType" className="mb-2 text-gray-700">
                                Field type
                            </label>
                            <select
                                id="fieldType"
                                {...register('appliesTo')}
                                disabled
                                className="border border-gray-300 rounded p-2 focus:outline-none focus:border-green-700 bg-gray-300"
                            >
                                <option value="allclients">All Clients</option>
                                {/* Add other field types as required */}
                            </select>
                        </div>

                        {/* Transferable Field Checkbox */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="transferableField"
                                {...register('transferableField')}
                                className="mr-2 w-4 h-4"
                            />
                            <label htmlFor="transferableField" className="text-gray-700">
                                Transferable field
                            </label>
                        </div>

                        {/* Custom Field Name */}
                        <div className="flex flex-col">
                            <input
                                type="text"
                                id="customFieldName"
                                {...register('customFieldName', { required: true })}
                                className="border border-gray-300 rounded p-2 focus:outline-none focus:border-green-700"
                                placeholder="Enter field name"
                            />
                        </div>

                        {/* Field Type Dropdown */}
                        <div className="flex flex-col">
                            <label htmlFor="fieldType" className="mb-1 text-gray-700 text-sm">
                                Field type
                            </label>
                            <select
                                id="fieldType"
                                {...register('fieldType')}
                                className="border border-gray-300 rounded p-2 focus:outline-none focus:border-green-700"
                            >
                                <option value="text">Text</option>
                                <option value="numeric">Numeric</option>
                                <option value="trueFalse">True/False</option>
                                <option value="area">Area (length * width)</option>
                                <option value="dropdown">Dropdown</option>
                            </select>
                        </div>

                        {/* Default Value */}
                        {
                            fieldType == "text" ? <div className="flex flex-col space-y-4">
                                <p className='text-sm text-gray-400'>Example: Serial Number 54A17-HEX</p>
                                <div className='flex flex-col'>
                                    <label htmlFor="defaultValue" className="mb-2 text-gray-700">
                                        Default value
                                    </label>
                                    <input
                                        type="text"
                                        id="defaultValue"
                                        {...register('defaultValue')}
                                        className="border border-gray-300 rounded p-2 focus:outline-none focus:border-green-700"
                                        placeholder="Enter default value"
                                    />
                                </div>
                            </div> :
                                fieldType == "numeric" ? <div className="flex flex-col space-y-4">
                                    <p className='text-sm text-gray-400'>Example: Pool depth <span className='p-2 bg-gray-200 rounded'>11</span> ft</p>
                                    <div className='flex flex-col'>
                                        <label htmlFor="defaultValue" className="mb-2 text-gray-700">
                                            Default value
                                        </label>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                id="defaultValue"
                                                {...register('defaultValue')}
                                                className="border flex-1 border-gray-300  p-2 focus:outline-none focus:border-green-700 rounded-lg rounded-r-none"
                                                placeholder="Default value"
                                            />
                                            <input
                                                type="text"
                                                id="defaultValue"
                                                {...register('defaultValue')}
                                                className="w-[30%] border border-gray-300 p-2 focus:outline-none focus:border-green-700 rounded-lg rounded-l-none"
                                                placeholder="Unit"
                                            />
                                        </div>
                                    </div>
                                </div> : fieldType == "trueFalse" ? <div className="flex flex-col space-y-4">
                                    <div className='flex flex-col'>
                                        <label htmlFor="defaultValue" className="mb-2 text-gray-700">
                                            Default value
                                        </label>
                                        <div className="flex">
                                            <select
                                                id="fieldType"
                                                {...register('defaultValue', { required: true })}
                                                className="border w-full border-gray-300 rounded p-2 focus:outline-none focus:border-green-700"
                                            >
                                                <option value="">Select</option>
                                                <option value="true">True</option>
                                                <option value="false">Fals</option>
                                            </select>
                                        </div>
                                    </div>
                                </div> : fieldType == "area" ? <div className="flex flex-col space-y-4">
                                    <div className='flex flex-col'>
                                        <label htmlFor="defaultValue" className="mb-2 text-gray-700">
                                            Default values
                                        </label>
                                        <div className="w-full grid grid-cols-3">
                                            <input
                                                type="text"
                                                id="defaultValue"
                                                {...register('defaultValue')}
                                                className="border border-gray-300 p-2 focus:outline-none focus:border-green-700 rounded-lg rounded-r-none"
                                                placeholder="Length"
                                            />
                                            <input
                                                type="text"
                                                id="defaultValue"
                                                {...register('defaultValue')}
                                                className="border border-gray-300 p-2 focus:outline-none focus:border-green-700"
                                                placeholder="Width"
                                            />
                                            <input
                                                type="text"
                                                id="defaultValue"
                                                {...register('defaultValue')}
                                                className="border border-gray-300 p-2 focus:outline-none focus:border-green-700 rounded-lg rounded-l-none"
                                                placeholder="Unit"
                                            />

                                        </div>
                                    </div>
                                </div> : fieldType == "dropdown" ? <div className="flex flex-col space-y-4">
                                    <div className="flex items-center gap-2">
                                        <p className='text-sm text-gray-400'>Example: Work Type</p><span className='px-1 bg-gray-200  text-gray-400 rounded flex items-center gap-2 text-sm'>Commercial <ChevronDown className='w-4 h-4 text-gray-400' /></span>
                                    </div>

                                    <div>
                                        <label htmlFor="defaultValue" className="mb-2 text-gray-700">
                                            Options for dropdown
                                        </label>
                                        <div>
                                            <label htmlFor="dropdownOptions" className="mb-2 text-gray-700">
                                                Options for dropdown
                                            </label>
                                            <div className="flex flex-col">
                                                {dropdownOptions.map((option, index) => (
                                                    <div key={option.id} className="flex items-center mb-2">
                                                        <input
                                                            type="text"
                                                            {...register(`dropdownOptions.${index}.option`)}
                                                            className="border border-gray-300 p-2 focus:outline-none focus:border-green-700 rounded-lg"
                                                            placeholder={index === 0 ? 'Default Option' : 'Option'}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeDropdownOption(index)}
                                                            className="ml-2 text-red-500"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="py-2">
                                                <CustomButton
                                                    onClick={() => appendDropdownOption({ option: '' })}
                                                    title="Add Option"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div> : <></>
                        }


                        {/* Submit Button */}
                        <div className="flex justify-end gap-2">
                            <CustomButton title={"Cancel"} onClick={() => { onClose(); reset() }} />
                            <CustomButton type="submit" variant={"primary"} title={"Create Custom Field"} />
                        </div>
                    </form>
                </div>
            </CustomModal>
        </div>
    )
}

export default AddCustomFields