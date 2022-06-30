
/** 
 * setalert function create
 */

const setAlert = (msg, bg = "danger") => {
    return `<p class='alert alert-${bg} d-flex justify-content-between'>${msg} <button data-bs-dismiss="alert" class="btn-close"></button></p>`
};

/**
 * set data in LS
 */

const createLSdata = (key, value) => {
    
    // init value
    let data = [];

    //check key exitx or not
    if (localStorage.getItem(key)) {
        data = JSON.parse(localStorage.getItem(key));
    };
    data.push(value);
    localStorage.setItem(key, JSON.stringify(data));
};
/**
 * read localstroge data
*/
const readLSData = (key) => {
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    } else {
        return false;
    }
    
}
// update our LS data
const updateLsdata = (key, array) => {
    localStorage.setItem(key, JSON.stringify(array));
}

