import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Loading() {
    return (
        <div className="flex justify-center items-center 3xl:text-[50px]">
            <div class="spinner"></div><span> Loading</span>
        </div>
    );
}

export default Loading;