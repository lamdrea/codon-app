/**
 * Parses keyCode for valid key code values [A, U, C, G] and uppercases them.
 * All other values are ignored (for now...) and returns an empty string.
 * @param {int} keyCode The keyCode associated with the event input
 * @returns {string}    The parsed keyCode
 * @todo Handle tab, left arrow, up arrow, right arrow, and down arrow inputs
 */
const parseKeyCode = (keyCode) => {
    const validKeyCodes = {
        65: 'A',
        67: 'C',
        71: 'G',
        85: 'U'
    }

    if (Object.hasOwn(validKeyCodes, keyCode)) {
        return validKeyCodes[keyCode].toUpperCase();
    } else {
        return '';
    }
}

/**
 * Upon hitting backspace, if current box value is empty, delete previous box value and move 
 * the selector to that box. Otherwise, deletes the current value on the box that selector is currently on.
 * @param {obj} e 
 * @param {obj} props 
 */
const handleBackspace = (e, props) => {
    /**
     * Upon hitting backspace, if the current box value is empty, delete the previous box value 
     * and move the selector to that box.
     * Otherwise, deletes current value on whichever box the selector is currently on.
     */

     const target = e.target.id;
     const index = parseInt(target);
     const form = e.target.form.elements; //HTML selector for the different elements inside <form>

     if (e.target.value === '') {
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

const updateDisplay = (e, props, validInput) => {
    /**
     * Upon valid input [A, U, C, G], update the current box with that value and move the selector forward.
     */

     const target = e.target.id;
     const index = parseInt(target);
     const form = e.target.form.elements; //HTML selector for the different elements inside <form>

     props.setSearchInput({
        ...props.searchInput,
        [target]: validInput
    });
    form[index + 1].focus();
}

const CodonSearchBox = (props) => {
    const handleChange = e => {
        // Only accepts A, U, C or G and converts to upper case
        // const target = e.target.id;
        // const index = parseInt(target); //changes the string ID into an integer
        // const form = e.target.form.elements; //HTML selector for the different elements inside <form>

        let adjustedInput = parseKeyCode(e.keyCode);

        // If current value is empty, delete previous box value and move selector to previous box
        // Otherwise, delete the current value and remain on current box
        if (e.key === 'Backspace') {
            handleBackspace(e, props);
        
        // For AUCG, update box value and move selector forward
        } else if (adjustedInput !== '') {
            updateDisplay(e, props, adjustedInput);
        }
        e.preventDefault();
    }

    return (
        <form class="search-wrapper">
            <input
                type="text"
                value={props.searchInput[0]}
                maxLength={1}
                onKeyDown={handleChange}
                className="searchBox"
                id="0"
            />
            <input
                type="text"
                value={props.searchInput[1]}
                maxLength={1}
                onKeyDown={handleChange}
                className="searchBox"
                id="1"
            />
            <input
                type="text"
                value={props.searchInput[2]}
                maxLength={1}
                onKeyDown={handleChange}
                className="searchBox"
                id="2"
            />
        </form>
    )
}

export default CodonSearchBox;
