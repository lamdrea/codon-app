/**
 * Simulating backend, which is not needed currently.
 * Here we will fetch from a fake API, read a database and store it.
 */
// ENVIRONMENT_CONFIGS = {
//     "backend_url": "https://sample-url-dev.com"
// }
// fake_fetch("https://sample-url-dev.com/aminoacids?code=1")

// Read amino acid database and store into an object
const AA_TABLE = require('./aminoacid_database.json');

// Generate look-up table dynamically after AA_TABLE is read.
// It's more performant to store it in a file but I don't want to type it out.
// Also, decided to store it as an array instead of an object to allow for progressive search feature later.
const CODON2AA = [];

// CONVERT AA_TABLE INTO AN ARRAY WITH CODONS AS KEYS, AA AS VALUE 
// [[codon1, aminoacid1], [codon2, aminoacid2],...] [["GCU", "Alanine"], ["GCC", "Alanine"]]
// For each key in object, look up codon (an array)
// For the length of codon, store each index as its own key in an array, 
// and assign the current object key to it as the name. Move onto the next object key and repeat.
// Finally, sort the array alphabetically.
for (var aminoacid in AA_TABLE) {
    for (let i = 0; i < AA_TABLE[aminoacid].codon.length; i++) {
        CODON2AA.push([AA_TABLE[aminoacid].codon[i], aminoacid]);
    };
}
CODON2AA.sort();


/**
 * Fetch a response from a fake URL
 */
// function fake_fetch(url) {
//     // parse url into methods here
//     _router(url)
// }

/**
 * Based on the URL, determine what fetch function to apply
 */
// function _router(url) {
//     // sample parsing that will not work
//     return {
//         "sample-url/aminoacids": fetch_aminoacids(),
//         "sample-url/aminoacids?code=1": fetch_aminoacids_by_code(1),
//         "sample-url/aminoacids?name=21": fetch_aminoacids_by_name("aminoacid21"),
//     }[url]
// }

/**
 * 
 * @returns an object containing all amino acid objects
 */
function _fetch_aminoacids() {
    return AA_TABLE;
}

/**
 * Dynamically fetch an amino acid based on codon through the lookup table. Then, search in the master table
 *  for the amino acid key and return the corresponding object.
 * @param {str} codonFirst    the first letter of the codon
 * @param {str} codonSecond   the second letter of the codon
 * @param {str} codonThird    the third letter of the codon
 * @returns                   the matching amino acid object
 */
function _fetch_aminoacid_by_codon(codonFirst, codonSecond, codonThird) {
    var tempAAList = new Set([]); 
    for (let [codon, aminoAcid] of CODON2AA) {
        if ((codonFirst === codon[0] || codonFirst === "") &&
            (codonSecond === codon[1] || codonSecond === "") &&
            (codonThird === codon[2] || codonThird === "")) { 
            tempAAList.add(aminoAcid);
        }
    }

    //change the set into array and sort it
    var aminoacidObj = {};
    for (let aminoAcid of [...tempAAList].sort()) {
        aminoacidObj[aminoAcid] = AA_TABLE[aminoAcid];
    }

    return aminoacidObj;
}

export { _fetch_aminoacids, _fetch_aminoacid_by_codon };


