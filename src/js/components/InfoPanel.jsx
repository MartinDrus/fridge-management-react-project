import { useState } from "react";
import isExpired from "../helper/determineExpiration";


function InfoPanel(props) {

    const totalStock = props.products.reduce((currentStock, product) => product.stock + currentStock, 0)
    
    ////-------------------------------------------------------------------------------------
    let useUntilTomorrowProducts = [];
    props.products.forEach(product => {
        if (isExpired(product,"tomorrow")) useUntilTomorrowProducts.push(product);
    });
    const handleQuickUseProducts = (evt) => {
        let purpose = evt.target.parentNode.parentNode.innerText.split('\n')[0];
        props.showModalCallback(useUntilTomorrowProducts, purpose);
    };
    ////-------------------------------------------------------------------------------------
    let expiredProducts = [];
    props.products.forEach(product => {
        if (isExpired(product)) expiredProducts.push(product);
    });
    const handleExpiredProducts = (evt) => {
        let purpose = evt.target.parentNode.parentNode.innerText.split('\n')[0];
        props.showModalCallback(expiredProducts, purpose);
    };
    ////-------------------------------------------------------------------------------------
    let smallestProducts = [];
    let smallestVolumeUnit = props.products.reduce((a,b)=>a.volume<b.volume?a:b, 0).volume;
    props.products.forEach(product => {
        if (product.volume === smallestVolumeUnit) smallestProducts.push(product);
    })
    const handleSmallestProducts = (evt) => {
        let purpose = evt.target.parentNode.parentNode.innerText.split('\n')[0];
        props.showModalCallback(smallestProducts, purpose);
    }
    ////-------------------------------------------------------------------------------------
    let biggestProducts = [];
    let biggestVolumeUnit = props.products.reduce((a,b)=>a.volume>b.volume?a:b, 0).volume;
    props.products.forEach(product => {
        if (product.volume === biggestVolumeUnit) biggestProducts.push(product);
    })
    const handleBiggestProducts = (evt) => {
        let purpose = evt.target.parentNode.parentNode.innerText.split('\n')[0];
        props.showModalCallback(biggestProducts, purpose);
    }

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
                        <span className="badge text-bg">{expiredProducts.length}</span>
                    </button>
                </label>
            </div>

            {/* <!-- Div für Label des Produkts mit dem kleinsten Volumen --> */}
            <div>
                <label className="form-label">Smallest products
                    <br />
                    <button type="button" className="btn btn-secondary .mx-auto infoPanelStyling" onClick={handleSmallestProducts}>
                        <span className="badge text-bg">{smallestProducts.length >= 1 ? smallestProducts.length : "-"}</span>
                    </button>
                </label>
            </div>

            {/* <!-- Div für Label des Produkts mit dem größten Volumen --> */}
            <div>
                <label className="form-label">Biggest products
                    <br />
                    <button type="button" className="btn btn-secondary .mx-auto infoPanelStyling" onClick={handleBiggestProducts}>
                        <span className="badge text-bg">{biggestProducts.length >= 1 ? biggestProducts.length : "-"}</span>
                    </button>
                </label>
            </div>
        </div>
    )
}

export default InfoPanel;

