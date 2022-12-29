function ProgressBar(props) {

    let usedStorage = props.storage;
    let classes = "progress-bar";

    //?Setze Klassen für Farbänderung abhängig vom Gesamtvolumen
    switch (true) {
      case usedStorage < 8:
        classes += " bg-danger progress-bar-striped progress-bar-animated"
        break;
      case usedStorage >= 25 && usedStorage < 50:
        classes += " bg-info";
        break;
      case usedStorage >= 50 && usedStorage < 75:
        classes += " bg-warning";
        break;
      case usedStorage >= 75 && usedStorage < 95:
        classes += " bg-danger";
        break;
      case usedStorage >= 95:
        classes += " bg-danger progress-bar-striped progress-bar-animated"
        break;
    }
    return (
      <div className={classes} role="progressbar" aria-label="Used fridge volume" aria-valuemin="0%" style={{width:`${usedStorage}%`}} aria-valuenow={`${usedStorage}%`} aria-valuemax="100%">
          {usedStorage}%
      </div>
    )
}

export default ProgressBar;