"use client"
import React from 'react'
import EarningSection from './components/EarningSection'
import ExpenseSection from './components/ExpenseSection'
import { CalendarDays, ClipboardMinus, UserPen } from 'lucide-react'

enum Panels {
    WORKSPACE,
    EVENT,
    REPORT
}

type ReportItem = {
    title: string
}

const Page = () => {
    const [selectedPanel, setSelectedPanel] = React.useState(Panels.WORKSPACE)
    const [monthList, setMonthList] = React.useState<ReportItem[]>([
        { title: "May 2025" },
        { title: "June 2025" },
        { title: "July 2025" },
        { title: "August 2025" }
    ])

    return (
        <div className='h-screen overflow-hidden flex flex-col bg-gray-50'>
            {/* Header */}
            <header className='bg-linear-to-r from-blue-700 to-teal-700 text-white p-2 shrink-0'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>Pramananda Sarkar</h1>
                    </div>
                    <div className='text-right'>
                        <p className='text-3xl font-bold mt-1'>40000</p>
                    </div>
                </div>
            </header>

            <div className='flex flex-1 overflow-hidden'>
                {/* Sidebar */}
                <div className='flex w-64 bg-white border-r border-gray-200'>
                    {/* Sidebar Navigation */}
                    <div className='w-16 bg-teal-800 flex flex-col items-center py-4'>
                        <button
                            className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center transition-colors ${selectedPanel === Panels.WORKSPACE ? 'bg-teal-700 text-white' : 'text-teal-200 hover:bg-teal-700/50'}`}
                            onClick={() => setSelectedPanel(Panels.WORKSPACE)}
                            title="Workspace"
                        >
                            <span className='text-lg font-bold'><UserPen /></span>
                        </button>
                        <button
                            className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center transition-colors ${selectedPanel === Panels.EVENT ? 'bg-teal-700 text-white' : 'text-teal-200 hover:bg-teal-700/50'}`}
                            onClick={() => setSelectedPanel(Panels.EVENT)}
                            title="Event"
                        >
                            <span className='text-lg font-bold'><CalendarDays /></span>
                        </button>
                        <button
                            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${selectedPanel === Panels.REPORT ? 'bg-teal-700 text-white' : 'text-teal-200 hover:bg-teal-700/50'}`}
                            onClick={() => setSelectedPanel(Panels.REPORT)}
                            title="Report"
                        >
                            <span className='text-lg font-bold'><ClipboardMinus /></span>
                        </button>
                    </div>

                    {/* Sidebar Content */}
                    <div className='flex-1 p-6'>
                        {selectedPanel === Panels.WORKSPACE && (
                            <div className='space-y-3 overflow-auto'>
                                {monthList.map((item, index) => (
                                    <div
                                        key={index}
                                        className=' cursor-pointer hover:underline'
                                    >
                                        <span className='font-medium text-gray-800'>{item.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedPanel === Panels.EVENT && (
                            <div className='space-y-4'>
                                <h2 className='text-xl font-semibold text-gray-800 mb-4'>Events</h2>
                                
                            </div>
                        )}

                        {selectedPanel === Panels.REPORT && (


                            <div className='space-y-3 overflow-auto'>
                                {monthList.map((item, index) => (
                                    <div
                                        key={index}
                                        className=' cursor-pointer hover:underline'
                                    >
                                        <span className='font-medium text-gray-800'>{item.title}</span>
                                    </div>
                                ))}
                            </div>


                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className='flex-1 overflow-hidden bg-gray-50 p-6'>
                    {selectedPanel === Panels.WORKSPACE && (
                        <div className='w-full h-full flex gap-6'>
                            <div className='flex-1'>
                                <EarningSection />
                            </div>
                            <div className='flex-1'>
                                <ExpenseSection />
                            </div>
                        </div>
                    )}

                    {selectedPanel === Panels.EVENT && (
                        <div className='w-full h-full flex items-center justify-center'>
                            <div className='text-center p-8'>
                                
                                <h2 className='text-2xl font-bold text-gray-800 mb-3'>Events Calendar</h2>
                                
                            </div>
                        </div>
                    )}

                    {selectedPanel === Panels.REPORT && (
                        <div className='w-full h-full'>
                            <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-full'>
                                <h2 className='text-2xl font-bold text-gray-800 mb-6'>Report</h2>
                                
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page