"use client";

import { Home, Calendar, Users, ClipboardList, FileText, Briefcase, DollarSign, BarChart2, PieChart, Clock, App, UserPlus, LayoutGrid, ArrowLeft, ArrowLeftCircle, ArrowLeftIcon, PlusCircle, LucidePlusCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import ChainCircleLogo from './logo';
import { usePathname } from 'next/navigation';
import CustomLink from './custom-link';

const Section = ({ children, border }) => {
    return <section className={`py-2 px-3 w-full flex flex-col gap-1 ${border ? 'border-b border-gray-400' : ''}`}>
        {children}
    </section>
}


const Sidebar = () => {
    const [collapse, setCollapse] = useState(false)
    const [createStatus, setCreateStatus] = useState(false)
    const pathname = usePathname();
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sectionRef.current && !sectionRef.current.contains(event.target)) {
                setCreateStatus(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const iconProps = { className: `size-5 font-black ${!collapse ? 'mr-3' : ''}` }

    const s1 = [{
        title: "Home",
        path: "/",
        icon: <Home {...iconProps} />
    },
    {
        title: "Schedule",
        path: "/schedule",
        icon: <Calendar {...iconProps} />
    }]

    const s2 = [{
        title: "Clients",
        path: "/clients",
        icon: <Users {...iconProps} />
    },
    {
        title: "Requests",
        path: "/requests",
        icon: <ClipboardList {...iconProps} />
    },
    {
        title: "Quotes",
        path: "/quotes",
        icon: <FileText {...iconProps} />
    },
    {
        title: "Jobs",
        path: "/jobs",
        icon: <Briefcase {...iconProps} />
    },
    {
        title: "Invoices",
        path: "/invoices",
        icon: <DollarSign {...iconProps} />
    }]

    const s3 = [{
        title: "Marketing",
        path: "/marketing",
        icon: <PieChart {...iconProps} />
    },
    {
        title: "Reports",
        path: "/reports",
        icon: <DollarSign {...iconProps} />
    },
    {
        title: "Expenses",
        path: "/expenses",
        icon: <Clock {...iconProps} />
    },
    {
        title: "Timesheets",
        path: "/timesheets",
        icon: <LayoutGrid {...iconProps} />
    },
    {
        title: "Apps",
        path: "/apps",
        icon: <UserPlus {...iconProps} />
    }]

    const s4 = [{
        title: "Refer a friend",
        path: "/refer",
        icon: <UserPlus {...iconProps} />
    }]

    const renderItems = arr => {
        return arr?.map((item, index) => {
            return <CustomLink href={item?.path} key={item?.path}>
                <div className={`overflow-hidden line-clamp-1 max-h-10 h-10 flex items-center hover:bg-primary p-2 rounded-md dark:hover:bg-dark-hover ${pathname == item?.path && 'bg-gray-100 dark:bg-dark-secondary'}`}>
                    {item?.icon}
                    {!collapse && item?.title}
                </div>
            </CustomLink>
        })
    }

    return (
        <div className={`z-[998] select-none bg-primary-dark dark:bg-dark-primary font-bold dark:text-dark-text text-tprimary h-screen sticky top-0 ${!collapse ? 'w-48' : 'w-16'} transition-all`}>
            <div className="py-6 px-4">
                {/* <img src="https://cdn.jobber.com/yr/logos/v1/logo_jobber_bug.svg" alt="" className='w-8 object-contain' /> */}
                <ChainCircleLogo />
            </div>
            <nav className="flex flex-col ">
                <Section border={true}>
                    <div onClick={() => {
                        setCreateStatus(!createStatus)
                    }} ref={sectionRef} className={`${createStatus ? 'bg-gray-100 dark:bg-dark-secondary' : ''} relative cursor-pointer max-h-10 h-10 flex items-center p-2 rounded-md`}>
                        <LucidePlusCircle className={`w-4 h-4 font-black ${!collapse ? 'mr-3' : ''}`} />
                        {!collapse && "Create"}
                        {createStatus &&
                            <div className="select-none absolute right-0 transform translate-x-[105%] flex bg-white dark:bg-dark-primary z-50 items-center border border-tprimary dark:border-white p-1 rounded-lg">
                                <div className="absolute w-5 h-5 bg-white dark:bg-dark-primary transform -translate-x-[75%] rotate-45 border-l  border-tprimary dark:border-white border-b">
                                </div>
                                <CustomLink href="/clients">
                                    <div className='ml-4 flex flex-col items-center p-2 px-3 cursor-pointer text-sm gap-1 rounded-lg w-[80px] hover:bg-primary dark:hover:bg-dark-hover'>
                                        <Users className={`w-4 h-4 font-black`} />
                                        Client
                                    </div>
                                </CustomLink>
                                <CustomLink href="/requests">
                                    <div className='flex flex-col items-center p-2 px-3 cursor-pointer text-sm gap-1 rounded-lg w-[80px] hover:bg-primary dark:hover:bg-dark-hover'>
                                        <ClipboardList className={`w-4 h-4 font-black text-orange-500`} />
                                        Request
                                    </div>
                                </CustomLink>
                                <CustomLink href="/quotes">
                                    <div className='flex flex-col items-center p-2 px-3 cursor-pointer text-sm gap-1 rounded-lg w-[80px] hover:bg-primary dark:hover:bg-dark-hover'>
                                        <FileText className={`w-4 h-4 font-black text-purple-500`} />
                                        Quote
                                    </div>
                                </CustomLink>
                                <CustomLink href="/jobs">
                                    <div className='flex flex-col items-center p-2 px-3 cursor-pointer text-sm gap-1 rounded-lg w-[80px] hover:bg-primary dark:hover:bg-dark-hover'>
                                        <Briefcase className={`w-4 h-4 font-black text-green-500`} />
                                        Job
                                    </div>
                                </CustomLink>
                                <CustomLink href="/invoices">
                                    <div className='flex flex-col items-center p-2 px-3 cursor-pointer text-sm gap-1 rounded-lg w-[80px] hover:bg-primary dark:hover:bg-dark-hover'>
                                        <DollarSign className={`w-4 h-4 font-black text-blue-500`} />
                                        Invoice
                                    </div>
                                </CustomLink>
                            </div>
                        }
                    </div>
                    {renderItems(s1)}
                </Section>
                <Section border={true}>
                    {renderItems(s2)}
                </Section>
                <Section border={true}>
                    {renderItems(s3)}
                </Section>
                <Section border={false}>
                    {renderItems(s4)}
                </Section>

                <Button className='pl-4 py-4 w-full flex items-center hover:bg-primary-dark dark:hover:bg-dark-hover justify-start absolute bottom-0' onClick={() => setCollapse(!collapse)}>
                    <div className={`${!collapse ? 'rotate-0' : 'rotate-180'} transition-all`}>
                        <ArrowLeftIcon className='text-gray-500 dark:text-dark-text' />
                    </div>
                </Button>
            </nav>
        </div>
    );
};

export default Sidebar;
