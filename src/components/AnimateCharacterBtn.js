import React from 'react';
import { NavLink } from 'react-router-dom';

function AnimateCharacterBtn() {


    return (
        <NavLink to="/animator" className='text-[#3D3232] font-[Audiowide] text-[18px] bg-[#FFB951] hover:text-[#ffffff] duration-500 p-5 mt-5 cursor-pointer'>Animate your character</NavLink>

    )
}

export default AnimateCharacterBtn;
