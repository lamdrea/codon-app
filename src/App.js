import React, { useEffect, useState } from 'react';
import ProteinList from './components/ProteinList';
import CodonSearchBox from './components/CodonSearchBox';
import { _fetch_proteins, _fetch_protein_by_codon } from './backend/backend.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { CardGroup } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
import { QuestionCircle } from 'react-bootstrap-icons';
import HelpBox from './components/HelpBox';


const App = () => {

  // State of the help box
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Loads fake protein API upon website load
  //const API_PROTEINS = require('./backend/PROTEINS_API.json');

  //Keep track of search value and protein in a state
  const [searchInput, setSearchInput] = useState('');
  const [protein, setProtein] = useState(_fetch_proteins()) //initalizes with an object of all proteins

  useEffect(() => {
    // Everytime there's an event.. run this
    // When searchInput length = 3 and there are no empty strings, fetch the matching protein
    // Otherwise, reset to show all proteins
    if (!Object.values(searchInput).includes('') && Object.keys(searchInput).length === 3) {
      setProtein(_fetch_protein_by_codon(Object.values(searchInput).join('')));
    } else {
      setProtein(_fetch_proteins());
    }

  }, [searchInput]);

  return (
    //sets container as fluid up until screen size of sm breakpoint
    <Container fluid>
      <HelpBox show={show} onHide={handleClose} />
      <Row className="row-header">
        <Col>
        </Col>
        <Col sm='10' lg='8' className="title">
          <h1>Codon Translation</h1>
          <Row className="d-flex justify-content-space-between">
            <Col></Col>
            <Col sm='10'>
              <h2>A lookup tool for the 20 amino acids encoded by the human genetic code.</h2>
              <br />
            </Col>
            <Col></Col>
          </Row>
          <Row className="px-4 d-flex justify-content-center">
            <Col>
              {/* <center>Search by codon. Enter A, U, C or G:</center> */}
              <CodonSearchBox searchInput={searchInput} setSearchInput={setSearchInput} />
            </Col>
          </Row>
        </Col>
        <Col className="d-flex justify-content-end align-top">
          <QuestionCircle className="help-icon" onClick={() => handleShow()}></QuestionCircle>
        </Col>
      </Row>
      <Row className="row-cards">
        <Col md="2"></Col>
        <Col><ProteinList protein={protein} setProtein={setProtein} /></Col>
        <Col md="2"></Col>
      </Row>
    </Container>
  );
};

export default App;