import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faCartShopping, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

import getProductName from '../helper/formattedProductName';
import determineExpiration from '../helper/determineExpiration';
import MultipleProductsBadge from './MultipleProductsBadge'
import { useState } from 'react';

function ProductCardItem(props) {
    // If checked => added to cart
    let [checked, setChecked] = useState(false);

    function adjustRepurchase(changeChecked) {
        setChecked(currentlyChecked => {
            return currentlyChecked = changeChecked;
        });
    };

    let picPath = `../src/assets/img/foodIcons/${props.product.name.toLowerCase()}.png`;
    let expDate = new Date(props.product.date).toLocaleDateString('de-DE');
    let shownName = getProductName(props.product.name);
    let altTag = `Picture of ${shownName}`;
    let stock = props.product.stock;
    let totalVolume = (props.product.volume * props.product.stock);

    // Styling CSS-Classes when expired or close to
    let isExpired = determineExpiration(props.product);
    let dangerIconClass = `btn btn-sm btn-outline-primary ${isExpired ? "btn-outline-danger" : ""}`;
    let useQuickly = determineExpiration(props.product, 1);
    let displayDateClass = `card-subtitle ${isExpired ? "card-subtitle text-danger" : useQuickly ? "text-warning" : "text-muted" }`;

    const handleDeleteProduct = (evt) => props.deleteProductCallback(props.product.id);
    const handleAddProduct = (evt) => props.addProductCallback(props.product);
    const handleAddToCart = (evt) => {
        props.product.repurchase = evt.target.checked;
        adjustRepurchase(checked);
        props.checkedForCart(props.product);
    }

    // Placeholderimage in case no picture is found in database 
    const onImageError = (e) => {
        const placeHolderImage = "../src/assets/img/foodIcons/cutlery.png";
        e.target.src = placeHolderImage;
    }
    
    return (
        <div id="yogurt-identifier" className="card">
            <div className="card-body d-flex flex-column align-items-center">
                <img className="card-img-top" src={picPath} alt={altTag} onError={onImageError}/>
                <h5 className="card-title">{shownName}</h5>
                <h6 className={displayDateClass}>{expDate}</h6>
                <p className="card-text mb-1">{stock > 1 ? `Vol: ${props.product.volume}%| ${totalVolume}%`: `Vol: ${props.product.volume}%`}</p>
                <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                    <button type="button" className={dangerIconClass} id="deleteBtn" onClick={handleDeleteProduct}>
                        {isExpired ? <FontAwesomeIcon icon={faTrash} /> : <FontAwesomeIcon icon={faUtensils} /> }
                    </button>
                    <input type="checkbox" className="btn-check" id={props.product.id}  autoComplete="off" checked={props.product.repurchase} onChange={handleAddToCart}/>
                    <label className="btn btn-outline-primary" htmlFor={props.product.id}>
                        <FontAwesomeIcon icon={faCartShopping} htmlFor={props.product.id} />
                    </label>
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleAddProduct}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
            {stock > 1 && <MultipleProductsBadge amount={stock}/>}
        </div>
    )
}



export default ProductCardItem;