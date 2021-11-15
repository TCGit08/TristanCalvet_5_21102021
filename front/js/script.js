// Intégration données produits de API à la page d'accueil 
  // Template produit:

  // <section class="items" id="items"> 
  //  <a href="./product.html?id=42">
  //    <article>
  //      <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
  //      <h3 class="productName">Kanap name1</h3>
  //      <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
  //    </article>
  //  </a>
  // </section>




// Appel des données API

let urlAPIKanap = "http://localhost:3000/api/products";

fetch (urlAPIKanap)
	.then( response =>response.json())
	.then(data=>{
     	console.log(data); 						                                                          //Affiche dans la console le tableau (array) des données pour vérif




  // Création balise section contenant les produits dans la page d'accueil

  const sectionItems = document.createElement('section'); 						                        // création balise section
	sectionItems.classList.add('items'); 								                                        // ajout à la balise section de la classe .items
	sectionItems.id = 'items'; 									                                                // ajout à balise section de l'id #items
	const selectDivLimitedWidthBlock = document.querySelector("main .limitedWidthBlock"); 	    // pointage sur l'élément main ayant la classe limitedWidthBlock (gaffe classe répétée)
	selectDivLimitedWidthBlock.appendChild(sectionItems); 					                            // ajout balise section comme child de la div class limitedWithBlock


		
  // Création structure des éléments de l'array données et remplissage avec données de l'API
			          	 
	for (sofa of data) { 							                            // pour chaque élément de l'array des données de l'API (cf structure html template)

    //Balise <a>

		const baliseA = document.createElement('a'); 			          // création balise a
		sectionItems.appendChild(baliseA); 				                // ajout balise a dans balise section
		baliseA.href = `./product.html?id=${sofa._id}`; 		        // ajout attribut href pour lien vers page produit
    
    // Balise <article>

		const baliseArticle = document.createElement('article'); 	  // création balise article 
		baliseA.appendChild(baliseArticle); 		        		        // ajout balise article comme enfant de balise a
    
    // Balise <img>

		const baliseImg = document.createElement('img');        		// création balise img
		baliseImg.src = sofa.imageUrl; 	              			        // récupèration urlimage de chaque élément
		baliseImg.alt = sofa.altTxt; 				              	        // récupèration de "alt" 
		baliseArticle.appendChild(baliseImg); 			                // ajout balise img dans balise article 

    // Balise <h3>

		const baliseH3 = document.createElement('h3'); 		          // création balise h3
		baliseH3.classList.add('productName'); 			                // ajout classe .productName à la balise h3 créee
		baliseArticle.appendChild(baliseH3); 				                // ajout balise h3 au DOM dans la balise article
		baliseH3.innerHTML = sofa.name; 				                    // récupèration pour chaque élément du "name" et insertion dans h3

    // Balise <p>
 
		const baliseP = document.createElement('p');			          // création balise p
		baliseP.classList.add('productDescription');			          // ajout classe .productDescription à la balise p créée
		baliseArticle.appendChild(baliseP);				                  // ajout balise p au DOM dans la balise article
		baliseP.innerHTML = sofa.description				                // récupération pour chaque élément de "description" et insertion dans p
	
  }
          
})

 
 


