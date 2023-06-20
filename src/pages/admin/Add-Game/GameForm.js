import React, { useState } from 'react';
import { FirebaseService } from '../../../Shared/Services/firebaseService';

const GameForm = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [gameFolder, setGameFolder] = useState('');
  const [description, setDescription] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [imageProgress, setImageProgress] = useState(0);
  const [gameFolderLoading, setGameFolderLoading] = useState(false);
  const [gameFolderProgress, setGameFolderProgress] = useState(0);
  const firebease = new FirebaseService();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const gameData = {
      title: title,
      image: image,
      description: description,
    };
    console.log(
      gameData.image
        );
    firebease.storeGame(gameData)

   
    const file = gameFolder;
    //uplaod file to public folder
};
  return (
    <div className='top-games Container flex flex-col items-center pt-28 pb-20 '>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '400px',
          margin: '0 auto',
          backgroundColor: '#00e5ff',
          padding: '20px',
        }}
      >
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor='title'>Game Title:</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', backgroundColor: '#fff', color: '#000' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor='image'>Game Image:</label>
          <input
            type='file'
            id='image'
            onChange={handleImageChange}
            style={{ width: '100%', backgroundColor: '#fff', color: '#000' }}
          />
          {imageLoading && (
            <div>
              Uploading Image... {imageProgress}%
              <progress value={imageProgress} max='100'></progress>
            </div>
          )}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor='gameFolder'>Upload Game Folder:</label>
          <input
            type='file'
            id='gameFolder'
            onChange={handleGameFolderChange}
            style={{ width: '100%', backgroundColor: '#fff', color: '#000' }}
          />
          {gameFolderLoading && (
            <div>
              Uploading Game Folder... {gameFolderProgress}%
              <progress value={gameFolderProgress} max='100'></progress>
            </div>
          )}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor='description'>Description:</label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', backgroundColor: '#fff', color: '#000' }}
          ></textarea>
        </div>

        <button type='submit' style={{ width: '100%', backgroundColor: '#3bdbcb', color: '#000' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default GameForm;
