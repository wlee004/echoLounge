import React, { useState } from 'react';
import YoutubePlayer from './YoutubePlayer.js'

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  // const [finalInput, setFinalInput] = useState('2g811Eo7K8U')
  const [finalInput, setFinalInput] = useState('https://www.youtube.com/watch?v=0H69m7TWB6E')

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Make the API request to the backend
      const response = await fetch('http://localhost:8080/api/youtube/getLink', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ searchTerm: searchInput }), 
      });

      if (response.ok) {
        const data = await response.json();
        setFinalInput(data.url); 
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

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
