const CodonSearchBox = (props) => {

    const handleChange = e => {
        // Only accepts A, U, C or G and converts to upper case
        const adjustedInput = e.target.value.replace(/[^AUCG]/gi, '').toUpperCase();
        props.setSearchInput(adjustedInput);
    }

    return (
        <input
            type="text"
            value={props.searchInput}
            maxLength={3}
            onChange={handleChange}
        />
    )
}

export default CodonSearchBox;