import CustomButton from '@/components/CustomButton'
import CustomModal from '@/components/CustomModal'
import { createClientsCustomFields, createInvoiceCustomFields, createJobCustomFields, createPropertyCustomFields, createQuoteCustomFields, removeLoading, setLoading } from '@/store/slices/client'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ModalHeading from './ModalHeading'

const AddCustomFields = ({ open, onClose, }) => {
    const dispatch = useDispatch();
    const { loadingObj } = useSelector(state => state.clients);
    const { control, register, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            transferableField: false,
            customFieldName: '',
            fieldType: 'text', // default field type
            defaultValue: '',
            dropdownOptions: [{ option: "", value: "" }],
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

        let jsonData = {
            status: true,
            transferable: Boolean(data.transferableField),
        }

        jsonData.field_name = data.fieldName?.toString() || ""
        jsonData.field_type = data.fieldType?.toString() || ""

        if (data.fieldType == "dropdown") {
            jsonData.dropdown_options = data.dropdownOptions
            jsonData.value = 0
        }

        if (data.fieldType == "numeric") {
            jsonData.value = parseFloat(data.defaultValue) || 0
            jsonData.unit = data.defaultUnit?.toString() || ""
        }

        if (data.fieldType == "boolean") {
            jsonData.value = data.defaultValue
        }

        if (data.fieldType == "text") {
            jsonData.value = data.defaultValue?.toString() || ""
        }

        if (data.fieldType == "area") {
            jsonData.length = parseFloat(data.defaultLength) || 0
            jsonData.width = parseFloat(data.defaultWidth) || 0
            jsonData.unit = data.defaultUnit?.toString() || ""
        }



        if (open == "client") {
            dispatch(createClientsCustomFields(jsonData)).then(() => { onClose(); reset(); })
        }
        else if (open == "property") {
            dispatch(createPropertyCustomFields(jsonData)).then(() => { onClose(); reset(); })
        }
        else if (open == "quote") {
            dispatch(createQuoteCustomFields(jsonData)).then(() => { onClose(); reset(); })
        }
        else if (open == "job") {
            dispatch(createJobCustomFields(jsonData)).then(() => { onClose(); reset(); })
        }
        else if (open == "invoice") {
            dispatch(createInvoiceCustomFields(jsonData)).then(() => { onClose(); reset(); })
        }
        else {
            console.log("Invalid Field - Client, Property and Quote is allowed")
        }

    };

    return (
        <div>
            <CustomModal show={Boolean(open)} onClose={() => { onClose(); reset() }}>
                <div className="space-y-6">
                    <ModalHeading onClose={onClose}>New Custom Field</ModalHeading>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="fieldType" className="mb-2 text-gray-700">
                                Field type
                            </label>
                            <select
                                id="fieldType"
                                disabled
                                {...register('appliesTo')}
                                className="border border-gray-300 rounded p-2 focus:outline-none focus:border-green-700 bg-gray-300"
                            >
                                {
                                    open == "client" ?
                                        <option value="allclients">All Clients</option> :
                                        <option value="allproperties">All Properties</option>
                                }
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
                                id="fieldName"
                                {...register('fieldName', { required: true })}
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
                                <option value="boolean">True/False</option>
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
                                                id="defaultUnit"
                                                {...register('defaultUnit')}
                                                className="w-[30%] border border-gray-300 p-2 focus:outline-none focus:border-green-700 rounded-lg rounded-l-none"
                                                placeholder="Unit"
                                            />
                                        </div>
                                    </div>
                                </div> : fieldType == "boolean" ? <div className="flex flex-col space-y-4">
                                    <div className='flex flex-col'>
                                        <label htmlFor="defaultValue" className="mb-2 text-gray-700">
                                            Default value
                                        </label>
                                        <div className="flex">
                                            <select
                                                id="fieldType"
                                                {...register('defaultValue', { required: true })}
                                                defaultValue={"true"}
                                                className="border w-full border-gray-300 rounded p-2 focus:outline-none focus:border-green-700"
                                            >
                                                <option value="">Select</option>
                                                <option value="true">True</option>
                                                <option value="false">False</option>
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
                                                {...register('defaultLength')}
                                                className="border border-gray-300 p-2 focus:outline-none focus:border-green-700 rounded-lg rounded-r-none"
                                                placeholder="Length"
                                            />
                                            <input
                                                type="text"
                                                id="defaultValue"
                                                {...register('defaultWidth')}
                                                className="border border-gray-300 p-2 focus:outline-none focus:border-green-700"
                                                placeholder="Width"
                                            />
                                            <input
                                                type="text"
                                                id="defaultUnit"
                                                {...register('defaultUnit')}
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
                                        <label htmlFor="defaultValue" className="mb-2 text-gray-700 justify-between flex items-center">
                                            <span className='font-semibold text-gray-500'>Options for dropdown</span>
                                            <CustomButton
                                                onClick={() => appendDropdownOption({ option: '' })}
                                                title="Add Option"
                                            />
                                        </label>
                                        <div>
                                            <div className="flex flex-col">
                                                {dropdownOptions.map((option, index) => (
                                                    <div key={option.id} className="flex flex-col items-center mb-2">
                                                        <div className="flex flex-row">
                                                            <input
                                                                type="text"
                                                                {...register(`dropdownOptions.${index}.option`)}
                                                                className="border border-gray-300 p-2 focus:outline-none focus:border-green-700 rounded-lg w-full h-11 rounded-r-none"
                                                                placeholder={index === 0 ? 'Default Option' : 'Option'}
                                                            />
                                                            <input
                                                                type="text"
                                                                {...register(`dropdownOptions.${index}.value`)}
                                                                className="border border-gray-300 p-2 focus:outline-none focus:border-green-700 rounded-lg w-full h-11 rounded-l-none"
                                                                placeholder={index === 0 ? 'Default Value' : 'Value'}
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeDropdownOption(index)}
                                                            className="ml-2 text-red-500 w-full text-right text-sm underline"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="py-2">

                                            </div>
                                        </div>
                                    </div>
                                </div> : <></>
                        }


                        {/* Submit Button */}
                        <div className="flex justify-end gap-2">
                            <CustomButton title={"Cancel"} onClick={() => { onClose(); reset() }} />
                            <CustomButton loading={loadingObj[open]} type="submit" variant={"primary"} title={"Create Custom Field"} />
                        </div>
                    </form>
                </div>
            </CustomModal>
        </div>
    )
}

export default AddCustomFields