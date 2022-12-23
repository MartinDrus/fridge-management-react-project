
function getProductName(name){
    let formattedName = name.at(0).toUpperCase()+name.substring(1).toLowerCase();
    return formattedName;
}

export default getProductName;