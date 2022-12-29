import { useState } from "react";
import PresetButton from "./PresetButton";
import presetData from "../../../data/data.json"

import getProductName from "../../helper/formattedProductName";
import generateRandomId from "../../helper/generateRandomId";
import setExpirationDate from "../../helper/setExpirationDate";

function PresetList(listProps) {

    let [checked, setChecked] = useState(false)

    function addCustomProduct() {
        setChecked(currentlyChecked => {
            return currentlyChecked = !checked;
        });
    }

    function handlePresetRequest(props) {

        let name = getProductName(props.data.name);
        let date = setExpirationDate(props.data.daysTilExpiry);
        let id = generateRandomId();
        
        let newItem = {
            categoryId: props.data.categoryNumber,
            date: date,
            id: id,
            name: name,
            repurchase: false,
            stock: 1,
            volume:  props.data.productVolume
        }

        if (!checked) {
            listProps.createCardCallback(newItem);
        } else {
            listProps.customPresetCallback(newItem);
        }
    }


    let presetButton = presetData.presetData.map(preset => {
        return <PresetButton
            key={preset.name}
            data={preset}
            createCardCallback={handlePresetRequest}
        />
    })
    
    return (
        <div className="col-5">
        {/* <!-- Bereich für Voreinstellungen von neuen Produkten --> */}
            <div className="d-flex flex-row">
                <label className="form-label me-5 my-2">Presets</label>
                <div className="form-check form-switch my-2">
                    <input className="form-check-input" checked={checked} onChange={addCustomProduct} type="checkbox" role="switch"/>
                    <label className="form-check-label" htmlFor="custom-expdate-preset-input">Custom Expiration Date</label>
                </div>
            </div>
            <div>
                {presetButton}
            </div>
        </div>
    )
}

export default PresetList;