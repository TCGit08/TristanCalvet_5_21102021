// Comportement page Panier

//  Afficher le contenu du panier dans la page Panier.
//  Depuis la page Panier, récupérer le panier (l’array) via localStorage.
//  Parcourir l’array.
//  Créer et insérer des éléments dans la page Panier.



//  Récupération des éléments du panier

let localItems = JSON.parse(localStorage.getItem('itemToCart'));

console.log(localItems);


// Changement titre page panier (Cart -> Kanap - Panier)

let titrePagePanier = document.querySelector('title');          // Pointage de la balise title
titrePagePanier.innerHTML = "Kanap - Panier";                   // Changement dynamique du nom


// Affichage des éléments du panier.

// <section id="cart__items">
// <!--          <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
//                 <div class="cart__item__img">
//                   <img src="../images/product01.jpg" alt="Photographie d'un canapé">
//                 </div>
//                 <div class="cart__item__content">
//                   <div class="cart__item__content__description">
//                     <h2>Nom du produit</h2>
//                     <p>Vert</p>
//                     <p>42,00 €</p>
//                   </div>
//                   <div class="cart__item__content__settings">
//                     <div class="cart__item__content__settings__quantity">
//                       <p>Qté : </p>
//                       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//                     </div>
//                     <div class="cart__item__content__settings__delete">
//                       <p class="deleteItem">Supprimer</p>
//                     </div>
//                   </div>
//                 </div>
//               </article>                  -->
//             </section>


// Fonction affichage d'article ajouté
// Balise -> classe des balises -> éléments contenus dans les balises

function addChosenArticle() {

    for(j = 0; j < localItems.length; j++) {         // i déjà utilisé dans une autre boucle. Changement pour éviter les conflits.

    // Récupération de la <section id="cart__items"> contenant les éléments du panier (cf. cart.html)
    const cartItemsBal = document.getElementById('cart__items');


    // Création des balises qui contiendront les caractéristiques des produits choisis.

    const articleBal = document.createElement('article');
    const divImgBal = document.createElement('div');
    const imgBal = document.createElement('img');
    const divItemContBal = document.createElement('div');
    const divContDescBal = document.createElement('div');
    const hNameBal = document.createElement('h2');
    const pColorBal = document.createElement('p');
    const pPriceBal = document.createElement('p');
    const divContSettings = document.createElement('div');
    const divSettingsQuant = document.createElement('div');
    const pQuantBal = document.createElement('p');
    const inpBal = document.createElement('input');
    const divSettingsDel = document.createElement('div');
    const pDelBal = document.createElement('p');


    // Classes et attributs des balises.

    articleBal.classList.add('cart__item');
    articleBal.setAttribute('data-id', `${localItems[j].id}`);
    divImgBal.classList.add('cart__item__img');
    divItemContBal.classList.add('cart__item__content');
    divContDescBal.classList.add('cart__item__content__description');
    divContSettings.classList.add('cart__item__content__settings');
    divSettingsQuant.classList.add('cart__item__content__settings__quantity');
    inpBal.classList.add('itemQuantity');
    inpBal.setAttribute('type', 'number');
    inpBal.setAttribute('name', 'itemQuantity');
    inpBal.setAttribute('min', '1');
    inpBal.setAttribute('max', '100');
    inpBal.setAttribute('value', localItems[j].quantity);
    divSettingsDel.classList.add('cart__item__content__settings__delete');
    pDelBal.classList.add('deleteItem');


    // Eléments contenus dans les balises (statiques et dynamiques(données stockées)) et ajout de l'affichage du prix total par type de produit.

    articleBal.appendChild(divImgBal) + articleBal.appendChild(divItemContBal);
    divImgBal.appendChild(imgBal);
    divImgBal.querySelector('img').src = localItems[j].img;
    divImgBal.querySelector('img').alt = localItems[j].alt;
    divSettingsQuant.appendChild(inpBal);
    divSettingsQuant.appendChild(pColorBal) + divSettingsQuant.appendChild(inpBal);
    divSettingsQuant.querySelector('p').textContent = 'Quantité : ';
    divSettingsDel.appendChild(pDelBal);
    divItemContBal.appendChild(divContDescBal) + divItemContBal.appendChild(divContSettings);
    divContSettings.appendChild(divSettingsQuant) + divContSettings.appendChild(divSettingsDel);
    divContDescBal.appendChild(hNameBal) + divContDescBal.appendChild(pPriceBal);
    divContDescBal.querySelector('h2').textContent = localItems[j].name + " - " + localItems[j].color;
    let totPriceProdUni = localItems[j].quantity*localItems[j].price;                                       // Prix total par type de produit.
    divContDescBal.querySelector('p').textContent = ' Montant total produit : ' + totPriceProdUni + ' € ' + ' - ' + '(Montant unitaire : ' + localItems[j].price + ' € )' ;
    pDelBal.textContent = 'Supprimer';

    // Entrée des données produits du panier dans la balise correspondante du panier.  

    cartItemsBal.appendChild(articleBal);

    }
}


// Fonction qui calcule les totaux pour chaque type de produit et retourne le résultat.

function totalPriceProd() {
    
    const ptotalQuantity = document.getElementById('totalQuantity');
    const ptotalPrice = document.getElementById('totalPrice');
    let totalQuantitynum = 0;
    let totalPricenum = 0;
    
    // Boucle pour l'application de la manip à l'ensemble des produits du panier.
    for(k = 0; k < localItems.length; k++) {                                // Nouvelle variable de boucle différente de i et j( précédente) pour éviter les conflits.
        totalQuantitynum += parseInt(localItems[k].quantity);
        totalPricenum += localItems[k].price*localItems[k].quantity;
    }
    
    ptotalQuantity.textContent = totalQuantitynum;                          // Affichage en text de la quantité tot.
    ptotalPrice.textContent = totalPricenum;                                // Affichage en text du prix final.
}


// Fonction modification du contenu du panier

function modifPanier(){

    // Sélection de l'élément à modifier : itemQuantity
    const itemQuantityModif = document.querySelectorAll('.itemQuantity');

    console.log(localItems);

    // Boucle pour l'application des modif sur l'ensemble des éléments du panier disposant d'une quantité à modifier.
    for(let l = 0; l < itemQuantityModif.length; l++) {

        // Suivi du changement de l'input et modification.
        itemQuantityModif[l].addEventListener('change', (event) => {
            event.preventDefault();
            let itemModif  = parseInt(localItems[l].quantity);         
            let modifValue =  parseInt(itemQuantityModif[l].value);
            let modif = localItems.find(el => el.modifValue != itemModif);
            localItems[l].quantity = modifValue;
            localStorage.setItem("itemToCart", JSON.stringify(localItems));

            // Rechargement de la page pour tenir compte des modifications apportées au panier.
            window.location.reload();
        });
    }
}



// Fonction suppression d'élément du panier.

function supprItem() {

    // Sélection de l'élément "Supprimer" des produits du panier.
    const supprButton = document.querySelectorAll('.deleteItem');
    
    // Boucle pour l'application à tous les éléments contenus dans le panier.
    for(let m = 0; m < supprButton.length; m++) {

        // Suivi du "click" du bouton "Supprimer" et action résultante du click.
        supprButton[m].addEventListener('click', (event) => {
            event.preventDefault();
            let supprId = localItems[m].id;
            let supprColor = localItems[m].color;
            localItems = localItems.filter( el => el.id !== supprId || el.color !== supprColor );
            localStorage.setItem("itemToCart", JSON.stringify(localItems));

            // Rechargement de la page pour tenir compte des modifications apportées au panier.
            window.location.reload();

        });
    }
}

// Fonction validation du formulaire.

function validForm() {

    // Récupération du formulaire.
    let formulaire = document.querySelector('cart__order__form');


    // Vérification des entrées du formulaire. 

    // Vérification du prénom.
    formulaire.firstName.addEventListener('change', function () {
       validFirstName(this); 
    });

    // Vérification du nom.
    formulaire.lastName.addEventListener('change', function () {
       validLastName(this); 
    });
    
    // Vérification de l'adresse.
    formulaire.address.addEventListener('change', function () {
       validAddress(this); 
    });
    
    // Vérification de la ville.
    formulaire.city.addEventListener('change', function () {
       validCity(this); 
    });

    // Vérification de l'adresse mail.
    formulaire.email.addEventListener('change', function () {
       validEmail(this); 
    });


    // Cas du prénom.
    const validFirstName = function(inputFirstName) {
        
    }










}





if (localItems === null) {
    alert('Votre panier ne contient actuellement aucun produit');
}else {
    addChosenArticle();
    totalPriceProd();
    modifPanier();
    supprItem();
}
