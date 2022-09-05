import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

const HelpBox = ({ show, onHide }) => {
    return (
        //if show is true, display, otherwise return nothing
        <>
            {
                show ?
                    <Modal show={show} onHide={onHide} centered size="lg">
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col lg="3" className="mb-3">
                                        <h3>Contents</h3><br />

                                        01. Background Info <br />
                                        What is an amino acid?<br />
                                        What is a codon?<br /><br />

                                        02. How to Use This Tool<br /><br />

                                        03. Sources

                                    </Col>
                                    <Col>
                                        <h3>How to Use This Tool</h3><br />

                                        Proteins are large, complex molecules that play many critical roles in the body. They do most of the work in cells required for the structure, function, and regulation of the body’s tissues and organs.
                                        <br /><br />
                                        Genes direct the production of proteins through transcription, where information from DNA is passed to mRNA, followed by translation, where a ribosome reads the mRNA sequences (codons) and assembles the protein with corresponding amino acids.
                                        <br /><br />
                                        This tool lets you enter any mRNA codon and shows you information about the amino acid it encodes for.
                                        <br /><br />

                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>

                    </Modal>
                    : null
            }
        </>
    );
};

export default HelpBox;