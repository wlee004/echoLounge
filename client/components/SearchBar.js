import React, { useState } from 'react';
import YoutubePlayer from './YoutubePlayer.js'

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  // const [finalInput, setFinalInput] = useState('2g811Eo7K8U')
  const [finalInput, setFinalInput] = useState('https://www.youtube.com/watch?v=0H69m7TWB6E')

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    setFinalInput(searchInput)
    console.log(`finalInput: ${finalInput} ${searchInput}`)
    event.preventDefault();
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
