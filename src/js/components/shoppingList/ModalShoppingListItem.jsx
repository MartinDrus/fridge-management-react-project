import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

import getProductName from '../../helper/formattedProductName';

function ModalShoppingListItem(props){


    let picPath = `../src/assets/img/foodIcons/${props.product.name.toLowerCase()}.png`
    let altTag = `Picture of ${props.name}`;

    const handleIncrease = () => props.stockCallback(props.product,+1);
    const handleDecrease = () => props.stockCallback(props.product,-1)

    return (

        <li className="list-group-item ">
                <img className="img-thumbnail mx-3" style={{width: "40px"}} src={picPath} alt={altTag} />

                {getProductName(props.product.name)}
                <div className="btn-group float-end" role="group">
                    <button onClick={handleDecrease} type="button" className="btn btn-outline-primary">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    
                    <button className="btn btn-outline-primary" disabled>
                        {props.product.stock}
                    </button>
                        
                    <button onClick={handleIncrease} type="button" className="btn btn-outline-primary">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </li>

    )


}

export default ModalShoppingListItem;