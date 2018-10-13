define(["jquery", "jquery-cookie"], function($){
    function main(){
        $(function(){
            $(".toLoginOfNum").click(function(){
                $("#loginOfNum").css("display", "block");
                $("#loginOfCode").css("display", "none");
            });
            $(".toLoginOfNum2").click(function(e){
                e.preventDefault();
                $("#loginOfNum").css("display", "block");
                $("#loginOfCode").css("display", "none");
            });
            $(".toLoginOfCode").click(function(){
                $("#loginOfNum").css("display", "none");
                $("#loginOfCode").css("display", "block");
            });

        })
    }
    return {
        login : main
    }
})