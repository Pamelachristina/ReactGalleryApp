import React from 'react';
import Photo from './Photo';
import NotFound from './notFound';
import { withRouter } from 'react-router-dom';


const PhotoList = props => { 
  if(props.match.params.query !== props.title) {
      props.handleSearch(props.match.params.query)
  }
  const results = props.data;
  let photo;

  
  if (results.length > 0) {
    photo = results.map(photo =>
    <Photo url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />
    );
  } else {
    photo = <NotFound />
  }

  
return(
  <div className="photo-list">
    <ul>
      {photo}
    </ul> 
  </div>
  );
  }


export default withRouter (PhotoList);
