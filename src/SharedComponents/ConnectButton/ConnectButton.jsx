import shapeGreen from '../../assets/button/shape_green.svg'
import shapeYellow from '../../assets/button/shape_yellow.svg'
import shapeGreenRev from '../../assets/button/shape_green_rev.svg'
import shapeYelloweRev from '../../assets/button/shape_yellow_rev.svg'
import './ConnectButton.css'

function ConnectButton({ text, url, primary = true, secondary, error = false }) {
    if (primary && !secondary) {
        return (
            <button className={"button relative flex items-center justify-center gap-0 h-[50px]  2xl:h-[65px] 3xl:h-[100px] "
                + (error ? " connect-error " : "")
                + " text-white text-[18px] xl:text-[20px] 3xl:text-[45px] font-semibold hover:text-white hover:before:bg-primary "}>
                <img className=" h-full top-0 left-0 " src={shapeGreen} alt="" />
                <span className="relative z-10 flex items-center h-[100%] border-t-[3px] border-b-[3px] border-primary py-2">{text}</span>
                <img className=" h-full top-0 right-0  " src={shapeGreenRev} alt="" />
            </button>
        );
    }
    else if (secondary) {
        return (
            <button className={"button relative flex items-center justify-center gap-0 h-[50px]  2xl:h-[65px] 3xl:h-[100px] "
                + (error ? " connect-error " : "")
                + " text-white text-[18px] xl:text-[20px] 3xl:text-[45px] font-semibold hover:text-black hover:before:bg-secondary "}>
                <img className=" h-full top-0 left-0 " src={shapeYellow} alt="" />
                <span className="relative z-10 flex items-center h-[100%] border-t-[3px] border-b-[3px] border-secondary py-2">{text}</span>
                <img className=" h-full top-0 right-0  " src={shapeYelloweRev} alt="" />
            </button>
        );
    }


}

export default ConnectButton;