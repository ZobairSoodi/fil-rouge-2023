import { Link } from "react-router-dom";
import shapeWhiteRev from '../../assets/button/shape_white_rev.svg'
import './ButtonAlt.css';

function ButtonAlt({ text, url, primary=true, secondary }) {
    if (primary && !secondary) {
        return (
            <Link className={"button-alt relative flex items-center gap-0 h-[50px] before:bg-primary "
                + " text-black text-[18px] xl:text-[20px] 2xl:text-[22px] 3xl:text-[28px] font-semibold hover:text-black hover:before:bg-white "} to={url}>
                <span className="relative z-10 flex items-center h-[100%] border-l-[3px] border-t-[3px] border-b-[3px] border-white px-4 py-2">{text}</span>
                <img className=" h-full top-0 right-0 z-10 " src={shapeWhiteRev} alt="" />
            </Link>
        );
    }
    else if (secondary) {
        return (
            <Link className={"button-alt relative flex items-center gap-0 h-[50px] before:bg-secondary "
                + " text-black text-[18px] xl:text-[20px] 2xl:text-[22px] 3xl:text-[28px] font-semibold hover:text-black hover:before:bg-white "} to={url}>
                <span className="relative z-10 flex items-center h-[100%] border-l-[3px] border-t-[3px] border-b-[3px] border-white px-4 py-2">{text}</span>
                <img className=" h-full top-0 right-0 z-10 " src={shapeWhiteRev} alt="" />
            </Link>
        );
    }
}

export default ButtonAlt;
