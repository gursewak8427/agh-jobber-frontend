"use client";

import Link from 'next/link';
import { Home, Calendar, Users, ClipboardList, FileText, Briefcase, DollarSign, BarChart2, PieChart, Clock, App, UserPlus, LayoutGrid, ArrowLeft, ArrowLeftCircle, ArrowLeftIcon, PlusCircle, LucidePlusCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@mui/material';

const Section = ({ children, border }) => {
    return <section className={`py-2 px-3 w-full flex flex-col gap-1 ${border ? 'border-b border-gray-400' : ''}`}>
        {children}
    </section>
}

const Sidebar = () => {
    const [collapse, setCollapse] = useState(true)

    return (
        <div className={`bg-primary text-tprimary h-screen sticky top-0 ${!collapse ? 'w-48' : 'w-16'} transition-all`}>
            <div className="py-6 px-4">
                <img src="https://cdn.jobber.com/yr/logos/v1/logo_jobber_bug.svg" alt="" className='w-8 object-contain' />
            </div>
            <nav className="flex flex-col">
                <Section border={true}>
                    <Link href="/">
                        <div className="overflow-hidden line-clamp-1 max-h-10 h-10 flex items-center hover:bg-primary-dark p-2 rounded-md">
                            <LucidePlusCircle className={`w-4 h-4 font-black ${!collapse ? 'mr-3' : ''}`} />
                            {!collapse && "Create"}
                        </div>
                    </Link>
                    <Link href="/">
                        <div className="overflow-hidden line-clamp-1 max-h-10 h-10 flex items-center hover:bg-primary-dark p-2 rounded-md font-bold">
                            <Home className={`w-4 h-4 font-bold ${!collapse ? 'mr-3' : ''}`} />
                            {!collapse && "Home"}
                        </div>
                    </Link>
                    <Link href="/schedule">
                        <div className="overflow-hidden line-clamp-1 max-h-10 h-10 flex items-center hover:bg-primary-dark p-2 rounded-md">
                            <Calendar className={`w-4 h-4 font-black ${!collapse ? 'mr-3' : ''}`} />
                            {!collapse && "Schedule"}
                        </div>
                    </Link>
                </Section>
                <Section border={true}>
                    <Link href="/clients">
                        <div className="overflow-hidden line-clamp-1 max-h-10 h-10 flex items-center hover:bg-primary-dark p-2 rounded-md">
                            <Users className={`w-4 h-4 font-black ${!collapse ? 'mr-3' : ''}`} />
                            {!collapse && "Clients"}
                        </div>
                    </Link>
                    <Link href="/requests">
                        <div className="overflow-hidden line-clamp-1 max-h-10 h-10 flex items-center hover:bg-primary-dark p-2 rounded-md">
                            <ClipboardList className={`w-4 h-4 font-black ${!collapse ? 'mr-3' : ''}`} />
                            {!collapse && "Requests"}
                        </div>
                    </Link>
                    <Link href="/quotes">
                        <div className="overflow-hidden line-clamp-1 max-h-10 h-10 flex items-center hover:bg-primary-dark p-2 rounded-md">
                            <FileText className={`w-4 h-4 font-black ${!collapse ? 'mr-3' : ''}`} />
                            {!collapse && "Quotes"}
                        </div>
                    </Link>
                    <Link href="/jobs">
                        <div className="overflow-hidden line-clamp-1 max-h-10 h-10 flex items-center hover:bg-primary-dark p-2 rounded-md">
                            <Briefcase className={`w-4 h-4 font-black ${!collapse ? 'mr-3' : ''}`} />
                            {!collapse && "Jobs"}
                        </div>
                    </Link>
                    <Link href="/invoices">
                        <div className="overflow-hidden line-clamp-1 max-h-10 h-10 flex items-center hover:bg-primary-dark p-2 rounded-md">
                            <DollarSign className={`w-4 h-4 font-black ${!collapse ? 'mr-3' : ''}`} />
                            {!collapse && "Invoices"}
                        </div>
                    </Link>
                </Section>
                <Section border={true}>
                    <Link href="/marketing">
                        <div className="overflow-hidden line-clamp-1 max-h-10 h-10 flex items-center hover:bg-primary-dark p-2 rounded-md">
                            <BarChart2 className={`w-4 h-4 font-black ${!collapse ? 'mr-3' : ''}`} />
                            {!collapse && "Marketing"}
                        </div>
                    </Link>
                    <Link href="/reports">
                        <div className="overflow-hidden line-clamp-1 max-h-10 h-10 flex items-center hover:bg-primary-dark p-2 rounded-md">
                            <PieChart className={`w-4 h-4 font-black ${!collapse ? 'mr-3' : ''}`} />
                            {!collapse && "Reports"}
                        </div>
                    </Link>
                    <Link href="/expenses">
                        <div className="overflow-hidden line-clamp-1 max-h-10 h-10 flex items-center hover:bg-primary-dark p-2 rounded-md">
                            <DollarSign className={`w-4 h-4 font-black ${!collapse ? 'mr-3' : ''}`} />
                            {!collapse && "Expenses"}
                        </div>
                    </Link>
                    <Link href="/timesheets">
                        <div className="overflow-hidden line-clamp-1 max-h-10 h-10 flex items-center hover:bg-primary-dark p-2 rounded-md">
                            <Clock className={`w-4 h-4 font-black ${!collapse ? 'mr-3' : ''}`} />
                            {!collapse && "Timesheets"}
                        </div>
                    </Link>
                    <Link href="/apps">
                        <div className="overflow-hidden line-clamp-1 max-h-10 h-10 flex items-center hover:bg-primary-dark p-2 rounded-md">
                            <LayoutGrid className={`w-4 h-4 font-black ${!collapse ? 'mr-3' : ''}`} />
                            {!collapse && "Apps"}
                        </div>
                    </Link>
                </Section>
                <Section border={false}>
                    <Link href="/refer">
                        <div className="overflow-hidden line-clamp-1 max-h-10 h-10 flex items-center hover:bg-primary-dark p-2 rounded-md">
                            <UserPlus className={`w-4 h-4 font-black ${!collapse ? 'mr-3' : ''}`} />
                            {!collapse && "Refer a friend"}
                        </div>
                    </Link>
                </Section>

                <Button className='pl-4 py-4 w-full flex items-center hover:bg-primary-dark justify-start absolute bottom-0' onClick={() => setCollapse(!collapse)}>
                    <div className={`${!collapse ? 'rotate-0' : 'rotate-180'} transition-all`}>
                        <ArrowLeftIcon className='text-gray-500' />
                    </div>
                </Button>
            </nav>
        </div>
    );
};

export default Sidebar;
