
function MultipleProductsBadge(props) {
    return (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {props.amount}
            <span className="visually-hidden">Amount of Products with same name and expiration date</span>
        </span>
    )
}

export default MultipleProductsBadge;