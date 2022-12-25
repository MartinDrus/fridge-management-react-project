import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

import getProductName from '../../helper/formattedProductName';
import { useState } from 'react';

function ModalShoppingListItem(props){
    const [listItemCounter, setListItemCounter] = useState(1);

    function adjustAmountToBuy(amount) {
        if (amount < 0 && listItemCounter === 1) {
            props.removeCallback(props.product.id)
        } else {
            setListItemCounter(currentCount => {
                return currentCount + amount;
            });
        }
    }


    let picPath = `../src/assets/img/foodIcons/${props.product.name.toLowerCase()}.png`
    let altTag = `Picture of ${props.product.name}`;

    return (

        <li className="list-group-item ">
            <img className="img-thumbnail mx-3" style={{width: "40px"}} src={picPath} alt={altTag} />

            {getProductName(props.product.name)}
            <div className="btn-group float-end" role="group">
                <button onClick={() => adjustAmountToBuy(-1)} type="button" className="btn btn-outline-primary">
                    {listItemCounter === 1 ? <FontAwesomeIcon icon={faTrash} /> : <FontAwesomeIcon icon={faMinus} />  }
                </button>
                
                <button className="btn btn-outline-primary" disabled>
                    {listItemCounter}
                </button>
                    
                <button onClick={() =>adjustAmountToBuy(1)} type="button" className="btn btn-outline-primary">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </li>

    )


}

export default ModalShoppingListItem;