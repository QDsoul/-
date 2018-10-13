console.log("加载完成");

require.config({
    paths:{
        "jquery" : "jquery-1.11.3",
        "jquery-cookie" : "jquery.cookie",
        "index" : "index",
        "login" : "login",
        "register" : "register",
        "drag" : "drag"
    },

    shim:{
        'jquery-cookie' : ["jquery"] 
    }
})

require(["index", "login", "register"], function(index, login, register){
    index.index();
    login.login();
    register.register();
})