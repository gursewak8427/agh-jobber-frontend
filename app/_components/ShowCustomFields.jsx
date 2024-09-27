"use client"

export default function ShowCustomFields({ field, index, customfields, }) {
    {
        switch (field?.custom_field?.field_type) {
            case "text":
                return <div className={`w-full flex items-center justify-between ${customfields?.length == index + 1 ? '' : 'border-b pb-2'}`}>
                    <div className="font-normal">{field?.custom_field?.field_name}</div>
                    <div>
                        <input type="text" readOnly value={field?.value} className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-xl" />
                    </div>
                </div>

            case "numeric":
                return <div className={`w-full flex items-center justify-between ${customfields?.length == index + 1 ? '' : 'border-b pb-2'}`}>
                    <div className="font-normal">{field?.custom_field?.field_name}</div>
                    <div className="flex">
                        <input type="text" readOnly value={field?.value} className="w-20 h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-xl rounded-r-none" />
                        <input type="text" readOnly value={field?.unit} className="w-20 h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-xl rounded-l-none" />
                    </div>
                </div>

            case "boolean":
                return <div className={`w-full flex items-center justify-between ${customfields?.length == index + 1 ? '' : 'border-b pb-2'}`}>
                    <div className="font-normal">{field?.custom_field?.field_name}</div>
                    <div>
                        <select readOnly value={field?.value} className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-xl lowercase" >
                            <option value={"true"}>True</option>
                            <option value={"false"}>False</option>
                        </select>
                    </div>
                </div >

            case "area":
                return <div className={`w-full flex items-center justify-between ${customfields?.length == index + 1 ? '' : 'border-b pb-2'}`}>
                    <div className="font-normal">{field?.custom_field?.field_name}</div>
                    <div className="flex">
                        <input type="text" readOnly value={field?.length} className="w-20 h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-xl rounded-r-none" />
                        <input type="text" readOnly value={field?.width} className="w-20 h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400" />
                        <input type="text" readOnly value={field?.unit} className="w-20 h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-xl rounded-l-none" />
                    </div>
                </div>

            case "dropdown":
                return <div className={`w-full flex items-center justify-between ${customfields?.length == index + 1 ? '' : 'border-b pb-2'}`}>
                    <div className="font-normal">{field?.custom_field?.field_name}</div>
                    <div>
                        <select readOnly value={field?.value} className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-xl" >
                            {
                                field?.custom_field?.dropdown_options?.map((op, index) => {
                                    return <option value={index}>{op?.option}</option>
                                })
                            }
                        </select>
                    </div>
                </div >

            default:
                break;
        }
    }
}