import React, { useEffect, useState } from 'react';
import './App.css';
import ProteinList from './components/ProteinList';
import CodonSearchBox from './components/CodonSearchBox';
import { _fetch_proteins, _fetch_protein_by_codon } from './backend/backend.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Button from 'react-bootstrap/Button';


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
      <Row className="row-header">
        <Col>
        </Col>
        <Col sm='8' className="title">
          <h1>Codon Translation</h1>
          <Row className="d.flex justify-content-space-between">
            <Col></Col>
            <Col sm='10'>
              <h2>A lookup tool for the 20 amino acids encoded by the human genetic code.</h2>
              <br />
            </Col>
            <Col></Col>
          </Row>
          <Row className="px-4 d-flex justify-content-center">
            Enter A, U, C or G:
            <br />
            <CodonSearchBox searchInput={searchInput} setSearchInput={setSearchInput} />
          </Row>
        </Col>
        <Col className="d-flex justify-content-end align-top">
          ? help
        </Col>
      </Row>
      <Row>
        <ProteinList protein={protein} setProtein={setProtein} />
      </Row>
    </Container>
  );
};

export default App;