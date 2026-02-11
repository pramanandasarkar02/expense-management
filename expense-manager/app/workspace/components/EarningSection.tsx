import React from 'react'

const EarningSection = () => {
    const numbers = Array.from({length: 100}, (_, i) => i + 1)
    
    return (
        <div className='w-full h-full flex flex-col bg-white rounded-lg border border-gray-300 shadow-sm'>
            {/* Header */}
            <div className='p-4 border-b border-gray-300 bg-gray-50 rounded-t-lg'>
                <h1 className='text-xl font-semibold text-gray-800 text-center'>Expenses</h1>
            </div>
            
            {/* Scrollable Content */}
            <div className='flex-1 overflow-auto p-4'>
                <ul className='space-y-3'>
                    {numbers.map((number) => (
                        <li 
                            key={number} 
                            className='p-3 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors duration-150'
                        >
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-medium'>
                                        {number}
                                    </div>
                                    <div>
                                        <p className='font-medium text-gray-800'>Expense Item #{number}</p>
                                        <p className='text-sm text-gray-500'>Today • Category</p>
                                    </div>
                                </div>
                                <span className='font-semibold text-gray-900'>${(number * 10.50).toFixed(2)}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* Footer Input */}
            <div className='p-4 border-t border-gray-300 bg-gray-50 rounded-b-lg b-10'>
                <div className='flex gap-2'>
                    <input 
                        type="text" 
                        placeholder='Add new expense for today...' 
                        className='flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200'
                    />
                    <button className='px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 shadow-sm hover:shadow'>
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EarningSection