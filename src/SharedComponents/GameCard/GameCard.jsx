import { faEdit, faQuestionCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './GameCard.css';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FirebaseService } from "../../Shared/Services/firebaseService";
import { useEffect, useState } from "react";
import EditForm from "./EditForm";

function GameCard({ game, setGames }) {
    const MySwal = withReactContent(Swal);
    const firebase = new FirebaseService();

    const [show, setShow] = useState(false);

    


    const handleDetails = () => { }

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            customClass: {
                popup: 'bg-bg1 text-white',
                confirmButton: 'confirm-btn',
                cancelButton: 'cancel-btn'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                firebase.deleteGame(game.title);
                setGames((old) => {
                    return [...old.filter(item => item.title !== game.title)]
                });
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
        // firebase.deleteGame(title);

    }




    const handleEdit = () => {
        // MySwal.fire({
        //     html: <EditForm game={game} setGames={setGames} />,
        //     padding: "0",
        //     showConfirmButton: false,
        //     showCloseButton: true,
        //     background: "transparent",
        //     customClass: {
        //         popup: 'w-full md:w-[80%]',
        //         htmlContainer: 'margin-0'
        //     }
        // })
        setShow(true);
    }



    return (
    <>
        <div className="flex flex-col w-full rounded-[10px] overflow-hidden">
            <img className="w-full min-h-[250px] object-cover" src={game.image} alt="" />
            <div className=" flex flex-col gap-4 p-6 bg-[#2C333B]">
                <span className="text-[20px] font-medium">{game.title}</span>
                <div className="flex gap-4">
                    <button onClick={handleDetails}><FontAwesomeIcon className="text-[20px] hover:text-primary" icon={faQuestionCircle} /></button>
                    <button onClick={handleEdit}><FontAwesomeIcon className="text-[20px] hover:text-primary" icon={faEdit} /></button>
                    <button onClick={handleDelete}><FontAwesomeIcon className="text-[20px] hover:text-primary" icon={faTrashAlt} /></button>
                </div>
            </div>
        </div>
        <EditForm game={game} setGames={setGames} show={show} setShow={setShow} />
    </>
    );
}

export default GameCard;