import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const HIGHLIGHT_INDICATOR = "*"

/**
 * 
 * @param {*} aminoacidInfo 
 * @param {*} searchInput 
 * @returns a nested array of letters for each codon letter and space [['g', 'c', 'u', ' ', 'g', 'c', 'c', ' '...]]
 */
const codonListWithHighlights = (aminoacidInfo, searchInput) => {
    const codonFirst = searchInput[0];
    const codonSecond = searchInput[1];
    const codonThird = searchInput[2];
    
    //3 letters - highlight only the match
    const searchInputArr = Object.values(searchInput);
    if (searchInputArr.every(Boolean)){
        return aminoacidInfo.codon.map((codon) => {
            if (searchInputArr.join("") === codon) {
                return [
                    `${HIGHLIGHT_INDICATOR}${codon[0]}`, 
                    `${HIGHLIGHT_INDICATOR}${codon[1]}`, 
                    `${HIGHLIGHT_INDICATOR}${codon[2]}`, 
                    " "
                ];
            }
            else {
                return (codon + " ").split("");
            }
        })
    }

    //highlighting everything matching search input
    const codonList = [];
    for (var codon of aminoacidInfo.codon) {
        codonList.push([
            codonFirst === codon[0] ? `${HIGHLIGHT_INDICATOR}${codon[0]}` : codon[0],
            codonSecond === codon[1] ? `${HIGHLIGHT_INDICATOR}${codon[1]}` : codon[1],
            codonThird === codon[2] ? `${HIGHLIGHT_INDICATOR}${codon[2]}` : codon[2],
            " "
        ])
    } 
    return codonList;
}

/**
 * Per each letter, if it starts with HIGHLIGHT_INDICATOR, apply span formatting
 * @param {*} unfmtNucleoArr an array of letters, some have a HIGHLIGHT_INDICATOR
 * @returns 
 */

const highlightLettersByIndicator = (unfmtNucleoArr) => {
    return (
        unfmtNucleoArr.map((unfmtNucleo, index) => {
            if (unfmtNucleo.startsWith(HIGHLIGHT_INDICATOR)) {
                const key = `${unfmtNucleoArr.join("").replaceAll(HIGHLIGHT_INDICATOR, "")}${index}`
                const nucleo = unfmtNucleo.replace(HIGHLIGHT_INDICATOR, "")
                return (<span key={key}>{nucleo}</span>)
            } else {
                return (unfmtNucleo)
            }
        })
    )
}


/**
 * Component that displays all amino acid cards until user enters 3 letters into the search bar, which then shows 
 *  the 1 matching amino acid card.
 * @param {*} props     Object containing current displayed amino acid objects
 * @param {*} props.aminoacid     Object containing current displayed amino acid objects
 * @param {*} props.searchInput     Object containing 3 search input
 * @returns             Cards w/ amino acid information
 */
const AminoAcidList = (props) => {
    const aminoacidObj = props.aminoacid;
    return (
        <>
            <Row className="d-flex justify-content-evenly">
                {Object.keys(aminoacidObj).map((aminoacid) =>
                    <Col sm="12" lg="6" xl="4" className="d-flex justify-content-center" key={'Row ' + aminoacid}>
                        <Card className="AACard" data-testid="card">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        {/* Name of AA */}
                                        <h3 key={aminoacidObj[aminoacid].id}>{aminoacid}</h3>
                                        {/* Codon List */}
                                        <h5>{codonListWithHighlights(aminoacidObj[aminoacid], props.searchInput).map((codon) => highlightLettersByIndicator(codon))}</h5>
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