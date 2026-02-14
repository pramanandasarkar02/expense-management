"use client"

import { useEffect, useState } from 'react'

import ExpenseSection from './components/ExpenseSection'
import { CalendarDays, ClipboardMinus, UserPen } from 'lucide-react'
import axios from 'axios'
import Report from './components/Report'

enum Panels {
    WORKSPACE,
    EVENT,
    REPORT
}




const Page = () => {
    const [selectedPanel, setSelectedPanel] = useState(Panels.WORKSPACE)

    const [userId, setUserId] = useState<string | null>(null)
    const [accountId, setAccountId] = useState<string | null>(null)

    const [userName, setUserName] = useState("")
    const [monthList, setMonthList] = useState([])
    const [targetedMonth, setTargetedMonth] = useState("")
    const [totalExpense, setTotalexpense] = useState(100)


    const rootURL = "http://localhost:8080/api"

    /* ------------------ Load IDs safely ------------------ */
    useEffect(() => {
        setUserId(localStorage.getItem("userId"))
        setAccountId(localStorage.getItem("accountId"))
    }, [])

    /* ------------------ Fetch User ------------------ */
    useEffect(() => {
        if (!userId) return

        const fetchUser = async () => {
            try {
                const res = await axios.get(`${rootURL}/users/${userId}`)
                setUserName(res.data.name)
            } catch (err) {
                console.error("Failed to fetch user", err)
            }
        }

        fetchUser()
    }, [userId])

    /* ------------------ Fetch Months ------------------ */
    useEffect(() => {
        if (!userId) return

        const fetchMonths = async () => {
            console.log("Calling fetch month")
            try {
                const res = await axios.get(`${rootURL}/accounts/${userId}/months`)
                const data = await res.data;
                setMonthList(data)
                console.log(monthList)
                setTargetedMonth(res.data[0])
                console.log(res.data)

            } catch (err) {
                console.error("Failed to fetch month list", err)
            }
        }

        fetchMonths()
    }, [userId])

   

    const addAccountActivity = async ( ) => {

    }

    return (
        <div className='h-screen overflow-hidden flex flex-col bg-gray-50'>
            {/* Header */}
            <header className='bg-teal-800 text-white p-2 shrink-0'>
                <div className='flex justify-between items-center px-10'>
                    <h1 className='text-2xl font-bold'>{userName}</h1>
                    <p className='text-3xl font-bold'>{totalExpense}</p>
                </div>
            </header>

            <div className='flex flex-1 overflow-hidden'>
                {/* Sidebar */}
                <div className='flex w-64 bg-white border-r'>
                    <div className='w-16 bg-teal-800 flex flex-col items-center py-4'>
                        <SidebarBtn active={selectedPanel === Panels.WORKSPACE} onClick={() => setSelectedPanel(Panels.WORKSPACE)}>
                            <UserPen />
                        </SidebarBtn>
                        <SidebarBtn active={selectedPanel === Panels.EVENT} onClick={() => setSelectedPanel(Panels.EVENT)}>
                            <CalendarDays />
                        </SidebarBtn>
                        <SidebarBtn active={selectedPanel === Panels.REPORT} onClick={() => setSelectedPanel(Panels.REPORT)}>
                            <ClipboardMinus />
                        </SidebarBtn>
                    </div>

                    <div className='flex-1 p-6 overflow-auto'>
                        {(selectedPanel === Panels.WORKSPACE || selectedPanel === Panels.REPORT) && (
                            <div className='space-y-3'>
                                {monthList.map((m, i) => (
                                    <div key={i} className="cursor-pointer hover:underline font-medium">
                                        <button onClick={()=> setTargetedMonth(m)} className=' text-teal-800 cursor-pointer underline'>{m}</button>
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>
                </div>

                {/* Main */}
                <div className='flex-1 p-6 overflow-hidden'>
                    {selectedPanel === Panels.WORKSPACE && (
                        <div className='h-full'>
                            {/* <EarningSection /> */}
                            <ExpenseSection monthId={targetedMonth} accountId={accountId} userId={userId}/>
                        </div>
                    )}

                    {selectedPanel === Panels.EVENT && (
                        <div className='h-full flex items-center justify-center text-2xl font-bold'>
                            Events
                        </div>
                    )}

                    {selectedPanel === Panels.REPORT && (
                        <div className='bg-white h-full '>
                            <Report />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const SidebarBtn = ({ active, onClick, children }: any) => (
    <button
        onClick={onClick}
        className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center transition
            ${active ? 'bg-teal-700 text-white' : 'text-teal-200 hover:bg-teal-700/50'}`}
    >
        {children}
    </button>
)

export default Page
