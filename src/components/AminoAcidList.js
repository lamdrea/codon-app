import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

//Upon first load, app displays all aminoacids (subject to change)
//This list will dynamically update after the user enters 3 letters in to the search bar
const AminoAcidList = (props) => {
    const aminoacidObj = props.aminoacid;
    return (
        <>
            <Row className="d-flex justify-content-evenly">
                {Object.keys(aminoacidObj).map((aminoacid) =>
                    // small - 1 col... large - 2 col ... xl - 3 col
                    <Col sm="12" lg="6" xl="4" className="d-flex justify-content-center" key={'Row ' + aminoacid}>
                        <Card className="AACard" data-testid="card">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <h3 key={aminoacidObj[aminoacid].id}>{aminoacid}</h3>
                                        <h5>{aminoacidObj[aminoacid].codon.join(" ")}</h5>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <Row>
                                    <Col className="d-flex justify-content-start align-items-end">
                                        <div className="circle-abbr-txt">
                                            <h6>{aminoacidObj[aminoacid].abbreviation1}</h6>
                                        </div>
                                        <div className="rect-abbr-txt">
                                            <h6>{aminoacidObj[aminoacid].abbreviation3}</h6>
                                        </div>
                                    </Col>
                                    <Col className="d-flex justify-content-end align-items-end">
                                        <img src={aminoacidObj[aminoacid].image} alt="Chemical structure of amino acid" className="img-AA"></img>
                                    </Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </Col>
                )}
            </Row>
        </>
    )
}

export default AminoAcidList;