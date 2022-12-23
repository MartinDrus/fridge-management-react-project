

import ModalShoppingListItem from './ModalShoppingListItem';

function ModalShoppingList(props) {

    let shoppingListItem = props.content.map(product => {
        return <ModalShoppingListItem 
            key={product.id}
            product={product}
            stockCallback={props.stockCallback}
        />
    });

    return (

        
        <ol className="list-group list-group-numbered fs-4">

            {shoppingListItem}
        
        </ol>
        
        
       

    )
}

export default ModalShoppingList;