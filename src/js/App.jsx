import { useState, useEffect } from 'react'
import '../scss/App.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

import ModalContainer from './components/ModalContainer'
import FridgeContentForm from "./components/FridgeContentForm"
import InfoPanel from './components/InfoPanel'
import FridgeContentContainer from './components/FridgeContentContainer'
import FridgeControls from './components/FridgeControls'
import ProgressBarContainer from './components/ProgressBarContainer'
import Presets from './components/Presets'
import ProductCardItem from './components/ProductCardItem'

import isExpired from './helper/determineExpiration'


function App() {
	// Statevariable fuers Speichern der Todos
	let [content, setContent] = useState(fetchFromLocalStorage());

	// Hook zum Ausfuehren von Seiten-Effekt-Code bei Aenderung im Lifecycle
	useEffect(() => {
    // Speichere die bisherigen Produkte mit allem drum und dran im localStorage
    localStorage.setItem('content', JSON.stringify(content));
	}, [content]);

	const capacity = content.reduce((freeCapacity, product) => freeCapacity - (product.stock * product.volume), 100);

	function handleNewFridgeItem(newItem) {
		if ((capacity - newItem.volume) >= 0) {
			let contentCopy = [...content];
			let targetContentIndex = contentCopy.findIndex(product => product.name.toLowerCase() === newItem.name.toLowerCase() && product.date === newItem.date);
			if (targetContentIndex >= 0) {
				contentCopy[targetContentIndex].stock +=1;
				setContent(contentCopy);
			} else {
				let newItemArray = content.concat([newItem]);
				setContent(newItemArray);
			}
		}
	}

	function handleDeleteProduct(productId) {
		let contentCopy = [...content];
		let targetContentIndex = contentCopy.findIndex(product => product.id === productId);
		let elFound = contentCopy[targetContentIndex];
		if(elFound.stock > 1) {
			elFound.stock -=1;
			setContent(contentCopy);
		} else {
			contentCopy.splice(targetContentIndex, 1);
			setContent(contentCopy);
		}
	}

	function handleAddToCart(wantedProduct) {
		let contentCopy = [...content];
		let targetContentIndex = contentCopy.findIndex(product => product.id === wantedProduct.id);
		contentCopy.splice(targetContentIndex, 1, wantedProduct);
		setContent(contentCopy);
	}

	function handleDefrosting() {
		setContent([]);
	}

	function handleCleaning() {
		let edibleProducts = []
		content.forEach(product => {
			if (!isExpired(product)) edibleProducts.push(product)
		});
		setContent(edibleProducts);
	}

	function handleSorting() {
		let contentCopy = [...content];
		contentCopy.sort((a, b) => new Date(a.date) - new Date(b.date));
		setContent(contentCopy)
	}

	let fridgeItems = content.map(product => {
		return <ProductCardItem 
			key={product.id}
			product={product}
			deleteProductCallback={handleDeleteProduct}
			addProductCallback={handleNewFridgeItem}
			checkedForCart={handleAddToCart}
		/>
	})

  return (

    <div id="fridge-app-container" className="container-fluid">
    	<div className="row" id='placeholderOne'>
        	{/* <!-- Platzhalter --> */}
    	</div>
		<ModalContainer open/>
    	<div className="row">
        	{/* INFO PANEL */}
			<InfoPanel products={content} leftSpace={capacity}/>

			{/* FRIDGE CONTAINER */}
			<FridgeContentContainer>
          		{fridgeItems}
        	</FridgeContentContainer>


			{/* CONTROLS */}
			<FridgeControls sortCallback={handleSorting} cleanCallback={handleCleaning} defrostCallback={handleDefrosting}/>
    	</div>

		{/* PROGRESS BAR */}
		<ProgressBarContainer storage={capacity} />

		{/* <!-- Bereich für das Formular zum Hinzufügen neuer Produkte --> */}
		<div className="row justify-content-center">
			{/* PRESETS */}
			<Presets/>

			{/* ADD PRODUCT */}
			<FridgeContentForm newProductCallback={handleNewFridgeItem} />

			<div className='col-0'>
			{/* <!-- Platzhalter --> */}
			</div>
		</div>
    </div>


  )
}

// Hilfsfunktion zum Holen von persistent gespeicherten Todos
function fetchFromLocalStorage() {
  // Hole im localStorage gespeicherte Todos
  let storedItems = JSON.parse(localStorage.getItem('content'));
  // return storedTodos !== null ? storedTodos : [];

  // return mit nullish operator (wenn linke Seite null oder undefined, returne recht seite)
  return storedItems ?? [];
}

export default App
