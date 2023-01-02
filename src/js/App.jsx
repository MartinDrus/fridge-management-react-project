import { useEffect, useRef, useState } from 'react'
import '../scss/App.scss'
// Import all of Bootstrap's JS
import 'bootstrap-icons/font/bootstrap-icons.css'

import FridgeContentContainer from './components/FridgeContentContainer'
import FridgeContentForm from "./components/FridgeContentForm"
import FridgeControls from './components/controls/FridgeControls'
import InfoPanel from './components/InfoPanel'
import Presets from './components/presets/PresetList'
import ProductCardItem from './components/ProductCardItem'
import ProgressBarContainer from './components/progressbar/ProgressBarContainer'
import ModalContainer from './components/shoppingList/ModalContainer'

import isExpired from './helper/determineExpiration'


function App() {
	// Statevariable fuers Speichern der Todos
	let [content, setContent] = useState(fetchFromLocalStorage());
	let [shoppingList, setShoppingList] = useState(fetchShoppingListFromLocalStorage())
	let [modalContent, setModalContent] = useState([]);
	let [modalInfoPurpose, setModalInfoPurpose] = useState("");
	let [customPresetElement, setCustomPresetElement ] = useState(null);
	let [filteredItems, setFilteredItems] = useState([]);
	let [filterSuccess, setFilterSuccess] = useState(true);

	const [modalShow, setModalShow] = useState(false);
	const capacity = content.reduce((freeCapacity, product) => freeCapacity - (product.stock * product.volume), 100);

	useEffect(() => {
		localStorage.setItem('content', JSON.stringify(content));
	}, [content]);

	useEffect(() => {
		localStorage.setItem('shopping', JSON.stringify(shoppingList));
	}, [shoppingList]);

	const handleNewFridgeItem = (newItem)=>{
		let contentCopy = [...content];

		if ((capacity - newItem.volume) >= 0) {

			const hasSameDateAndName = (product) => (product.date === newItem.date && product.name.toLowerCase() === newItem.name.toLowerCase());
			let targetContentIndex = contentCopy.findIndex( product => hasSameDateAndName(product) )

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
		let contentCopy = [...content];
		let targetContentIndex = contentCopy.findIndex(product => product.id === productId);
		let elFound = contentCopy[targetContentIndex];
		if(elFound.stock > 1) {
			elFound.stock -=1;
		} else contentCopy.splice(targetContentIndex, 1);
		setContent(contentCopy);
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
		let contentCopy = [...content];
		contentCopy.sort((a, b) => new Date(a.date) - new Date(b.date));
		setContent(contentCopy)
	}

	const handleFilter = (props) => {
		let filterQuery = parseInt(props)
		let contentCopy = [...content];

		if(props < 0) {
			setFilterSuccess(true)
			setFilteredItems([])
			setContent(contentCopy)
		} else {
			let result = contentCopy.some(product => product.categoryId === filterQuery)
			setFilterSuccess(result)
			filteredItems = contentCopy.filter(product => product.categoryId === filterQuery);
			setFilteredItems(filteredItems);
		}
	}


	const openModal = (productArray, purpose) => {
		setModalShow(true);
		setModalContent(productArray);
		setModalInfoPurpose(purpose);
	};

	const removeCallback = (productId) => {
		let contentCopy = [...content];
		let shoppingListCopy = [...shoppingList]
		let targetInShoppingList = shoppingListCopy.findIndex(target => target.id === productId);
		let targetInContentList = contentCopy.findIndex(target => target.id === productId);

		if (targetInShoppingList >= 0) {
			shoppingListCopy.splice(targetInShoppingList ,1);
			setShoppingList(shoppingListCopy)
		} else {
			console.log("🚀 ~ file: App.jsx:95 ~ removeCallback ~ target not found")
		}

		if (targetInContentList >= 0) {			
			contentCopy[targetInContentList].repurchase = false;
			setContent(contentCopy)
		} else {
			console.log("🚀 ~ file: App.jsx:107 ~ removeCallback ~ target not found")
		}
	}

	const handleAddToCart = (wantedProduct)=>{
		let shoppingListProducts = [];
		content.forEach(product => {
			if (product.repurchase) {
				let duplicateIndex = shoppingListProducts.findIndex(target => target.name.toLowerCase() === product.name.toLowerCase())
				if (duplicateIndex < 0) {
					const productClone = structuredClone(product)
					productClone.stock = 1;
					shoppingListProducts.push(productClone);
				}
			}
		})
		setShoppingList(shoppingListProducts);

		let targetIndex = content.findIndex(product => product.id === wantedProduct.id);
		content.splice(targetIndex, 1, wantedProduct)
		setContent(content)
	}

	const handlePresetRequest = (props) => handleNewFridgeItem(props);
	const handleCustomPresetCallback = (props) => setCustomPresetElement(props);
	
	let itemsArray = filteredItems.length > 0 ? filteredItems : content

	let fridgeItems = itemsArray.map(product => {
		return <ProductCardItem 
			key={product.id}
			product={product}
			deleteProductCallback={handleDeleteProduct}
			addProductCallback={handleNewFridgeItem}
			checkedForCart={handleAddToCart}
		/>
	});

	return (

		<div id="fridge-app-container" className="container-fluid">
			<div className="row" id='placeholderOne'>
				{/* <!-- Platzhalter --> */}
			</div>
			<ModalContainer infoPanel={modalContent} infoPanelPurpose={modalInfoPurpose} shoppingList={shoppingList} removeCallback={removeCallback} deleteCallback={handleDeleteProduct} show={modalShow} onHide={() => setModalShow(false)}/>
			<div className="row">
				{/* INFO PANEL */}
				<InfoPanel products={content} leftSpace={capacity} showModalCallback={openModal}/>

				{/* FRIDGE CONTAINER */}
				<FridgeContentContainer >
					{fridgeItems}
				</FridgeContentContainer>

				{/* CONTROLS */}
				<FridgeControls
					shoppingListSize={shoppingList.length}
					noFilterResult={filterSuccess}
					showModalCallback={openModal}
					sortCallback={handleSorting}
					cleanCallback={handleCleaning}
					defrostCallback={handleDefrosting}
					filterCallback={handleFilter}
				/>
			</div>

			{/* PROGRESS BAR */}
			<ProgressBarContainer storage={capacity} />

			{/* <!-- Bereich für das Formular zum Hinzufügen neuer Produkte --> */}
			<div className="row justify-content-center">
				{/* PRESETS */}
				<Presets 
					createCardCallback={handlePresetRequest}
					customPresetCallback={handleCustomPresetCallback}
				/>

				{/* ADD PRODUCT */}
				<FridgeContentForm
					newProductCallback={handleNewFridgeItem}
					customPresetCallBack={customPresetElement}
				/>

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


export default App;
