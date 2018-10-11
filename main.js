console.log("加载完成");

require.config({
    paths:{
        "jquery" : "jquery-1.11.3",
        "jquery-cookie" : "jquery.cookie",
        "index" : "index"
    },

    shim:{
        'jquery-cookie' : ["jquery"] 
    }
})

require(["index"], function(index){
    index.index();
})