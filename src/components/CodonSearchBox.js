const CodonSearchBox = (props) => {

    const handleChange = e => {
        // Only accepts A, U, C or G and converts to upper case
        const target = e.target.id;
        const index = parseInt(target); //changes the string ID into an integer
        const form = e.target.form.elements; //HTML selector for the different elements inside <form>
        const keyCodeListObj = {
            65: 'A',
            67: 'C',
            71: 'G',
            85: 'U'
            // 8: 'Backspace',
            // 9: 'Tab',
            // 37: 'Left arrow',
            // 38: 'Up arrow',
            // 39: 'Right arrow',
            // 40: 'Down arrow'
        }

        //if e.keyCode is any of A U C G, change it to uppercase and set variable
        //for ANYTHING ELSE (for now), set variable to empty string
        let adjustedInput = '';
        if (Object.hasOwn(keyCodeListObj, e.keyCode)) {
            adjustedInput = keyCodeListObj[e.keyCode].toUpperCase();
        } else {
            adjustedInput = '';
        }

        // If current value is empty, delete previous box value and move selector to previous box
        // Otherwise, delete the current value and remain on current box
        if (e.key === 'Backspace') {
            if (e.target.value === '') {
                form[index - 1].focus();
                props.setSearchInput({
                    ...props.searchInput,
                    [index-1]: ''
                });
            } else {
                props.setSearchInput({
                    ...props.searchInput,
                    [index]: ''
                })
            }


        // For AUCG, update box value and move selector forward
        } else if (adjustedInput !== '') {
            props.setSearchInput({
                ...props.searchInput,
                [target]: adjustedInput
            });
            form[index + 1].focus();
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
