// Simulate backend

// Not needed for now
// ENVIRONMENT_CONFIGS = {
//     "backend_url": "https://sample-url-dev.com"
// }
// fake_fetch("https://sample-url-dev.com/aminoacids?code=1")

// Read amino acid database and store into an object
const AA_TABLE = require('./aminoacid_database.json');

// Generate look-up table dynamically after AA_TABLE is read.
// It's more performant to store it in a file but I don't want to type it out.
// Also, decided to store it as an array instead of an object to allow for progressive search feature later
const CODES2AA = [];

// CONVERT AA_TABLE INTO AN ARRAY WITH CODONS AS KEYS, AA AS VALUE 
// [[codon1, aminoacid1], [codon2, aminoacid2],...]
// For each key in object, look up codon (an array)
// For the length of codon, store each index as its own key in an array, 
// and assign the current object key to it as the name. Move onto the next object key and repeat.
// Finally, sort the array alphabetically.
for (var aminoacid in AA_TABLE) {
    for (let i = 0; i < AA_TABLE[aminoacid].codon.length; i++) {
        CODES2AA.push([AA_TABLE[aminoacid].codon[i], aminoacid]);
    };
}
CODES2AA.sort();


// Fetch a response from a fake URL
// function fake_fetch(url) {
//     // parse url into methods here
//     _router(url)
// }

// Based on the URL, determine what fetch function to apply
// function _router(url) {
//     // sample parsing that will not work
//     return {
//         "sample-url/aminoacids": fetch_aminoacids(),
//         "sample-url/aminoacids?code=1": fetch_aminoacids_by_code(1),
//         "sample-url/aminoacids?name=21": fetch_aminoacids_by_name("aminoacid21"),
//     }[url]
// }

// Returns all amino acids in an object
function _fetch_aminoacids() {
    return AA_TABLE;
}

// Fetch a amino acid based on codon thru the lookup table
// Then, it searches in the master table for the amino acid key and returns the corresponding object.
function _fetch_aminoacid_by_codon(codon) {
    var matchedAminoAcidName = '';
    var aminoacidObj = {};

    for (let i = 0; i < CODES2AA.length; i++) {
        if (CODES2AA[i][0] === codon) {
            matchedAminoAcidName = CODES2AA[i][1];
            break;
        }
    }
    aminoacidObj[matchedAminoAcidName] = AA_TABLE[matchedAminoAcidName];

    return aminoacidObj;
}

export { _fetch_aminoacids, _fetch_aminoacid_by_codon };


