import { Button } from "react-bootstrap";
import getProductName from "../../helper/formattedProductName";

function PresetButton(props){
    //Displaying PresetBtn Name
    let btnText = getProductName(props.data.name);

    const handleCardCreating = () => {
        props.createCardCallback(props)
    }

    return (
        <Button onClick={handleCardCreating} variant="secondary" className="mb-2 mx-1" >{btnText}</Button>
    )
}

export default PresetButton;