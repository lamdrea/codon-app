import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

//Upon first load, app displays all proteins (subject to change)
//This list will dynamically update after the user enters 3 letters in to the search bar
const ProteinList = (props) => {
    const proteinObj = props.protein;
    return (
        <>
            <Row className="justify-content-center">
                {/* <CardGroup> */}
                {Object.keys(proteinObj).map((protein) =>
                    <Col sm="8" lg="6" xl="4">
                        <Card className="AACard">
                            <Card.Body>
                                <h3 key={proteinObj[protein].id}>{protein}</h3>
                                <h2>{proteinObj[protein].codon.join(" ")}</h2>
                                <Row className="align-items-end">
                                    <Col>
                                        {proteinObj[protein].abbreviation1}
                                        {proteinObj[protein].abbreviation3}
                                    </Col>
                                    <Col className="d-flex justify-content-end">
                                        <img src={proteinObj[protein].image} alt="Chemical structure of {protein}" height={'80px'}></img>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                )}

                {/* </CardGroup> */}
            </Row>
        </>
    )
}

export default ProteinList;