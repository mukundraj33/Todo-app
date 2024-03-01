import React from 'react'

const Navbar = () => {
    return (
        <div className='flex bg-[#0e102f]  h-[12vh] m-5 md:p-5 md:px-[10%] justify-between items-center rounded-xl'>
            <div className='flex gap-2 items-center '>
                <img className='w-12 ease-in duration-200 cursor-pointer hover:w-14' src="src\assets\tick-checkbox-svgrepo-com.svg" alt="" />
                <div>
                    <span className='text-blue-300 font-extrabold font-sans text-3xl hover:text-blue-500 ease-in duration-200 hover:text-4xl cursor-pointer'>
                        DoNow

                    </span>
                </div>
            </div>

            <div className='home1 flex gap-8'>
                <div className='text-white text-xl font-medium cursor-pointer'>
                    Home

                </div>
                <div className='text-white text-xl font-medium cursor-pointer'> 
                    ToDo

                </div>

            </div>

        </div>
    )
}

export default Navbar
