import cloud from "../assets/background/cloud.png";

function Title({firstHalf, secondHalf}) {
    return (
        <div className='flex justify-center'>
            <h1 className='text-[#3D3232] text-[29px] relative w-fit'>
                <img className='w-[150px] absolute -bottom-5 left-0 -z-10' src={cloud} alt="" />
                <span className='text-[#FFB951] z-20'>{firstHalf}</span>{secondHalf}
            </h1>
        </div>
    )
}

export default Title;