import { useEffect, useRef, useState } from "react";


function Filter(props) {
console.log("🚀 ~ file: Filter.jsx:5 ~ Filter ~ props", props.filterResult)

    // Variable for CSS-Animation-Class
    let [filterBtnClasses, setFilterBtnClasses] = useState(`input-group`);
    // Storing search-value for filtration
    console.log("🚀 ~ file: Filter.jsx:10 ~ Filter ~ filterBtnClasses", filterBtnClasses)
    const filterOptionRef = useRef();

    useEffect(() => {
        // Checking for Filter-Result
        setFilterBtnClasses(`input-group ${!props.filterResult ? "noFilterResult" : ""}`)
        // Resetting CSS-Class after 0.5 Animation-Time
        const resetClass = setTimeout(() => {
            setFilterBtnClasses("input-group")
        },505);
        return () => clearTimeout(resetClass);
    },[props.filterResult])

    const handleFilter = () => props.filterCallback(filterOptionRef.current.value)

    return (
        <div className={filterBtnClasses}>
            <button onClick={handleFilter} className="btn btn-dark" type="button" id="filter-select-input" >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 15 18">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </button>
            <select ref={filterOptionRef} className="form-select" id="search-select-product-category" aria-label="Filter by Category">
                <option value="-1"></option>
                <option value="0">Beverages</option>
                <option value="1">Dairy Products</option>
                <option value="2">Vegetables</option>
                <option value="3">Animal Products</option>
                <option value="4">Spread</option>
                <option value="5">Sauces</option>
            </select>
        </div>
    )
}

export default Filter;