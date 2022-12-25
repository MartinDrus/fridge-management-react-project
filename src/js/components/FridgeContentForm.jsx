import { useRef, useState } from "react";


function FridgeContentForm(props) {
    let [volume, setVolume] = useState(1);
    let stock = 1;

    const nameRef = useRef()


    /* Submithandler fuer das Formular neuer Todos */
    function onSubmit(evt) {
        // Verhindere Standard-Verhalten des Browsers 
        // fuer das submit-Event (neuladen der Page)
        evt.preventDefault();

        let productCategory = parseInt(evt.target[1].value);
        let productVolume = evt.target[2].value;
        let productExpDate = evt.target[3].value 


        // if (nameRef.length > 0 && productExpDate.length > 0) {
            
            let newProduct = {
                id: generateRandomId(),
                name: nameRef.current.value,
                categoryId: productCategory,
                volume: productVolume,
                date: productExpDate,
                stock: stock,
                repurchase: false

            }
            props.newProductCallback(newProduct);
        }
    // }


    function generateRandomId() {
        return new Date().getTime() + Math.floor(Math.random() * 100000 + 1);
    }
    
    function handleVolumeChange(evt) {
        let inputVolume = evt.target.value;
        setVolume(inputVolume);
    }

    function activateBtn(evt) {


    }
    
    return ( 

        <form className="col-6" onSubmit={onSubmit} >
                {/* <!-- Formular für das Hinzufügen neuer Produkte --> */}
                <div className="row justify-content-center">
                    {/* <!-- Eingabebereich für den Namen des neuen Produkts --> */}
                    <div className="col-3">
                        <label htmlFor="form-add-product-name" className="form-label my-2">Name</label>
                        <input ref={nameRef} type="text" className="form-control" placeholder="Product Name" id="form-add-product-name" data-log-id="name" onChange={activateBtn}/>
                    </div>
                    {/* <!-- Eingabebereich für den Namen des neuen Produkts --> */}
                    <div className="col-3">
                        <label htmlFor="form-select-product-category" className="form-label my-2">Category</label>
                        <select className="form-select" id="form-select-product-category">
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
                        <input type="number" className="form-control" min={1} max={100} value={volume} onChange={handleVolumeChange} id="form-add-product-volume"/>
                    </div>
                    {/* <!-- Eingabebereich für das Ablaufdatum des neuen Produkts --> */}
                    <div className="col-3">
                        <label htmlFor="form-add-product-exp-date" className="form-label my-2">Expiration</label>
                        <input type="date" className="form-control" placeholder="Expiration Date" id="form-add-product-exp-date" data-log-id="date" onChange={activateBtn}/>
                    </div>
                    {/* <!-- Eingabebereich für den Bestätigungsknopfs des neuen Produkts --> */}
                    <div className="col-10">
                        <label htmlFor="btn-add-product" className="form-label my-2"></label>
                        <button type="submit" className="btn btn-primary mx-auto my-3" style={{width: "100%"}} id="btn-add-product"
                            data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-title="Add product with given information to fridge"
                        >Add</button>
                    </div>
                </div>
            </form>
    )
}

export default FridgeContentForm;