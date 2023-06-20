function Polygon({active, index}) {
    return (
        <svg className={"absolute h-full top-0 left-0 "
            + (active === index ? " block " : "hidden")} viewBox="0 0 19 121" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5 57L0.226563 120.405L0.226562 0.405151L18.5 57Z" fill="#60B49C" />
        </svg>
    );
}

export default Polygon;