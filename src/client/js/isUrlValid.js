// As there are many different options to check if a url is valid or not, I picked the one that suited best for me and I did not reinvent the wheel:
// https://tutorial.eyehunts.com/js/url-regex-validation-javascript-example-code/

function isUrlValid(UserInput) {
    const regex = UserInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(regex == null) {
        alert ('not a valid URL, try again')
        return 0;
    } else {
    return 1
    } 
}

 export { isUrlValid }