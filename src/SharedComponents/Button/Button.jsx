import { Link } from "react-router-dom";
import shapeGreen from '../../assets/button/shape_green.svg'
import shapeYellow from '../../assets/button/shape_yellow.svg'
import shapeGreenRev from '../../assets/button/shape_green_rev.svg'
import shapeYelloweRev from '../../assets/button/shape_yellow_rev.svg'
import './Button.css'

function Button({ text, url, primary = true, secondary, onClick, className = "", disabled = false }) {
    if (primary && !secondary) {
        return (
            <Link onClick={onClick}
                className={"button relative flex items-center gap-0 h-[50px] 2xl:h-[65px] 3xl:h-[100px] "
                    + " text-white text-[18px] xl:text-[20px] 2xl:text-[22px] 3xl:text-[50px] font-semibold hover:text-white hover:before:bg-primary " +
                    (disabled ? " hover:before:bg-transparent cursor-not-allowed text-[#aaa] hover:text-[#aaa] " : "")
                    + className} to={url}>
                <img className=" h-full top-0 left-0 " src={shapeGreen} alt="" />
                <span className="relative z-10 flex items-center h-[100%] border-t-[3px] border-b-[3px] border-primary px-4 py-2">{text}</span>
                <img className=" h-full top-0 right-0  " src={shapeGreenRev} alt="" />
            </Link>
        );
    }
    else if (secondary) {
        return (
            <Link className={"button relative flex items-center gap-0 h-[50px] 2xl:h-[60px] 3xl:h-[100px] "
                + " text-white text-[18px] xl:text-[20px] 2xl:text-[22px] 3xl:text-[50px] font-semibold hover:text-black hover:before:bg-secondary "
                + className} to={url}>
                <img className=" h-full top-0 left-0 " src={shapeYellow} alt="" />
                <span className="relative z-10 flex items-center h-[100%] border-t-[3px] border-b-[3px] border-secondary px-4 py-2">{text}</span>
                <img className=" h-full top-0 right-0  " src={shapeYelloweRev} alt="" />
            </Link>
        );
    }


}

export default Button;