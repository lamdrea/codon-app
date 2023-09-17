const NUCLEOTIDES = ["A", "C", "G", "U"];

/**
 * Upon receiving a Nucleotide letter, change the state. Also move the selector to the following box.
 * @param {obj} e 
 * @param {obj} props 
 */
const handleNucleotideInput = (e, props) => {
    const index = parseInt(e.target.id);
    const form = e.target.form.elements; //HTML selector for the different elements inside <form>

    props.setSearchInput({
        ...props.searchInput,
        [index]: e.key.toUpperCase()
    });

    if (index < 2) {
        form[index + 1].focus();
    }
}
/**
 * Upon hitting backspace, if current box value is empty, delete previous box value and move 
 * the selector to that box. Otherwise, deletes the current value on the box that selector is currently on.
 * @param {obj} e 
 * @param {obj} props 
 */
const handleBackspace = (e, props) => {
    const index = parseInt(e.target.id);
    const form = e.target.form.elements; //HTML selector for the different elements inside <form>

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


const CodonSearchBox = (props) => {
    
    const handleChange = e => {
        // If current value is empty, delete previous box value and move selector to previous box
        // Otherwise, delete the current value and remain on current box

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