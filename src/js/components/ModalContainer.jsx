
import { Modal, Button } from "react-bootstrap";

function ModalContainer(props){

    return (

        <Modal show={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>

    //     <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //     <div className="modal-dialog">
    //     <div className="modal-content">
    //         <div className="modal-header">
    //             <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
    //             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //         </div>
    //         <div className="modal-body">

    //         </div>
    //         <div className="modal-footer">
    //         </div>
    //     </div>
    //     </div>
    // </div>

    )


}

export default ModalContainer;