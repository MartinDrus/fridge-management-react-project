
import { Button, Modal } from "react-bootstrap";
import ModalInfoDisplay from "./ModalInfoDisplay";
import ModalShoppingList from "./ModalShoppingList";

function ModalContainer(props){

    let showCart = props.infoPanel === undefined;    
    let infoPanelPurpose = props.infoPanelPurpose;
    let infoPanelText = "";
    let infoPanelTitle = "";

    switch (infoPanelPurpose) {
        case "Use Quick":
            infoPanelText = "No products close to expiration date found";
            infoPanelTitle = "Close to expiration date";
            break;
        case "Expired products":
            infoPanelText = "No expired products found";
            infoPanelTitle = "Expired Products:";
            break;
        case "Smallest Products":
            infoPanelTitle = "Smallest Space Consumption:";
            break;
        case "Biggest products":
            infoPanelTitle = "Biggest Space Consumption:";
            break;
    
        default:
            break;
    }

    const cartContent = props.shoppingList.length > 0 ? <ModalShoppingList content={props.shoppingList} removeCallback={props.removeCallback} /> : "No items on your shopping list";
    const infoPanelContent = !showCart && props.infoPanel.length > 0 ? <ModalInfoDisplay content={props.infoPanel} deleteCallback={props.deleteCallback} /> : `${infoPanelText}`

    return (
        <Modal         
            show={props.show}
        >
            <Modal.Header  onClick={props.onHide} closeButton>
                <Modal.Title>{showCart ? "Shopping List" : `${infoPanelTitle}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showCart ?  cartContent : infoPanelContent}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant="secondary">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalContainer;