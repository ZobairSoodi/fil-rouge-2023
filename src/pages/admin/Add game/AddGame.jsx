import React, { useEffect, useState } from 'react';
import Button from '../../../SharedComponents/Button/Button';
import { FirebaseService } from '../../../Shared/Services/firebaseService';
import Swal from 'sweetalert2';
function AddGame() {
  const [addForm, setAddForm] = useState({});
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [gameFolder, setGameFolder] = useState('');
  const [description, setDescription] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [imageProgress, setImageProgress] = useState(0);
  const [gameFolderLoading, setGameFolderLoading] = useState(false);
  const [gameFolderProgress, setGameFolderProgress] = useState(0);
  const firebease = new FirebaseService();

  useEffect(() => {
    console.log("image", image);
  }, [image])

  const handleAdd = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setAddForm((old) => {
      return { ...old, [name]: value };
    })
  }

  const handleGameFolderChange = (e) => {
    const file = e.target.files[0];
    setGameFolderLoading(true);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'your-upload-url');
    xhr.upload.addEventListener('progress', (event) => {
      const progress = Math.round((event.loaded / event.total) * 100);
      setGameFolderProgress(progress);
    });

    xhr.addEventListener('load', () => {
      setGameFolder(file);
      setGameFolderLoading(false);
      setGameFolderProgress(0);
    });

    xhr.send(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageLoading(true);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'your-upload-url');
    xhr.upload.addEventListener('progress', (event) => {
      const progress = Math.round((event.loaded / event.total) * 100);
      setImageProgress(progress);
    });

    xhr.addEventListener('load', () => {
      setImage(file);
      setImageLoading(false);
      setImageProgress(0);
    });

    xhr.send(file);
  };
   const handleSubmit = async (e) => {

    e.preventDefault();
  
    const gameData = {
      title: title,
      image: image,
      description: description,
    };
  
    // Assuming you have a function called "firebase.storeGame" to store the game data
    firebease.storeGame(gameData);
  
    const file = gameFolder;
    if (file) {
      const formData = new FormData();
      formData.append('gameFolder', file); // Use a key to identify the uploaded file on the server-side
  
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (event) => {
        const progress = Math.round((event.loaded / event.total) * 100);
        setGameFolderProgress(progress);
      });
  
      xhr.addEventListener('load', () => {
        setGameFolder(file);
        setGameFolderLoading(false);
        setGameFolderProgress(0);
        Swal.close(); // Close the loading spinner when the upload is complete
        Swal.fire({
          title: 'Upload Complete',
          text: 'Game folder uploaded successfully.',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Go to games',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/admin/games';
          }
        });
        
      });
  
      xhr.open('POST', 'http://localhost:4000/upload');
      xhr.send(formData);
  
      Swal.fire({
        title: 'Uploading',
        html: '<div class="custom-spinner"></div><p>Please wait...</p>',
        allowOutsideClick: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
        didOpen: () => {
          const spinner = Swal.getPopup().querySelector('.custom-spinner');
          // Style the spinner using CSS (e.g., width, height, animation)
          // Example CSS: .custom-spinner { width: 50px; height: 50px; animation: spin 1s linear infinite; }
        },
      });
    }
  };
  

  useEffect(() => {
    console.log("fooorm", addForm);
  }, [addForm])

  return (
    <div className='bg-grad pt-10 px-4 sm:px-14'>
      <div className='flex flex-wrap justify-between gap-4'>
        <div className={"flex flex-col justify-center items-center gap-2 font-semibold text-[30px] 3xl:text-[55px] "}>
          <h1>
            <span>ADD</span>
            &nbsp;
            <span className="text-primary">NEW GAME</span>
          </h1>
        </div>

        <div className='flex'>
          <Button text={"Browse games"} url={"/admin/games"} secondary></Button>
        </div>
      </div>

      <div className='flex justify-center py-10'>
        <form
          className='flex flex-wrap justify-center text-[24px] bg-[#2B323B] px-0 sm:px-5 py-11'
          onSubmit={handleSubmit}
        >
          {/* left inputs */}
          <div className='flex flex-col w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 px-5 gap-6'>
            <div className='flex flex-col gap-3'>
              <label htmlFor="game-title">Game title:</label>
              <input className='w-full bg-[#3D4549] h-14 px-3 outline-none'
                type="text" name="title" id='game-title'
                value={title} onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="upload-img" className='flex flex-col gap-3 cursor-pointer'>
                <span>Game image:</span>
                <div className='flex '>
                  <div className='relative flex px-4 items-center text-[18px] text-[#ffffffb9] w-full bg-[#3D4549]'>
                    <span className='relative z-10'>
                      {image ? image.name : "Choose File"}
                    </span>
                    {imageLoading ?
                      <div className={'absolute z-30 top-0 left-0 bg-[#206c555b] w-0 h-full '} style={{ width: imageProgress + "%" }} />
                      : ''
                    }
                  </div>
                  <span className='bg-[#676D71] py-[17px] px-2 text-[16px]'>Browse</span>
                </div>
              </label>
              <input id='upload-img' name="image" value={addForm.image} onChange={handleImageChange} hidden type="file" />
            </div>

            <div>
              <label htmlFor="upload-file" className='flex flex-col gap-3 cursor-pointer'>
                <span>Upload game:</span>
                <div className='flex '>
                  <div className='relative flex px-4 items-center text-[18px] text-[#ffffffb9] w-full bg-[#3D4549]'>
                    <span className='relative z-10'>
                      {gameFolder ? gameFolder.name : "Choose File"}
                    </span>
                    {gameFolderLoading ?
                      <div className={'absolute z-30 top-0 left-0 bg-[#206c555b] w-0 h-full '} style={{ width: gameFolderProgress + "%" }} />
                      : ''
                    }
                  </div>
                  <span className='bg-[#676D71] py-[17px] px-2 text-[16px]'>Browse</span>
                </div>
              </label>
              <input id='upload-file' name="file" value={addForm.file} onChange={handleGameFolderChange} hidden type="file" />
            </div>
          </div>

          {/* right inputs */}
          <div className='flex flex-col w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mt-5 md:mt-0 px-5 gap-[69px]'>
            <div className='flex flex-col gap-3'>
              <label htmlFor="game-descrip">Description:</label>
              <textarea
                className='w-full h-[188px] bg-[#3D4549] px-3 outline-none'
                name="descrip" id="game-descrip" cols="30" rows="10"
                value={description} onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <input
              className='bg-[#60B49C] py-3 cursor-pointer'
              type="submit" value='ADD GAME' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddGame
