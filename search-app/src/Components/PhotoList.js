import React from 'react';
import Photo from './Photo';

const PhotoList = props => { 

  const results = props.data;
  let photo = results.map(photo =>
    <Photo url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />
    );
    
  
  return(
  <div className="photo-list">
    <ul>
      {photo}
    </ul> 
  </div>
  );
}

export default PhotoList;
