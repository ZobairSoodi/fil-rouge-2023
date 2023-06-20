import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FirebaseService } from "../../Shared/Services/firebaseService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";

function EditForm({ game, setGames, show, setShow }) {
    const MySwal = withReactContent(Swal);
    const firebase = new FirebaseService();

    const [updateForm, setUpdateForm] = useState({ ...game });

    useEffect(() => {
    }, [])

    const handleUpdateInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUpdateForm({
            ...updateForm,
            [name]: value
        });
    }



    const updateGame = (e) => {
        e.preventDefault();
        const data = {
            "title": updateForm.title,
            "description": updateForm.description
        };
        const update = firebase.updateGame(updateForm.id, data);

        const result = { ...game, ...updateForm };
        setGames((old) => {
            const newData = old.map((item) => {
                if (item.id === game.id) {
                    return result;
                }
                return item;
            });
            return [...newData];
        })



    }

    if (show) {
        return <div className="fixed z-[999999] top-0 left-0 w-full h-full flex justify-center items-center overflow-auto">
            <div className="fixed z-10 top-0 left-0 w-full h-full bg-[#00000063] sm:bg-[#0000004f]"
                onClick={() => setShow(false)}
            />
            <form
                className='relative z-20 flex flex-wrap justify-center w-[80%] text-[20px] md:text-[24px] bg-[#2B323B] text-white px-0 sm:px-5 py-11'
                onSubmit={updateGame}
            >
                <FontAwesomeIcon className="absolute top-2 right-2 cursor-pointer text-[#aaa] hover:text-[#999]"
                    icon={faMultiply}
                    onClick={()=>setShow(false)}
                />
                {/* left inputs */}
                <div className='flex flex-col w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 px-5 gap-[33px]'>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="game-title" className="text-start">Game title:</label>
                        <input className='w-full bg-[#3D4549] h-12 sm:h-14 px-3 outline-none'
                            type="text" name="title" id='game-title' value={updateForm.title} onChange={handleUpdateInputs}
                        />
                    </div>

                    <div>
                        <label htmlFor="upload-img" className='flex flex-col gap-3 cursor-pointer'>
                            <span className="text-start">Change image:</span>
                            <div className='flex '>
                                <div className='relative flex px-4  items-center text-[16px] text-[#ffffffb9] w-full bg-[#3D4549]'>
                                    <span className='relative z-10 '>
                                        Choose File
                                    </span>
                                </div>
                                <span className='min-w-max bg-[#676D71] py-[12px] sm:py-[17px] px-2 text-[16px]'>Browse</span>
                            </div>
                        </label>
                        <input id='upload-img' name="image" hidden type="file" />
                    </div>

                    <div>
                        <label htmlFor="upload-file" className='flex flex-col gap-3 cursor-pointer'>
                            <span className="text-start">Upload game:</span>
                            <div className='flex '>
                                <div className='relative flex px-4 items-center text-[18px] text-[#ffffffb9] w-full bg-[#3D4549]'>
                                    <span className='relative z-10'>
                                        Choose File
                                    </span>
                                </div>
                                <span className='min-w-max bg-[#676D71] py-[12px] sm:py-[17px] px-2 text-[16px]'>Browse</span>
                            </div>
                        </label>
                        <input id='upload-file' name="file" hidden type="file" />
                    </div>
                </div>

                {/* right inputs */}
                <div className='flex flex-col sm:justify-between w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mt-5 md:mt-0 px-5 gap-[20px] sm:gap-[69px] bg-[#2B323B]'>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="game-descrip" className="text-start">Description:</label>
                        <textarea className='w-full h-[150px] sm:h-[200px] bg-[#3D4549] px-3 outline-none '
                            name="description" value={updateForm.description} onChange={handleUpdateInputs} id="game-descrip" cols="30" rows="10"
                        ></textarea>
                    </div>

                    <div className="flex gap-5">
                        <input
                            className='w-full bg-[#60B49C] py-[6px] sm:py-3 px-3 cursor-pointer'
                            type="submit" value='SAVE'
                            onClick={updateGame}
                        />

                        <input
                            className='w-full bg-secondary text-black py-[6px] sm:py-3 px-3 cursor-pointer'
                            type="button" value='Cancel'
                            onClick={() => {
                                // MySwal.close();
                                setShow(false);
                            }}
                        />
                    </div>
                </div>
            </form>
        </div>
    }
}

export default EditForm;    