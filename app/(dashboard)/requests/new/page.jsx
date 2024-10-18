"use client"
import React, { useEffect } from 'react';
import { Button, TextField, IconButton, Avatar, Rating, Divider, Typography, MenuItem, ListItemIcon } from '@mui/material';
import { useState } from 'react';
import { BoxSelect, BoxSelectIcon, CameraIcon, ChevronDown, Delete, Divide, Eye, Hammer, Mail, MessageCircle, MessageSquare, MessageSquareText, Minus, Plus, PlusIcon, Trash2, X } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';
import SelectClient from '@/app/_components/client/SelectClient';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import AddCustomFields from '@/app/_components/CustomFields';
import { createQuote, fetchallClients, fetchClient, fetchQuotecount, fetchQuoteCustomFields, fetchTeam, fetchTemplateProductForQuote, removeLoading, setLoading } from '@/store/slices/client';
import { useAppDispatch } from '@/store/hooks';
import CustomSingleField from '@/app/_components/CustomSingleField';
import { getAddress, getClientName, getPrimary, templateProductsToQuote } from '@/utils';
import SelectProperty from '@/app/_components/property/SelectProperty';
import NewProperty from '@/app/_components/property/NewProperty';
import CustomMenu from '@/components/CustomMenu';
import ProductsList, { defaultProductLineItem, updateProductsFn } from '@/app/_components/products/ProductsList';

const defaultFormValues = {
    products: [defaultProductLineItem],
    discount: 0,
    requireddeposite: 0,
    clientview_quantities: true,
    clientview_total: true
}

export default function Page() {
    const searchParams = useSearchParams();
    const client_id = searchParams.get("client_id");
    const template_ids = searchParams.get("template");

    const [open, setOpen] = useState(false);

    const [rating, setRating] = useState(0);
    const [isQuoteNo, setQuoteNo] = useState(false);
    const [isDiscount, setDiscount] = useState(false);
    const [isRequiredDeposit, setRequiredDeposit] = useState(false);
    const [selectClientModal, setSelectClientModal] = useState(false);
    const [selectPropertyModal, setPropertyModal] = useState(false);

    const [menu, setMenu] = useState("")
    const [selectedSalesPerson, setSalesPerson] = useState(null)

    const [clientView, setClientView] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    // Custom fields, change with quote custom fields
    const { clientslist, client, team, quotecount, quotecustomfields, loadingObj, quoteproducts } = useSelector(state => state.clients);

    const dispatch = useAppDispatch();
    const router = useRouter();
    const methods = useForm();
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        setValue,
        getValues,
        reset
    } = methods;

    const { fields: productsList, append: appendProduct, remove: removeProduct } = useFieldArray({
        control,
        name: "products",
    });

    const watchProducts = watch("products");
    const subtotal = watch("subtotal");
    const discounttype = watch("discounttype");
    const discount = watch("discount");
    const discountAmount = watch("discountAmount");
    const gst = watch("gst");
    const totalcost = watch("totalcost");

    const requiredtype = watch("requiredtype");
    const requireddeposite = watch("requireddeposite");
    const requiredAmount = watch("requiredAmount");


    useEffect(() => {
        let _requireddeposit = 0
        if (isRequiredDeposit) {
            if (requiredtype == "percentage") {
                _requireddeposit = totalcost * (requireddeposite / 100)
            }

            if (requiredtype == "amount") {
                _requireddeposit = requireddeposite
            }
        }
        console.log({ _requireddeposit })
        setValue(`requiredAmount`, parseFloat(_requireddeposit)?.toFixed(2))
    }, [requireddeposite, requiredtype])

    // Calculation logic for each product line
    useEffect(() => {
        onBlur()
    }, [JSON.stringify(watchProducts)]);

    const onBlur = () => {
        let newSubtotal = updateProductsFn({ watchProducts, setValue });

        let _totatcost = parseFloat(newSubtotal);

        let _discount = 0
        if (isDiscount) {
            if (discounttype == "percentage") {
                _discount = _totatcost * (discount / 100)
            }

            if (discounttype == "amount") {
                _discount = discount
            }
        }

        _totatcost -= parseFloat(_discount)?.toFixed(2);

        let gst = 5;
        let gstAmount = parseFloat(_totatcost * (gst / 100)).toFixed(2)
        _totatcost += parseFloat(gstAmount)

        setValue(`subtotal`, parseFloat(newSubtotal)?.toFixed(2));
        setValue(`gst`, gstAmount);
        setValue(`totalcost`, parseFloat(_totatcost)?.toFixed(2));

        console.log({ _discount, discounttype })
        setValue(`discountAmount`, _discount)
    }


    useEffect(() => {
        dispatch(fetchallClients());
        dispatch(fetchQuotecount());
        dispatch(fetchQuoteCustomFields());
        dispatch(fetchTeam());
    }, [])

    useEffect(() => {
        if (template_ids)
            dispatch(fetchTemplateProductForQuote(template_ids));
    }, [template_ids])

    // Set Template Products as default values.
    useEffect(() => {
        // console.log(templateProductsToQuote(quoteproducts), "templateProductsToQuote");

        if (quoteproducts && quoteproducts.length > 0) {
            reset({
                ...defaultFormValues,
                products: templateProductsToQuote(quoteproducts) || [defaultProductLineItem],
            });
        } else {
            reset({ ...defaultFormValues })
        }
    }, [quoteproducts, setValue]);

    useEffect(() => {
        if (!client_id) return;

        dispatch(fetchClient(client_id));
    }, [client_id])

    useEffect(() => {
        if (!client_id) return;


        console.log({ client }, '===client')

        if (client?.property?.length > 1) {
            setSelectedProperty(null)
            setPropertyModal("SELECT")
        } else {
            if (client?.property?.length == 0) {
                setSelectedProperty(null)
                setPropertyModal("NEW")
            } else {
                setSelectedProperty(client?.property?.[0])
            }
        }
    }, [client])

    const closeMenu = () => setMenu("")


    const onSubmit = async (data) => {

        const changeAdditionalquotedetails = quotecustomfields
            ?.map((item, index) => {

                const change = data?.QuoteCustomFields?.[`${item.id}key`] || null;
                if (!change) return null;

                const hasChanged = Object.keys(change).some(key => change[key] != item[key]);
                if (hasChanged) {
                    return { custom_field_id: item.id, ...change };
                }
                return null;
            })
            .filter(Boolean);

        let _data = { ...data };
        delete _data?.quoteno

        let jsonData = {
            "clientquotestyle": {
                quantities: data?.clientview_quantities ?? false,
                materials: data?.clientview_materials ?? false,
                markuppercentage: data?.clientview_markuppercentage ?? false,
                markupamount: data?.clientview_markupamount ?? false,
                labour: data?.clientview_labour ?? false,
                total: data?.clientview_total ?? false,
            },
            "product": data?.products?.map(product => ({
                ...product,
            })),
            "title": data?.title,
            "quoteno": isQuoteNo ? data?.quoteno : quotecount,
            "rateopportunity": rating,
            "subtotal": subtotal,
            "discount": data?.discount,
            "discounttype": data?.discounttype,
            "tax": gst,
            "costs": totalcost,
            // "estimatemargin": 0.0,
            "requireddeposite": data?.requireddeposite,
            "depositetype": "amount",
            "clientmessage": data?.clientmessage,

            "disclaimer": data?.disclaimer,
            "internalnote": data?.internalnote,
            "isrelatedjobs": data?.isrelatedjobs,
            "isrelatedinvoices": data?.isrelatedinvoices,
            "salesperson_id": selectedSalesPerson?.id,
            // ==============

            // "status": "Draft",
            // "contractor": 2,//aa tusi nhi bhejna ok remove krdo
            "property_id": selectedProperty?.id,
            "client_id": client_id,

            // "clientpdfstyle": null,  
            "custom_field": changeAdditionalquotedetails,
        }

        console.log(jsonData);

        dispatch(createQuote(jsonData)).then(({ payload }) => {
            if (payload?.id) {
                router.push(`/quotes/view/${payload?.id}`)
            }
        });
    };



    return (
        <div className='dark:text-white max-w-[1200px] mx-auto space-y-4'>
            <div className='text-sm text-tprimary dark:text-dark-text'>
                Back to : <Link href={"/requests"} className='text-green-700 dark:text-dark-second-text'>Requests</Link>
            </div>
            <div className="p-8 border bg-white border-gray-200 rounded-xl border-t-8 border-t-pink-950">
                {/* Header */}
                <div className="flex justify-start items-center mb-6">
                    <div className="text-4xl font-semibold text-tprimary dark:text-dark-text">Request for</div>
                    <Button onClick={() => setSelectClientModal(true)} className='ml-2 capitalize flex items-center gap-2 border-b border-dashed'>
                        {
                            !client_id ? <>
                                <div className="text-4xl font-semibold text-tprimary dark:text-dark-second-text">Client Name</div>
                                <div className="bg-green-700 px-4 py-1 rounded">
                                    <PlusIcon className='text-white' />
                                </div>
                            </> : <div className="text-4xl font-semibold text-tprimary dark:text-dark-second-text">{getClientName(client)}</div>
                        }

                    </Button>
                </div>

                {/* Job Title */}
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="space-y-5">
                            <div className="flex items-start justify-start gap-4 border-b-4 border-b-gray-300 pb-4">
                                <div className="w-1/2 flex flex-col space-y-4">
                                    <div className="flex flex-col space-y-2">
                                        <label htmlFor="" className='text-tprimary dark:text-dark-text font-bold'>Request Title</label>
                                        <input
                                            {...register("title")}
                                            label="Title"
                                            placeholder='Title'
                                            className="focus:outline-none border dark:bg-dark-secondary px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"
                                        />
                                    </div>
                                </div>
                                {/* Request details */}
                                <div className="p-4 rounded-lg w-1/2">
                                    <h1 className='font-bold mb-2'>Request details</h1>
                                    <div className="mb-4 flex items-center space-x-3 border-b pb-2">
                                        <div className="font-medium min-w-[200px]">Requested on Oct 18, 2024</div>
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <h1 className='font-bold text-xl'>Service Details</h1>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-bold text-gray-500' htmlFor="">Please provide as much information as you can</label>

                                    <textarea name="" rows={4} id="" className="px-4 py-2 border outline-none hover:ring-2 ring-offset-2 rounded ring-green-700"></textarea>
                                </div>
                            </div>

                            <h1 className='font-bold text-xl mb-2'>Your Availability</h1>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold' htmlFor="">Which day would be best for an assessment of the work?</label>
                                <input type='date' name="" id="" className="px-4 py-2 w-[200px] h-11 border outline-none hover:ring-2 ring-offset-2 rounded ring-green-700" />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold' htmlFor="">What is another day that works for you? <span className='text-gray-500'>(optional)</span></label>
                                <input type='date' name="" id="" className="px-4 py-2 w-[200px] h-11 border outline-none hover:ring-2 ring-offset-2 rounded ring-green-700" />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold' htmlFor="">What are your preferred arrival times? <span className='text-gray-500'>(optional)</span></label>
                                <label htmlFor="1" className="flex items-center gap-2">
                                    <input type='checkbox' name="arrivaltime" id="1" className="" />
                                    <span>Any Time</span>
                                </label>
                                <label htmlFor="2" className="flex items-center gap-2">
                                    <input type='checkbox' name="arrivaltime" id="2" className="" />
                                    <span>Morning</span>
                                </label>
                                <label htmlFor="3" className="flex items-center gap-2">
                                    <input type='checkbox' name="arrivaltime" id="3" className="" />
                                    <span>Afternoon</span>
                                </label>
                                <label htmlFor="4" className="flex items-center gap-2">
                                    <input type='checkbox' name="arrivaltime" id="4" className="" />
                                    <span>Evening</span>
                                </label>
                            </div>


                            <div className="bg-primary bg-opacity-40 border border-gray-300 p-4 rounded-lg dark:bg-dark-secondary">
                                <h1 className='font-bold mb-2'>Internal notes & attachments</h1>
                                <div className="mt-4">
                                    <textarea placeholder='Note details' name="" id="" rows={3} className="w-full focus:outline-none dark:bg-dark-primary border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg">

                                    </textarea>
                                </div>

                                <div className="mt-4 border-2 border-gray-300 text-sm border-dashed p-2 py-4 rounded-xl flex justify-center items-center">
                                    <label htmlFor="" className='text-gray-500'>Drag your files here or <span className='ml-2 text-green-700 font-semibold border-2 rounded-xl p-2'>Select a file</span></label>
                                    <input hidden type="file" name="" id="" />
                                </div>

                                <Divider className='my-2' />

                                <div className="mt-4 space-y-2">
                                    <p className='font-normal text-sm text-tprimary dark:text-dark-text'>Link note to related</p>
                                    <div className="flex gap-2 text-sm items-center capitalize">
                                        <div className="flex gap-2 items-center">
                                            <input type="checkbox" className='w-5 h-5' name="" id="invoices" />
                                            <label htmlFor="invoices">invoices</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2 flex justify-between">
                            <CustomButton title="Cancel"></CustomButton>
                            {
                                !client_id ? <CustomButton onClick={() => { setSelectClientModal(true) }} variant="primary" title="Select Client"></CustomButton> : <>
                                    <div className="flex gap-2 items-center">
                                        <CustomButton type={"submit"} loading={loadingObj.draftquote} title="Save Quote"></CustomButton>
                                        <CustomMenu open={true} icon={<CustomButton backIcon={<ChevronDown className='w-5 h-5 text-white' />} type={"button"} variant="primary" title="Save and"></CustomButton>}>
                                            {/* Menu Items */}
                                            <Typography variant="subtitle1" style={{ padding: '8px 16px', fontWeight: 'bold' }}>
                                                Save and...
                                            </Typography>

                                            <MenuItem className="text-tprimary text-sm">
                                                <ListItemIcon>
                                                    <MessageSquareText className="text-orange-700" size={16} />
                                                </ListItemIcon>
                                                Send as text mesage
                                            </MenuItem>

                                            <MenuItem className="text-tprimary text-sm">
                                                <ListItemIcon>
                                                    <Mail className="text-gray-700" size={16} />
                                                </ListItemIcon>
                                                Send as email
                                            </MenuItem>

                                            <MenuItem className="text-tprimary text-sm">
                                                <ListItemIcon>
                                                    <Hammer className="text-green-700" size={16} />
                                                </ListItemIcon>
                                                Convert to Job
                                            </MenuItem>

                                            <MenuItem className="text-tprimary text-sm">
                                                <ListItemIcon>
                                                    <MessageCircle className="text-orange-700" size={16} />
                                                </ListItemIcon>
                                                Mark as awaiting Response
                                            </MenuItem>
                                        </CustomMenu>
                                    </div>
                                </>
                            }

                        </div>
                    </form>
                </FormProvider>
            </div>


            <AddCustomFields open={open} onClose={() => setOpen(false)} />
            <SelectClient
                open={selectClientModal}
                onClose={() => setSelectClientModal(false)}
                onSelect={id => {
                    if (template_ids) {
                        router.push(`/quotes/new?client_id=${id}&template=${template_ids}`);
                    } else {
                        router.push(`/quotes/new?client_id=${id}`);
                    }
                    setSelectClientModal(false)
                }}
                clients={clientslist}
            />

            <SelectProperty onCreateNew={() => {
                setPropertyModal("NEW")
            }} open={selectPropertyModal == "SELECT"} onClose={() => setPropertyModal(false)} onSelect={property => {
                setSelectedProperty(property)
                setPropertyModal(false)
            }} properties={client?.property} />

            <NewProperty open={selectPropertyModal == "NEW"} onClose={() => setPropertyModal(false)} onCreate={property => {
                setSelectedProperty(property)
                setPropertyModal(false)
            }} client={client} />
        </div>
    );
}
