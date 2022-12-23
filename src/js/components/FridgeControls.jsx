
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
                <button onClick={handleShoppingListView} type="button" className="btn btn-info col-12 mb-4 position-relative" id="show-shopping-list-btn"  data-bs-placement="left" data-bs-title="Your personal shopping list" >
                    Shopping List
                    <span id="shopping-badge" className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {props.shoppingListSize}
                        <span className="visually-hidden">Amount of items on the shopping list</span>
                    </span>
                </button>

                <div className="input-group">
                    <button id="search-product-category-btn" className="btn btn-dark" type="button" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Select products by Category - Choose blank to show all" disabled>
                        {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 15 18">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                    <select className="form-select" id="search-select-product-category" aria-label="Filter by Category">
                        <option value="0"></option>
                        <option value="1">Beverages</option>
                        <option value="2">Dairy Products</option>
                        <option value="3">Vegetables</option>
                        <option value="4">Animal Products</option>
                        <option value="5">Spread</option>
                        <option value="6">Sauces</option>
                    </select>
                  </div>

            </div>

    )
}

export default FridgeControls;