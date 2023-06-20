import React from 'react';
import { downloadImage } from '../utils';
import { download} from '../assets';
import "./Card.css";

const Card = ({name,_id,prompt,photo}) => {
  return (
    <div className='card'>
      <img 
      src={photo}
      alt={prompt}
      />
      <div className='card-content'>
        <p>{prompt}</p>
        <div className='con'>
          <div className='con-in'>
            <div className='name-icon'>{name[0]}</div>
            <p>{name}</p>
          </div>
        <button onClick={()=>{downloadImage(_id,photo)}}><img src={download} alt="download" /></button>
      </div>
    </div>
    </div>
  )
}

export default Card