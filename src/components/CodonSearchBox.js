const NUCLEOTIDES = ["A", "C", "G", "U"];

/**
 * Handles receiving a valid nucleotide letter and moves the selector.
 * @param {obj} e       user input event
 * @param {obj} props   includes state of current search box
 * @returns             updated searchInput and new selector position
 */
const handleNucleotideInput = (e, props) => {
    const index = parseInt(e.target.id);
    const form = e.target.form.elements; 

    props.setSearchInput({
        ...props.searchInput,
        [index]: e.key.toUpperCase()
    });

    if (index < 2) {
        form[index + 1].focus();
    }
}

/**
 * Handles backspace input and moves the selector.
 * @param {obj} e       user input event
 * @param {obj} props   current searchInput state
 * @returns             updated searchInput and new selector position
 */
const handleBackspace = (e, props) => {
    const index = parseInt(e.target.id);
    const form = e.target.form.elements; 

    //If current box is empty, move and delete the previous box
    if (e.target.value === '' && index !== 0) {
        form[index - 1].focus();
        props.setSearchInput({
            ...props.searchInput,
            [index - 1]: ''
        });
    } else {
        props.setSearchInput({
            ...props.searchInput,
            [index]: ''
        })
    }
}

/**
 * Component that allows user to search codon combinations.
 * @param {*} props     Inherits searchInput state
 * @returns             Updated searchInput and input forms.
 */
const CodonSearchBox = (props) => {
    /**
     * Handles valid inputs from the user.
     * @param {*} e     User input event
     */
    const handleChange = e => {
        if (NUCLEOTIDES.includes(e.key.toUpperCase())) {
            handleNucleotideInput(e, props);
        }
        else if (e.key === 'Backspace') {
            handleBackspace(e, props);
        }
        e.preventDefault();
    }

    return (
        <form className="search-wrapper">
            <input
                type="text"
                defaultValue={props.searchInput[0]}
                maxLength={1}
                onKeyDown={handleChange}
                className="searchBox"
                id="0"
            />
            <input
                type="text"
                defaultValue={props.searchInput[1]}
                maxLength={1}
                onKeyDown={handleChange}
                className="searchBox"
                id="1"
            />
            <input
                type="text"
                defaultValue={props.searchInput[2]}
                maxLength={1}
                onKeyDown={handleChange}
                className="searchBox"
                id="2"
            />
        </form>
    )
}

export default CodonSearchBox;
export {
    handleBackspace
}