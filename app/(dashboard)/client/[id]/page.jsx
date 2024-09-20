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
  Tabs,
  Tab,
  Box,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import {
  BoxSelect,
  BoxSelectIcon,
  CameraIcon,
  ChevronDown,
  CircleAlert,
  CreditCard,
  Delete,
  Divide,
  DollarSign,
  Download,
  Hammer,
  Mail,
  MapIcon,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Plus,
  PlusIcon,
  Star,
  Trash2,
  X,
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
import { createClient, fetchClientsCustomFields, fetchPropertyCustomFields } from "@/store/slices/client";
import { useSelector } from "react-redux";
import CustomSingleField from "@/app/_components/CustomSingleField";
import PageHeading from "@/components/PageHeading";

const defaultValues = {
  mobiles: [{ type: "personal", number: "", sms: false }],
  emails: [{ type: "main", email: "" }],
  billingAddressSameProperty: true,
  quoteFollowUp: true,
  assessmentAndVisitReminders: true,
  jobFollowUp: true,
  invoiceFollowUp: true,
};


// Function to handle status rendering
const getStatusBox = status => {
  switch (status) {
    case "active": return <div className="h-full text-sm flex items-center justify-start capitalize bg-blue-400 bg-opacity-20 px-2 py-1 rounded-full">
      <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
      {status}
    </div>
    case "lead": return <div className="h-full text-sm flex items-center justify-start capitalize bg-green-400 bg-opacity-20 px-2 py-1 rounded-full">
      <div className="w-3 h-3 bg-green-800 rounded-full mr-2"></div>
      {status}
    </div>
    case "Awaiting Response": return <div className="h-full text-sm flex items-center justify-start capitalize bg-yellow-400 bg-opacity-20 px-2 py-1 rounded-full text-yellow-700">
      <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
      {status}
    </div>


    default:
      break;
  }
}

const TabBox = () => {
  const [value, setValue] = React.useState(0);


  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        className="w-full"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (<div className="w-full text-sm">
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
      <Tab label="Active Work" {...a11yProps(0)} />
      <Tab label="Requests" {...a11yProps(1)} />
      <Tab label="Quotes" {...a11yProps(2)} />
      <Tab label="Jobs" {...a11yProps(2)} />
      <Tab label="Invoices" {...a11yProps(2)} />
    </Tabs>
    <CustomTabPanel value={value} index={0}>
      <table className="w-full text-tprimary text-sm">
        <tbody>
          <tr>
            <td className="py-6">
              <div className="font-semibold flex flex-col items-start justify-start">
                Quote #5
                {getStatusBox("Awaiting Response")}
              </div>
            </td>
            <td className="py-6">
              <div>CREATED ON</div>
              <div>Sep 14, 2024</div>
            </td>
            <td className="py-6">
              <div className="max-w-[220px]">
                3 Hampshire Close Northwest
                Calgary, Alberta T3A 4X9
              </div>
            </td>
            <td className="py-6">
              <div className="font-semibold">
                $47,250.00
                <Star fill="orange" stroke="orange" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
      <div className="w-full flex items-start justify-start gap-2">
        <div className="w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center">
          <Download />
        </div>
        <div className="">
          <p className="font-semibold">Client hasn't requested any work yets</p>
          <p>Clients can submit new requests for work online. You and your team can also create requests to keep track of new work that comes up.</p>
          <div className="my-1">
            <CustomButton title={"New request"} />
          </div>
        </div>
      </div>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={2}>
      <table className="w-full text-tprimary">
        <tbody>
          <tr>
            <td className="py-6">
              <div className="font-semibold flex flex-col items-start justify-start">
                Quote #5
                {getStatusBox("Awaiting Response")}
              </div>
            </td>
            <td className="py-6">
              <div>CREATED ON</div>
              <div>Sep 14, 2024</div>
            </td>
            <td className="py-6">
              <div className="max-w-[220px]">
                3 Hampshire Close Northwest
                Calgary, Alberta T3A 4X9
              </div>
            </td>
            <td className="py-6">
              <div className="font-semibold">
                $47,250.00
                <Star fill="orange" stroke="orange" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={3}>
      <div className="w-full flex items-start justify-start gap-2">
        <div className="w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center">
          <Hammer />
        </div>
        <div className="">
          <p className="font-semibold">No Jobs</p>
          <p>Let's get out there and work. Begin by creating this client's first job.</p>
          <div className="my-1">
            <CustomButton title={"New Job"} />
          </div>
        </div>
      </div>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={4}>
      <div className="w-full flex items-start justify-start gap-2">
        <div className="w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center">
          <DollarSign />
        </div>
        <div className="">
          <p className="font-semibold">No invoices</p>
          <p>There are no current invoices for this client yet</p>
          <div className="my-1">
            <CustomButton title={"New Invoice"} />
          </div>
        </div>
      </div>
    </CustomTabPanel>
  </div>)
}

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
  const { clientcustomfields, propertycustomfields } = useSelector(state => state.clients);


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
        .map((item, index) => {

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

      const jsonData = {
        additionaldetails: changedValues,
        additionalpropertydetails: changeAdditionalpropertydetails,
        mobiles: data.mobiles.map((mobile) => {
          if (mobile.number.trim() == "") return null;
          return {
            type: mobile.type,
            number: mobile.number,
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
      dispatch(createClient(jsonData))
      // API call logic here, e.g., await axios.post("/api/clients", jsonData);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  useEffect(() => {
    dispatch(fetchClientsCustomFields());
    dispatch(fetchPropertyCustomFields());
  }, [])



  const SectionBox = ({ children, className }) => {
    return <div className={`p-4 border flex flex-col gap-4 items-start justify-start border-gray-200 rounded-lg text-tprimary text-sm ${className}`}>
      {children}
    </div>
  }

  const HeadingBox = ({ children }) => {
    return <div className="w-full flex items-center justify-between gap-2">
      {children}
    </div>
  }



  return (
    <div className="w-full mx-auto space-y-4">
      <HeadingBox>
        <div className="text-sm text-tprimary">
          Back to: <Link href={"/clients"} className="text-green-700">Clients</Link>
        </div>
        <div className="flex gap-4">
          <CustomButton onClick={() => router.push("/clients/new")} title={"Email"} variant={"primary"} frontIcon={<Mail className="w-4 h-4" />} />
          <CustomButton onClick={() => router.push("/clients/new")} title={"Edit"} frontIcon={<Pencil className="w-4 h-4" />} />
          <CustomButton title={"More Actions"} frontIcon={<MoreHorizontal />} />
        </div>
      </HeadingBox>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-8 border flex gap-4 items-start justify-start border-gray-200 rounded-xl text-tprimary">
          <div className="w-2/3 space-y-3">
            <div className="flex items-center gap-4 mb-8 w-full">
              <Avatar className="w-16 h-16" />
              <div className="font-bold text-4xl">Md.Ashraful Islam</div>
              {getStatusBox("active")}
            </div>

            {/* Properties */}
            <SectionBox>
              <HeadingBox>
                <div className="text-xl font-bold text-tprimary">
                  Properties
                </div>
                <div className="flex gap-4">
                  <CustomButton onClick={() => null} title={"New Property"} frontIcon={<Plus className="w-4 h-4" />} />
                </div>
              </HeadingBox>
              <table className="w-full text-tprimary">
                <tbody>
                  <tr>
                    <td className="py-6">
                      <div className="w-10 h-10 rounded border-green-700 border grid place-content-center hover:bg-green-700 hover:bg-opacity-20 cursor-pointer">
                        <MapPin className="text-green-700" />
                      </div>
                    </td>
                    <td className="py-6">3 Hampshire Close Northwest</td>
                    <td className="py-6">Calgary</td>
                    <td className="py-6">Alberta</td>
                    <td className="py-6">T3A 4X9</td>
                    <td className="py-6">Tax rate</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Tax rate</td>
                    <td colSpan={4}>GST (5.0%) (Default)</td>
                  </tr>
                </tbody>
              </table>
            </SectionBox>


            {/* Overview */}
            <SectionBox>
              <HeadingBox>
                <div className="text-xl font-bold text-tprimary">
                  Overview
                </div>
                <div className="flex gap-4">
                  <CustomButton onClick={() => null} title={"New"} frontIcon={<ChevronDown className="w-4 h-4" />} />
                </div>
              </HeadingBox>
              <TabBox />
            </SectionBox>


            {/* Schedule */}
            <SectionBox>
              <HeadingBox>
                <div className="text-xl font-bold text-tprimary">
                  Schedule
                </div>
                <div className="flex gap-4">
                  <CustomButton onClick={() => null} title={"New"} frontIcon={<ChevronDown className="w-4 h-4" />} />
                </div>
              </HeadingBox>

              <div className="font-semibold border-b border-b-tprimary w-full">
                Tomorrow
              </div>

              <table>
                <tbody>
                  <tr>
                    <td className="flex flex-grow flex-1">
                      <div className="flex">
                        <Checkbox />
                        <div>
                          <p className="font-semibold text-sm">Reminder about quote #5 for Md. Ashraful Islam</p>
                          <p className="text-sm">re: Md. Ashraful Islam</p>
                        </div>
                      </div>
                    </td>
                    <td className="max-w-[30%] w-[30%]">
                      <div className="w-2/3 text-sm">
                        Quote was sent on 19/09/2024 but no job has been generated yet
                      </div>
                    </td>
                    <td className="max-w-[20%] w-[20%]">
                      <div className="text-sm">
                        <div>Sep 21, 2024</div>
                        <div>Assigned to Gurvinder Singh</div>
                      </div>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </SectionBox>

            <SectionBox>
              <HeadingBox>
                <div className="text-xl font-bold text-tprimary">
                  Recent pricing for this property
                </div>
              </HeadingBox>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Line Item</th>
                    <th className="text-left">Quoted</th>
                    <th>Job</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="flex flex-grow flex-1 py-4">
                      Doors Installation
                    </td>
                    <td className="max-w-[30%] w-[30%] py-4">
                      <div className="font-semibold text-green-700">
                        $1,200.00*
                      </div>
                    </td>
                    <td className="max-w-[20%] w-[20%] py-4">
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div className="text-sm border-t border-t-gray-300 w-full pt-4">
                * Hover for notes regarding this cost
              </div>
            </SectionBox>
          </div>

          {/* Right */}
          <div className="w-1/3 space-y-3">
            <SectionBox>
              <HeadingBox>
                <div className="text-xl font-bold text-tprimary">
                  Contact
                </div>
              </HeadingBox>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-2 text-sm w-[200px]">Main</td>
                    <td className="py-2 text-sm flex gap-2">
                      9055509033
                      <Star fill="orange" stroke="orange" className="w-5 h-5" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm w-[200px]">Main</td>
                    <td className="py-2 text-sm flex gap-2">
                      +19055505033
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm w-[200px]">Main</td>
                    <td className="py-2 text-sm flex gap-2">
                      ashraf.masum@gmail.com
                      <Star fill="orange" stroke="orange" className="w-5 h-5" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm w-[200px]">Main</td>
                    <td className="py-2 text-sm flex gap-2">
                      mahmuda04@gmail.com
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm w-[200px]">Lead source</td>
                    <td className="py-2 text-sm flex gap-2">
                      Other
                    </td>
                  </tr>
                </tbody>
              </table>
            </SectionBox>

            {/* Tags */}
            <SectionBox>
              <HeadingBox>
                <div className="text-xl font-bold text-tprimary">
                  Tags
                </div>
                <div>
                  <CustomButton onClick={() => null} title={"New"} frontIcon={<Plus className="w-4 h-4" />} />
                </div>
              </HeadingBox>
              <div className="w-full">

                {
                  false ? <>
                    <div className="flex gap-3 w-full items-center justify-center">
                      <input
                        type="text"
                        className="w-full h-11 focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded"
                      />
                      <CustomButton onClick={() => null} title={"Add"} variant={"primary"} />
                    </div>
                    <div className="flex mt-2 mr-2 flex-wrap space-y-1 space-x-1">
                      {
                        [1, 2, 3].map((tag, index) => {
                          return <div key={index} className="relative flex items-center justify-center overflow-hidden  bg-primary rounded-full group">
                            <div className="h-auto px-4 py-1 text-sm">abc</div>
                            <div className="hidden group-hover:flex absolute w-full h-full items-center justify-center bg-red-700 bg-opacity-60 cursor-pointer">
                              <X className="w-4 h-4" />
                            </div>
                          </div>
                        })
                      }
                    </div>
                  </> : <div>
                    <i>This client has no tags</i>
                  </div>
                }
              </div>
            </SectionBox>


            {/* Last client conversation */}
            <SectionBox>
              <HeadingBox>
                <div className="text-xl font-bold text-tprimary">
                  Last client communication
                </div>
              </HeadingBox>
              <div className="w-full">
                <div className="w-full flex flex-col gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center">
                      <MessageCircle />
                    </div>
                    <div className="">
                      <p className="">Sent Sep 18, 2024</p>
                      <p>Quote from AGH RENOVATION LIMITED</p>
                    </div>
                  </div>
                  <div className="my-1 flex gap-2">
                    <CustomButton title={"View Communication"} />
                    <CustomButton title={"View All"} />
                  </div>
                </div>
              </div>
            </SectionBox>

            {/* Billing History */}
            <SectionBox className="p-0">
              <div className="p-4 space-y-3 w-full">
                <HeadingBox>
                  <div className="text-xl font-bold text-tprimary">
                    Billing history
                  </div>
                  <div>
                    <CustomButton onClick={() => null} title={"New"} frontIcon={<Plus className="w-4 h-4" />} />
                  </div>
                </HeadingBox>
                <div className="w-full">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center">
                      <CreditCard />
                    </div>
                    <div className="">
                      <p className="">No billing history</p>
                      <p>This client hasn't been billed yet</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-dark flex items-center justify-between font-semibold w-full py-4 px-2">
                <span>Current Balance</span>
                <span>$0.00</span>
              </div>
            </SectionBox>

            <div className="border bg-gray-100 border-gray-300 p-4 rounded-lg">
              <h1 className='text-2xl font-bold mb-2'>Internal notes</h1>
              <p>Internal notes will only be seen by your team</p>
              <div className="mt-4">
                <textarea placeholder='Note details' name="" id="" rows={3} className="w-full focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"></textarea>
              </div>

              <div className="mt-4 border-2 border-gray-300 text-sm border-dashed p-2 py-4 rounded-xl flex justify-center items-center">
                <label htmlFor="" className='text-gray-500'>Drag your files here or <span className='ml-2 text-green-700 font-semibold border-2 rounded-xl p-2'>Select a file</span></label>
                <input hidden type="file" name="" id="" />
              </div>
            </div>
          </div>
        </div >

        <div className="mt-4 space-y-2 flex justify-between">
          <CustomButton title="Cancel"></CustomButton>
          <div className="flex gap-2">
            <CustomButton title="Save and Create Another"></CustomButton>
            <CustomButton type="submit" variant="primary" title="Save Client"></CustomButton>
          </div>
        </div>
      </form >


      {/* Modals will be show here */}
      < AddCustomFields open={open} onClose={() => setOpen(false)
      } />
    </div >
  );
}