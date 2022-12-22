import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faCartShopping, faPlus } from '@fortawesome/free-solid-svg-icons'

import MultipleProductsBadge from './MultipleProductsBadge'
import { useState } from 'react';

/* const eaten = <FontAwesomeIcon icon={faUtensils} />
const cart = <FontAwesomeIcon icon={faCartShopping} />
const plus = <FontAwesomeIcon icon={faPlus} /> */

function ProductCardItem(props) {

    let [checked, setChecked] = useState(props.product.repurchase)

    let picPath = `../src/assets/img/foodIcons/${props.product.name.toLowerCase()}.png`;
    let expDate = new Date(props.product.date).toLocaleDateString('de-DE');
    let shownName = getProductName(props.product.name);
    let altTag = `Picture is ${shownName}`;
    let stock = props.product.stock;
    let totalVolume = (props.product.volume * props.product.stock)

    function handleDeleteProduct(evt) {
        props.deleteProductCallback(props.product.id);
    }

    function handleAddProduct(evt) {
        props.addProductCallback(props.product)
    }

    function handleAddToCart(evt) {
        props.product.repurchase = !checked;
        setChecked(!checked)
        props.checkedForCart(props.product)
    }
    
    return (
        <div id="yogurt-identifier" className="card">
            <div className="card-body d-flex flex-column align-items-center">
                <img className="card-img-top" src={picPath} alt={altTag} />
                <h5 className="card-title">{shownName}</h5>
                <h6 className="card-subtitle text-muted">{expDate}</h6>
                <p className="card-text mb-1">{stock > 1 ? `Vol: ${props.product.volume}%| ${totalVolume}%`: `Vol: ${props.product.volume}%`}</p>
                <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                    <button type="button" className="btn btn-sm btn-outline-primary" id="deleteBtn" onClick={handleDeleteProduct}>
                        <FontAwesomeIcon icon={faUtensils} />
                    </button>
                    <input type="checkbox" className="btn-check" id={props.product.id}  autoComplete="off" checked={checked} onChange={handleAddToCart}/>
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

function getProductName(name){
    let formattedName = name.at(0).toUpperCase()+name.substring(1).toLowerCase();
    return formattedName;
}

export default ProductCardItem;