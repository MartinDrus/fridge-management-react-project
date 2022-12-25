import PresetButton from "./PresetButton";

function PresetList(props) {
    

    return (

                    
            <div className="col-5">
            {/* <!-- Bereich für Voreinstellungen von neuen Produkten --> */}
                <div className="d-flex flex-row">
                    <label className="form-label me-5 my-2">Presets</label>
                    <div className="form-check form-switch my-2">
                        <input className="form-check-input"  type="checkbox" role="switch" id="custom-expdate-preset-input"/>
                        <label className="form-check-label" htmlFor="custom-expdate-preset-input">Custom Expiration Date</label>
                    </div>
                </div>
                <div>

                    <PresetButton  name={"Eggs"}/>

                    {/* <!-- Button zum Befüllen des Produkt-Hinzufüge-Formulars mit Voreinstellungen --> */}
                    {/* <button type="button" className="btn btn-secondary mb-2 mx-1 preset-class">Salami</button>
                    <button type="button" className="btn btn-secondary mb-2 mx-1 preset-class">Cheese</button>
                    <button type="button" className="btn btn-secondary mb-2 mx-1 preset-class">Milk</button>
                    <button type="button" className="btn btn-secondary mb-2 mx-1 preset-class">Yogurt</button>
                    <button type="button" className="btn btn-secondary mb-2 mx-1 preset-class">Broccoli</button>
                    <button type="button" className="btn btn-secondary mb-2 mx-1 preset-class">Zucchini</button>
                    <button type="button" className="btn btn-secondary mb-2 mx-1 preset-class">Carrots</button>
                    <button type="button" className="btn btn-secondary mb-2 mx-1 preset-class">Eggs</button>
                    <button type="button" className="btn btn-secondary mb-2 mx-1 preset-class">Butter</button>
                    <button type="button" className="btn btn-secondary mb-2 mx-1 preset-class">Jam</button>
                    <button type="button" className="btn btn-secondary mb-2 mx-1 preset-class">Eggplants</button>
                    <button type="button" className="btn btn-secondary mb-2 mx-1 preset-class">Cucumber</button>
                    <button type="button" className="btn btn-secondary mb-2 mx-1 preset-class">Sausage</button>
                    <button type="button" className="btn btn-secondary mb-2 mx-1 preset-class">Fish</button>
                    <button type="button" className="btn btn-secondary mb-2 mx-1 preset-class">Wine</button>
                    <button type="button" className="btn btn-secondary mb-2 mx-1 preset-class">Juice</button> */}
                </div>
            </div>

    )
}

export default PresetList;