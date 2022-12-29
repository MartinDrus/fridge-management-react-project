
function setExpirationDate(days){
    //Rufe aktuellen Zeitstempel auf
    let date = new Date();
    //Extrahiere den heutigen Tag des Monats
    let dayOfMonth = date.getDate();
    //Summiere gültige Tage auf den heutigen Tag auf
    date.setDate(dayOfMonth+(days-1))
    //Weise formatiertes neues Ablaufdatum dem Produkt zu 
    return date.toISOString().substring(0,10);
}

export default setExpirationDate;