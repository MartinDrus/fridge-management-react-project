import ModalInfoItem from './ModalInfoItem'

function ModalInfoDisplay(props) {
    console.log("🚀 ~ file: ModalInfoDisplay.jsx:4 ~ ModalInfoDisplay ~ props", props.content)
    
    let infoPanelItem = props.content.map(product => {
        return <ModalInfoItem
            key={product.id}
            product={product}
            deleteCallback={props.deleteCallback}
            / >    
    });

    return (

        <ol className="list-group list-group-numbered fs-4">
            {infoPanelItem}
        </ol>

    )

}

export default ModalInfoDisplay;