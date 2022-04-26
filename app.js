/*
Co je za úkol v tomto projektu:

1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.

6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/

let lastClickedItem = undefined;


function addToList(recipe) {
    let parentDiv = document.getElementById('recepty');
    
    let listItemDiv = createChildElement('div', parentDiv);
    listItemDiv.classList.add('recept');

    let listItemPictureDiv = createChildElement('div', listItemDiv);
    listItemPictureDiv.classList.add('recept-obrazek');

    let listItemPicture = createChildElement('img', listItemPictureDiv);
    listItemPicture.src = recipe.img;
    listItemPicture.alt = 'Obrazek';

    let listItemInfoDiv = createChildElement('div', listItemDiv);
    listItemInfoDiv.classList.add('recept-info');

    let listItemInfoHeader = createChildElement('h3', listItemInfoDiv);
    listItemInfoHeader.innerText = recipe.nadpis;

    listItemDiv.onclick = function() {
        showItemDetails(recipe, listItemDiv)
    };

    listItemDiv.recipeIndex = recepty.indexOf(recipe);

    if (localStorage.lastOpened == listItemDiv.recipeIndex) {
        showItemDetails(recipe, listItemDiv);
    }
}

function createChildElement(tagName, parentElement) {
    let result = document.createElement(tagName);
    parentElement.appendChild(result);
    return result;
}

recepty.forEach(addToList);



// SEARCH BAR & FILTERING
function onSearchBarChange() {
    updateList();
}

let searchBarInput = document.getElementById('hledat');
searchBarInput.addEventListener('input', onSearchBarChange);

function categorySelected() {
    updateList();
}

let categorySelection = document.getElementById('kategorie');
categorySelection.addEventListener('change', categorySelected);

function ratingSelected() {
    updateList();
}

let ratingSelection = document.getElementById('razeni');
ratingSelection.addEventListener('change', ratingSelected);


function updateList() {
    let parentDiv = document.getElementById('recepty');
    parentDiv.innerHTML = "";

    // search bar
    let searchBarInputValue = searchBarInput.value.toLowerCase();

    // category selection
    let categorySelectionValue = categorySelection.value;

    //rating sorting
    let ratingSelectionValue = ratingSelection.value;
    let sortedRecipes = recepty.slice();
    if(ratingSelectionValue == "1") {
        sortedRecipes.sort(function(a, b){return b.hodnoceni - a.hodnoceni});
    }
    if(ratingSelectionValue == "2") {
        sortedRecipes.sort(function(a, b){return a.hodnoceni - b.hodnoceni});        
    }

    //update list
    sortedRecipes.forEach(function(recipe) {
        if(recipe.nadpis.toLowerCase().includes(searchBarInputValue) && (categorySelectionValue == recipe.kategorie || categorySelectionValue == "")) {
            addToList(recipe);
        }
    })
}

function showItemDetails(recipe, listItemDiv) {
    createItemDetails(recipe);

    if (lastClickedItem !== undefined) {
        lastClickedItem.style.backgroundColor = '#fff';
    }
    
    listItemDiv.style.backgroundColor = '#eeeeee';
    lastClickedItem = listItemDiv;

    saveItemToLocalStorage(lastClickedItem);
}

function createItemDetails(recipe) {
    let detailItemPhoto = document.getElementById('recept-foto');
    detailItemPhoto.src = recipe.img;

    let detailItemCategory = document.getElementById('recept-kategorie');
    detailItemCategory.innerText = recipe.kategorie;

    let detailItemRating = document.getElementById('recept-hodnoceni');
    detailItemRating.innerText = recipe.hodnoceni;

    let detailItemName = document.getElementById('recept-nazev');
    detailItemName.innerText = recipe.nadpis;

    let detailItemDescription = document.getElementById('recept-popis');
    detailItemDescription.innerText = recipe.popis;
}

function saveItemToLocalStorage(lastClickedItem) {
    localStorage.lastOpened = lastClickedItem.recipeIndex;
}