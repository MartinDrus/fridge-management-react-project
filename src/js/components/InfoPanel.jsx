import { useState } from "react";
import isExpired from "../helper/determineExpiration";

function InfoPanel(props) {

    const totalStock = props.products.reduce((currentStock, product) => product.stock + currentStock, 0);

    /*-----Hilfsmethoden----- O(1) < O(log(n)) < O(n) < O(n*log(n)) < O(n^2) < O(2^n) < O(n!)*/

    function getMinCapa() {
   
        //Finde den kleinsten PLatzverbrauch
        let minA = props.products.reduce((a,b)=>a.volume<b.volume?a:b).volume; // 30 chars 
        return minA;
    }


    function getMaxCapa(){

        let maxA = props.products.reduce((a,b)=>a.volume>b.volume?a:b).volume; // 30 chars time complexity:  O(n)

        return maxA;
    }


    //Warum hier? Wegen der Anzahl
    let useUntilTomorrowProducts = [];
        props.products.forEach(product => {
            if (isExpired(product,1)) useUntilTomorrowProducts.push(product);
        });
    const handleQuickUseProducts = () => props.showModalCallback(useUntilTomorrowProducts);

    //Warum hier? Wegen der Anzahl
    let expiredProducts = [];
        props.products.forEach(product => {
            if (isExpired(product)) expiredProducts.push(product);
        });
    const handleExpiredProducts = () => props.showModalCallback(expiredProducts);


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
                <label className="form-label">Use Quick 
                    <br />
                    <button type="button" className="btn btn-warning .mx-auto infoPanelStyling" onClick={handleQuickUseProducts}>
                        <span className="badge text-bg" id="products-until-tomorrow-span">{useUntilTomorrowProducts.length}</span>
                    </button>
                </label>
            </div>

            {/* <!-- Div für Label der Anzahl der Produkte, die bereits abgelaufen sind --> */}
            <div>
                <label className="form-label">Expired products 
                    <br />
                    <button type="button" className="btn btn-danger .mx-auto infoPanelStyling" onClick={handleExpiredProducts}>
                        <span className="badge text-bg" id="products-expired-span">{expiredProducts.length}</span>
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

