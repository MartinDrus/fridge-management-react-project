import { useState } from "react";
import generateRandomId from "../helper/generateRandomId";


function FridgeContentForm(props) {

    let [newProduct, setNewProduct] = useState({
        name: "",
        categoryId: "",
        volume: 1,
        date: "",
    })

    const set = name => {
        return ({ target: { value } }) => {
            setNewProduct(oldProduct => ({...oldProduct, [name]: value}))
        }
    }

    if (props.customPresetCallBack !== null ) {
        newProduct.name = props.customPresetCallBack.name
        newProduct.categoryId = props.customPresetCallBack.categoryId
        newProduct.volume = props.customPresetCallBack.volume
    }

    function onSubmit(evt) {
        // Warum das Verhalten mit preventDefault???
        // evt.preventDefault();

        newProduct.id = generateRandomId();
        newProduct.stock = 1;
        newProduct.repurchase = false;

        props.newProductCallback(newProduct);
    }

    return ( 
        <form className="col-6" onSubmit={onSubmit} >
            {/* <!-- Formular für das Hinzufügen neuer Produkte --> */}
            <div className="row justify-content-center">
                {/* <!-- Eingabebereich für den Namen des neuen Produkts --> */}
                <div className="col-3">
                    <label htmlFor="form-add-product-name" className="form-label my-2">Name</label>
                    <input type="text" value={newProduct.name} onChange={set("name")} className="form-control" placeholder="Product Name" id="form-add-product-name" data-log-id="name" required />
                </div>
                {/* <!-- Eingabebereich für den Namen des neuen Produkts --> */}
                <div className="col-3">
                    <label htmlFor="form-select-product-category" className="form-label my-2">Category</label>
                    <select value={newProduct.categoryId} onChange={set("categoryId")} className="form-select" id="form-select-product-category">
                        <option value="0">Beverages</option>
                        <option value="1">Dairy Products</option>
                        <option value="2">Vegetables</option>
                        <option value="3">Animal Products</option>
                        <option value="4">Spread</option>
                        <option value="5">Sauces</option>
                    </select>
                </div>
                {/* <!-- Eingabebereich für das Volumen des neuen Produkts --> */}
                <div className="col-2">
                    <label htmlFor="form-add-product-volume" className="form-label my-2">Volume</label>
                    <input type="number" value={newProduct.volume} onChange={set("volume")} className="form-control" required min={1} max={100} />
                </div>
                {/* <!-- Eingabebereich für das Ablaufdatum des neuen Produkts --> */}
                <div className="col-3">
                    <label htmlFor="form-add-product-exp-date" className="form-label my-2">Expiration</label>
                    <input type="date" value={newProduct.date} onChange={set("date")} required className="form-control" placeholder="Expiration Date" data-log-id="date"/>
                </div>
                {/* <!-- Eingabebereich für den Bestätigungsknopfs des neuen Produkts --> */}
                <div className="col-10">
                    <label htmlFor="btn-add-product" className="form-label my-2"></label>
                    <button type="submit" className="btn btn-primary mx-auto my-3" style={{width: "100%"}} id="btn-add-product">
                        Add
                    </button>
                </div>
            </div>
        </form>
    )
}

export default FridgeContentForm;