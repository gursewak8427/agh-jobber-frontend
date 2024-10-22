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
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import AddCustomFields from "@/app/_components/CustomFields";
import { createClient, fetchClientsCustomFields, fetchPropertyCustomFields, removeLoading, setLoading } from "@/store/slices/client";
import { useSelector } from "react-redux";
import CustomSingleField from "@/app/_components/CustomSingleField";
import { getPhoneCodeFromCountry, verifyPhones } from "@/utils";
import { toast } from "react-toastify";
import AddressInputMap from "@/app/_components/AddressInputMap";

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

  const [requiredError, setRequiredError] = useState([])
  const [open, setOpen] = useState(false)

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
  const { clientcustomfields, propertycustomfields, loadingObj } = useSelector(state => state.clients);


  const { fields: mobileFields, append: appendMobile, remove: removeMobile } = useFieldArray({
    control,
    name: "mobiles",
  });

  const { fields: emailFields, append: appendEmail, remove: removeEmail } = useFieldArray({
    control,
    name: "emails",
  });

  const billingAddressSameProperty = watch("billingAddressSameProperty");


  const isChanged = (field, newField) => {
    switch (field?.field_type) {
      case "text": return true;
      default: return false;
    }
  }

  // (_field) => _field?.id == field && _field?.field_value != newValue



  const onSubmit = async (data) => {
    setRequiredError([])
    try {

      if (!Boolean(data.firstName) && !Boolean(data.lastName) && !Boolean(data.companyName)) {
        setRequiredError(["fname", "lname", "companyname"])
        return;
      }



      const changedValues = clientcustomfields
        ?.map((item, index) => {

          const change = data?.clientCustomFields?.[`${item.id}key`] || null;
          if (!change) return null;

          const hasChanged = Object.keys(change).some(key => change[key] != item[key]);
          if (hasChanged) {
            return { custom_field_id: item.id, ...change };
          }
          return null;
        })
        .filter(Boolean);

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

      verifyPhones(data.mobiles)

      const jsonData = {
        additionaldetails: changedValues,
        additionalpropertydetails: changeAdditionalpropertydetails,
        mobiles: data.mobiles.map((mobile) => {
          if (mobile.number.trim() == "") return null;
          return {
            type: mobile.type,
            number: `${getPhoneCodeFromCountry(data.country)}${mobile.number}`,
            sms: mobile.sms || false,
            primary: data.mobiles?.length == 1 ? true : mobile.primary || false,
          }
        }).filter(Boolean),
        emails: data.emails.map((email) => {
          if (email.email.trim() == "") return null;

          return {
            type: email.type,
            email: email.email,
            primary: data.emails?.length == 1 ? true : email.primary || false,
          }
        }).filter(Boolean),
        automation: {
          quotefollowup: data.quoteFollowUp || false,
          assessmentandvisitreminders: data.assessmentAndVisitReminders || false,
          jobfollowup: data.jobFollowUp || false,
          invoicefollowup: data.invoiceFollowUp || false,
        },
        ...(!billingAddressSameProperty && {
          billingaddress: {
            address1: data.billingStreet1,
            address2: data.billingStreet2,
            city: data.billingCity,
            province: data.billingProvince,
            postalcode: data.billingPostalCode,
            country: data.billingCountry,
          },
        }),
        ...((data.street1 || data.street2 || data.city || data.province || data.postalCode || data.country) && {
          property: [
            {
              address1: data.street1,
              address2: data.street2,
              city: data.city,
              province: data.province,
              postalcode: data.postalCode,
              country: data.country,
            },
          ],
        }),
        title: data.nameTitle || "No title",
        fname: data.firstName,
        lname: data.lastName,
        companyname: data.companyName || null,
        companynameasprimary: data.companyNameAsPrimaryName || false,
        leadsource: data.leadSource || "Google",
        billingaddresssame: data.billingAddressSameProperty || false,
        status: "Lead",
      };

      console.log("Prepared Data:", jsonData);

      dispatch(setLoading("clientsave"))
      dispatch(createClient(jsonData)).then(({ payload }) => {
        console.log({ payload })
        dispatch(removeLoading("clientsave"))
        if (payload?.id) {
          router.push(`/clients/view/${payload?.id}`)
        }
      })
      // API call logic here, e.g., await axios.post("/api/clients", jsonData);
    } catch (error) {
      toast.error(error?.message || "Failed")
      console.error("Error submitting form", error);
    }
  };

  useEffect(() => {
    dispatch(fetchClientsCustomFields());
    dispatch(fetchPropertyCustomFields());
  }, [])

  return (
    <div className="max-w-[1200px] mx-auto space-y-4">
      <div className="text-sm text-tprimary dark:text-dark-text">
        Back to: <Link href={"/clients"} className="text-green-700 dark:text-dark-second-text">Clients</Link>
      </div>
      {/* Header */}
      <div className="flex justify-start items-center mb-6">
        <div className="text-4xl font-semibold text-tprimary dark:text-dark-text">New Client</div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-8 border flex gap-4 items-start justify-start border-gray-200 rounded-xl text-tprimary dark:text-dark-text">
          <div className="w-1/2 space-y-3">
            <div className="flex items-center gap-3 mb-8">
              <Avatar className="dark:text-dark-text dark:bg-dark-primary" />
              <div className="font-bold text-2xl">Client details</div>
            </div>
            <div className="flex flex-col text-sm space-y-4">
              <div>
                {
                  requiredError?.includes("fname") && <p className="text-red-500 flex items-center gap-2 mb-2"><CircleAlert /> Any one field is required from first name, last name or company name</p>
                }
                <div className="flex flex-row">
                  <select
                    {...register("nameTitle")}
                    className="w-full h-11 focus:outline-none border px-3 py-2 dark:bg-dark-secondary dark:text-dark-text border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none rounded-r-none text-sm"
                  >
                    <option value="">No title</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss.">Miss.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                  <input
                    {...register("firstName")}
                    placeholder="First Name"
                    className={`w-full h-11 dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2  focus:border-gray-400 ${requiredError?.includes("fname") ? 'border-red-500 border-b-0' : "border-gray-300 border-r-0 border-l-0"}`}
                  />
                  <input
                    {...register("lastName")}
                    placeholder="Last Name"
                    className={`w-full h-11 dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2 focus:border-gray-400 rounded-lg rounded-l-none rounded-b-none ${requiredError?.includes("lname") ? 'border-red-500 border-b-0' : "border-gray-300"}`}
                  />
                </div>
                <input
                  {...register("companyName")}
                  placeholder="Company Name"
                  className={`w-full h-11 dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2  focus:border-gray-400 rounded-lg rounded-t-none ${requiredError?.includes("companyname") ? 'border-red-500' : "border-gray-300 border-t-0"}`}
                />
              </div>

              <div className="flex gap-2 items-center select-none">
                <input
                  {...register("companyNameAsPrimaryName")}
                  type="checkbox"
                  className="w-5 h-5"
                  id="useCompanyName"
                />
                <label className="cursor-pointer" htmlFor="useCompanyName">
                  Use company name as the primary name
                </label>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-md">Contact Details</div>
                <div className="space-y-2">
                  {
                    mobileFields.map((field, index) => (
                      <div key={field.id} className="space-y-3">
                        <div>
                          <div className="flex flex-row items-center">
                            {
                              mobileFields?.length > 1 && <IconButton
                                onClick={() => {
                                  mobileFields.forEach((_, i) => {
                                    setValue(`mobiles.${i}.primary`, i === index);
                                  });
                                }}
                              >
                                {watch(`mobiles.${index}.primary`) ? (
                                  <Star className="text-yellow-500" />
                                ) : (
                                  <Star />
                                )}
                              </IconButton>
                            }
                            <select
                              {...register(`mobiles.${index}.type`)}
                              className="w-[100px] h-11 dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-r-none text-sm"
                            >
                              <option value="personal">Main</option>
                              <option value="work">Work</option>
                              <option value="mobile">Mobile</option>
                              <option value="home">Home</option>
                            </select>
                            <input
                              {...register(`mobiles.${index}.number`)}
                              placeholder="Phone number"
                              className="w-full h-11 dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2 border-gray-300 border-r-0 border-l-0 focus:border-gray-400"
                            />
                          </div>
                          {mobileFields.length > 1 && <div className="w-full flex justify-end">
                            <button onClick={() => removeMobile(index)} className="text-red-600 underline">delete</button>
                          </div>}
                        </div>
                        <div className={`flex gap-2 items-center select-none ${mobileFields?.length > 1 ? 'ml-10' : ''}`}>
                          <input
                            {...register(`mobiles.${index}.sms`)}
                            type="checkbox"
                            className="w-5 h-5"
                            id={`sms${index}`}
                          />
                          <label className="cursor-pointer" htmlFor={`sms${index}`}>
                            Receives text messages
                          </label>
                        </div>
                      </div>
                    ))
                  }
                  <div className="py-2">
                    <CustomButton
                      onClick={() => appendMobile({ type: "personal", number: "", sms: false })}
                      title="Add Phone Number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {emailFields.map((field, index) => (
                    <div>
                      <div key={field.id} className="flex flex-row">
                        {
                          emailFields?.length > 1 && <IconButton
                            onClick={() => {
                              emailFields.forEach((_, i) => {
                                setValue(`emails.${i}.primary`, i === index);
                              });
                            }}
                          >
                            {watch(`emails.${index}.primary`) ? (
                              <Star className="text-yellow-500" />
                            ) : (
                              <Star />
                            )}
                          </IconButton>
                        }
                        <select
                          {...register(`emails.${index}.type`)}
                          className="w-[100px] dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-r-none text-sm"
                        >
                          <option value="main">Main</option>
                          <option value="work">Work</option>
                          <option value="home">Home</option>
                        </select>
                        <input
                          {...register(`emails.${index}.email`)}
                          placeholder="Email address"
                          className="w-full dark:bg-dark-secondary dark:text-dark-text h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400"
                        />
                      </div>
                      {emailFields.length > 1 && <div className="w-full flex justify-end">
                        <button onClick={() => removeEmail(index)} className="text-red-600 underline">delete</button>
                      </div>}
                    </div>
                  ))}
                  <div className="py-2">
                    <CustomButton
                      onClick={() => appendEmail({ type: "main", email: "", primary: false })}
                      title="Add Email Address"
                    />
                  </div>

                  <div className="py-3 space-y-2">
                    <label className='font-semibold' htmlFor="">Lead source</label>
                    <select {...register("leadSource")}
                      placeholder='Name'
                      id="leadSource"
                      className="w-full dark:bg-dark-secondary dark:text-dark-text h-11 focus:ring-2 ring-offset-2 ring-green-600  focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg text-sm"
                    >
                      <option className='text-tprimary dark:text-dark-text' value="">Select a source</option>
                      <option className='text-tprimary dark:text-dark-text' value="Referral">Referral</option>
                      <option className='text-tprimary dark:text-dark-text' value="Google">Google</option>
                      <option className='text-tprimary dark:text-dark-text' value="Facebook">Facebook</option>
                    </select>
                  </div>

                  <Accordion className='shadow-none'>
                    <AccordionSummary
                      expandIcon={<ChevronDown />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      className='font-bold text-[15px] text-tprimary hover:bg-primary-dark dark:hover:bg-dark-hover dark:text-dark-text'
                    >
                      Automated notifications
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="space-y-4">
                        <div className='flex justify-between items-center text-tprimary dark:text-dark-text'>
                          <div className="flex flex-col">
                            <div className='font-semibold'>Quote follow-up</div>
                            <div>Follow up on an outstanding quote. <Link href={"#"} className='text-green-700 dark:text-dark-second-text'>Settings</Link></div>
                          </div>
                          <input
                            {...register("quoteFollowUp")}
                            type="checkbox"
                            className="w-5 h-5"
                            id="quoteFollowUp"
                          />
                        </div>

                        <div className='flex justify-between items-center text-tprimary dark:text-dark-text'>
                          <div className="flex flex-col">
                            <div className='font-semibold'>Assessment and visit reminders</div>
                            <div>Remind your client of an upcoming assessment or visit. <Link href={"#"} className='text-green-700 dark:text-dark-second-text'>Settings</Link></div>
                          </div>
                          <input
                            {...register("assessmentAndVisitReminders")}
                            type="checkbox"
                            className="w-5 h-5"
                            id="assessmentAndVisitReminders"
                          />
                        </div>

                        <div className='flex justify-between items-center text-tprimary dark:text-dark-text'>
                          <div className="flex flex-col">
                            <div className='font-semibold'>Job follow-up</div>
                            <div>Follow up when you close a job. <Link href={"#"} className='text-green-700 dark:text-dark-second-text'>Settings</Link></div>
                          </div>
                          <input
                            {...register("jobFollowUp")}
                            type="checkbox"
                            className="w-5 h-5"
                            id="jobFollowUp"
                          />
                        </div>

                        <div className='flex justify-between items-center text-tprimary dark:text-dark-text'>
                          <div className="flex flex-col">
                            <div className='font-semibold'>Invoice follow-up</div>
                            <div>Follow up on an overdue invoice. <Link href={"#"} className='text-green-700 dark:text-dark-second-text'>Settings</Link></div>
                          </div>
                          <input
                            {...register("invoiceFollowUp")}
                            type="checkbox"
                            className="w-5 h-5"
                            id="invoiceFollowUp"
                          />
                        </div>
                      </div>

                    </AccordionDetails>
                  </Accordion>
                  <Accordion className='shadow-none'>
                    <AccordionSummary
                      expandIcon={<ChevronDown />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                      className='font-bold text-[15px] text-tprimary hover:bg-primary-dark dark:hover:bg-dark-hover dark:text-dark-text'
                    >
                      Additional client details
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* {JSON.stringify(clientcustomfields)} */}
                      <div className="space-y-2">
                        {
                          clientcustomfields?.map((field, index) => {
                            return <CustomSingleField register={register} prefix="clientCustomFields" field={field} index={index} customfields={clientcustomfields} />
                          })
                        }
                      </div>
                      {/* <AddCustomFields /> */}
                      <div className="my-4">
                        <CustomButton title="Add Custom Field" onClick={() => setOpen("client")} />
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div div className="w-1/2" >
            <div className="flex items-center gap-3 mb-8">
              <Avatar className="dark:bg-dark-primary dark:text-dark-text" />
              <div className="font-bold text-2xl">Property details</div>
            </div>
            <div className="flex flex-col text-sm space-y-4">
              <div>
                <AddressInputMap onComplete={({ address, mapLink }) => {
                  console.log({
                    address, mapLink
                  })
                  setValue(`map`, mapLink)
                  setValue(`street1`, address?.street1)
                  setValue(`street2`, address?.street2)
                  setValue(`city`, address?.city)
                  setValue(`province`, address?.province)
                  setValue(`country`, address?.country)
                  setValue(`postalCode`, address?.postalcode)
                }} />
                {/* <div>
                  <input {...register("street1")}
                    type="text"
                    placeholder='Street 1'
                    className="w-full h-11 dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                  />
                </div> */}
                <div className="">
                  <input {...register("street2")}
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
                  <input {...register("postalCode")}
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


              <p>Taxes <span className='text-green-700 underline ml-2 font-semibold dark:text-dark-second-text'>GST (5.0%) (Default)</span></p>
              <div className="flex gap-2 items-center select-none">
                <input type="checkbox" {...register("billingAddressSameProperty")} className='w-5 h-5' name="billingAddressSameProperty" id="billingAddressSamePropertyCheckbox" />
                <label className='cursor-pointer' htmlFor="billingAddressSamePropertyCheckbox">Billing address is the same as property address</label>
              </div>

              {/* Billing address */}
              {!billingAddressSameProperty && (
                <div>
                  <div>
                    <input {...register("billingStreet1")}
                      placeholder='Street 1'
                      className="w-full h-11 dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-b-none"
                    />
                  </div>
                  <div>
                    <input {...register("billingStreet2")}
                      placeholder='Street 2'
                      className="w-full h-11 dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none rounded-b-none"
                    />
                  </div>
                  <div className="flex flex-row">
                    <input {...register("billingCity")}
                      placeholder='City'
                      className="w-full h-11 dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400"
                    />
                    <input {...register("billingProvince")}
                      placeholder='Province'
                      className="w-full h-11 dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400"
                    />
                  </div>

                  <div className="flex flex-row">
                    <input {...register("billingPostalCode")}
                      placeholder='Postal Code'
                      className="w-full h-11 dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none rounded-r-none"
                    />
                    <select {...register("billingCountry")}
                      className="w-full h-11 dark:bg-dark-secondary dark:text-dark-text focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg rounded-t-none rounded-l-none"
                    >
                      <option className='text-tprimary dark:text-dark-text' value="India">India</option>
                      <option className='text-tprimary dark:text-dark-text' value="Canada">Canada</option>
                    </select>
                  </div>
                </div>)}

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
                  <div className="my-4">
                    <CustomButton title="Add Custom Field" onClick={() => setOpen("property")} />
                  </div>
                </AccordionDetails>
              </Accordion>

            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2 flex justify-between">
          <CustomButton title="Cancel"></CustomButton>
          <div className="flex gap-2">
            <CustomButton title="Save and Create Another"></CustomButton>
            <CustomButton loading={loadingObj?.clientsave} type="submit" variant="primary" title="Save Client"></CustomButton>
          </div>
        </div>
      </form>


      {/* Modals will be show here */}
      <AddCustomFields open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
