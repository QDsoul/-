console.log("加载完成");

require.config({
    paths:{
        "jquery" : "jquery-1.11.3",
        "jquery-cookie" : "jquery.cookie",
        "index" : "index",
        "login" : "login",
        "register" : "register",
        "drag" : "drag",
        "product" : "product",
        "shoppingCar" : "shoppingCar"
    },

    shim:{
        'jquery-cookie' : ["jquery"]
    }
})

require(["index", "login", "register", "product", "shoppingCar"], function(index, login, register, product, shoppingCar){
    index.index();
    product.product();
    login.login();
    shoppingCar.shoppingCar()
})