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

import { useParams, usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchClient } from "@/store/slices/client";
import CustomMenu from "@/components/CustomMenu";
import { HeadingBox, SectionBox } from "@/app/_components";
import { Loading } from "@/app/_components/loading";
import SendEmailModal from "@/app/_components/client/SendEmailModal";
import { useProgressBar } from "@/hooks/use-progress-bar";
import CustomLink from "@/components/custom-link";
import { useCustomRouter } from "@/hooks/use-custom-router";

// Function to handle status rendering
const getStatusBox = status => {
  switch (status) {
    case "Lead": return <div className="h-full text-sm flex items-center justify-start capitalize bg-blue-400 bg-opacity-20 px-2 py-1 rounded-full">
      <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
      {status}
    </div>
    case "Active": return <div className="h-full text-sm flex items-center justify-start capitalize bg-green-400 bg-opacity-20 px-3 py-1 rounded-full ">
      <div className="w-3 h-3 bg-green-800 rounded-full mr-2"></div>
      {status}
    </div>
    case "Archived": return <div className="h-full text-sm flex items-center justify-start capitalize bg-gray-400 bg-opacity-20 px-2 py-1 rounded-full text-yellow-700">
      <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
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
      <table className="w-full text-tprimary text-sm dark:text-dark-text">
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
        <div className="w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center dark:bg-dark-primary">
          <Download className="dark:text-dark-text dark:bg-dark-primary" />
        </div>
        <div className="dark:text-dark-text">
          <p className="font-semibold">Client hasn't requested any work yets</p>
          <p>Clients can submit new requests for work online. You and your team can also create requests to keep track of new work that comes up.</p>
          <div className="my-1">
            <CustomButton title={"New request"} />
          </div>
        </div>
      </div>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={2}>
      <table className="w-full text-tprimary dark:text-dark-text">
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
      <div className="w-full flex items-start justify-start gap-2 dark:text-dark-text">
        <div className="w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center  dark:bg-dark-primary">
          <Hammer className="dark:text-dark-text dark:bg-dark-primary" />
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
      <div className="w-full flex items-start justify-start gap-2 dark:text-dark-text">
        <div className="w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center dark:bg-dark-primary">
          <DollarSign className="dark:text-dark-text dark:bg-dark-primary" />
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
  const [sendemail, setsendemail] = useState('')
  const { client } = useAppSelector(store => store.clients)
  const { id } = useParams();
  const [email, setEmail] = useState(false)
  const progress = useProgressBar();


  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchClient(id));
  }, [])

  useEffect(() => {
    if (client && client.email) {
      const primaryEmail = client.email.find(email => email.primary === true);
      if (primaryEmail) {
        setEmail(primaryEmail.email);
      } else {
        setEmail('');
      }
    } else {
      setEmail('');
    }
  }, [client]);

  const MoreActionsMenuItems = ({ onClose }) => {
    return (<Fragment>
      {/* Menu Items */}
      <Typography variant="subtitle1" style={{ padding: '8px 16px', fontWeight: 'bold' }}>
        Create new...
      </Typography>

      <MenuItem className="text-tprimary text-sm dark:text-dark-text">
        <ListItemIcon>
          <Download className="text-orange-700" size={16} />
        </ListItemIcon>
        Request
      </MenuItem>

      <MenuItem onClick={() => {
        onClose();
        progress.start();
        React.startTransition(() => {
          router.push(`/quotes/new?client_id=${id}`);
          progress.done();
        });
      }} className="text-tprimary text-sm dark:text-dark-text">
        <ListItemIcon>
          <PencilRuler className="text-purple-700" size={16} />
        </ListItemIcon>
        Quote
      </MenuItem>

      <MenuItem onClick={() => {
        onClose();
        progress.start();
        React.startTransition(() => {
          router.push(`/jobs/new?client_id=${id}`);
          progress.done();
        });
      }} className="text-tprimary text-sm dark:text-dark-text">
        <ListItemIcon>
          <Hammer className="text-green-700" size={16} />
        </ListItemIcon>
        Job
      </MenuItem>

      <MenuItem onClick={() => {
        onClose();
        progress.start();
        React.startTransition(() => {
          router.push(`/invoices/new?client_id=${id}`);
          progress.done();
        });
      }} className="text-tprimary text-sm dark:text-dark-text">
        <ListItemIcon>
          <ListIcon className="text-blue-700" size={16} />
        </ListItemIcon>
        Invoice
      </MenuItem>

      <MenuItem className="text-tprimary text-sm dark:text-dark-text">
        <ListItemIcon>
          <CreditCard className="text-orange-700" size={16} />
        </ListItemIcon>
        Collect Payment
      </MenuItem>

      <MenuItem className="text-tprimary text-sm dark:text-dark-text">
        <ListItemIcon>
          <FileIcon className="text-blue-700" size={16} />
        </ListItemIcon>
        Task
      </MenuItem>

      <MenuItem className="text-tprimary text-sm dark:text-dark-text">
        <ListItemIcon>
          <Calendar className="text-yellow-700" size={16} />
        </ListItemIcon>
        Calendar Event
      </MenuItem>

      <Divider />

      <MenuItem className="text-tprimary text-sm dark:text-dark-text">
        <ListItemIcon>
          <Home className="text-tprimary dark:text-dark-text" size={16} />
        </ListItemIcon>
        Property
      </MenuItem>

      <Divider />

      <MenuItem className="text-tprimary text-sm dark:text-dark-text">
        <ListItemIcon>
          <ArchiveIcon className="text-tprimary dark:text-dark-text" size={16} />
        </ListItemIcon>
        Archive Client
      </MenuItem>

      <MenuItem className="text-tprimary text-sm dark:text-dark-text">
        <ListItemIcon>
          <Download className="text-tprimary dark:text-dark-text" size={16} />
        </ListItemIcon>
        Download VCard
      </MenuItem>

      <Divider />

      <Typography variant="subtitle1" style={{ padding: '8px 16px', fontWeight: 'bold' }}>
        Client hub
      </Typography>
      {email ? <>

        <MenuItem className="text-tprimary text-sm dark:text-dark-text">
          <ListItemIcon>
            <Mail className="text-tprimary dark:text-dark-text" size={16} />
          </ListItemIcon>
          Send Login Email
        </MenuItem>

        <MenuItem className="text-tprimary text-sm dark:text-dark-text">
          <ListItemIcon>
            <LogIn className="text-tprimary dark:text-dark-text" size={16} />
          </ListItemIcon>
          Log in as Client
        </MenuItem>
      </> :
        <MenuItem className="text-tprimary text-sm dark:text-dark-text">
          <ListItemIcon>
            <LogIn className="text-tprimary dark:text-dark-text" size={16} />
          </ListItemIcon>
          No Email Address
        </MenuItem>
      }
    </Fragment>)
  }

  return (
    <div className="w-full mx-auto space-y-4">
      <HeadingBox>
        <div className="text-sm text-tprimary dark:text-dark-text">
          Back to: <CustomLink href={"/clients"} className="text-green-700 dark:text-dark-second-text">Clients</CustomLink>
        </div>
        <div className="flex gap-4">
          <CustomButton onClick={() => setsendemail(true)} title={"Email"} variant={"primary"} frontIcon={<Mail className="w-4 h-4" />} />
          <CustomButton onClick={() => {
            progress.start();
            React.startTransition(() => {
              router.push("/clients/new");
              progress.done();
            });
          }}
            title={"Edit"}
            frontIcon={<Pencil className="w-4 h-4" />}
          />
          <CustomMenu open={open == "more_actions"} icon={<CustomButton onClick={() => setOpen("more_actions")} title={"More Actions"} frontIcon={<MoreHorizontal />} />}>
            <MoreActionsMenuItems onClose={() => setOpen(null)} />
          </CustomMenu>
        </div>
      </HeadingBox>

      <div className="p-8 border flex gap-4 items-start justify-start border-gray-200 rounded-xl text-tprimary dark:text-dark-text">
        <div className="w-2/3 space-y-3">
          <div className="flex items-center gap-4 mb-8 w-full">
            <Avatar className="w-16 h-16 dark:bg-dark-primary dark:text-dark-text" />
            <div className="font-bold text-4xl">
              {client.fname ? client.fname + ' ' + client.lname : client.companyname}
            </div>

            {getStatusBox(client.status)}
          </div>

          {/* Properties */}
          <SectionBox>
            <HeadingBox>
              <div className="text-xl font-bold text-tprimary dark:text-dark-text">
                Properties
              </div>
              <div className="flex gap-4">
                <CustomButton onClick={() => {
                  progress.start();
                  React.startTransition(() => {
                    router.push(`/properties/new?client_id=${client?.id}`);
                    progress.done();
                  });
                }} title={"New Property"} frontIcon={<Plus className="w-4 h-4" />} />
              </div>
            </HeadingBox>
            <table className="w-full text-tprimary dark:text-dark-text">
              <tbody>
                {
                  client?.property?.map((property, index) => {
                    return <tr
                      onClick={() => {
                        progress.start();
                        React.startTransition(() => {
                          router.push(`/client/${id}/properties/${property.id}`);
                          progress.done();
                        });
                      }}
                      className="cursor-pointer hover:bg-primary-dark dark:hover:bg-dark-hover"
                    >
                      <td className="py-4 px-2">
                        <Link href={property?.map ?? '#'} target="_blank" className="w-10 h-10 rounded border-green-700 border grid place-content-center hover:bg-green-700 hover:bg-opacity-20 cursor-pointer"
                          onClick={(e) => e.stopPropagation()} // Prevent propagation to <tr> click> 
                        >
                          <MapPin className="text-green-700" />
                        </Link>
                      </td>
                      <td className="py-6">{property?.address1}</td>
                      <td className="py-6">{property?.address2}</td>
                      <td className="py-6">{property?.city}</td>
                      <td className="py-6">{property?.province}</td>
                      <td className="py-6">{property?.country}</td>
                      <td className="py-6">{property?.postalcode}</td>
                    </tr>
                  })
                }
                <tr>
                  <td className="py-4" colSpan={2}>Tax rate</td>
                  <td className="py-4" colSpan={4}>GST (5.0%) (Default)</td>
                </tr>
              </tbody>
            </table>
          </SectionBox>


          {/* Overview */}
          <SectionBox>
            <HeadingBox>
              <div className="text-xl font-bold text-tprimary dark:text-dark-text">
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
              <div className="text-xl font-bold text-tprimary dark:text-dark-text">
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

            <div className="font-semibold border-b border-b-tprimary w-full dark:text-dark-text">
              Tomorrow
            </div>

            <table>
              <tbody>
                <tr>
                  <td className="flex flex-grow flex-1 dark:text-dark-text">
                    <div className="flex">
                      <Checkbox className="dark:text-dark-text" />
                      <div>
                        <p className="font-semibold text-sm">Reminder about quote #5 for Md. Ashraful Islam</p>
                        <p className="text-sm">re: Md. Ashraful Islam</p>
                      </div>
                    </div>
                  </td>
                  <td className="max-w-[30%] w-[30%] dark:text-dark-text">
                    <div className="w-2/3 text-sm">
                      Quote was sent on 19/09/2024 but no job has been generated yet
                    </div>
                  </td>
                  <td className="max-w-[20%] w-[20%] dark:text-dark-text">
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

          <SectionBox padding={"p-0"}>
            <div className="p-4 space-y-3 w-full dark:text-dark-text">
              <HeadingBox>
                <div className="text-xl font-bold text-tprimary dark:text-dark-text">
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
            <div className="text-sm border-t border-t-gray-300 w-full p-2 dark:text-dark-text">
              * Hover for notes regarding this cost
            </div>
          </SectionBox>
        </div>

        {/* Right */}
        <div className="w-1/3 space-y-3">
          <SectionBox>
            <HeadingBox>
              <div className="text-xl font-bold text-tprimary dark:text-dark-text">
                Contact
              </div>
            </HeadingBox>
            <table className="w-full dark:text-dark-text">
              <tbody>
                {
                  client?.mobile?.map((mobile, index) => <tr>
                    <td className="py-2 text-sm w-[200px] capitalize">{mobile?.type}</td>
                    <td className="py-2 text-sm flex gap-2">
                      {mobile.number}
                      {mobile?.primary && <Star fill="orange" stroke="orange" className="w-5 h-5" />}
                    </td>
                  </tr>)
                }
                {
                  client?.email?.map((email, index) => <tr>
                    <td className="py-2 text-sm w-[200px] capitalize">{email?.type}</td>
                    <td className="py-2 text-sm flex gap-2">
                      {email.email}
                      {email?.primary && <Star fill="orange" stroke="orange" className="w-5 h-5" />}
                    </td>
                  </tr>)
                }
                <tr>
                  <td className="py-2 text-sm w-[200px]">Lead source</td>
                  <td className="py-2 text-sm flex gap-2">
                    {client?.leadsource}
                  </td>
                </tr>
              </tbody>
            </table>
          </SectionBox>

          {/* Tags */}
          <SectionBox>
            <HeadingBox>
              <div className="text-xl font-bold text-tprimary dark:text-dark-text">
                Tags
              </div>
              <div>
                <CustomButton onClick={() => null} title={"New"} frontIcon={<Plus className="w-4 h-4" />} />
              </div>
            </HeadingBox>
            <div className="w-full">

              {
                client?.tags ? <>
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
                  <i className="dark:text-dark-text">This client has no tags</i>
                </div>
              }
            </div>
          </SectionBox>


          {/* Last client conversation */}
          <SectionBox>
            <HeadingBox>
              <div className="text-xl font-bold text-tprimary dark:text-dark-text">
                Last client communication
              </div>
            </HeadingBox>
            <div className="w-full dark:text-dark-text ">
              <div className="w-full flex flex-col gap-2">
                <div className="flex flex-row gap-2 items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center dark:bg-dark-primary">
                    <MessageCircle />
                  </div>
                  <div className="">
                    <p className="">Sent Sep 18, 2024</p>
                    <p>Quote from AGH RENOVATION LIMITED</p>
                  </div>
                </div>
                <div className="my-1 flex gap-2">
                  <CustomButton title={"View Communication"} />
                  <CustomButton title={"View All"} onClick={() => {
                    progress.start();
                    React.startTransition(() => {
                      router.push(`/reports/client-communications/${client?.id}`);
                      progress.done();
                    });
                  }} />
                </div>
              </div>
            </div>
          </SectionBox>

          {/* Billing History */}
          <SectionBox padding="0">
            <div className="p-4 space-y-3 w-full">
              <HeadingBox>
                <div className="text-xl font-bold text-tprimary dark:text-dark-text">
                  Billing history
                </div>
                <div>
                  <CustomMenu open={true} icon={<CustomButton onClick={() => null} title={"New"} frontIcon={<ChevronDown className="w-4 h-4" />} />}>
                    <MenuItem className="py-2 px-4 text-sm text-gray-700">
                      Collect Payment
                    </MenuItem>
                    <MenuItem className="py-2 px-4 text-sm text-gray-700">
                      Record Deposit
                    </MenuItem>
                    <MenuItem className="py-2 px-4 text-sm text-gray-700">
                      Invoice
                    </MenuItem>
                    <Divider />
                    <MenuItem className="py-2 px-4 text-sm text-gray-700">
                      Set Initial Balance
                    </MenuItem>
                  </CustomMenu>
                </div>
              </HeadingBox>
              <div className="w-full dark:text-dark-text">
                <div className="flex flex-row gap-2 items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center dark:bg-dark-primary">
                    <CreditCard />
                  </div>
                  <div className="">
                    <p className="">No billing history</p>
                    <p>This client hasn't been billed yet</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-dark flex items-center justify-between font-semibold w-full py-4 px-2 dark:bg-dark-secondary dark:text-dark-text">
              <span>Current Balance</span>
              <span>$0.00</span>
            </div>
          </SectionBox>

          <div className="border bg-gray-100 border-gray-300 p-4 rounded-lg dark:bg-dark-secondary">
            <h1 className='text-2xl font-bold mb-2'>Internal notes</h1>
            <p>Internal notes will only be seen by your team</p>
            <div className="mt-4">
              <textarea placeholder='Note details' name="" id="" rows={3} className="w-full dark:text-dark-text dark:bg-dark-primary focus:outline-none border px-3 py-2 border-gray-300 focus:border-gray-400 rounded-lg"></textarea>
            </div>

            <div className="mt-4 border-2 border-gray-300 text-sm border-dashed p-2 py-4 rounded-xl flex justify-center items-center">
              <label htmlFor="" className='text-gray-500'>Drag your files here or <span className='ml-2 text-green-700 font-semibold border-2 rounded-xl p-2'>Select a file</span></label>
              <input hidden type="file" name="" id="" />
            </div>
          </div>
        </div>
      </div>
      <SendEmailModal open={sendemail} onClose={() => setsendemail(false)} email={email} client={client} />
    </div>
  );
}
