/** 
 Page produit
 html (commentaires) = product.html
*/



// Récupération id produit

const urlPageProduit = window.location.href;                         // Récupération de l'URL de la page courante avec la propriété window.location.href
var url = new URL(urlPageProduit);
var id = url.searchParams.get("id");               			      




// Appel données API du produit ayant un id

let urlProducts = `http://localhost:3000/api/products/${id}`;   
console.log(urlProducts);                                            // Vérification de la récupération de l'URL

fetch (urlProducts)                                             	
  .then( response =>response.json())
  .then(data=>{
     console.log(data);                                              // Vérification de la récupération des données




// Récupération des données produits dans l'API et remplissage dans la page Produit.


    // Titre page produit

let titrePageProduit = document.querySelector('title');             // Pointage de la balise title
titrePageProduit.innerHTML = "Kanap -  " + data.name;               // Changement dynamique du nom


    // Photo produit

let photoCanape = document.querySelector('.item__img img');         // Pointage de img dans la div ayant la classe "item__img"
photoCanape.src = data.imageUrl;  					                // Récupératon donnée image dans l'API 
photoCanape.alt = data.altTxt; 						                // Récupération donnée texte alt


    // Nom produit

let Nom = document.querySelector('#title');  		                 // Pointage de l'id title
Nom.innerHTML = data.name;    					                     // Ajout Nom dans le html


    // Prix produit

let Prix = document.querySelector('#price');  		                 // Pointage de l'id Price
Prix.innerHTML = data.price;             				             // Ajout Prix dans le html


    // Texte description produit

let texteDescription = document.querySelector('#description'); 	     // Pointage de l' descpription 
texteDescription.innerHTML = data.description;  			         // Ajout description produit dans le html


    // Choix couleur

let selectCouleurs = document.querySelector("select");              // Pointage sélection de couleur
for (i=0; i<data.colors.length; i++  ){                           	// Boucle d'action pour chaque couleur        
    let option = document.createElement("option");                  // Création  élément option pour chaque couleur 
    option.setAttribute("value", data.colors[i]);                   // Ajout attributs provenant des données couleurs 
    option.textContent = data.colors[i];                            // Ajout texte correspondant à la  couleur sélectionnée   
    selectCouleurs.appendChild(option);                             // Ajout balise option dans selectCouleus
}




//  Ajout des produits dans le panier

    // Comportement du bouton "Ajouter au panier"

    const button = document.querySelector('#addToCart');            // Pointage du bouton "Ajouter au panier" (id ="addToCart")
    button.addEventListener("click",function() {                    // Vérification de l'effet du click sur le bouton "Ajouter au panier" 
        console.log(data.name)


        // Données sélectionnées par l'utilisateur envoyées par le bouton "Ajouter au panier"

    let SelectionProduit = {
        IdSelectionProduit: parseInt(id),                                           // Récupération de l'id et transformation de sa forme string au format integer
        ImgSelectionProduit: data.imageUrl,                                         // Récupération image produit sélectionné
        NomSelectionProduit: data.name,                                             // Récupération nom produit sélectionné 
        PrixSelectionProduit: data.price,                                           // Récupération prix produit sélectionné
        AltTxtSelectionProduit: data.altTxt,                                        // Récupération text alt produit sélectionné
        CouleurSelectionProduit: document.querySelector('#colors').value,           // Récupération couleur produit sélectionné dans le sélecteur (id="colors")
        QuantiteSelectionProduit: document.querySelector('#quantity').value,        // Récupération couleur produit sélectionné dans le sélecteur (id="quantity")
    }

        
    // Stockage des données dans le LocalStorage

    let StockageSelectionProduit = [];                           // Création d'un array de stockage des données produit sélectionnées par l'utilisateur      


        // Comportement de l'array de stockage : 
                // le panier est un array qui contiendrait trois choses : l’id du produit ; la quantité du produit ; la couleur du produit.
                // Il est nécessaire d’utiliser localStorage pour pouvoir accéder à cet array depuis la page Panier.
                // Lorsqu’on ajoute un produit au panier, si celui-ci n'était pas déjà présent dans le panier, on ajoute un nouvel élément dans l’array.
                // Lorsqu’on ajoute un produit au panier, si celui-ci était déjà présent dans le panier (même id + même couleur), 
                // on incrémente simplement la quantité du produit correspondant dans l’array.

        console.log(localStorage);
        
        
        // Vérification récupération de donnée  
        
    if (localStorage.getItem("Selection") === null || localStorage.getItem("Selection") == 0) {            // "Si"  pas récupération d'un item "Produit" par le localStorage
            
            console.log(localStorage); 
            
            alert ("Aucun produit n'a été ajouté à votre panier.");
    
        }else  

            if (SelectionProduit.CouleurSelectionProduit === null || SelectionProduit.CouleurSelectionProduit == 0 ) {

                alert ("Aucune couleur choisie. Veuillez choisir une couleur.");

            }else 

                if (SelectionProduit.QuantiteSelectionProduit === null || SelectionProduit.QuantiteSelectionProduit < 1 || SelectionProduit.QuantiteSelectionProduit > 100) {

                alert ("Aucune quantité valide choisie. Veuillez choisir une quantité valide.");

            
            }else{

            StockageSelectionProduit = JSON.parse(localStorage.getItem("Selection"));      // Conversion d'une string JSON en un objet pour manipulation


            // Cas d'une sélection produit déjà présente:  id de produit identique et une couleur identique pour un même id (&& :vrai si et uniquement si ses deux opérandes sont true ou équivalents à true)

            const RepetitionSelectionProduit = StockageSelectionProduit.filter(product => product.CouleurSelectionProduit === SelectionProduit.CouleurSelectionProduit && product.IdSelectionProduit === SelectionProduit.IdSelectionProduit);

                console.log(RepetitionSelectionProduit.length);                             // Affichage du nombre de paires clé/valeur

                console.log(SelectionProduit.CouleurSelectionProduit);                      // Affichage du choix de couleur sélectionnée
                
                console.log(StockageSelectionProduit);                                      // Affichage de l'array de stockage


                // Ajout au stock et mise à jour de celui-ci avec notification à l'utilisateur

            if (RepetitionSelectionProduit.length) {

            let TotalQuantiteSelectionProduit = parseInt(SelectionProduit.QuantiteSelectionProduit) + parseInt(RepetitionSelectionProduit[0].QuantiteSelectionProduit);

                console.log(typeof SelectionProduit.QuantiteSelectionProduit);                        // Number ou parseInt ?

                console.log(typeof RepetitionSelectionProduit[0].QuantiteSelectionProduit);    

                console.log(RepetitionSelectionProduit[0].QuantiteSelectionProduit);

            confirm ('Produit déjà présent dans votre panier. Quantité actuelle : ' + TotalQuantiteSelectionProduit);

                    console.log(RepetitionSelectionProduit[0]);
                    
            StockageSelectionProduit.push(SelectionProduit);
            localStorage.setItem("Selection", JSON.stringify(StockageSelectionProduit));    // Création paire clé/valeur dans le stockage avec conversion en string de la valeur

            } else{
                
                console.log(SelectionProduit);

                StockageSelectionProduit.push(SelectionProduit);                                // Ajout de la sélection de produit au stockage de la sélection produit
                localStorage.setItem("Selection", JSON.stringify(StockageSelectionProduit));

                    console.log(SelectionProduit);

                    console.log("produit ajouté à la commande en cours", SelectionProduit);

                alert ('Le produit sélectionné a bien été ajouté à votre panier.');             // Message de confirmation de validation pour l'utilisateur

            }
            
        }

    })


})
     