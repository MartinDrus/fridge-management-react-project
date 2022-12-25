import { Button } from "react-bootstrap";


function PresetButton(props){


    return (

        <Button onClick={props.onHide} variant="secondary" className="mb-2 mx-1" >{props.name}</Button>

    )

}

export default PresetButton;