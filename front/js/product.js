/** 
 * Représentation du format d'un produit
*/

class Product{
    constructor (jsonProduct){
        jsonProduct && Object.assign(this, jsonProduct); 
    }
}