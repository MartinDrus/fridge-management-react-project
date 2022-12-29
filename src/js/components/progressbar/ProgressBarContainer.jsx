import ProgressBar from "./ProgressBar";

function ProgressBarContainer(props) {
    let usedStorage = (100 - props.storage)
    return (
        <div className="d-flex align-items-center justify-content-center progressBarWrapper" >
            <div className="progress progressBarContent">
                <ProgressBar storage={usedStorage} />
            </div>
        </div>
    )
}

export default ProgressBarContainer;