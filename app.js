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



function updateList() {
    let parentDiv = document.getElementById('recepty');
    parentDiv.innerHTML = "";

    // search bar
    let searchBarInput = document.getElementById('hledat').value.toLowerCase();

    // category selection
    let categorySelection = document.getElementById('kategorie').value;


    //update list
    recepty.forEach(function(recipe) {
        if(recipe.nadpis.toLowerCase().includes(searchBarInput) && (categorySelection == recipe.kategorie || categorySelection == "")) {
            addToList(recipe);
        }
    })
}



//link search button