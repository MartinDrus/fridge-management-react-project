

//Methode zur Ermittlung ob Ablaufdatum überschritten wird oder ist 
/* der Methode können folgende Argumente übergeben werden:
- "tomorrow" && "1" => Produkte die morgen ablaufen
- 2 => Produkte die morgen ÜBERablaufen
- WICHTIG => wird nichts übergeben als Parameter übergeben, also: .isExpired() 
=> Produkte die das MHD bereits überschritten haben
*/

function isExpired(product, when){
    //Ein Tag in Millisekunden
    const ONE_DAY = 1000*60*60*24;
    // Das Ablaufdatum des Produktes
    let expirationDate = new Date(product.date);
    // Das aktuelle Datum
    let now = new Date()
    // Setze Uhrzeiten beider Zeitstempel gleich
    expirationDate.setHours(0,0,0,0);
    now.setHours(0,0,0,0);
    // Nutze als Case im Fall vom Argument "tomorrow" die Tatsache, dass das MHD nur morgen ablaufen kann wenn es heute erreicht wurde 
    switch (when) {        
        case "tomorrow":
            return expirationDate.getTime() === now.getTime();
        case 1:
            return expirationDate.getTime() === ONE_DAY+now.getTime();
        case 2:
            return expirationDate.getTime() <= (ONE_DAY*when)+now.getTime();
        case 3:
            return expirationDate.getTime() <= (ONE_DAY*when)+now.getTime();
        default: 
            return now.getTime() > expirationDate.getTime();
    }
}

export default isExpired;