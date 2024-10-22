"use client"
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React from 'react'

const layout = ({ children }) => {
    const { tab } = useParams();

    return (
        <div className="flex">
            <div className="w-64 h-screen bg-gray-100 p-4 rounded">
                <h2 className="text-xl font-bold text-gray-700 mb-6">Settings</h2>

                {/* Business Management Section */}
                <div className="mb-6">
                    <h3 className="text-xs font-bold text-gray-800 mb-2">BUSINESS MANAGEMENT</h3>
                    <ul className="space-y-2">
                        <li><Link href="/settings/company" className={`text-sm hover:underline ${tab == "company" ? 'text-green-700' : 'text-gray-700'}`}>Company Settings</Link></li>
                        <li><Link href="/settings/branding" className={`text-sm hover:underline ${tab == "branding" ? 'text-green-700' : 'text-gray-700'}`}>Branding</Link></li>
                        <li><Link href="/settings/products" className={`text-sm hover:underline ${tab == "products" ? 'text-green-700' : 'text-gray-700'}`}>Products & Services</Link></li>
                        <li><Link href="/settings/customfields" className={`text-sm hover:underline ${tab == "customfields" ? 'text-green-700' : 'text-gray-700'}`}>Custom Fields</Link></li>
                        <li><Link href="/settings/jobberpayments" className={`text-sm hover:underline ${tab == "jobberpayments" ? 'text-green-700' : 'text-gray-700'}`}>Jobber Payments</Link></li>
                        <li><Link href="/settings/expensetracking" className={`text-sm hover:underline ${tab == "expensetracking" ? 'text-green-700' : 'text-gray-700'}`}>Expense Tracking</Link></li>
                        <li><Link href="/settings/automations" className={`text-sm hover:underline ${tab == "automations" ? 'text-green-700' : 'text-gray-700'}`}>Automations</Link></li>
                    </ul>
                </div>

                {/* Team Organization Section */}
                <div className="mb-6">
                    <h3 className="text-xs font-bold text-gray-800 mb-2">TEAM ORGANIZATION</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-sm text-gray-700 hover:underline">Manage Team</a></li>
                        <li><a href="#" className="text-sm text-gray-700 hover:underline">Work Settings</a></li>
                        <li><a href="#" className="text-sm text-gray-700 hover:underline">Schedule</a></li>
                        <li><a href="#" className="text-sm text-gray-700 hover:underline">Location Services</a></li>
                        <li><a href="#" className="text-sm text-gray-700 hover:underline">Route Optimization</a></li>
                        <li><a href="#" className="text-sm text-gray-700 hover:underline">Job Forms</a></li>
                    </ul>
                </div>

                {/* Client Communication Section */}
                <div className="mb-6">
                    <h3 className="text-xs font-bold text-gray-800 mb-2">CLIENT COMMUNICATION</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-sm text-gray-700 hover:underline">Client Hub</a></li>
                        <li><a href="#" className="text-sm text-gray-700 hover:underline">Emails & Text Messages</a></li>
                        <li><a href="#" className="text-sm text-gray-700 hover:underline">Two-way Text Messaging</a></li>
                        <li><a href="#" className="text-sm text-gray-700 hover:underline">Requests</a></li>
                        <li><a href="#" className="text-sm text-gray-700 hover:underline">Online Booking</a></li>
                    </ul>
                </div>

                {/* Connected Apps Section */}
                <div className="mb-6">
                    <h3 className="text-xs font-bold text-gray-800 mb-2">CONNECTED APPS</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-sm text-gray-700 hover:underline">Apps</a></li>
                    </ul>
                </div>
            </div>
            <div className="w-full p-2">
                {children}
            </div>
        </div>
    )
}

export default layout