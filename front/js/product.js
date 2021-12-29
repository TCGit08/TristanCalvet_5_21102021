
// Page produit
// html (commentaires) = product.html


main() 

async function main() { 
    const productId =  getProductId()               // await et async nécessaire pour la condition l 51
    const product = await getProduct(productId)
    fillProduct(product)
}


// Création d'une nouvelle url pour chaque produit.

function getProductId() { 
    return new URL(location.href).searchParams.get('id')
}


// Récupération les données du tableau et comportements suivant les réponses.

function getProduct(productId) { 
    return fetch(`http://localhost:3000/api/products/${productId}`)
        .then(function(response) {
            return response.json()
        })
        .then(function(products) {
            return products
        })
        .catch (function(err) {
            alert(err)
        })
}


// Ajout des éléments html de manière dynamique

function fillProduct(product){
    let titlePage =document.querySelector('title');
    titlePage.innerHTML  = "Kanap -  " + product.name;
    let imgProd = document.querySelector('.item__img img');         
    imgProd.src = product.imageUrl;
    imgProd.alt = product.altTxt;
    document.getElementById('title').textContent = product.name
    document.getElementById('price').textContent = product.price
    document.getElementById('description').textContent = product.description
    const selectElt = document.querySelector('select');
    let optionElt;
    for (color of product.colors) {
        optionElt = document.createElement('option');
        optionElt.setAttribute('value', color);
        optionElt.textContent = color;
        selectElt.appendChild(optionElt);
    }


   
    // Envoie des données du produit selectionné dans le localStorage :
    // écoute du click du bouton 'Ajouter au panier';
    // création de la fiche produit avec ses informations;
    // stockage de la fiche produit dans un tableau;
    // stockage du tableau dans le localStorage.
     
    const sendToCart = document.getElementById('addToCart');


    // Ecoute du click du bouton 'Ajouter au panier'.

    sendToCart.addEventListener('click',(event) => {
        event.preventDefault();
        
        // Création de la fiche produit avec ses informations.

        const itemCart = {
            id: product._id,
            name: product.name,
            quantity: quantity.value,
            color: document.getElementById('colors').value,
            price: product.price, 
            img: product.imageUrl,
            alt: product.altTxt,
        };

        console.log(itemCart);

        // Stockage de la fiche produit dans un tableau.

        let localItems = JSON.parse(localStorage.getItem('itemToCart'));

        console.log(localItems);

        if(localItems) {
            let newQuantity = parseInt(itemCart.quantity);
            for(i = 0; i < localItems.length; i++) {                                                
                if(localItems[i].id == itemCart.id && localItems[i].color == itemCart.color) {      // Cas où même id et même couleur.
                    newQuantity += parseInt(localItems[i].quantity);                                // Conversion en integer pour manip.
                    localItems.splice(i,1);                                                         // A partir de l'index i, suppression d'1 élément.
                }
            }
            itemCart.quantity = newQuantity;

            console.log(itemCart.name);
            console.log(itemCart.color);
            console.log(newQuantity);

            if (newQuantity > 0) {

                // Stockage du tableau dans le localStorage.

                localItems.push(itemCart);
            }
            localStorage.setItem('itemToCart', JSON.stringify(localItems));

            console.log(localItems);
            alert ('Le produit sélectionné a bien été ajouté à votre panier.');

        }else {
            localItems = [];

            // Stockage du tableau dans le localStorage.

            localItems.push(itemCart);
            localStorage.setItem('itemToCart', JSON.stringify(localItems))

            console.log(localItems);
            alert ('Le produit sélectionné a bien été ajouté à votre panier.');
        }  
    });
}

