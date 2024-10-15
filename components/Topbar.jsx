import { User, Briefcase, Search, Bell, Settings, HelpCircle, SidebarCloseIcon, PanelRightCloseIcon, HelpCircleIcon, PlayCircle, MessageCircleMore, CrossIcon, X } from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, Divider, IconButton, MenuItem, Typography } from '@mui/material';
import RightSidebar from './RightSidebar';
import CustomMenu from './CustomMenu';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { darkmodeState } from '@/store/slices/client';


const Topbar = () => {
    const router = useRouter();
    const dispatch = useDispatch()
    const { profile, darkMode } = useSelector(state => state.clients)
    const [state, setState] = useState({
        notification: false,
        help: false,
        settings: false,
        searchInputFocus: false,
    })

    const setPopup = (name, value) => {
        setState({
            ...state,
            [name]: value
        })
    }
    const activities = [
        {
            user: "Mahmuda Mahmud",
            action: "confirmed a visit",
            details: "Job #3",
            date: "2024-09-13",
            timeAgo: "3 hours ago",
            type: "job",
        },
        {
            user: "Princepal Singh",
            action: "stopped a timer",
            date: "2024-09-11",
            timeAgo: "2 days ago",
            type: "lead",
        }, {
            user: "Mahmuda Mahmud",
            action: "confirmed a visit",
            details: "Job #3",
            date: "2024-09-13",
            timeAgo: "3 hours ago",
            type: "job",
        },
        {
            user: "Princepal Singh",
            action: "stopped a timer",
            date: "2024-09-11",
            timeAgo: "2 days ago",
            type: "lead",
        }, {
            user: "Mahmuda Mahmud",
            action: "confirmed a visit",
            details: "Job #3",
            date: "2024-09-13",
            timeAgo: "3 hours ago",
            type: "job",
        },
        {
            user: "Princepal Singh",
            action: "stopped a timer",
            date: "2024-09-11",
            timeAgo: "2 days ago",
            type: "lead",
        }, {
            user: "Mahmuda Mahmud",
            action: "confirmed a visit",
            details: "Job #3",
            date: "2024-09-13",
            timeAgo: "3 hours ago",
            type: "job",
        },
        {
            user: "Princepal Singh",
            action: "stopped a timer",
            date: "2024-09-11",
            timeAgo: "2 days ago",
            type: "lead",
        }, {
            user: "Mahmuda Mahmud",
            action: "confirmed a visit",
            details: "Job #3",
            date: "2024-09-13",
            timeAgo: "3 hours ago",
            type: "job",
        },
        {
            user: "Princepal Singh",
            action: "stopped a timer",
            date: "2024-09-11",
            timeAgo: "2 days ago",
            type: "lead",
        }, {
            user: "Mahmuda Mahmud",
            action: "confirmed a visit",
            details: "Job #3",
            date: "2024-09-13",
            timeAgo: "3 hours ago",
            type: "job",
        },
        {
            user: "Princepal Singh",
            action: "stopped a timer",
            date: "2024-09-11",
            timeAgo: "2 days ago",
            type: "lead",
        }, {
            user: "Mahmuda Mahmud",
            action: "confirmed a visit",
            details: "Job #3",
            date: "2024-09-13",
            timeAgo: "3 hours ago",
            type: "job",
        },
        {
            user: "Princepal Singh",
            action: "stopped a timer",
            date: "2024-09-11",
            timeAgo: "2 days ago",
            type: "lead",
        },
        // Add more activities...
    ];


    const logoutNow = async () => {
        localStorage.removeItem('token')
        await axios.post('/api/logout')
        router.push("/auth/login")
    }

    const onSetDarkMode = () => {
        dispatch(darkmodeState(!darkMode))
    }
    return (
        <>
            <div className="bg-primary flex justify-between items-center p-4 shadow-sm sticky top-0 z-50 dark:bg-dark-secondary  dark:text-dark-text">
                <div className="text-sm text-gray-500  dark:text-dark-text">
                    <p className="font-bold">{profile?.company_name}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <div
                        className={`bg-primary-dark dark:bg-dark-primary  dark:text-dark-text cursor-pointer p-2 rounded-lg flex items-center transition-all ${state.searchInputFocus ? 'w-[350px] border-2 border-primary-dark' : 'w-[250px] border-2 border-transparent'}`}>
                        <Search className="mr-2 text-tprimary w-[25px]  dark:text-dark-text" />
                        <input
                            onClick={() => setPopup("searchInputFocus", true)}
                            onBlur={() => setPopup("searchInputFocus", false)}
                            type="text"
                            placeholder="Search"
                            className='bg-transparent focus:outline-none w-full'
                        />
                    </div>
                    <IconButton onClick={() => setPopup("notification", true)}>
                        <Bell />
                    </IconButton>
                    <IconButton onClick={() => setPopup("help", true)}>
                        <HelpCircle />
                    </IconButton>
                    <CustomMenu open={true} icon={<IconButton><Settings /></IconButton>}>
                        <MenuItem onClick={null}>
                            <div className="flex items-center space-x-2">
                                <Avatar>GS</Avatar>
                                <div>
                                    <Typography fontWeight="bold">{profile?.name}</Typography>
                                    <Typography variant="body2">{profile.email}</Typography>
                                </div>
                            </div>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={null}>Settings</MenuItem>
                        <MenuItem onClick={null}>Account and Billing</MenuItem>
                        <MenuItem onClick={null}>Manage Team</MenuItem>
                        <MenuItem onClick={null}>Refer a Friend</MenuItem>
                        <MenuItem onClick={null}>Product Updates</MenuItem>
                        <MenuItem onClick={onSetDarkMode}>
                            <div className="flex items-center">
                                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                                <span className="ml-2">{darkMode ? '☀️' : '🌙'}</span>
                            </div>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={logoutNow}>
                            <div className='text-red-400'>
                                Log Out
                            </div>
                        </MenuItem>
                    </CustomMenu>
                </div>
            </div>
            <RightSidebar isOpen={state.notification} onClose={() => setPopup("notification", false)} >
                <div className="max-w-md flex flex-col gap-4 relative h-full text-tprimary dark:bg-dark-secondary  dark:text-dark-text">
                    {/* Header */}
                    <div className="flex justify-between items-center sticky top-0 bg-white p-4 pb-0 dark:bg-dark-secondary  dark:text-dark-text">
                        <h1 className="text-2xl font-semibold">Activity Feed</h1>
                        <IconButton onClick={() => setPopup("notification", false)} >
                            <X />
                        </IconButton>
                    </div>

                    {/* Customize Feed Link */}
                    <div className="text-sm px-4 ">
                        <a href="#" className="text-green-800 underline  dark:text-dark-text">
                            Customize Feed
                        </a>
                    </div>

                    <div className="py-4 pt-0">
                        {/* Activity List */}
                        <div className="">
                            {activities.map((activity, index) => (
                                <div key={index} className="min-w-[380px] border-b border-b-gray-300 dark:border-b-gray-600 pb-4 text-sm  hover:bg-primary dark:bg-dark-secondary dark:text-dark-text dark:hover:bg-dark-hover p-2 py-6 rounded-lg cursor-pointer ">
                                    <div className="flex items-start space-x-2">
                                        {/* Icon */}
                                        <div className="text-green-800 mt-1 mx-3 ">
                                            {activity.type === 'job' ? (
                                                <Briefcase />
                                            ) : (
                                                <User />
                                            )}
                                        </div>

                                        {/* Activity Content */}
                                        <div className='flex flex-col gap-2 w-full'>
                                            <p className="font-semibold  dark:text-dark-text">
                                                {activity.user} {activity.action}
                                            </p>
                                            {activity.details && (
                                                <p className="text-sm text-gray-800  dark:text-dark-text">{activity.details}</p>
                                            )}
                                            {activity.date && (
                                                <p className="text-xs text-gray-400">
                                                    {new Date(activity.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-400">{activity.timeAgo}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </RightSidebar>
            <RightSidebar isOpen={state.help} onClose={() => setPopup("help", false)} >
                <div className="max-w-md flex flex-col gap-4 relative h-screen overflow-hidden text-tprimary dark:bg-dark-secondary  dark:text-dark-text">
                    {/* Header */}
                    <div className="flex justify-between items-center sticky top-0 bg-white p-4 pb-0 dark:bg-dark-secondary  dark:text-dark-text">
                        <h1 className="text-2xl font-semibold">Need a hand?</h1>
                        <IconButton className="text-lg font-semibold" onClick={() => setPopup("help", false)} >
                            <X />
                        </IconButton>
                    </div>

                    <div className="p-4 pt-0">
                        {/* Search Input */}
                        <div className="mb-6 ">
                            <input
                                type="text"
                                placeholder="Search our Help Center..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Recommendations Title */}
                        <div className="text-sm font-semibold mb-2 p-3">RECOMMENDATIONS</div>

                        <Divider className='my-2' />

                        {/* Recommendations List */}
                        <div className="space-y-4">
                            <div className='p-3 py-3 rounded-lg hover:bg-primary dark:hover:bg-dark-hover cursor-pointer dark:text-dark-text'>
                                <h2 className="font-semibold">Account Ownership</h2>
                                <p className="text-sm text-gray-800 dark:text-dark-text">The account owner is the individual that owns the rights to the Jobber account and all associated information...</p>
                            </div>

                            <div className='p-3 py-3 rounded-lg hover:bg-primary cursor-pointer dark:hover:bg-dark-hover'>
                                <h2 className="font-semibold">How to Add or Change Your Billing Information</h2>
                                <p className="text-sm text-gray-800 dark:text-dark-text">{`Do you have a new credit card? To add or change your billing information for your Jobber account, click the Gear Icon > Account and Billing...`}</p>
                            </div>

                            <div className='p-3 py-3 rounded-lg hover:bg-primary cursor-pointer dark:hover:bg-dark-hover'>
                                <h2 className="font-semibold">Referals</h2>
                                <p className="text-sm text-gray-800 dark:text-dark-text">When you refer a friend to Jobber, they get a free month and VIP treatment—and you get a free month too!...</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="absolute bottom-0 w-full flex flex-col gap-2 p-2">
                        <Divider />

                        {/* Links */}
                        <div className="space-y-2 w-full ">
                            <button className='p-3 py-3 w-full rounded-lg hover:bg-primary dark:hover:bg-dark-hover cursor-pointer flex gap-2 items-center'>
                                <HelpCircleIcon />
                                <span>Visit Help Center</span>
                            </button>
                            <button className='p-3 py-3 w-full rounded-lg hover:bg-primary dark:hover:bg-dark-hover cursor-pointer flex gap-2 items-center'>
                                <PlayCircle />
                                <span>Watch Jobber Videos</span>
                            </button>
                        </div>

                        {/* Chat Button */}
                        <button className="w-full flex items-center justify-center bg-green-700 text-white py-3 rounded-md hover:bg-green-800 transition">
                            <MessageCircleMore />
                            <span className="ml-2">Chat With Us</span>
                        </button>

                        {/* Terms of Service */}
                        <div className="text-left w-full text-sm text-green-800 py-2 font-semibold cursor-pointer dark:text-dark-text">
                            Terms of Service
                        </div>
                    </div>
                </div>
            </RightSidebar>

        </>
    );
};

export default Topbar;
