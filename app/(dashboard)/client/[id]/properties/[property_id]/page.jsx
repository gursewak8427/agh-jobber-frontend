"use client";
import React, { Fragment, useEffect } from "react";
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
    MenuItem,
    Typography,
    ListItemIcon,
    Breadcrumbs,
} from "@mui/material";
import { useState } from "react";
import {
    ArchiveIcon,
    BoxSelect,
    BoxSelectIcon,
    Briefcase,
    Calendar,
    CameraIcon,
    ChevronDown,
    CircleAlert,
    CreditCard,
    Delete,
    Divide,
    DollarSign,
    Download,
    DownloadIcon,
    FileIcon,
    FileText,
    GitPullRequestIcon,
    Hammer,
    Home,
    Icon,
    ListIcon,
    LogIn,
    Mail,
    MailIcon,
    Map,
    MapIcon,
    MapPin,
    MessageCircle,
    MoreHorizontal,
    MoreVertical,
    Pencil,
    PencilLine,
    PencilOffIcon,
    PencilRuler,
    Plus,
    PlusIcon,
    ReceiptIcon,
    Star,
    Trash2,
    WorkflowIcon,
    X,
} from "lucide-react";

import CustomButton from "@/components/CustomButton";
import Link from "next/link";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createClient, fetchClient, fetchClientsCustomFields, fetchProperty, fetchPropertyCustomFields } from "@/store/slices/client";
import { useSelector } from "react-redux";
import CustomSingleField from "@/app/_components/CustomSingleField";
import PageHeading from "@/components/PageHeading";
import CustomMenu from "@/components/CustomMenu";
import { HeadingBox, SectionBox } from "@/app/_components";

// Function to handle status rendering
const getStatusBox = status => {
    switch (status) {
        case "Active": return <div className="h-full text-sm flex items-center justify-start capitalize bg-blue-400 bg-opacity-20 px-2 py-1 rounded-full">
            <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
            {status}
        </div>
        case "Lead": return <div className="h-full text-sm flex items-center justify-start capitalize bg-green-400 bg-opacity-20 px-2 py-1 rounded-full">
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
    const [open, setOpen] = useState(false)
    const { client } = useAppSelector(store => store.clients)
    const { property } = useAppSelector(store => store.clients)
    const { id, property_id } = useParams();

    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchClient(id));
        dispatch(fetchProperty(property_id));
    }, [])

    const MoreActionsMenuItems = () => {
        return (<Fragment>
            {/* Menu Items */}
            <MenuItem className="text-tprimary text-sm gap-2 flex">
                <MapPin className="text-tprimary" />
                Adjust map <br /> location
            </MenuItem>

            <Divider />

            <Typography className="py-2 px-4 text-gray-500">Create New...</Typography>

            <MenuItem className="text-tprimary text-sm">
                <ListItemIcon>
                    <Download className="text-orange-700" size={16} />
                </ListItemIcon>
                Request
            </MenuItem>

            <MenuItem className="text-tprimary text-sm">
                <ListItemIcon>
                    <PencilRuler className="text-purple-700" size={16} />
                </ListItemIcon>
                Quote
            </MenuItem>

            <MenuItem className="text-tprimary text-sm">
                <ListItemIcon>
                    <Hammer className="text-green-700" size={16} />
                </ListItemIcon>
                Job
            </MenuItem>

            <MenuItem className="text-tprimary text-sm">
                <ListItemIcon>
                    <FileIcon className="text-blue-700" size={16} />
                </ListItemIcon>
                Task
            </MenuItem>

            <MenuItem className="text-tprimary text-sm">
                <ListItemIcon>
                    <Calendar className="text-yellow-700" size={16} />
                </ListItemIcon>
                Calendar Event
            </MenuItem>
        </Fragment>)
    }

    return (
        <div className="w-full mx-auto space-y-4">
            <HeadingBox>
                <div className="text-sm text-tprimary flex items-center gap-2">
                    Back to:
                    <Breadcrumbs>
                        <Link href={"/clients"} className="text-green-700 underline">Clients</Link>
                        <Link href={`/client/${id}`} className="text-green-700 underline">{client.fname ? client.fname + ' ' + client.lname : client.companyname}</Link>
                    </Breadcrumbs>
                </div>
                <div className="flex gap-4">
                    <CustomButton onClick={() => router.push("/clients/new")} title={"Show on Map"} variant={"primary"} frontIcon={<MapPin className="w-4 h-4" />} />
                    <CustomButton onClick={() => router.push("/clients/new")} title={"Edit"} frontIcon={<Pencil className="w-4 h-4" />} />
                    <CustomMenu open={true} icon={<CustomButton title={"More Actions"} frontIcon={<MoreHorizontal />} />}>
                        <MoreActionsMenuItems />
                    </CustomMenu>
                </div>
            </HeadingBox>

            <div className="flex items-center gap-4 mb-8 w-full">
                <div className="font-black tracking-tight text-4xl">Property Details</div>
            </div>
            <div className="p-8 border flex gap-4 items-start justify-start border-gray-200 rounded-xl text-tprimary">
                <div className="w-1/3">
                    <SectionBox>
                        <HeadingBox>
                            <div className="text-xl font-bold text-tprimary">
                                Location
                            </div>
                        </HeadingBox>
                        <div className="space-y-3">
                            <div>
                                <p className="font-semibold">Client</p>
                                <p className="text-green-700">{client.fname ? client.fname + ' ' + client.lname : client.companyname}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded border-green-700 border grid place-content-center hover:bg-green-700 hover:bg-opacity-20 cursor-pointer">
                                    <MapPin className="text-green-700" />
                                </div>
                                <p className="max-w-[200px]">{property.address1 + ' ' + property.address2 + ' ' + property.city + ' ' + property.province + ' ' + property.country + ' ' + property.postalcode}</p>
                            </div>
                        </div>
                    </SectionBox>
                    <SectionBox padding={"p-0"}>
                        <div className="p-4 space-y-3 w-full">
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
                        </div>
                        <div className="text-sm border-t border-t-gray-300 w-full p-2">
                            * Hover for notes regarding this cost
                        </div>
                    </SectionBox>
                    <SectionBox>
                        <HeadingBox>
                            <div className="text-xl font-bold text-tprimary">
                                Tax rate
                            </div>
                        </HeadingBox>
                        <p>GST (5.0%) (Default)</p>
                    </SectionBox>
                </div>

                <div className="w-2/3 space-y-3">

                    {/* Overview */}
                    <SectionBox>
                        <HeadingBox>
                            <div className="text-xl font-bold text-tprimary">
                                Overview
                            </div>
                            <div className="flex gap-4">
                                <CustomMenu open={true} icon={<CustomButton onClick={() => null} title={"New"} frontIcon={<ChevronDown className="w-4 h-4" />} />}>
                                    <MenuItem className="py-2 px-4 text-sm">
                                        <ListItemIcon>
                                            <Download fontSize="small" className="w-5 h-5 text-orange-700" />
                                        </ListItemIcon>
                                        Request
                                    </MenuItem>
                                    <MenuItem className="py-2 px-4 text-sm">
                                        <ListItemIcon>
                                            <PencilRuler fontSize="small" className="w-5 h-5 text-purple-700" />
                                        </ListItemIcon>
                                        Quote
                                    </MenuItem>
                                    <MenuItem className="py-2 px-4 text-sm">
                                        <ListItemIcon>
                                            <Hammer fontSize="small" className="w-5 h-5 text-green-700" />
                                        </ListItemIcon>
                                        Job
                                    </MenuItem>
                                    <MenuItem className="py-2 px-4 text-sm">
                                        <ListItemIcon>
                                            <DollarSign fontSize="small" className="w-5 h-5 text-blue-700" />
                                        </ListItemIcon>
                                        Invoice
                                    </MenuItem>
                                </CustomMenu>
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
                                <CustomMenu open={true} icon={<CustomButton onClick={() => null} title={"New"} frontIcon={<ChevronDown className="w-4 h-4" />} />}>
                                    <MenuItem className="py-2 px-4 text-sm">
                                        <ListItemIcon>
                                            <Download fontSize="small" className="w-5 h-5 text-orange-700" />
                                        </ListItemIcon>
                                        Request
                                    </MenuItem>
                                    <MenuItem className="py-2 px-4 text-sm">
                                        <ListItemIcon>
                                            <FileIcon fontSize="small" className="w-5 h-5 text-blue-700" />
                                        </ListItemIcon>
                                        Task
                                    </MenuItem>
                                    <MenuItem className="py-2 px-4 text-sm">
                                        <ListItemIcon>
                                            <Calendar fontSize="small" className="w-5 h-5 text-yellow-700" />
                                        </ListItemIcon>
                                        Calender Event
                                    </MenuItem>
                                </CustomMenu>
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
                </div>
            </div>
        </div>
    );
}
