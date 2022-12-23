import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

function ModalShoppingListItem(){

    let picPath = "../src/assets/img/foodIcons/fish.png"
    let altTag = "";

    return (

        <li className="list-group-item ">
                <img className="img-thumbnail mx-3" style={{width: "40px"}} src={picPath} alt={altTag} />

                Cheese
                <div className="btn-group float-end" role="group">
                    <button type="button" className="btn btn-outline-primary">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    
                    <button className="btn btn-outline-primary" disabled>
                        1
                    </button>
                        
                    <button type="button" className="btn btn-outline-primary">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </li>

    )


}

export default ModalShoppingListItem;