// Simulate backend

// Not needed for now
// ENVIRONMENT_CONFIGS = {
//     "backend_url": "https://sample-url-dev.com"
// }
// fake_fetch("https://sample-url-dev.com/proteins?code=1")

// Read protein database and store into an object
const PROTEIN_TABLE = require('./protein_database.json');

// Generate look-up table dynamically after PROTEIN_TABLE is read.
// It's more performant to store it in a file but I don't want to type it out.
// Also, decided to store it as an array instead of an object to allow for progressive search feature later
const CODES2PROTEIN = [];

// CONVERT PROTEIN_TABLE INTO AN ARRAY WITH CODONS AS KEYS, PROTEIN AS VALUE 
// [[codon1, protein1], [codon2, protein2],...]
// For each key in object, look up codon (an array)
// For the length of codon, store each index as its own key in an array, 
// and assign the current object key to it as the name. Move onto the next object key and repeat.
// Finally, sort the array alphabetically.
for (var protein in PROTEIN_TABLE) {
    for (let i = 0; i < PROTEIN_TABLE[protein].codon.length; i++) {
        CODES2PROTEIN.push([PROTEIN_TABLE[protein].codon[i], protein]);
    };
}
CODES2PROTEIN.sort();


// Fetch a response from a fake URL
// function fake_fetch(url) {
//     // parse url into methods here
//     _router(url)
// }

// Based on the URL, determine what fetch function to apply
// function _router(url) {
//     // sample parsing that will not work
//     return {
//         "sample-url/proteins": fetch_proteins(),
//         "sample-url/proteins?code=1": fetch_proteins_by_code(1),
//         "sample-url/proteins?name=21": fetch_proteins_by_name("protein21"),
//     }[url]
// }

// Returns all proteins in an object
function _fetch_proteins() {
    return PROTEIN_TABLE;
}

// Fetch a protein based on codon thru the lookup table
// Then, it searches in the master table for the protein key and returns the corresponding object.
function _fetch_protein_by_codon(codon) {
    var matchedProteinName = '';
    var proteinObj = {};

    for (let i = 0; i < CODES2PROTEIN.length; i++) {
        if (CODES2PROTEIN[i][0] === codon) {
            matchedProteinName = CODES2PROTEIN[i][1];
            break;
        }
    }
    proteinObj[matchedProteinName] = PROTEIN_TABLE[matchedProteinName];

    return proteinObj;
}

export { _fetch_proteins, _fetch_protein_by_codon };


