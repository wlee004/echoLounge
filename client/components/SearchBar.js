import React, { useState } from 'react';
import YoutubePlayer from './YoutubePlayer.js'

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [finalInput, setFinalInput] = useState('https://www.youtube.com/watch?v=0H69m7TWB6E')

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (searchInput.includes("https://www.youtube.com/")) {
      // User Submit Youtube link
      if(searchInput.split("v=").length > 1){ 
        const videoId = searchInput.split("v=")[1].split("&")[0]
        setFinalInput(videoId)
        setSearchInput("")
      } else { 
        // TODO Render an error message to client
        console.error(`Error with Youtube Request: ${error}`)
      }
    } else { 
      // Make the API request to the backend
      fetch(`http://localhost:8080/api/youtube/getLink/${searchInput}`, {
        method: 'GET',
        credentials: 'include'  // Ensure cookies are included in the request
      })
      .then(
        response => response.json()
      )
      .then(
        data => { 
          const videoId = data.videoId
          console.log("VIDEO ID DATA NEW: ", videoId)
          setFinalInput(videoId)
          setSearchInput("")
        }
      )
      .catch((error) => { 
        console.error(`Error with Youtube Request: ${error}`)
      })
    }

    
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search..."
          value={searchInput}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <YoutubePlayer input={finalInput}/>
    </div>
  );
};

export default SearchBar;
