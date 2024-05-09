import React, { useState } from 'react';
import './style.css';
const restaurantsData = [
  {
    id: 1,
    name: 'meghana biriyani',
    cuisine: 'indian',
    rating: 4.5,
    avgPrice: 400,
    distance: 8,
  },
  {
    id: 2,
    name: 'pasta street',
    cuisine: 'italian',
    rating: 4.6,
    avgPrice: 600,
    distance: 4,
  },
  {
    id: 3,
    name: 'biggies burger',
    cuisine: 'american',
    rating: 3.9,
    avgPrice: 200,
    distance: 1,
  },
  {
    id: 4,
    name: 'momo world',
    cuisine: 'chinese',
    rating: 4.2,
    avgPrice: 1100,
    distance: 6,
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRest, setFilteredRest] = useState(restaurantsData);

  const getRequestedRestaurant = (inputStr) => {
    const filtered = restaurantsData.filter((obj) => {
      return obj.name.includes(inputStr) || obj.cuisine.includes(inputStr);
    });
    setFilteredRest(filtered);
  };

  const handleInputChange = (e) => {
    // clear other search term and filter first
    setFilteredRest(restaurantsData);

    setSearchTerm(e.target.value);
    getRequestedRestaurant(e.target.value);
  };

  const handleFilterChange = (e) => {
    // clear other search term and filter first
    setFilteredRest(restaurantsData);
    setSearchTerm('');

    const selectedFilterType = e.target.name;
    const filterValue = e.target.value;
    const filtered = restaurantsData.filter((obj) => {
      return selectedFilterType === 'rating'
        ? obj[selectedFilterType] >= filterValue
        : obj[selectedFilterType] <= filterValue;
    });
    setFilteredRest(filtered);
  };

  return (
    <div className="App">
      <input
        style={{ margin: '1rem' }}
        placeholder="Input name or cuisine"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <br />
      <select name="rating" onChange={handleFilterChange}>
        <option value="">Filter by rating</option>
        <option value="4.5">4.5</option>
        <option value="4.25">4.25</option>
        <option value="4">4+</option>
      </select>
      <select name="distance" onChange={handleFilterChange}>
        <option value="">Filter by Distance</option>
        <option value="8">Within 8 Km</option>
        <option value="5">Within 5 Km</option>
        <option value="3">Within 3 Km</option>
      </select>
      <select name="avgPrice" onChange={handleFilterChange}>
        <option value="">Filter by Average Price/person</option>
        <option value="1000">1000</option>
        <option value="500">500</option>
        <option value="250">250</option>
      </select>
      <br />
      <div style={{ margin: '1rem' }}>
        {filteredRest?.map((res) => (
          <div
            key={res.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
            }}
          >
            <span>Name:{res.name}</span>
            <span>Cuisine:{res.cuisine}</span>
            <span>Rating:{res.rating}</span>
            <span>Distance:{res.distance}</span>
            <span>Average Price/person:{res.avgPrice}</span>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
