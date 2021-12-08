// Comportement page Panier


//  Afficher le contenu du panier dans la page Panier.
//  Depuis la page Panier, récupérer le panier (l’array) via localStorage.
//  Parcourir l’array.
//  Créer et insérer des éléments dans la page Panier.



//  Récupération des éléments du panier

let PanierProduit = JSON.parse(localStorage.getItem("Produits"));
console.log(PanierProduit);
console.log(typeof(PanierProduit));

// Traitement des cas possibles de PanierProduit et remplissage de <section id="cart__items"> le cas (positif) échéant.

    // Cas où le panier est vide -> aficher que le panier est vide.

    if (PanierProduit === null || PanierProduit == 0) {
        document.getElementById("cart__items").innerHTML = 

            <p>Votre panier ne contient aucun article</p>

    }else{

    // Cas où le panier n'est pas vide

        for(i=0; i< PanierProduit; i++){
            document.getElementById("cart__items").innerHTML =

                // Utiliser la section en commentaire dans cart.html et remplir avec les éléments des produits sélectionnés (cf product.js)

                <article class="cart__item" data-id="${PanierProduit[i].IdSelectionProduit}" data-color="${PanierProduit[i].CouleurSelectionProduit}">
                    <div class="cart__item__img">
                      <img src="${PanierProduit[i].ImgSelectionProduit}" alt="${PanierProduit[i].AltTxtSelectionProduit}"/>
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${PanierProduit[i].NomSelectionProduit}</h2>
                            <p>${PanierProduit[i].CouleurSelectionProduit}</p>
                            <p>${PanierProduit[i].PrixSelectionProduit}</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${PanierProduit[i].QuantiteSelectionProduit}"/>
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
              </article>

        }
    }

