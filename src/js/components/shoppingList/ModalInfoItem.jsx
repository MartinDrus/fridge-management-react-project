import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faCartShopping, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import getProductName from "../../helper/formattedProductName";

function ModalInfoItem(props){
console.log("🚀 ~ file: ModalInfoItem.jsx:6 ~ ModalInfoItem ~ props", props)

    let picPath = `../src/assets/img/foodIcons/${props.product.name.toLowerCase()}.png`
    let altTag = `Picture of ${props.product.name}`;
    const handleDeleteProduct = () => props.deleteCallback(props.product.id);

    return (


        <li className="list-group-item ">
        <img className="img-thumbnail mx-3" style={{width: "40px"}} src={picPath} alt={altTag} />

        {getProductName(props.product.name)}
        <div className="btn-group float-end" role="group">       
            <button onClick={handleDeleteProduct} type="button" className="btn btn-outline-primary">
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    </li>

    )
    
}

export default ModalInfoItem;