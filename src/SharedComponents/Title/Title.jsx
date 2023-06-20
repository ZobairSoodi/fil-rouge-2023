import './Title.css';

function Title({ whiteText = "", coloredText = "", reverse = false, className = "" }) {
    return (
        <div className={"flex flex-col justify-center items-center gap-2 font-semibold text-[40px] 3xl:text-[95px] " + className }>
            <h1 className={!reverse ? "flex" : "flex flex-row-reverse"}>
                <span>{whiteText}</span>
                &nbsp;
                <span className="text-primary">{coloredText}</span>
            </h1>
            <div className="underline 3xl:border-t-[15px] 3xl:w-[250px]"></div>
        </div>
    );
}

export default Title;