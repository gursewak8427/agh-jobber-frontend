"use client";
import React, { useEffect } from "react";
import {
    Button,
    TextField,
    IconButton,
    Avatar,
    Rating,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Breadcrumbs,
} from "@mui/material";
import { useState } from "react";
import {
    BoxSelect,
    BoxSelectIcon,
    CameraIcon,
    ChevronDown,
    CircleAlert,
    Delete,
    Divide,
    Home,
    Plus,
    PlusIcon,
    Star,
    Trash2,
} from "lucide-react";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import AddCustomFields from "@/app/_components/modals/CustomFields";
import { createClient, fetchClientsCustomFields, fetchPropertyCustomFields } from "@/store/slices/client";
import { useSelector } from "react-redux";
import CustomSingleField from "@/app/_components/CustomSingleField";
import SelectClient from "@/app/_components/modals/SelectClient";

const defaultValues = {
    mobiles: [{ type: "personal", number: "", sms: false }],
    emails: [{ type: "main", email: "" }],
    billingAddressSameProperty: true,
    quoteFollowUp: true,
    assessmentAndVisitReminders: true,
    jobFollowUp: true,
    invoiceFollowUp: true,
};

export default function Page() {
    const searchParams = useSearchParams();
    const client_id = searchParams.get("client_id");
    const [open, setOpen] = useState(false)
    const [selectClientModal, setSelectClientModal] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        setValue
    } = useForm({
        defaultValues,
    });

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { propertycustomfields } = useSelector(state => state.clients);

    const onSubmit = async (data) => {
        try {
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };


    const SectionBox = ({ children, padding, onClose }) => {
        return <div className={`border flex flex-col gap-4 items-start justify-start border-gray-200 rounded-lg text-tprimary text-sm ${padding || 'p-4'}`}>
            {children}
        </div>
    }

    return (
        <div className="max-w-[1200px] mx-auto space-y-4">
            <div className="text-sm text-tprimary flex items-center gap-2">
                Back to:
                <Breadcrumbs>
                    <Link href={"/clients"} className="text-green-700 underline">Clients</Link>
                    <Link href={`/client/${client_id}`} className="text-green-700 underline">test test</Link>
                </Breadcrumbs>
            </div>


            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-1/2 mx-auto" >
                    <SectionBox>
                        <div className="w-full">
                            <div className="flex justify-start items-center mb-6 gap-2">
                                <Avatar className="w-16 h-16"><Home className="text-tprimary" /></Avatar>
                                <div className="text-2xl font-semibold text-tprimary">New Property for</div>
                                <Button onClick={() => setSelectClientModal(true)} className='capitalize flex items-center border-b border-dashed'>
                                    <div className="text-2xl font-semibold text-tprimary">Client Name</div>
                                </Button>
                            </div>
                            <div className="flex flex-col text-sm space-y-4">
                                <div>
                                    <div>
                                        <input {...register("street1")}
                                            type="text"
                                            placeholder='Street 1'
                                            className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                                        />
                                    </div>
                                    <div>
                                        <input {...register("street2")}
                                            type="text"
                                            placeholder='Street 2'
                                            className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none rounded-b-none"
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <input {...register("city")}
                                            type="text"
                                            placeholder='City'
                                            className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400"
                                        />
                                        <input {...register("province")}
                                            type="text"
                                            placeholder='Province'
                                            className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400"
                                        />
                                    </div>

                                    <div className="flex flex-row">
                                        <input {...register("postalCode")}
                                            placeholder='Postal Code'
                                            className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none rounded-r-none"
                                        />
                                        <select {...register("country")}
                                            className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none rounded-l-none"
                                        >
                                            <option className='text-tprimary' value="">Select Country</option>
                                            <option className='text-tprimary' value="India">India</option>
                                            <option className='text-tprimary' value="Canada">Canada</option>
                                        </select>
                                    </div>
                                </div>


                                <p>Taxes <span className='text-green-700 underline ml-2 font-semibold'>GST (5.0%) (Default)</span></p>

                                <Accordion className='shadow-none'>
                                    <AccordionSummary
                                        expandIcon={<ChevronDown />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                        className='font-bold text-[15px] text-tprimary hover:bg-primary-dark'
                                    >
                                        Additional property details
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {/* {JSON.stringify(clientcustomfields)} */}
                                        <div className="space-y-2">
                                            {
                                                propertycustomfields?.map((field, index) => <CustomSingleField register={register} prefix="propertyCustomFields" field={field} index={index} customfields={propertycustomfields} />)
                                            }
                                        </div>
                                        {/* <AddCustomFields /> */}
                                        <div className="my-4">
                                            <CustomButton title="Add Custom Field" onClick={() => setOpen("property")} />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>

                            </div>
                            <div className="mt-4 space-y-2 flex justify-between items-center w-full">
                                <CustomButton title="Cancel" onClick={() => {
                                    onClose()
                                }}></CustomButton>
                                <CustomButton variant="primary" title="Create Property"></CustomButton>
                            </div>
                        </div>
                    </SectionBox>
                </div>
            </form>


            {/* Modals will be show here */}
            <AddCustomFields open={open} onClose={() => setOpen(false)} />
            <SelectClient open={selectClientModal} onClose={() => setSelectClientModal(false)} onSelect={data => { setSelectClientModal(false) }} />
        </div >
    );
}
