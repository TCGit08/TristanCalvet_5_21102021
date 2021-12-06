/** 
 Page produit
 html (commentaires) = product.html
*/



// Récupération id produit

const urlPageProduit = window.location.href;                               // Récupération de l'URL de la page courante avec la propriété window.location.href
var url = new URL(urlPageProduit);
var id = url.searchParams.get("id");               			      




// Appel données API du produit ayant un id

let urlProducts = `http://localhost:3000/api/products/${id}`;   
console.log(urlProducts);                                        // Vérification de la récupération de l'URL

fetch (urlProducts)                                             	
  .then( response =>response.json())
  .then(data=>{
     console.log(data);                                              // Vérification de la récupération des données




// Récupération des données produits dans l'API et remplissage.


    // Titre page produit

let titrePageProduit = document.querySelector('title');             // Pointage de la balise title
titrePageProduit.innerHTML = data.name;                             // Changement dynamique du nom


    // Photo produit

let photoCanape = document.querySelector('.item__img img');         // Pointage de img dans la div ayant la classe "item__img"
photoCanape.src = data.imageUrl;  					                        // Récupératon donnée image dans l'API 
photoCanape.alt = data.altTxt; 						                          // Récupération donnée texte alt


    // Nom produit

let Nom = document.querySelector('#title');  		                    // Pointage de l'id title
Nom.innerHTML = data.name;    					                            // Ajout Nom dans le html


    // Prix produit

let Prix = document.querySelector('#price');  		                  // Pointage de l'id Price
Prix.innerHTML = data.price;             				                    // Ajout Prix dans le html


    // Texte description produit

let texteDescription = document.querySelector('#description'); 	    // Pointage de l' descpription 
texteDescription.innerHTML = data.description;  			              // Ajout description produit dans le html


    // Choix couleur

let selectCouleurs = document.querySelector("select");          		// Pointage sélection de couleur
for (i=0; i<data.colors.length; i++  ){                           	// Boucle d'action pour chaque couleur        
let option = document.createElement("option");                    	// Création  élément option pour chaque couleur 
option.setAttribute("value", data.colors[i]);                     	// Ajout attributs provenant des données couleurs 
option.textContent = data.colors[i];                              	// Ajout texte correspondant à la  couleur sélectionnée   
selectCouleurs.appendChild(option);                                 // Ajout balise option dans selectCouleus

}








  })
     