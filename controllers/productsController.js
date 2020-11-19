const fs = require ('fs');
var products = JSON.parse(fs.readFileSync(__dirname + "/../database/products.json"));

const productsController = {
    create: function(req,res,next){
        res.render('create');
    },
    store: function(req,res,next){
        products.push(req.body);
        let productsJSON = JSON.stringify(products);
        fs.writeFileSync(__dirname + "/../database/products.json", productsJSON);
        res.send('Producto creado');
    },
    edit: function (req,res,next){
        var idProduct = req.params.id;
        let productFound;
        for ( var i=0; i<products.length; i++){
            if (products[i].id == idProduct){
                productFound=products[i];
                break;
            }
        }
        if (productFound){
            res.render("edit", {productFound})
        }else{
            res.send ("Producto Inválido");
        }
    },
    update: function (req,res,next){
        var idProduct = req.params.id;
        var editProducts = products.map(function(product){
            if(product.id == idProduct){
                let productEditado = req.body;
                productEditado.id = idProduct;
                return productEditado;
            }
        });
        editProductsJSON=JSON.stringify(editProducts);
        fs.writeFileSync(__dirname + "/../database/products.json", editProductsJSON);
        res.redirect( idProduct);
    },
    destroy: function(req,res,next){
        var idProduct = req.params.id;
        var productDestroy;
        for ( var i=0; i<products.length; i++){
            if (products[i].id == idProduct){
            productDestroy=products[i];
            break;
            }
        }
            if (productDestroy){
            var productsDestroy = products.filter(function(product){
            return product.id != idProduct;
            });
            
            productsDestroyJSON=JSON.stringify(productsDestroy);
            fs.writeFileSync(__dirname + "/../database/products.json", productsDestroyJSON);
            res.send ("Producto eliminado");
        }else{
            res.send ("Producto Inválido");
}
}
}
module.exports = productsController;

