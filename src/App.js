import React, { useEffect, useState } from 'react';
import './App.css';
import ProteinList from './components/ProteinList';
import CodonSearchBox from './components/CodonSearchBox';
import { _fetch_proteins, _fetch_protein_by_codon } from './backend/backend.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


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
    //sets container as fluid up until screen size of 720px width
    <Container fluid>
      <Row>
        <Col>Default font size</Col>
        <Col xs='8'>
          <h1>Codon Translation</h1>
          <h3>A lookup tool for the 20 amino acids encoded by the human genetic code.</h3>
        </Col>
        <Col><Button>Help</Button></Col>
      </Row>
      <Row>
        <h3>Enter A, U, C or G:</h3>
      </Row>
      <Row>
        <CodonSearchBox searchInput={searchInput} setSearchInput={setSearchInput} />
      </Row>
      <Row>
        <ProteinList protein={protein} setProtein={setProtein} />
      </Row>
    </Container>
  );
};

export default App;