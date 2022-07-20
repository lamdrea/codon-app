import React from 'react';

//Upon first load, app displays all proteins (subject to change)
//This list will dynamically update after the user enters 3 letters in to the search bar
const ProteinList = (props) => {
    const proteinObj = props.protein;
    return (
        Object.keys(proteinObj).map((protein) =>
            <>
                <h3 key={proteinObj[protein].id}>{protein}</h3>
            </>
        )
    )
}

export default ProteinList;