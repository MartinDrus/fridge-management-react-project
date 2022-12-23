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
	let [shoppingList, setShoppingList] = useState(fetchShoppingListFromLocalStorage())
	let [modalContent, setModalContent] = useState([]);

	const [modalShow, setModalShow] = useState(false);
	const capacity = content.reduce((freeCapacity, product) => freeCapacity - (product.stock * product.volume), 100);
	let contentCopy = [...content];


	useEffect(() => {
    localStorage.setItem('content', JSON.stringify(content));
	}, [content]);

	useEffect(() => {
    localStorage.setItem('shopping', JSON.stringify(shoppingList));
	}, [shoppingList]);

	const handleNewFridgeItem = (newItem)=>{
		if ((capacity - newItem.volume) >= 0) {
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

	const handleDeleteProduct = (productId)=>{
		let targetContentIndex = contentCopy.findIndex(product => product.id === productId);
		let elFound = contentCopy[targetContentIndex];
		if(elFound.stock > 1) {
			elFound.stock -=1;
		} else contentCopy.splice(targetContentIndex, 1);
		setContent(contentCopy);
	}

	const handleAddToCart = (wantedProduct)=>{
		let targetContentIndex = contentCopy.findIndex(product => product.id === wantedProduct.id);

		contentCopy.splice(targetContentIndex, 1, wantedProduct);
		setContent(contentCopy);


		handlePutOnLIst()
		
	}

	function handlePutOnLIst(){
		let shoppingListProducts = [];
		content.forEach(product => {
			if (product.repurchase) shoppingListProducts.push(product);
		})
		setShoppingList(shoppingListProducts)
	}

	const handleDefrosting = () => setContent([]);

	const handleCleaning = ()=>{
		let edibleProducts = []
		content.forEach(product => {
			if (!isExpired(product)) edibleProducts.push(product)
		});
		setContent(edibleProducts);
	}

	const handleSorting = ()=>{
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
	});

	const openModal = (props) => {
		setModalShow(true)
		setModalContent(props)
	};

	console.log(shoppingList);

	return (

		<div id="fridge-app-container" className="container-fluid">
			<div className="row" id='placeholderOne'>
				{/* <!-- Platzhalter --> */}
			</div>
			<ModalContainer infoPanel={modalContent} shoppingList={shoppingList} show={modalShow} onHide={() => setModalShow(false)}/>
			<div className="row">
				{/* INFO PANEL */}
				<InfoPanel products={content} leftSpace={capacity} showModalCallback={openModal}/>

				{/* FRIDGE CONTAINER */}
				<FridgeContentContainer>
					{fridgeItems}
				</FridgeContentContainer>

				{/* CONTROLS */}
				<FridgeControls shoppingListSize={shoppingList.length} showModalCallback={openModal} sortCallback={handleSorting} cleanCallback={handleCleaning} defrostCallback={handleDefrosting}/>
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

function fetchShoppingListFromLocalStorage() {
	let storedShoppingList = JSON.parse(localStorage.getItem('shopping'));
	return storedShoppingList ?? [];
}

export default App
