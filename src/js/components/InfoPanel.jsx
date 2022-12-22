import { useState } from "react";
import isExpired from "../helper/determineExpiration";

function InfoPanel(props) {

    let useUntilTomorrowProducts = [];
    const totalStock = props.products.reduce((currentStock, product) => product.stock + currentStock, 0);

        /*-----Hilfsmethoden----- O(1) < O(log(n)) < O(n) < O(n*log(n)) < O(n^2) < O(2^n) < O(n!)*/
    //Gibt die geringste Verbrauchseinheit aller im Kühlschrank befindlichen Produkte zurück 
    function getMinCapa() {
        // Importiere Map in ein Array        
        //Finde den kleinsten PLatzverbrauch
        let minA = props.products.reduce((a,b)=>a.volume<b.volume?a:b).volume; // 30 chars time complexity:  O(n) 
        // let minB = Math.min(...productArray.map(x => x.getProductVolume())); // 26 chars time complexity: >O(2n)
        // let minC = productArray.sort((a,b)=>a.getProductVolume()-b.getProductVolume())[0].getProductVolume(); // 27 chars time complexity:  O(nlogn)
        return minA;
    }

    // console.log(getMinCapa());

    //Gibt die höchste Verbrauchseinheit aller im Kühlschrank befindlichen Produkte zurück 
    function getMaxCapa(){
        // Importiere Map in ein Array
        //Finde den höchsten Platzverbrauch
        let maxA = props.products.reduce((a,b)=>a.volume>b.volume?a:b).volume; // 30 chars time complexity:  O(n)
        // let maxB = Math.max(...productArray.map(x => x.getProductVolume())); // 26 chars time complexity: >O(2n)
        // let maxC = productArray.sort((a,b)=>b.getProductVolume()-a.getProductVolume())[0].getProductVolume(); // 27 chars time complexity:  O(nlogn) 
        return maxA;
    }

    props.products.forEach(product => {
        if (isExpired(product,"tomorrow")) {
            useUntilTomorrowProducts.push(product);
        }
    });
    




    return (
        <div className="col-1 py-4">
        {/* <!-- Das Info Panel auf der linken Seite für verschiedene Informationen bezüglich des Kühlschrank Zustands --> */}
        
            {/* <!-- Div für Label mit Anzahl der Produkte im Kühlschrank --> */}
            <div>
                <label className="form-label">Amount products 
                    <br />
                    <span className="badge text-bg-primary" id="products-amount-span">&nbsp;{totalStock}&nbsp;</span>
                </label>
            </div>

            {/* <!-- Div für Label freier Kühlschrank Kapazität --> */}
            <div>
                <label className="form-label">Free capacity
                    <br />
                    <span className="badge text-bg-success" id="fridge-free-capacity-span">{props.leftSpace}</span>
                </label>
            </div>
            
            {/* <!-- Div für Label der Anzahl der Produkte, die morgen ablaufen --> */}
            <div>
                <label className="form-label">Until tomorrow 
                    <br />
                    <button type="button" className="btn btn-warning .mx-auto infoPanelStyling" id="products-until-tomorrow-btn" data-bs-toggle="modal"       data-bs-target="#exampleModal">
                        <span className="badge text-bg" id="products-until-tomorrow-span">{useUntilTomorrowProducts.length}</span>
                    </button>
                </label>
            </div>

            {/* <!-- Div für Label der Anzahl der Produkte, die bereits abgelaufen sind --> */}
            <div>
                <label className="form-label">Expired products 
                    <br />
                    <button type="button" className="btn btn-danger .mx-auto infoPanelStyling" id="products-expired-btn" data-bs-toggle="modal"       data-bs-target="#exampleModal">
                        <span className="badge text-bg" id="products-expired-span">0</span>
                    </button>
                </label>
            </div>

            {/* <!-- Div für Label des Produkts mit dem kleinsten Volumen --> */}
            <div>
                <label className="form-label">Smallest products
                    <br />
                    <button type="button" className="btn btn-secondary .mx-auto infoPanelStyling" id="smallest-product-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <span className="badge text-bg" id="smallest-product-span">0</span>
                    </button>
                </label>
            </div>

            {/* <!-- Div für Label des Produkts mit dem größten Volumen --> */}
            <div>
                <label className="form-label">Biggest products
                    <br />
                    <button type="button" className="btn btn-secondary .mx-auto infoPanelStyling" id="biggest-product-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <span className="badge text-bg" id="biggest-product-span">0</span>
                    </button>
                </label>
            </div>
        </div>
    )
}

export default InfoPanel;

