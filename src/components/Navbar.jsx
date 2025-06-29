import React from 'react'

const Navbar = () => {
    return (
        <div className='w-screen h-[4rem] bg-violet-800'>
            <div className='flex justify-between mx-20 py-4'>
                <span className='text-3xl font-bold  '>iTask</span>
                <ul className='flex gap-4 text-2xl'>
                    <li className='hover:font-bold cursor-pointer  transition-all duration-75'>Home</li>
                    <li className='hover:font-bold cursor-pointer transition-all duration-75'>Your Tasks</li>
                </ul>

            </div>
        </div>
    )
}

export default Navbar