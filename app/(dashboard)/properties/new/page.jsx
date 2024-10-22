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
import AddCustomFields from "@/app/_components/CustomFields";
import { createClient, createProperty, fetchallClients, fetchClientsCustomFields, fetchPropertyCustomFields } from "@/store/slices/client";
import { useSelector } from "react-redux";
import CustomSingleField from "@/app/_components/CustomSingleField";
import SelectClient from "@/app/_components/client/SelectClient";
import { getClientName } from "@/utils";
import AddressInputMap from "@/app/_components/AddressInputMap";

export default function Page() {
    const searchParams = useSearchParams();
    const client_id = searchParams.get("client_id");
    const [open, setOpen] = useState(false)
    const [selectClientModal, setSelectClientModal] = useState(false)
    const [client, setClient] = useState({})

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        setValue
    } = useForm();

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { propertycustomfields, clientslist, loadingObj } = useSelector(state => state.clients);

    const onSubmit = async (data) => {

        const changeAdditionalpropertydetails = propertycustomfields
            .map((item, index) => {

                const change = data?.propertyCustomFields?.[`${item.id}key`] || null;
                if (!change) return null;

                const hasChanged = Object.keys(change).some(key => change[key] != item[key]);
                if (hasChanged) {
                    return { custom_field_id: item.id, ...change };
                }
                return null;
            })
            .filter(Boolean);

        try {
            const jsonData = {
                address1: data.address1,
                address2: data.address2,
                city: data.city,
                province: data.province,
                postalcode: data.postalcode,
                country: data.country,
                map: data.map,

                client: client_id,
                ...(changeAdditionalpropertydetails && changeAdditionalpropertydetails?.length > 0 && {
                    additionalpropertydetails: changeAdditionalpropertydetails,
                })
            }
            dispatch(createProperty(jsonData)).then(({ _ }) => {
                router.push(`/clients/view/${client_id}`)
            });
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };


    const SectionBox = ({ children, padding, onClose }) => {
        return <div className={`border flex flex-col gap-4 items-start justify-start border-gray-200 rounded-lg text-tprimary text-sm ${padding || 'p-4'}`}>
            {children}
        </div>
    }

    useEffect(() => {
        setClient(clientslist.find(client => client.id == client_id));
    }, [client_id, clientslist])

    useEffect(() => {
        dispatch(fetchPropertyCustomFields());
        dispatch(fetchallClients());
    }, [])
    return (
        <div className="max-w-[1200px] mx-auto space-y-4">
            <div className="text-sm text-tprimary flex items-center gap-2 dark:text-dark-text">
                Back to:
                <Breadcrumbs>
                    <Link href={"/clients"} className="text-green-700 underline dark:text-dark-second-text">Clients</Link>
                    <Link href={`/clients/view/${client_id}`} className="text-green-700 underline dark:text-dark-second-text">{client?.fname ? client?.fname + ' ' + client?.lname : client?.companyname}</Link>
                </Breadcrumbs>
            </div>


            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-1/2 mx-auto " >
                    <SectionBox>
                        <div className="w-full">
                            <div className="flex justify-start items-center mb-6 gap-2 ">
                                <Avatar className="w-16 h-16 dark:bg-dark-primary"><Home className="text-tprimary dark:text-dark-text" /></Avatar>
                                <div className="text-2xl font-semibold text-tprimary dark:bg-dark-secondary dark:text-dark-text">New Property for</div>
                                <Button onClick={() => setSelectClientModal(true)} className='capitalize flex items-center border-b border-dashed'>
                                    <div className="text-2xl font-semibold text-tprimary dark:text-dark-second-text">{client_id ? getClientName(client) : "Client Name"}</div>
                                </Button>
                            </div>
                            <div className="flex flex-col text-sm space-y-4">
                                <div>
                                    <AddressInputMap onComplete={({ address, mapLink }) => {
                                        setValue(`map`, mapLink)
                                        setValue(`address1`, address?.street1)
                                        setValue(`address2`, address?.street2)
                                        setValue(`city`, address?.city)
                                        setValue(`province`, address?.province)
                                        setValue(`country`, address?.country)
                                        setValue(`postalcode`, address?.postalcode)
                                    }} />
                                    {/* <div>
                                        <input {...register("address1")}
                                            type="text"
                                            placeholder='Street 1'
                                            className="w-full dark:bg-dark-secondary dark:text-dark-text h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                                        />
                                    </div> */}
                                    <div>
                                        <input {...register("address2")}
                                            type="text"
                                            placeholder='Street 2'
                                            className="w-full h-11 dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none rounded-b-none"
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <input {...register("city")}
                                            type="text"
                                            placeholder='City'
                                            className="w-full h-11 dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400"
                                        />
                                        <input {...register("province")}
                                            type="text"
                                            placeholder='Province'
                                            className="w-full h-11 dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400"
                                        />
                                    </div>

                                    <div className="flex flex-row">
                                        <input {...register("postalcode")}
                                            placeholder='Postal Code'
                                            className="w-full h-11 dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none rounded-r-none"
                                        />
                                        <select {...register("country")}
                                            className="w-full h-11 dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none rounded-l-none"
                                        >
                                            <option className='text-tprimary dark:text-dark-text' value="">Select Country</option>
                                            <option className='text-tprimary dark:text-dark-text' value="India">India</option>
                                            <option className='text-tprimary dark:text-dark-text' value="Canada">Canada</option>
                                        </select>
                                    </div>
                                </div>


                                <p className="dark:text-dark-text">Taxes <span className='text-green-700 dark:text-dark-second-text underline ml-2 font-semibold'>GST (5.0%) (Default)</span></p>

                                <Accordion className='shadow-none'>
                                    <AccordionSummary
                                        expandIcon={<ChevronDown />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                        className='font-bold text-[15px] text-tprimary hover:bg-primary-dark dark:text-dark-text dark:hover:bg-dark-hover'
                                    >
                                        Additional property details
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="space-y-2">
                                            {
                                                propertycustomfields?.map((field, index) => <CustomSingleField register={register} prefix="propertyCustomFields" field={field} index={index} customfields={propertycustomfields} />)
                                            }
                                        </div>
                                        <AddCustomFields />
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
                                <CustomButton type={'submit'} variant="primary" title="Create Property" loading={loadingObj.newproperty}></CustomButton>
                            </div>
                        </div>
                    </SectionBox>
                </div>
            </form>


            {/* Modals will be show here */}
            <AddCustomFields open={open} onClose={() => setOpen(false)} />
            <SelectClient open={selectClientModal} onClose={() => setSelectClientModal(false)} onSelect={id => {
                router.push(`/properties/new?client_id=${id}`)
                setSelectClientModal(false)
            }} clients={clientslist} />
        </div>
    );
}
