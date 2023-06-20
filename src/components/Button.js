import React from 'react'

const Button = (props) => {
  return (
    <button className='flex items-center border-2 md:w-auto w-32 text-white font-medium py-3 px-6 rounded md:ml-8 bg-[#60B49C] cursor-pointer hover:text-[#FFB951] hover:border-[#FFB951] duration-500'>
        {props.children}
    </button>
  )
}

export default Button