

function FridgeContentContainer(props) {
    
    return (
  
            <div id="fridge-container"  className="col-9 d-flex align-items-center justify-content-center">
            {/* <!-- Fridge Container, der die Cards für die Klassen enthält --> */}

                <div id="fridge-scroll-container">
                    {/* <!-- Padding zur Sichtbarkeit der Badges --> */}
                    <div id="fridge-products-container"  className="pt-3 d-flex flex-wrap">
                    {/* <!-- Wird von Javascript befüllt --> */}
                    {props.children}
                    </div>
                </div>

            </div>

    )
}

export default FridgeContentContainer;