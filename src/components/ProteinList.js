import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

//Upon first load, app displays all proteins (subject to change)
//This list will dynamically update after the user enters 3 letters in to the search bar
const ProteinList = (props) => {
    const proteinObj = props.protein;
    return (
        <>
            <Row className="d-flex justify-content-evenly">
                {Object.keys(proteinObj).map((protein) =>
                    // small - 1 col... large - 2 col ... xl - 3 col
                    <Col sm="12" lg="6" xl="4" className="d-flex justify-content-center">
                        <Card className="AACard">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <h3 key={proteinObj[protein].id}>{protein}</h3>
                                        <h5>{proteinObj[protein].codon.join(" ")}</h5>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <Row>
                                    <Col className="d-flex justify-content-start align-items-end">
                                        <div className="circle-abbr-txt">
                                            <h6>{proteinObj[protein].abbreviation1}</h6>
                                        </div>
                                        <div className="rect-abbr-txt">
                                            <h6>{proteinObj[protein].abbreviation3}</h6>
                                        </div>
                                    </Col>
                                    <Col className="d-flex justify-content-end align-items-end">
                                        <img src={proteinObj[protein].image} alt="Chemical structure of amino acid" className="img-AA"></img>
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

export default ProteinList;