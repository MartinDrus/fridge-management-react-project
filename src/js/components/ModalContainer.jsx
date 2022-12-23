
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import ModalShoppingList from "./shoppingList/ModalShoppingList";

function ModalContainer(props){

    let showCart = props.infoPanel === undefined;

    console.log("info ",props.infoPanel);
    console.log("shopping ",props.shoppingList);
    console.log(showCart);

    return (

        <Modal         
            show={props.show}
        >
            <Modal.Header  onClick={props.onHide} closeButton>
                <Modal.Title>{showCart ? "Shopping List" : "Product Information"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ModalShoppingList />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant="secondary">Close</Button>
            </Modal.Footer>
        </Modal>

    )


}

export default ModalContainer;