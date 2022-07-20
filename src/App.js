import React, { useEffect, useState } from 'react';
import './App.css';
import ProteinList from './components/ProteinList';
import CodonSearchBox from './components/CodonSearchBox';
import { _fetch_proteins, _fetch_protein_by_codon } from './backend/backend.js'



const App = () => {

  //Loads fake protein API upon website load
  //const API_PROTEINS = require('./backend/PROTEINS_API.json');

  //Keep track of search value and protein in a state
  const [searchInput, setSearchInput] = useState('');
  const [protein, setProtein] = useState(_fetch_proteins()) //initalizes with an object of all proteins

  useEffect(() => {
    // Everytime there's an event.. run this
    // When searchInput legnth = 3, find the matching codon in lookup chart, 
    // and setProtein to the matching object.
    // However, reset to all proteins if searchInput length = 0.
    if (searchInput.length === 3) {
      setProtein(_fetch_protein_by_codon(searchInput));
    }
    else if (searchInput.length === 0) {
      setProtein(_fetch_proteins());
    }
  }, [searchInput]);

  return (
    <div className="App">
      {
        <>
          <h1>Interactive Protein-Codon Tool</h1>
          <h3>Enter A, U, C or G:</h3>
          <CodonSearchBox searchInput={searchInput} setSearchInput={setSearchInput} />
          <ProteinList protein={protein} setProtein={setProtein} />
        </>
      }
    </div>
  );
};

export default App;