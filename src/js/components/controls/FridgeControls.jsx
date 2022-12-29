import Filter from "./Filter";

function FridgeControls(props) {

    const handleDefrosting = () => props.defrostCallback();
    const handleSorting = () => props.sortCallback();
    const handleCleaning = () => props.cleanCallback();
    const handleShoppingListView = () => props.showModalCallback();
    
    return (
        <div className="col-2 py-4">
                {/* <!-- Überschrift des Control Panels --> */}
                <div>
                    <label className="form-label">Controls</label>
                </div>

                {/* <!-- Button zum Entfernen aller abgelaufenen Produkte aus dem Kühlschrank --> */}
                <button type="button" className="btn btn-success col-12 mb-4" onClick={handleCleaning} id="clean-fridge-btn"
                    data-bs-toggle="tooltip" data-bs-placement="left"
                    data-bs-title="Throws out all expired products"
                >Clean</button>

                {/* <!-- Button zum Sortieren aller Produkte nach Ablaufdatum --> */}
                <button type="button" className="btn btn-warning col-12 mb-4" onClick={handleSorting} id="sort-products-by-exp-date-btn"
                    data-bs-toggle="tooltip" data-bs-placement="left"
                    data-bs-title="Sorts all products by expiration date"
                >Sort</button>

                {/* <!-- Button zum Entfernen aller Produkte aus dem Kühlschrank --> */}
                <button type="button" className="btn btn-danger col-12 mb-4" onClick={handleDefrosting} id="remove-all-products-btn"
                    data-bs-toggle="tooltip" data-bs-placement="left"
                    data-bs-title="Clear whole fridge"
                >Defrost</button>

                {/* <!-- Button für optionale erweiterte Funktionen --> */}
                <button onClick={handleShoppingListView} type="button" className="btn btn-info col-12 mb-4 position-relative " id="show-shopping-list-btn"  data-bs-placement="left" data-bs-title="Your personal shopping list" >
                    Shopping List
                    <span id="shopping-badge" className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {props.shoppingListSize}
                        <span className="visually-hidden">Amount of items on the shopping list</span>
                    </span>
                </button>

                <Filter filterResult={props.noFilterResult} filterCallback={props.filterCallback}/>

            </div>

    )
}

export default FridgeControls;