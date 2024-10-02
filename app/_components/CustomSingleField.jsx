"use client"

export default function CustomSingleField({ field, index, customfields, register, prefix }) {
    {
        switch (field?.field_type) {
            case "text":
                return <div className={`w-full flex items-center justify-between ${customfields?.length == index + 1 ? '' : 'border-b pb-2'}`}>
                    <div className="font-normal">{field?.field_name}</div>
                    <div>
                        <input {...register(`${prefix}.${field.id}key.value`)} type="text" name={`${prefix}.${field.id}key.value`} id={`${prefix}.${field.id}key.value`} defaultValue={field?.value || ""} className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-xl dark:text-dark-text dark:bg-dark-secondary" />
                    </div>
                </div>

            case "numeric":
                return <div className={`w-full flex items-center justify-between ${customfields?.length == index + 1 ? '' : 'border-b pb-2'}`}>
                    <div className="font-normal">{field?.field_name}</div>
                    <div className="flex">
                        <input {...register(`${prefix}.${field.id}key.value`)} type="text" name={`${prefix}.${field.id}key.value`} id={`${prefix}.${field.id}key.value`} defaultValue={parseFloat(field?.value) || 0} className="w-20 h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-xl rounded-r-none dark:text-dark-text dark:bg-dark-secondary" />
                        <input {...register(`${prefix}.${field.id}key.unit`)} type="text" name={`${prefix}.${field.id}key.unit`} id={`${prefix}.${field.id}key.unit`} defaultValue={field?.unit || ""} className="w-20 h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-xl rounded-l-none dark:text-dark-text dark:bg-dark-secondary" />
                    </div>
                </div>

            case "boolean":
                return <div className={`w-full flex items-center justify-between ${customfields?.length == index + 1 ? '' : 'border-b pb-2'}`}>
                    <div className="font-normal">{field?.field_name}</div>
                    <div>
                        <select {...register(`${prefix}.${field.id}key.value`)} name={`${prefix}.${field.id}key.value`} id={`${prefix}.${field.id}key.value`} defaultValue={field?.value} className="w-full h-11 dark:text-dark-text dark:bg-dark-secondary focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-xl lowercase" >
                            <option value={"true"}>True</option>
                            <option value={"false"}>False</option>
                        </select>
                    </div>
                </div>

            case "area":
                return <div className={`w-full flex items-center justify-between ${customfields?.length == index + 1 ? '' : 'border-b pb-2'}`}>
                    <div className="font-normal">{field?.field_name}</div>
                    <div className="flex">
                        <input {...register(`${prefix}.${field.id}key.length`)} type="text" name={`${prefix}.${field.id}key.length`} id={`${prefix}.${field.id}key.length`} defaultValue={parseFloat(field?.length)} className="w-20 h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-xl rounded-r-none dark:text-dark-text dark:bg-dark-secondary" />
                        <input {...register(`${prefix}.${field.id}key.width`)} type="text" name={`${prefix}.${field.id}key.width`} id={`${prefix}.${field.id}key.width`} defaultValue={parseFloat(field?.width)} className="w-20 dark:text-dark-text dark:bg-dark-secondary h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400" />
                        <input {...register(`${prefix}.${field.id}key.unit`)} type="text" name={`${prefix}.${field.id}key.unit`} id={`${prefix}.${field.id}key.unit`} defaultValue={field?.unit || ""} className="w-20 h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-xl rounded-l-none dark:text-dark-text dark:bg-dark-secondary" />
                    </div>
                </div>

            case "dropdown":
                return <div className={`w-full flex items-center justify-between ${customfields?.length == index + 1 ? '' : 'border-b pb-2'}`}>
                    <div className="font-normal">{field?.field_name}</div>
                    <div>
                        <select {...register(`${prefix}.${field.id}key.value`)} name={`${prefix}.${field.id}key.value`} id={`${prefix}.${field.id}key.value`} defaultValue={parseFloat(field?.value)} className="w-full dark:text-dark-text dark:bg-dark-secondary h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-xl" >
                            {
                                field?.dropdown_options?.map((op, index) => {
                                    return <option value={index}>{op?.option}</option>
                                })
                            }
                        </select>
                    </div>
                </div>

            default:
                break;
        }
    }
}