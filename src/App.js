import React, { useEffect, useState } from 'react';
import AminoAcidList from './components/AminoAcidList';
import CodonSearchBox from './components/CodonSearchBox';
import { _fetch_aminoacids, _fetch_aminoacid_by_codon } from './backend/backend.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { QuestionCircle } from 'react-bootstrap-icons';
import HelpBox from './components/HelpBox';

const App = () => {
  //Help state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //If I had an API, I would call it here:
  //const API_AMINOACIDS = require('./backend/AMINOACIDS_API.json');

  //Keep track of search input and amino acid display in a state
  //Initalize with an object of all amino acids
  const [searchInput, setSearchInput] = useState({ 0: '', 1: '', 2: '' });
  const [aminoacid, setAminoAcid] = useState(_fetch_aminoacids())

  useEffect(() => {
    //Trigger whenever there is any valid input in the boxes
    if (Object.values(searchInput).some(Boolean)) {
      setAminoAcid(_fetch_aminoacid_by_codon(searchInput[0], searchInput[1], searchInput[2]));
    } else {
      setAminoAcid(_fetch_aminoacids());
    }


  }, [searchInput]);

  return (
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
          <QuestionCircle className="help-icon" title="help-icon" onClick={() => handleShow()}></QuestionCircle>
        </Col>
      </Row>
      <Row className="row-cards">
        <Col md="2"></Col>
        <Col><AminoAcidList aminoacid={aminoacid} searchInput={searchInput} /></Col>
        <Col md="2"></Col>
      </Row>
    </Container>
  );
};

export default App;