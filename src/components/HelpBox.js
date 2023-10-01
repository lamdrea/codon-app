import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import helpGuide from '../img/guide.png';

const HelpBox = ({ show, onHide }) => {
    return (
        //if show is true, display, otherwise return nothing
        <>
            {
                show ?
                    <Modal show={show} onHide={onHide} centered size="lg" title="help-module">
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body className="me-3 pe-3 thin-scrollbar">
                            <Accordion flush>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        How do I use this tool?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        In the search box, type in <b>A</b>, <b>U</b>, <b>C</b>, or <b>G</b>, which 
                                        stand for the 4 mRNA nucleotides.
                                        <br />
                                        <img src={helpGuide} alt="How to read the cards" class="center"/>
                                        This tool will then show you the amino acid that corresponds with the codon
                                        that you entered. On the card, you will find an image of the skeletal structure,
                                        other codons that code for that same amino acid, as well as the commonly used
                                        1 and 3 letter abbreviations.
                                        <br /><br />
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        What is an amino acid?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Amino acids are the building blocks that form polypeptides and ultimately proteins.
                                        <br /><br />
                                        There are 20 different types of amino acids that can be combined to make a protein
                                        within the human body.
                                        The sequence of amino acids determines each protein’s structure and specific
                                        function—changing even a single amino acid in a sequence can affect the final product!
                                        <br /><br />
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                        What is a codon?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        A codon is a sequence of three consecutive nucleotides in a DNA or RNA molecule that codes
                                        for a specific amino acid. Certain codons signal the start or end of translation,
                                        called start or stop codons.
                                        <br /><br />
                                        Here in our tool, we show mRNA codons, which consist of any combination of adenine (<b>A</b>), 
                                        uracil (<b>U</b>), cytosine (<b>C</b>), or guanine (<b>G</b>).
                                        <br /><br />
                                    </Accordion.Body>

                                    <Accordion.Item eventKey="3">
                                    <Accordion.Header>
                                        What role do codons and amino acids play in biology?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Amino acids are the building blocks of proteins, which are essential for
                                        all living things. Proteins are large, complex molecules that play many critical roles
                                        in the body and are important for cell structure and function, as well as regulation of 
                                        tissues and organs in the body.
                                        <br /><br />
                                        The body knows how to make proteins through instructions found in our genes.
                                        Genes direct the production of proteins through transcription, where
                                        information from DNA is passed to mRNA, followed by translation,
                                        where a ribosome reads the mRNA sequences (codons) and assembles
                                        the corresponding amino acids to form a protein.
                                        <br /><br />
                                    </Accordion.Body>
                                </Accordion.Item>
                                </Accordion.Item>
                            </Accordion>
                        </Modal.Body>

                    </Modal>
                    : null
            }
        </>
    );
};

export default HelpBox;